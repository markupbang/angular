/*! jquery.ui-ripple.js © yamoo9.net, 2016 */

;(function(exports, $){
	'use strict';

	// 변수 선언 구간(스코프 호이스팅 고려)
	var slice, checkFocusableEl, pluginObj;

	// Array 프로토타입 객체 메소드 빌려쓰기
	slice = Array.prototype.slice;

	// 플러그인 객체 정의
	pluginObj = {

		// 0. 초기화
		'init': function(options) {

			// 플러그인이 적용된 jQuery 인스턴스 객체 참조
			var $this = this;

			// 플러그인 적용 후 jQuery 인스턴스 객체 반환 (체이닝)
			return $.each($this, function(index, el) {
				// jQuery 개별 인스턴스 참조
				var _$el = $this.eq(index);
				// 플러그인 식별자 클래스 속성 설정
				_$el.addClass( options.containerClass );
				// 사운드 설정 유무 파악 후 처리
				var _setEF = options.sound ? pluginObj.setEffectSound(options) : {};
				// 플러그인 연결 객체 자신이 포커스 가능한 요소인지 확인 후, 리플 이펙트 연결
				if ( _$el.is('a') ) {
					pluginObj.setRipple( _$el, options, _setEF );
				}
				// 포커스 가능한 요소가 아닐 경우, 내부에서 포커스 가능한 요소를 찾아 리플 이펙트 연결
				else {
					pluginObj.setRipple( _$el.find( 'a' ), options, _setEF );
				}
			});

		},

		// 1. setRipple
		'setRipple': function($el, options, es) {

			// $el이 존재하지 않거나 .yamoo9-ui-ripple-ink 요소가 존재할 경우 종료
			if ( !$el || $el.siblings('.'+options.rippleInkClass).length !== 0 ) { return; }

			var $parent, $ink, dimension;

			// 플러그인 객체 부모에 스타일 설정
			$parent = $el.parent().hide().css({
				'position': 'relative',
				'overflow': 'hidden'
			}).show();

			// $ink 가로/세로 폭 설정을 위한 값 가져오기
			dimension = Math.max( $parent.outerWidth(), $parent.outerHeight() );

			// 플러그인 객체 뒤에 .ui-ripple-ink 요소 추가 후, 스타일 설정
			$ink = $('<span>', {
				'class': options.rippleInkClass,
				'css': {
					'width': dimension,
					'height': dimension,
					'background': options.color,
					'animation-duration': options.time+'s'
				}
			}).insertAfter($el);

			// 이벤트 설정
			$.each($el, function(index){
				var $_el = $el.eq(index);
				$_el.on({
					'click': $.proxy(activeRipple, $_el),
					'keyup': $.proxy(setA11yFocusState, $_el),
					'blur': $.proxy(unsetA11yFocusState, $_el)
				});
			});

			// 이벤트 핸들러 정의
			// 리플 이펙트 활성화 함수
			function activeRipple(e) {
				var $parent, $_ink, x, y;
				e.stopPropagation();
				e.preventDefault();
				$parent = this.parent();
				$_ink = this.next('.'+options.rippleInkClass);
				// 사운드 재생
				if (!$.isEmptyObject(es)) {
					es.stopSound();
					es.playSound();
				}
				// 더블 클릭 시, 애니메이션 클래스 제거
				$_ink.removeClass(options.animateClass);
				// 마우스 클릭 좌표 찾기
				x = e.pageX - $parent.offset().left - $_ink.width()/2;
				y = e.pageY - $parent.offset().top - $_ink.height()/2;
				// 클릭 좌표 및 애니메이션 클래스 속성 추가
				$_ink.hide().css({
					'left': x,
					'top': y
				}).show();

				$_ink.addClass(options.animateClass);
			}
			// 키보드 포커스 접근성 설정 함수
			function setA11yFocusState() {
				this.next().css('opacity', 0);
				if ( !this.data('org_bg_color') ) {
					this.data('org_bg_color', this.css('background'));
				}
				this.css('background', '#ff0');
				this.parent().css('overflow', 'visible');
			}
			// 키보드 포커스 접근성 해제 함수
			function unsetA11yFocusState() {
				this.next().css('opacity', 1);
				this.css('background', this.data('org_bg_color'));
				this.parent().css('overflow', 'hidden');
			}

		},

		// 2. setEffectSound
		'setEffectSound': function(options) {
			var sound = new Audio();
			sound.setAttribute('src', options.sound_source);
			function playSound() {
				this.play();
			}
			function stopSound() {
				this.pause();
				this.currentTime = 0;
			}
			return {
				sound: sound,
				playSound: $.proxy(playSound, sound),
				stopSound: $.proxy(stopSound, sound)
			};
		}

	};

	// 리플 이펙트 플러그인 정의
	$.fn.uiRipple = function(options) {
		// 전달인자 검증
		// ---------------------------
		var defaults = $.fn.uiRipple.defaults;
		// 전달인자가 존재할 경우 덮어쓰기
		options = options ? $.extend({}, defaults, options) : defaults;
		// 플러그인 초기화 실행(옵션 전달)
		pluginObj.init.call(this, options);
	};

	// 리플 이펙트 플러그인 기본 값
	$.fn.uiRipple.defaults = {
		// 'color': 'hsla(259, 66%, 62%, 0.25)',
		'color': 'repeating-radial-gradient(circle, #7045CF, #7045CF 5px, #fff 5px, #fff 10px)',
		'sound': true,
		'time': 0.6,
		'sound_source': 'js/plugins/ui/media/tong.mp3',
		'containerClass': 'yamoo9-ui-ripple',
		'rippleInkClass': 'yamoo9-ui-ripple-ink',
		'animateClass': 'animate'
	};

})(this, this.jQuery);
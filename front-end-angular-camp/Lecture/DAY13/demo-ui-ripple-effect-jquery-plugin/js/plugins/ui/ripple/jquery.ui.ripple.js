/*! jquery.ui.ripple.js © yamoo9.net, 2016 */
(function(exports, $){
	'use strict';

	// 스코프 내에 변수 선언 구간
	var defaults, plugin, soundObj;

	// 오디오를 불러오고 재생하는 객체를 생성
	soundObj = {
		'init': function(source) {
			// 전달인자 유효성 검사
			if ( !source || typeof source !== 'string' ) {
				return console.error('오디오 음원 주소는 문자열로 전달해야 합니다.');
			}
			// 오디오 객체를 생성자를 통해 생성한다.
			this.audio = new Audio();
			// 생성된 오디오 객체에 음원을 연결한다.
			this.audio.setAttribute('src', source);

			// 메소드 체이닝
			return this;

			// 오디오 파일을 다운로드 받아 재생할 준비가 되면 재생
			// this.audio.addEventListener('canplay', function() {
			// 	this.play();
			// });
		},
		'play': function() {
			this.audio.play();
			return this;
		},
		'stop': function() {
			// 네이티브 JS에서는 오디오 객체애 stop() 메소드는 없음.
			// this.audio.stop();
			this.audio.pause(); // 일시 정지
			this.audio.currentTime=0;
			return this;
		}
	};

	// 플러그인 객체
	plugin = {
		// 플러그인 초기화
		'init': function() {
			// this === 플러그인이 연결된 jQuery 인스턴스 객체
			// console.log(this, this.jquery);

			// this 참조 변수
			var $this = this;

			// 임시 테스트, 사운드 재생
			// soundObj
			// 	.init('media/tong.mp3')
			// 	.play();
			// // soundObj.play();

			// 사운드를 재생할 준비를 마친다.
			soundObj.init('media/tic.mp3');

			// 1. 플러그인 컨테이너 요소에 식별자 클래스 속성 추가
			$this.addClass('yamoo9-ui-ripple-container');

			// 2. 플러그인이 연결된 개별 요소를 순환하여 플러그인 초기화 수행
			return $.each( $this, function(index) {
				// jQuery 팩토리 함수를 다시 사용하지 않기 위해
				// $this에서 index를 뽑아 사용한다. (성능 최적화)
				var _$this = $this.eq(index);
				// console.log( _$this.jquery );

				// 리플 이펙트 구성 설정
				plugin.rippleSetting( _$this );
			} );

		},

		// 리플 구성하는 메소드
		'rippleSetting': function($container) {
			// 플러그인이 연결된 컨테이너 객체
			// $container

			var $ripple, $ripple_parent, $ink, dimension;

			// 컨테이너 내부의 a 요소를 찾아 변수에 참조
			$ripple = $container.find('a');
			$ripple_parent = $ripple.parent(); // a의 부모 요소

			// 1. 부모 요소에 스타일 설정
			// position: relative;
			// overflow: hidden;

			// 방법 1. 인라인 스타일 설정
			// $ripple_parent
			// 	.hide()
			// 	.css({
			// 		'position': 'relative',
			// 		'overflow': 'hidden'
			// 	})
			// 	.show();

			// 방법 2. 부모 요소에 식별자 클래스 속성 추가
			$ripple_parent.addClass('yamoo9-ui-ripple-parent');

			// 리플 요소에 식별자 클래스 속성 추가
			$ripple.addClass('yamoo9-ui-ripple');

			// 부모 $ripple_parent의 가로/세로 중 긴 길이 값을 dimension 변수에 참조
			dimension = Math.max($ripple_parent.outerWidth(), $ripple_parent.outerHeight());

			// console.log( 'dimension:', dimension );

			// 2. uiRipple Ink 요소를 동적으로 추가
			$ink = $('<span>', {
				'class': 'yamoo9-ui-ripple-ink',
				'css': {
					'width': dimension,
					'height': dimension,
					'background': '#7045CF',
					'animation-duration': 0.4+'s'
				}
			})
			// 리플의 부모 요소($ripple_parent)의 마지막 자식으로 추가
			.appendTo($ripple_parent);

			// 이벤트 바인딩
			// 개별 바인딩을 위해 반복문을 사용한다.
			// 이벤트 연결할 때 activeRipple 함수 내부의 this가 참조할 수 있는 값을
			// $.proxy() 메소드를 사용해서 우회한다.
			$.each($ripple, function(index) {
				var _$ripple = $ripple.eq(index);
				_$ripple.on({
					'click': $.proxy(activeRipple, _$ripple),
					// 'click': activeRipple.bind(_$ripple),
					'keyup': $.proxy(setA11yFocusDisplay, _$ripple),
					'blur': $.proxy(unsetA11yFocusDisplay, _$ripple)
				});
			});

			// 이벤트 핸들러 정의
			function activeRipple(e) {
				var x, y, parent_offset, r, $ink;
				e.stopPropagation(); // 이벤트 전파 멈춤
				e.preventDefault(); // 기본 동작 차단
				// this는 무엇을 참조하나?
				// this === 문서 객체
				// 결론. jQuery 메소드를 사용할 수 없다...
				// 팩토리를 사용하면 성능 저하.. 우려
				// 네이티브 자바스크립트를 사용하거나...
				// 다른 방법을 모색해야 한다.
				// console.log('clicked $ripple', this);

				// 마우스 좌표 x, y 값을 확인
				// console.log('e.pageX:', e.pageX, 'e.pageY:', e.pageY);
				parent_offset = this.parent().offset();
				r = dimension/2;
				// 사용자가 마우스로 클릭한 위치를 구하는 공식
				// 페이지에서 마우스로 클릭한 위치 - 클릭된 a의 부모의 페이지에서의 위치 - 리플 요소의 지름/2
				x = e.pageX - parent_offset.left - r;
				y = e.pageY - parent_offset.top - r;

				// 클릭된 a 요소의 다음 $ink 요소를 변수에 참조
				var $ink = this.next();

				// 사용자가 a를 클릭했을 때, $ink에 animate 클래스 속성 제거
				$ink.removeClass('animate');

				// $ink의 top, left 위치를 x, y 축으로 설정한다.
				$ink
					.hide()
					.css({
						'left': x,
						'top': y,
					})
					.show();

				// 사용자가 a를 클릭했을 때, $ink에 animate 클래스 속성 추가
				$ink.addClass('animate');

				// 사운드 재생
				// 여러 번 클릭할 경우, 기존 재생되던 음원은 중지를 해야 한다.
				soundObj
					.stop()
					.play();

			}

			function setA11yFocusDisplay(e) {
				// this === jQuery 플러그인이 연결된 a 인스턴스 객체
				// a의 부모 요소에 overlfow: visible;로 처리한다.
				this.parent().hide().css('overflow', 'visible').show();
			}

			function unsetA11yFocusDisplay(e) {
				// this === jQuery 플러그인이 연결된 a 인스턴스 객체
				this.parent().hide().css('overflow', 'hidden').show();
			}

		}

	};

	// jquery.fn.uiRipple 플러그인 기본 옵션 객체
	defaults = {
		// 회사/브랜드 접두사
		'prefix': 'yamoo9',
		// 컨테이너 식별자
		'containerClass': 'ui-ripple-container',
		// 리플 래퍼 식별자
		'parentClass': 'ui-ripple-parent',
		// 리플 식별자
		'rippleClass': 'ui-ripple',
		// 리플 잉크 식별자
		'inkClass': 'ui-ripple-ink',
		// 리플 잉크 색상
		'color': '#7045CF',
		// 효과음 재생 여부
		'sound': true,
		// 효과음 음원 주소
		'sound_source': 'media/tic.mp3',
		// 리플 잉크의 퍼짐 속도 (초 단위)
		'time': 0.6
	};

	// jquery.fn.uiRipple 정의
	$.fn.uiRipple = $.fn.uiRipple || function() {
		// 플러그인 객체의 init 메소드 빌려쓰기
		// jQuery 메소드 체이닝
		return plugin.init.apply(this, arguments);
	};

})(this, this.jQuery);
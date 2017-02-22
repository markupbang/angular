###### Fast Campus ─ Front-End AngularJS CAMP

# DAY10

### jQuery Modules

1. [jQuery를 작성하는 좋은 습관(GOOD Patterns)](better-writing-jquery.md)
1. jQuery 유틸리티 메소드(Utility Methods)
1. jQuery 커스터마이징(Customizing)
1. jQuery 커스텀 플러그인(Custom Plugin)

<!-- 1. jQuery 퍼포먼스 튜닝(Perfomance Tuning) -->
<!-- 1. jQuery 데이터 메소드(Data Method) -->
<!-- 1. jQuery 고급 이벤트(Advanced Events) -->

-

#### 1.2 콜렉션 조작 유틸리티 메소드

- [jQuery.merge(o1, o2)](http://api.jquery.com/jQuery.merge/)<br>배열(유사 배열 포함) 데이터 병합
- [jQuery.map(o, fn)](http://api.jquery.com/jQuery.map/)<br>배열 또는 객체를 순환한 후, 배열 반환 (원본 배열 변경 없음)
- [jQuery.grep(o, fn, [, invert])](http://api.jquery.com/jQuery.grep/)<br>배열 또는 객체를 순환하여 필터링 된 배열 결과를 반환(원본 배열 변경 없음)

>DEMO:<br>
js/02-collection-manipulation.js<br>
js/plugins/jquery.unique.js

-

#### 1.3 [each](http://api.jquery.com/jQuery.each/)

jQuery.each()는 다음의 경우에 사용 가능하다.

- 배열 (`Array`)
- jQuery 인스턴스 객체 `$(selector)`
- Javascript 객체(Object)

```js
// ES5에 추가된 네이티브 forEach()와 유사하지만,
// callback() 함수에 전달되는 인자가 반대인 점에 유의!
$.each(collection, callback(index, item));
```

-

#### 1.4 [extend](http://api.jquery.com/jQuery.extend/)

- 객체의 속성을 복사하여 다른 객체에 설정(이미 존재할 경우 덮어씀)
- 상속 패턴이 아닌, 실행 중에 복사하여 사용하는 코드 재사용 패턴
- 믹스인 패턴 기능까지 포함되어 다수의 객체 기능 복사(다중 복사)
- 전달된 객체의 속성을 합쳐 통합되는 목표 객체는 가장 왼쪽

```js
// 얕은 복사 (속성 유형이 배열/객체인 경우 참조)
jQuery.extend(o1, o2);

// 깊은 복사 (속성 유형이 배열/객체인 경우까지 복사)
jQuery.extend(true, o1, o2);

// 믹스인
jQuery.extend(o1, o2, o3, ..., oN);
```

-

#### 1.5 [proxy](http://api.jquery.com/jQuery.proxy/)

- 메소드 빌려쓰기 패턴
- 컨텍스트를 전달
- 바로 실행되지 않음(call, apply와의 차이점)
- ES5에 추가된 Function.prototype.bind()와 유사(사용 방법은 다름)

```js
jQuery.proxy(handler, context);
jQuery.proxy(context, name);
```

-

#### 1.7 [pushStack](http://api.jquery.com/pushStack/)

- 배열 데이터를 jQuery 인스턴스 객체화할 경우 사용
- jQuery 플러그인 개발 시에 체이닝 패턴을 사용하기 위해 필요한 메소드

```js
jQuery.fn.method = function() {
    var arr = [];
    // jQuery.each(arr, function(){ ... } );
    return this.pushStack(arr);
}
```

-

#### 1.8 [getScript](http://api.jquery.com/jQuery.getScript/)

- $.ajax를 사용하기 쉽도록 만든 Ajax 단축 메소드
<!-- convenience wrapper for $.ajax -->
- Javascript 파일을 즉시 비동기 호출하여 실행
<!-- Excutes retrieved javascript immediately -->

```js
jQuery.getScript(url, successCallback);
// successCallback(data, textStatus, jqXHR) {}

// v1.5+ 오류 핸들링
$.getScript( "ajax/test.js" )
  .done(function( script, textStatus ) {
    console.log( textStatus );
  })
  .fail(function( jqxhr, settings, exception ) {
    $( "div.log" ).text( "Triggered ajaxError handler." );
});

// 캐시 사용할 경우 설정
$.ajaxSetup({
  cache: true
});
```

-

#### 1.6 [holdReady](http://api.jquery.com/jQuery.holdReady/)

```js
// Ready를 잡아둠(Hold)
$.holdReady(true);

// Ready를 풀어줌
$.holdReady(false);
```

-

#### 1.9 [parseJSON](http://api.jquery.com/jQuery.parseJSON/)

- JSON 문자열을 Javascript 객체로 바꿔주는 유틸리티 메소드
- JSON.parse()를 지원하지 않는 구형 웹 브라우저(IE6,7)에서 사용
- [참고: JSON 웹 브라우저 호환성 표](http://caniuse.com/#feat=json)

```js
var js_obj = jQuery.parseJSON( json_str );
```

---

### 2. jQuery 커스터마이징

#### 2.1 애니메이션 커스텀 스피드 키워드 설정

```js
// 코어
// jQuery.fx.speed.fast   = 200
// jQuery.fx.speed.normal = 400
// jQuery.fx.speed.slow   = 600

// 확장
jQuery.fx.speed.slower = 800;
jQuery.fx.speed.faster = 100;
```

-

#### 2.2 커스텀 셀렉터
<!--
https://github.com/yamoo9/jQuery-Class/blob/DAY14/DOC/DAY08.md
https://coderwall.com/p/gdt7ga/custom-jquery-selectors-using-expressions
http://www.webgeekly.com/tutorials/jquery/create-custom-jquery-selectors-to-speed-up-development/
http://malsup.com/jquery/expr/
-->

```js
/**
* jQuery 표준
* $('span[class*="icon-"]');
* ----------------------------
* 사용자 정의
* $('span:icon');
*/
$.expr[':'].icon = function(el, index, meta) {
    return el.getAttribute('class').toLowerCase().match('icon-');
};
```

-

#### 2.3 커스텀 유틸리티 메소드

```js
jQuery.extend(jQuery, {
    'log': function(m) {
        console.log(m);
    },
    'error': function(e) {
        console.error(e);
    },
    'dir': function(o) {
        console.dir(o);
    },
    'group': function(g) {
        console.group(g);
    },
    'groupEnd': function(g) {
        console.groupEnd();
    }
});
```

-

#### 2.4 jQuery 코어 메소드 오버라이딩

##### 코어 메소드 오버라이딩이 필요한 이유

- 기능 확장이 필요한 경우
- 비즈니스 관점에서 특정하게 사용해야 할 경우
- 기본 값 변경이 필요한 경우
- 기타 등등

##### 위험!!

- 오버라이딩된 사항이 팀원과 공유되지 않을 경우 혼란 야기
- jQuery 내부 코드 오류 발생

##### 가이드라인

- 기능을 확장할 경우만 사용하는 것이 좋다.
- 새로운 유틸리티 메소드를 만들거나, 플러그인을 제작하는 것으로 대체하는 것이 좋다.

```js
// 유틸리티 코어 메소드 백업
jQuery.mergeOrg = jQuery.merge;

// 코어 메소드 오버라이딩
jQuery.merge = function() {
    var combine_arr = [];
    jQuery.each(args, function(index, arg) {
    if ( !jQuery.isArray(arg) ) { return console.error('전달인자가 배열이 아닙니다.') }
        jQuery.merge(combine_arr, arg);
    });
    return combine_arr;
};

// -------------------------------------------------------------------------------

// 프로토타입 코어 메소드 백업
jQuery.fn.attrOrg = jQuery.fn.attr;

// 코어 메소드 오버라이딩
jQuery.fn.attr = function(prop, val) {
    var args = [ jQuery.myProps[prop] || prop, val ];
    return jQuery.fn.attrOrg.apply(this, args);
};

jQuery.myProps = jQuery.extend({}, {
    'mcp': 'data-my-custom-property',
    'pwrln': 'data-property-with-really-long-name',
});
```

---

### 3. jQuery 커스텀 플러그인

#### 3.1 jQuery 플러그인 제작 프로세스 [#](http://learn.jquery.com/plugins/)

**0.** 영역 내, $ 별칭 보호
```js
(function(global, $){
    'use strict';
    // $ === window.jQuery
})(window, window.jQuery);
```

**1.** 플러그인 기본형 쉘 작성
```js
(function(global, $){
    'use strict';

    var plugin_name = '{{플러그인 이름}}';

    if ( !$.fn[plugin_name] ) {
        $.fn[plugin_name] = function() {
            // 플러그인 코드
        };
    }

})(window, window.jQuery);
```

**2.** 체이닝 설정
```js
(function(global, $){
    'use strict';

    var plugin_name = '{{플러그인 이름}}';

    if ( !$.fn[plugin_name] ) {
        $.fn[plugin_name] = function() {

            // jQuery 체이닝 설정
            return this;
        };
    }

})(window, window.jQuery);
```

**3.** $.each() 유틸리티 메소드 활용
```js
(function(global, $){
    'use strict';

    var plugin_name = '{{플러그인 이름}}';

    if ( !$.fn[plugin_name] ) {
        $.fn[plugin_name] = function() {
            var $this = this;

            return $.each($this, function(index, el){
                var _$item = $this.eq(index); // jQuery 인스턴스 객체

                // 플러그인 코드
            });
        };
    }

})(window, window.jQuery);
```

**4.** 객체지향 프로그래밍 설정
```js
(function(global, $){
    'use strict';

    var plugin_name = '{{플러그인 이름}}';

    // 생성자 함수
    var ConstructorFn = function(el) {
        this.el = el;
    };

    // 생성자 프로토타입 객체
    ConstructorFn.fn = ConstructorFn.prototype = {
        // 초기화 메소드
        init: function() {

        }
    };

    if ( !$.fn[plugin_name] ) {
        $.fn[plugin_name] = function() {
            var $this = this;

            return $.each($this, function(index, el){
                var _$item = $this.eq(index);

                new ConstructorFn(el);
            });
        };
    }

})(window, window.jQuery);
```

**5.** 사용자정의/기본 옵션 설정
```js
(function(global, $){
    'use strict';

    var plugin_name = '{{플러그인 이름}}';

    var ConstructorFn = function(el, options) {
        this.init(el, options)
    };

    ConstructorFn.fn = ConstructorFn.prototype = {
        init: function(el, options) {
            // 사용자 정의 옵션 >> 기본 옵션 = 병합
            options = $.extend({}, $.fn[plugin_name].defaults, options);

            // 이벤트 메소드 실행
            this.events();
        },
        events: function() {

        }
    };

    if ( !$.fn[plugin_name] ) {
        // options - 사용자 정의 옵션 설정
        $.fn[plugin_name] = function(options) {
            var $this = this;

            return $.each($this, function(index, el){
                var _$item = $this.eq(index);

                // 생성자 함수에 options 전달
                new ConstructorFn(el, options);
            });
        };

        // 플러그인 초기 옵션 설정
        $.fn[plugin_name].defaults = {

        };
    }

})(window, window.jQuery);
```
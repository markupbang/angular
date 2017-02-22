###### Fast Campus ─ Front-End AngularJS CAMP

# DAY11

### jQuery 플러그인 제작

- 플러그인 이름
- 플러그인 제작 패턴
    - $ 별칭 보호
    - 코드 최적화
    - 콘텍스트
    - 체이닝
- 매개변수
- 네임스페이스
- 상태 유지

-

#### jQuery 커스텀 플러그인 제작

- 파일 이름 작성 규칙
- 유일한(Unique) 플러그인 이름
- 유일한 네임스페이스 사용

```js
// 파일 이름
// jquery.plugin.js
// jquery.plugin-1.0.1.js
// jquery.plugin-1.0.1.min.js

// 플러그인 이름
// 다른 플러그인과 충돌이 나지 않아야 함.
// 기존 플러그인 이름이 존재하는지 검증이 필요.

// 네임스페이스
// 네임스페이스는 오직 하나만 사용할 것.
```

-

#### jQuery 플러그인 기본 제작 패턴

```js
(function($){
    'use strict';
    $.fn.plugin = function() {
        // 플러그인 코드 작성
    };
}(this.jQuery));
```

-

#### jQuery 플러그인 반환 값 (체이닝)

```js
// jQuery 반환 값 종류
// return this;
// return this.each(callback);
// return $.each(this, callback);
// return this.pushStack(el);
```

-

#### jQuery 플러그인 매개변수

```js
// .end()
// .css('font-size')
// .css('font-size', '+=20')

// .plugin(param1, param2, ..., paramN)

// var settings = { param1: value1, param2: value2 };
// .plugin(settings)
```

-

#### jQuery 플러그인 네임스페이스

```js
(function($){
    'use strict';

    // 플러그인 네임스페이스
    $.fn.emphasizer = {};

    // 플러그인 네임스페이스 메소드
    $.fn.emphasizer.emphasize = function() {
        // 강조 플러그인
    };
    $.fn.emphasizer.deEmphasize = function() {
        // 강조 해제 플러그인
    };

})(this.jQuery);
```

```js
(function($){
    'use strict';

    // 비공개 멤버
    var methods = {
        'emphasize' : function() {
            // 강조 플러그인
            return this;
        },
        'deEmphasize': function() {
            // 강조 해제 플러그인
            return this;
        }
    },
    slice = Array.prototype.slice;

    $.fn.emphasize = function(method) {
        if (typeof method !== 'string') { return console.error('오류 메시지'); }
        method = methods[method] || 'emphasize';
        var args = slice.call(arguments, 1);
        // 메소드 빌려쓰기
        return methods[method].apply(this, args);
    };

})(this.jQuery);
```

-

#### 상태 유지

개별 인스턴스 객체마다 상태 유지를 위해 `$.fn.data()` 활용


```js
(function($){
    'use strict';

    var level = 0;

    $.fn.increaseLevel = function() {
        level += 1;
        switch(level) {
            case 1:
                return this.css('background-color', 'red');
            case 2:
                return this.css('background-color', 'green');
            case 3:
                return this.css('background-color', 'blue');
            case 4:
                return this.css('background-color', 'orange');
            default:
                level = 0;
                this.increaseLevel();
        }
    };

})(this.jQuery);
```

```js
(function($){
    'use strict';

    $.fn.increaseLevel = function() {

        // 개별 인스턴스마다 유일한 level 변수를 갖도록 설정
        if(this.data('level')) {
            this.data('level') = 0;
        }

        var level = parseInd(this.data('level'),10) += 1;

        switch(level) {
            case 1:
                return this.css('background-color', 'red');
            case 2:
                return this.css('background-color', 'green');
            case 3:
                return this.css('background-color', 'blue');
            case 4:
                return this.css('background-color', 'orange');
            default:
                level = 0;
                this.increaseLevel();
        }
    };

})(this.jQuery);
```
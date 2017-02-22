###### Fast Campus ─ Front-End AngularJS CAMP

# DAY12

### jQuery 플러그인 제작 Part. 2

- `jquery.fn.radioClass.js`
- `jquery.skipToContents.js` | `jquery.fn.skipToContents.js`
- `jquery.fn.radioCheckbox.js` [ `radio` | `checkbox` ]
- `jquery.fn.ripple.js`
- `jquery.fn.a11y.tabs.js`

<!-- -

#### jquery.fn.radioClass.js

```js
/*! jquery.fn.radioClass.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    if( !$.fn.radioClass ) {
        $.fn.radioClass = function(class_name, closest_parent) {
            // 1.
            // 검증
            if ($.type(class_name) !== 'string') { throw new Error('클래스 이름은 문자열이어야 합니다.'); }

            // 2.
            // closest_parent 존재 유무 파악
            closest_parent = closest_parent || '';

            if( closest_parent ) {
                // 3.
                // 근접한 부모 요소 선택자가 존재할 경우, 부모 요소에서 해당 클래스를 라디오 클래스 처리
                // http://api.jquery.com/closest/
                // selector, jQuery, Element
                this.closest(closest_parent).siblings().find('.'+class_name).removeClass(class_name);
            } else {
                this.siblings('.'+class_name).removeClass(class_name);
            }
            this.addClass(class_name);
        };
    }

})(this, this.jQuery);
```

-

#### jquery.isFocusable.js

```js
(function(exports, $){
    'use strict';

    var doc = exports.document;

    $.isFocusable(el) {
        var prev_focus_node, result;
        // 1.
        // 검증
        if ( !el.jquery && el.nodeType !== 1 ) {
            $.error('jQuery 인스턴스 또는 DOM 요소 노드를 전달해야 합니다.');
        }
        // 2.
        // 이전 포커스 요소 참조
        prev_focus_node = doc.activeElement;
        // 3.
        // 전달된 요소에 포커스 설정
        el.focus();
        // 4.
        // 전달된 요소에 포커스 설정이 되는지 확인
        result = doc.activeElement === (el.jquery ? el[0] : el);
        // 5.
        // 결과가 참이라면 이전 포커스 요소에 포커스 다시 설정
        if (result) { prev_focus_node.focus(); }
        // 6.
        // 포커스 설정 가능 진단 결과 반환
        return result;
    };

})(this, this.jQuery);
```

-

#### jquery.skipToCotents.js

```js
/*! jquery.skipToCotents.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    // 3.
    // _skipToContents 비공개 함수
    function _skipToContents(ev) {
        var $this, target_id;
        $this     = $.memory(this);
        target_id = $this.attr('href');
        $target   = $.memory(this, 'target', $(target_id));
        if ( !$target.data('focusable') ) {
            if ( !$.isFocusable($target) ) {
                $target.attr('tabindex', -1);
            }
            $target.data('focusable', true);
        }
        $target.focus();
    }

    $.skipToCotents = function(wrapper) {
        // 1.
        // 검증
        if ( !$.jquery && $.type(wrapper) !== 'string' ) {
            throw new Error('전달인자는 문자열 또는 jQuery 인스턴스여야 합니다.');
        }

        // 2.
        // wrapper 요소 내부 a에 이벤트 핸들링
        var $wrapper = wrapper.jquery ? wrapper || $(wrapper);
        $wrapper.find('a').addClass('a11y-hidden');
        $wrapper.on('click', 'a', _skipToContents);
    };

    $.fn.skipToCotents = function() {
        $.skipToCotents(this);
    };

})(this, this.jQuery);
```

-

#### jquery.fn.radioCheckbox.js

http://codepen.io/akikoo/pen/jhbCg

```js

```

-

#### jquery.fn.ripple.js

http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design

```js
```
-

#### jquery.fn.a11y.tabs.js

http://heydonworks.com/practical_aria_examples/

```js
```
 -->
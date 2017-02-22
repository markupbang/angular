/*! yamoo9.ui.button.js © yamoo9.net, 2016 */
(function(ui){
    'use strict';

    // 의존성 관리
    var dom = $namespace('yamoo9.dom');

    // console.log(window.yamoo9, ui);

    ui.Button = function(selector, using_prevent_default) {

        // 함수의 전달인자를 별도로 받지 않고,
        // 확인하는 방법? arguments

        // 개별 멤버(인스턴스 멤버)
        // this === window

        // 검증
        if (!selector || typeof selector !== 'string') {
            return;
        }

        // this는 생성된 객체를 가리킨다.
        // 단, new 생성자() 형태로 사용했을 경우에만...
        // new를 빼먹었을 때는 매우 위험한 결과를 초래!!!
        // new를 강제화하는 패턴을 사용하자.

        // new를 강제화 하는 패턴
        if ( !(this instanceof ui.Button) ) {
            return new ui.Button(selector, using_prevent_default);
        }

        // DOM API를 사용해서 대상(문서 객체를) 참조
        this.el = dom.query(selector);

        // 사용자가 특정하게 <a>의 기본동작 차단하고자 할 경우를
        // 제외하고는 차단하지 않도록 하겠다.
        // console.log(using_prevent_default);

        this.using_prevent_default = using_prevent_default || false;

        // if ( using_prevent_default ) {
        //     this.using_prevent_default = true;
        // } else {
        //     this.using_prevent_default = false;
        // }

        // 초기화 수행
        this.init();

    };

    // 외부에서는 접근이 불가능한 비공개 멤버 선언
    function preventDefalutAnchor() {
        this.addEventListener('click', function(e) {
            // 기본 동작 차단
            e.preventDefault();
        });
    }

    // 공통 멤버(인스턴스 멤버)
    ui.Button.prototype = {
        'constructor': yamoo9.ui.Button,
        'version': '0.0.1',
        'init': function() {
            // this === 생성된 객체 인스턴스
            // this.el === 참조된 문서 객체
            this.el.classList.add('yamoo9-ui--button');
            this.el.setAttribute('role', 'button');
        },
        'on': function(type, callback) {
            var el = this.el;
            if (this.using_prevent_default && el.nodeName === 'A') {
                preventDefalutAnchor.call(el);
            }
            el.addEventListener(type, callback);
        }
    };

})( $namespace('yamoo9.ui') );
/*! jquery.plugin.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    // 개발 하고자하는 플러그인 코드 작성
    // 플러그인이란?
    // jQuery.prototype 객체에 멤버를 추가하는 것을 말함.
    // 별칭: jQuery.fn === jQuery.prototype
    // 별칭: $ === jQuery
    // 플러그인 개발 시에 $.fn 객체를 확장한다.

    // 플러그인 이름
    var plugin_name = 'marking',
        defaults = {
            'colorlist': [
                '#E22885',
                '#BC216F',
                '#8E1853',
                '#560D32',
                '#230414'
            ],
            'role': 'heading'
        },
        reverse_count, middle_count;
        // reverse_count = colorlist.length, // 5
        // middle_count = Math.ceil(reverse_count/2); // 3

        // console.log(reverse_count, middle_count);

    // 1.
    // 점 표기법(Dot Syntax)
    // $.fn.emphasize = function() {
    // 2.
    // 대괄호 표기법
    $.fn[plugin_name] = function( options ) {

        // 전달받거나, 제작자가 기본적으로 설정해놓은 colorlist_default를 사용한다.
        // colorlist     = colorlist || colorlist_default;
        var setting;
        if (options && $.type(options) === 'object') {
            setting = $.extend(defaults, options);
        } else {
            setting = defaults;
        }

        reverse_count = setting.colorlist.length, // 5
        middle_count  = Math.ceil(reverse_count/2); // 3

        // console.log(colorlist, reverse_count, middle_count);

        // return $.each(this, $.proxy(function(index) {
        //     // this === jQuery 인스턴스 객체
        //     var $this = this.eq(index);
        //     // 플러그인 코드 작성
        // }), this);



        // 플러그인 내부에서 this가 참조하는 객체는 무엇인가?

        // 플러그인이 적용된 jQuery 인스턴스 객체
        // console.log( this.jquery );
        // jQuery 인스턴스 객체에서 벗어나
        // DOM 객체를 반환한다.

        // 노드 리스트
        // console.log( this.get() );
        // 노드
        // console.log( this[0] );
        // console.log( this.get(0) );

        // this는 jQuery 인스턴스 객체(리스트) 순환 방식
        // this.each(function(idx, el) {
        //     console.log(el);
        // });

        // $.each() 메소드 사용 방식
        // $.each(this, function(idx, el) {
        //     console.log(el);
        // });

        // 플러그인 내부에서 this 만 사용하면
        // 연결된 모든 $(DOM Element) 객체에
        // 동일한 결과를 처리한다.
        var $this = this;

        // $.each() 사용해서 플러그인 개발
        // return을 사용하는 이유는 메소드 체이닝
        return $.each($this, function(index, el) {
            var _$this = $this.eq(index);
            _$this.css({
                'background-color': setting.colorlist[index],
                // 'color': '#fff'
                'color': setting.colorlist[ reverse_count-- !== middle_count ? reverse_count : 0 ],
                'padding': '1rem'
            }).attr({
                'data-assigned-index': plugin_name + '_' + ++index,
                'data-assigned-plugin': plugin_name,
                'role': setting.role
            });
            // console.log( reverse_count );
        });

        // // 개별 적용을 위해 each()를 사용한다.
        // // this.each()를 반환해야만 jQuery 메소드 체이닝이 가능하다.
        // return $this.each(function(index, el) {

        //     // 미션 2.
        //     // 컬러리스트를 생성한다.
        //     // 플러그인이 연결된 문서 객체를 순환할 때 마다
        //     // 컬러리스트 원소를 빼내와서 배경 색상으로 할당한다.

        //     // console.log(this === el);
        //     $this.eq(index)
        //     // $(el)
        //         .css('background-color', colorlist[index])
        //         .attr({
        //             'data-assigned-index': plugin_name + '_' + ++index,
        //             // 'data-assigned-plugin': plugin_name,
        //             'role': 'heading'
        //         });
        //     // .attr('data-assigned-plugin', plugin_name)
        //     // // WAI-ARIA 활용
        //     // .attr('role', 'heading');
        // });

    };

    // 2.
    // 대괄호 표기법
    // var plugin_name = 'emphasize';

    // $.fn[plugin_name] = function() {

    // };

})(this, this.jQuery);
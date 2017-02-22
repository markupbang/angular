/*
 * require.js 환경설정 객체
 * http://requirejs.org/docs/api.html#config
 */
require.config({

    // 기본 위치 지정
    baseUrl: '/js',

    // 모듈 단축 경로 지정 또는 이름 별칭(Alias) 지정
    paths: {
        'lib': '../lib' // "/js/lib" 과 동일하다. baseUrl 기준
    },

    // AMD를 지원하지 않는 외부 라이브러리 모듈 사용을 위한 Shim 설정
    shim: {

        // Modernizr 라이브러리
        'modernizr': {
            exports: 'Modernizr'
        }
    },

    // 모듈 위치 URL 뒤에 덧붙여질 쿼리를 설정한다.
    // 개발 환경에서는 브라우저 캐시를 회피하기 위해 사용할 수 있고,
    // 실제 서비스 환경이라면 ts값을 배포한 시간으로 설정하여 새로 캐시하게 할 수 있다.
    // urlArgs : 'ts=' + (new Date()).getTime()
});
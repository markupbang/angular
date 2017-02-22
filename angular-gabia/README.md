# angular-gabia
First share


[node 버전은 4.4.6 입니다.](https://angularjs.org/img/AngularJS-large.png)
이후 버전에서는 npm install 하시면 npm 모듈 전부 받아집니다.

node 버전 다운그레이드는 nvm 설치하시고 다운그레이드 하면 됩니다.

어제 파일 받으신 후에 터미널에서 npm 설치,bower 설치

> npm install<br>
> bower install

그럼 src 폴더의 bower_components > bootstrap > bower.json 파일에서 main안의 내용을 쓰고자 하는 경로로 변경해 주세요.

실습 파일에서는<br>
dist/css/bootstrap.min.css<br>
dist/css/bootstrap-theme.min.css<br>
dist/js/bootstrap.js<br>
위 파일들을 선언해주면 됩니다.

"main": [<br>
    "dist/css/bootstrap.min.css",<br>
    "dist/css/bootstrap-theme.min.css",<br>
    "dist/js/bootstrap.js"<br>
],

위에 bower는 css,js를 불러오기 위해 사용되었습니다.
index.html 보면 

> <! -- bower:css --><br>
> <! -- bower:js -->

위 처럼 선언되어진 부분에 bower_components에 있는 모듈의 css와 js가 주입되게 됩니다.<br>
작업자가 각각 추가하지 않아도 자동주입 됩니다.

#### http-server 사용
https://www.npmjs.com/package/http-server ('https://www.npmjs.com/package/http-server')

#### 스크립트 명령어 지정
터미널에서 폴더로 이동후 npm run server 실행
여기서 server 명령어는 package.json에서 지정해준 명령어이다.
마음대로 지정할 수 있다.

*****
"scripts": {
	"server": "http-server -a localhost -p 9090 -o"
}
*****

#### JSON DATA 객체화
JSON DATA를 객체화 시켜 컨트롤러를 각각 작성하지 않아도 된다.
###### Fast Campus ─ Front-End AngularJS CAMP

# DAY08

### 웹 서버 구동 명령어

```sh
# Node.js 설치 유무 확인
$ node --version
# NPM 버전 확인
$ npm -v
# http-server 모듈 전역 설치 확인
$ npm list --global http-server
# http-server 모듈 전역 설치
$ npm install -g http-server
# http-server 서버 구동 명령어
$ http-server -o -a localhost -p 9090
```

---

### 코드 재사용 패턴

#### $class

```js
function $class(props, SuperClass) {
    'use strict';
    var Class, F, prop;
    // 1. 생성자
    Class = function () {
        // 1.1 Class.__super__ 존재 유무확인, Class.__super__.__construct 속성 유무 확인
        if ( Class.__super__ && Class.__super__.hasOwnProperty('__construct') ) {
            Class.__super__.__construct.apply(this, arguments);
        }
        // 1.2 Class.__super__.__construct 속성 유무 확인
        if ( Class.prototype.hasOwnProperty('__construct') ) {
            Class.prototype.__construct.apply(this, arguments);
        }
    };

    // 2. 상속
    if (SuperClass) {
        F = function(){};
        F.prototype = SuperClass.prototype;
        Class.prototype = new F();
        Class.__super__ = SuperClass.prototype;
        Class.prototype.constructor = Class;
    }

    // 3. 속성 설정
    for( prop in props) {
        if ( props.hasOwnProperty(prop) ) {
            Class.prototype[prop] = props[prop];
        }
    }

    // 4. 클래스 반환
    return Class;
}
```

[![아이언맨(마블 시네마틱 유니버스)/슈트](https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpa1/t31.0-8/10655154_10152290650687344_6516416035364019991_o.jpg)](https://namu.wiki/w/%EC%95%84%EC%9D%B4%EC%96%B8%EB%A7%A8(%EB%A7%88%EB%B8%94%20%EC%8B%9C%EB%84%A4%EB%A7%88%ED%8B%B1%20%EC%9C%A0%EB%8B%88%EB%B2%84%EC%8A%A4)/%EC%8A%88%ED%8A%B8?from=%EC%95%84%EC%9D%B4%EC%96%B8%EB%A7%A8%20%EC%88%98%ED%8A%B8%2F%EB%A7%88%EB%B8%94%20%EC%8B%9C%EB%84%A4%EB%A7%88%ED%8B%B1%20%EC%9C%A0%EB%8B%88%EB%B2%84%EC%8A%A4)

```js
// Mk1
// - 탑승자: 토니 스타크(Tony Stark)
// - 재질: 강철
// - 능력: [ 화염방사기(flame thrower), 미사일(missile, 소형 로켓(mini rocket)) ]
var MK1 = $class({
    '__construct': function(passenger) {
        this.passenger = passenger || 'Tony Stark';
    },
    'ability': [ 'flame thrower', 'missile' ],
    'flame': function() {
        console.log( this.ability[0] + ' - 파이어!!' );
        return this;
    },
    'shot': function() {
        console.log( this.ability[1] + ' - 발사!!' );
        return this;
    }
});

// MK2
// - 탑승자: 토니 스타크(Tony Stark)
// - 재질: 강철
// - 능력: [ 인공지능(A.I, Jarvis), 비행(flying), 리펄서건(Repulsor Beam) ]
var MK2 = $class({
    '__construct': function(passenger) {
        var that = this, ability = [ 'A.I Jarvis', 'flying', 'repulsor beam' ];
        ability.forEach(function(ab){
            that.constructor.__super__.ability.push(ab);
        });
    },
    'beam': function() {
        console.log( this.passenger + ' - 빔!!' );
        return this;
    },
    'fly': function() {
        console.log( this.passenger + ' - 날다!!' );
        return this;
    },
    'jarvis': function(method) {
        console.log( 'My Name is Jarvis. What cam I help you?' );
        if (this[method]) {
            console.log( 'O.K! I run ' + method + '.' );
            this[method]();
        } else {
            console.log( 'Sorry! I don\'t ' + method + '.' );
        }
        return this;
    }
}, MK1);
```

-

#### 프로토타입(Prototype) 상속

```js
// 생성자 함수를 전달할 경우, 처리되는 응용 헬퍼 함수
// o ← 생성자 함수
// ※ 생성자 함수의 속성 + 프로토타입 객체 속성(공통) 모두 상속
function makeObj( o ) {
    var _f = function(){};
    _f.prototype = o.prototype;
    return new _f();
}

// 프로토타입을 전달할 경우, 처리되는 응용 헬퍼 함수
// o ← 생성자 함수의 프로토타입 객체
// ※ 프로토타입 객체 속성(공통)만 상속
function makeObj( o ) {
    var _f = function(){};
    _f.prototype = o;
    return new _f();
}

// 전달된 인자의 유형에 따라 처리되는 응용 헬퍼 함수
// 생성자 함수, 프로토타입 모두 적용 가능
// ※ 인자에 따라 생성자 함수의 속성까지 상속 받을지 유무 결정
function makeObj( o ) {
    var _f = function(){};
    _f.prototype = typeof o === 'function' ? o.prototype : o;
    return new _f();
}
```

-

### 속성 복사를 통한 상속 패턴

```js
// 얕은 복사 (Shallow Copy)
function extend(parent, child) {
    child = child || {};
    for ( var prop in parent ) {
        if ( parent.hasOwnProperty( prop ) ) {
            child[prop] = parent[prop];
        }
    }
    return child;
}

// 깊은 복사 (Deep Copy)
// 배열, 객체일 경우
function extendDeep(parent, child) {
    child = child || {};
    for ( var prop in parent ) {
        if ( parent.hasOwnProperty( prop ) ) {
            if ( typeof parent[prop] === 'object' ) {
                child[prop] = parent[prop] instanceof Array ? [] : {};
                // 재귀함수 호출
                extendDeep( parent[prop], child[prop] );
            } else {
                child[prop] = parent[prop];
            }
        }
    }
    return child;
}
```

-

#### 믹스인(Mix-In)

```js
function extend(parent, child) {
    child = child || {};
    for(var key in parent) {
        if (parent.hasOwnProperty(key)) {
            child[key] = parent[key];
        }
    }
    return child;
}

function extendDeep(parent, child) {
    var key, value;
    child = child || {};
    for(key in parent) {
        if (parent.hasOwnProperty(key)) {
            value = parent[key];
            if (typeof value === 'object') {
                child[key] = Array.isArray(value) ? [] : {};
                extendDeep(value, child[key]);
            } else {
                child[key] = value;
            }
        }
    }
    return child;
}

function mixin() {
    // arguments
    var args = Array.prototype.slice.call(arguments),
        mixin_obj = {};
    args.forEach(function(arg, index) {
        mixin_obj = extendDeep( arg, mixin_obj );
    });
    return mixin_obj;
}
```

-

#### 메소드 빌려쓰기

```js
// bind() 헬퍼 함수
function bind(context, callback) {
    return function() {
        var args = Array.prototype.slice(arguments);
        callback.apply(context, args);
    };
}
```

```js
(function(){
    'use strict';
    var slice = Array.prototype.slice;
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(context) {
            var that = this,
                args = slice.call(arguments, 1);
            return function() {
                return that.apply(context, args.concat(slice.call(arguments)));
            };
        };
    }
}());
```

---

### 디자인(Design) 패턴

널리 사용되는 몇 가지 디자인 패턴

- ##### 생성(Creational) 패턴
    - **생성자(Constructor)**
    <br>생성자를 사용하여 객체를 생성하는 패턴
    - **프로토타입(Prototype)**
    <br>프로토타입을 사용하여 객체를 생성하는 패턴
    - **싱글톤(Singleton)**
    <br>단일 인스턴스 객체를 생성하는 패턴
    - **팩토리(Factory)**
    <br>객체 타입을 문자열로 지정해 객체를 생성하는 패턴

- ##### 구조(Structure) 패턴
    - **장식자(Decorator)**
    <br>사전에 정의된 장식자 객체를 사용해 실행 중에 객체에 기능을 추가하는 패턴
    - **퍼사드(Ferçade)**
    <br>자주 사용되는(설계가 완전하지 않은) 메소드를 좀 더 사용하기 편리한 메소드로 변경하는 패턴
    - **프록시(Proxy)**
    <br>객체를 감싸 객체에 대한 접근을 제한한 후, 필요할 경우만 실행하게 하는 패턴

- ##### 행동(Behavior) 패턴
    - **감시자(Opserver)**
    <br>특정 이벤트를 감시하고 있는 모든 감시자들에게 이벤트가 발생했음을 알려주는 패턴
    - **중재자(Mediator)**
    <br>객체들 간에 직접 통신하지 않고 오직 중재자 객체를 통해서만 통신하는 패턴
    - **반복자(Iterator)**
    <br>복잡한 데이터 구조를 순회하거나 순차적으로 이동하는 패턴
    - **전략(Strategy)**
    <br>인터페이스를 동일하게 유지하면서 지정된 작업(컨텍스트)을 처리하기 위한 최선의 전략을 선택하는 패턴
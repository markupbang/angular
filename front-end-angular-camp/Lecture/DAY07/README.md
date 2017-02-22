###### Fast Campus ─ Front-End AngularJS CAMP

# DAY07

### 1. Javascript 패턴 요약

#### Javascript 안티패턴(Anti-Patterns)

1. 전역(Global Scope)을 가급적 오염시키지 말아라.
1. 느슨한 비교(==)가 아닌, 엄격한 비교(===)를 행하라.
1. 반복(Loop) 구문에서 중복(Repeat)되는 것을 캐시(Cache)하라.
1. 네이티브 데이터 유형의 경우, 생성자 함수(Constructor Function)를 통해 객체를 생성하지 말아라.
1. 잘못 설계된 typeof, instanceof와 객체가 아닌 것을 판별할 수 없는 constructor 사용에 주의하라.
1. 약속(표준 예약)된 바 없는 네이티브 생성자의 프로토타입 객체를 임의로 확장하지 말아라.

-

#### Javascript 패턴

- 모듈(객체 생성) 패턴
    - 네임스페이스(Namespace) 패턴
    - 즉시실행함수(IIFE) + 클로저(Closure) 패턴
    - 샌드박스(Sandbox) 패턴
    - 초기화(Initialization) 패턴
    - 체이닝(Chaining) 패턴

- 코드 재사용(Code Reusable) 패턴
    - 클래스(Class) 패턴
    - 프로토타입(Prototype) 패턴
    - 속성 복사(Copying Properties) 패턴
    - 믹스인(Mixin) 패턴
    - 메소드 빌려쓰기(Borrowing Method) 패턴

- 디자인(Design) 패턴
    - 생성(Creational) 패턴
    - 구조(Structure) 패턴
    - 행동(Behavior) 패턴

-

### 2. 코드 재사용 패턴

##### 1. 클래스 방식 vs 클래스가 아닌 방식

##### 2. 클래스 방식 상속을 흉내내기
```js
부모의 능력을 자식에게 물려준다. (코드 재사용)
```

##### 3. 클래스 방식 패턴 #1 - 기본 패턴
```js
Child.prototype = new Parent()
```

##### 4. 클래스 방식 패턴 #2 - 생성자 빌려쓰기
```js
function Child() {
    Parent.apply(this, arguments);
}
```

##### 5. 클래스 방식 패턴 #3 - 생성자 빌려쓰기 + 프로토타입 지정
```js
function Child() {
    Parent.apply(this, arguments);
}
Child.prototype = new Parent();
```

##### 6. 클래스 방식 패턴 #4 - 프로토타입 공유
```js
function inherit(Parent, Child) {
    Child.prototype = Parent.prototype;
}
```

##### 7. 클래스 방식 패턴 #5 - 임시 생성자
```js
function inherit(Parent, Child) {
    var F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.prototype.__super__ = Parent.prototype;
}
```
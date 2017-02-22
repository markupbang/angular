/*! ajax-mixin-make-model-obj.js © yamoo9.net, 2016 */

// To Do
// 1. 비동기 통신 <- Feçade Pattern

var Ajax = $class({
    '__construct': function(path, callback, method) {
        method = method || 'GET';
        this.xhr = new XMLHttpRequest();
        this.xhr.open(method, path);
        this.xhr.send();
        this.then(callback);
    },
    'then': function(callback) {
        this.xhr.onreadystatechange = function() {
            if (this.status === 4 && this.readyState === 200) {
                callback();
            }
        }
    }
});

// var ajax = new Ajax();

// 2. 모델 인스턴스를 생성할 객체
// 3. 모델 인스턴스가 처리할 메소드를 정의
// 4. 저장할 공간은 localStorage

// 모델 생성자(클래스, Data)
// 데이터 읽기(read)
// 데이터 쓰기(write)
// 데이터 저장(save)
// 데이터 초기화(clear)

var Model = $class({
    '__construct': function(path) {
        this.path = path || '';
        this.data = null;
        // 비동기 통신을 수행해서
        // 통신 결과를 this.data에 할당
    },
    'read': function() {
        // 데이터 읽어오기
        this.data = new Ajax(this.path);
        return this.data;
    },
    'write': function(data) {
        // 데이터 쓰기
        this.data = data;
    },
    'save': function() {
        // 데이터 저장 (at localStorage)
        localStorage.setItem()
    },
    'clear': function() {
        // 데이터 모두 지움
    }
});

var composite = new Model('data/dataA.json');
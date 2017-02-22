/*! ironman.js © yamoo9.net, 2016 */

// Iron Man Suite - Class Pattern
// 참고 URL: https://goo.gl/pTqssM
// MK1, MK2

// MK1 모델 설계
// 탑승자(passenger) 기본 값(Tony Stark), 사용자 탑재 가능
// 능력(ability): [ 화염방사기(flame thrower), 미사일(missile, 소형 로켓(mini rocket)) ]
// 메소드: fire(), shot()

// MK1 클래스 정의
var MK1 = $class({
    '__construct': function(passenger) {
        // 아이언맨 슈트에 탑승하는 사람을 정의
        // 만약 탑승자가 설정되어 있지 않다면
        // Tony Stark가 기본적으로 탑승한다.
        this.passenger = passenger || 'Tony Stark';
    },
    'ability': [ 'flame thrower', 'missile' ],
    'fire': function(count) {
        count = count || 1;
        var process = this.passenger + '가 ' + this.ability[0] + '를 '+ count +'번 쐈다!';
        console.log(process);
        // 체이닝(연결) 패턴
        return this;
    },
    'shot': function(count) {
        count = count || 1;
        var process = this.passenger + '가 ' + this.ability[1] + '을 '+ count +'번 발사했다!';
        console.log(process);
        return this;
    }
});

// MK1 클래스 인스턴스 생성
// var ironman_mk1 = new MK1('야무'); // 탑승자 옵션 설정: 'yamoo9'


// MK2 모델 설계 (MK1 상속)
// 탑승자 기본 값(Tony Stark), 사용자 탑재 가능
// 추가된 능력: [ 인공지능(A.I, Jarvis), 비행(flying), 리펄서 건(Repulsor Beam) ]
// 메소드: jarvice(), flying(), beam()

var MK2 = $class({
    '__construct': function(abilities, passenger) {
        // console.log(this.ability.concat( (abilities || []) ));
        this.ability = this.ability.concat( (abilities || []) );
        // passenger && (this.passenger = passenger);
        if (passenger) {
            this.passenger = passenger;
        }
    },
    'jarvice': function(method, arg) {
        console.log('Hello, I\'m Jarvis. What can I Help you?');
        if ( this[method] ) {
            console.log('O.K, I can your Command ' + method + '!');
            this[method](arg);
        } else {
            console.log('Sorry, I can\'t your Command ' + method + '.');
        }
    },
    'flying': function(min) {
        min = min || 10;
        var process = this.passenger + '가 '+ min +'분 만큼 나는데 성공하다!';
        console.log(process);
        return this;
    },
    'beam': function(count) {
        count = count || 1;
        var process = this.passenger + '가 리펄서 건(Repulsor Beam) '+ count +'번 쏘았다!';
        console.log(process);
        return this;
    }
}, MK1);

var ironman_mk2 = new MK2(['Jarvis', 'flying', 'Repulsor Beam'], 'yamoo9');
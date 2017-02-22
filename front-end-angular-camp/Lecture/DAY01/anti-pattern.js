// 탭 객체 인스턴스 생성 함수
function initTab() {

    // 생성자 함수를 통해 탭 객체 인스턴스를 생성
    var myTab   = new Tab('.my-tab'),
        yourTab = new Tab('.your-tab'),
        ourTab  = new Tab('.our-tab');

    // 생성된 객체 인스턴스의 메소드 사용
    myTab.init();
    yourTab.nextTab();
    ourTab.autoSliding();

    // 생성된 객체 인스턴스 확인
    console.dir( myTab );

}

// 객체 생성 시점(Event)
// 문서가 모두 해석되어서 DOM이 완성이 되면... 실행
document.addEventListener('DOMContentLoaded', initTab);

// .
// .
// .
// .
// .

// 다른 누군가 작성한 코드...
// 아래 코드 주석을 해제하면 오류가 발생합니다. (전역에 동일한 이름의 변수가 있어 코드가 충돌)
// 전역에 동일한 변수 이름을 사용함으로서 기존 코드가 오류가 발생할 확률이 큽니다.
// 우리가 공부한 첫 번째 안티 패턴은 '전역을 오염시키는 행위'입니다.
// 전역에 변수를 선언하는 것은 충돌이 야기되므로 가급적 전역을 오염시키지 않아야 합니다.
// var Tab = ['.my-tab', '.your-tab', '.our-tab'];
// function Tab(){}


// STEP 1
// 동일한 문서객체를 한 번 이상 가져오는 것은 많은 비용이 들기에 비효율적이다.
for( var i = 0, i < document.querySelectorAll('nav a').length; i+=1 ) {
    console.log( document.querySelectorAll('nav a')[i] );
}


// SETP 2
// 찾아온 문서객체를 변수에 참조했지만... 반복문이 돌 때 마다
// length 속성 값을 다시 알아오는 것은 비효율적이다.
for( var i = 0, links = document.querySelectorAll('nav a'); i<links.length; i+=1 ) {
    console.log( links[i] );
}

// STEP 3
// 문서객체를 변수에 데이터를 캐시해서 재사용할 뿐 아니라
// length 속성 값 역시 캐시해서 재사용한다.
var i     = 0,
    links = document.querySelectorAll('nav a'),
    l     = links.length;

for( ; i<l; i+=1 ) {
    console.log( links[i] );
}

// STEP 4
// 변수를 2개만 사용할 뿐 아니라,
// i 값을 0과 비교하여 참 값일 때만 처리하기 때문에 속도가 빨라진다.
var links = document.querySelectorAll('nav a'),
    i     = links.length;

for( ; i-=1; ) {
    console.log( links[i] );
}
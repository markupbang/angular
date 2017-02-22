/**
 * --------------------------------
 * 클래스 방식의 상속 패턴 #1 - 기본 패턴
 * 클래스 방식의 상속 패턴 #2 - 생성자 빌려쓰기
 * ----------------------------- */
// Wordpress
//     - Static  - Page
//     - Dynamic - Blog

// Article 부모 생성자
var Article = function(name) {
    this.name = name || '아티클';
    this.tags = ['html', 'css'];
};
// Article 부모 생성자의 프로토타입 멤버 추가
Article.prototype.read = function() {
    return this.name;
};
Article.prototype.addTag = function(tag) {
    return this.tags.push(tag);
};

// 아티클 객체 생성
var article = new Article();

// --------------------------------------------
// 1. 기본 패턴 예
var BlogPost = function() {

};

// 상속
// $inherit(Article, BlogPost);
BlogPost.prototype = article;

// 블로그 객체를 생성
var blog = new BlogPost();



// --------------------------------------------
// 2. 생성자 빌려쓰기 패턴 예
// 프로토타입을 상속하지 않음.
var StaticPage = function() {
    Article.apply(this, arguments);
}

// 페이지 객체 생성
var page = new StaticPage();


// 각 패턴의 차이점 확인
// console.log( 'article.name: ', article.name, article.hasOwnProperty('name') );
// console.log( 'blog.name: ', blog.name, ', 기본 패턴 사용 예: ', blog.hasOwnProperty('name') );
// console.log( 'page.name: ', page.name, ', 생성자 빌려쓰기 패턴 사용 예: ', page.hasOwnProperty('name') );

// 각 속성 값을 수정했을 때의 결과는?

console.log( 'article.tags: ', article.tags ); // ['html', 'css']

// console.log(blog);

// blog.addTag('javascript');
blog.tags.push('javascript');
console.log( 'blog.tags: ', blog.tags ); // ['html', 'css', 'javascript']

page.tags.push('JSON');
console.log( 'page.tags: ', page.tags ); // ['html', 'css', 'JSON']

console.log(article.tags); // ?????
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! app.js © yamoo9.net, 2016 */
'use strict';

/**
 * --------------------------------
 * 모듈 로드
 * ----------------------------- */
require('./modernizr-custom');

// AngularJS 모듈 로드
require('./modules/PersonListApp');
require('./modules/ScopeStudy');
},{"./modernizr-custom":5,"./modules/PersonListApp":6,"./modules/ScopeStudy":7}],2:[function(require,module,exports){
/*! PersonDetailController.js © yamoo9.net, 2016 */
'use strict';

var app = angular.module('PersonListApp');

// Angular의 모듈에 컨트롤러 함수 등록
app.controller('PersonDetailController', ['$scope', 'PersonsService', PersonDetailControllerFn]);

// 컨트롤러 함수 정의
function PersonDetailControllerFn ($scope, PersonsService) {
  // 서비스 객체를 $scope의 속성에 할당(참조)하여 동적으로 변경되는 것을 처리.
  $scope.service = PersonsService;

  // 아래 코드는 로드 되었을 때 1회만 실행된다.
  // $scope.selectedPerson = PersonsService.selectedPerson;
}
},{}],3:[function(require,module,exports){
/*! PersonListController.js © yamoo9.net, 2016 */
'use strict';

var app = angular.module('PersonListApp');

app.controller('PersonListController', ['$scope', 'PersonsService', function($scope, PersonsService){

    $scope.PersonsService = PersonsService;

    // 모델(데이터) 초기 값 설정
    // $scope.persons = [];
    $scope.persons = $scope.PersonsService.persons;
    // $scope.selectedIndex 속성의 초기값 설정
    $scope.selectedIndex = null;
    // $scope.selectedPerson 속성의 초기값 설정
    $scope.selectedPerson = null;
    // 사용자가 검색하는 이름/메일을 포함하는 객체 초기 설정
    $scope.search = '';
    // 정렬(order) 초기값 설정
    $scope.order = 'name';

    // 오더 설정 메소드
    $scope.setOrder = function(value) {
      $scope.order = value;
    };

    // 메소드의 역할: $scope.selectedIndex 속성 값을
    // 사용자가 클릭한 <tr>의 인덱스($index) 값으로 설정
    $scope.selectPerson = function(idx, person) {
      $scope.selectedIndex = idx;
      $scope.selectedPerson = person;
      $scope.PersonsService.selectedPerson = person;
      console.log($scope.PersonsService.selectedPerson);
    };

    $scope.sensitiveSearch = function(person) {
      // 초기 로드할 때는 거짓이 나오도록 설정
      if ( $scope.search ) {
        return person.name.first.indexOf($scope.search) === 0 ||
               person.name.last.indexOf($scope.search) === 0 ||
               person.gender.indexOf($scope.search) === 0 ||
               person.email.indexOf($scope.search) === 0;
      }
      // 처음 로드할 때는 모든 조건이 참.
      return true;
    };

    $scope.loadMore = function() {
      console.log('load more...');
    };

  }]);
},{}],4:[function(require,module,exports){
/*! PersonListFilters.js © yamoo9.net, 2016 */
var app = angular.module('PersonListApp');

/**
 * 10보다 작은 수 앞에는 '0'을 붙여주는 필터
 * @param  {number|string} 숫자/문자
 * @return {number|string} 숫자/문자
 */
app.filter('readingZero', function() {
  return function(num) {
    return num < 10 ? '0'+num : num;
  };
});
/**
 * 영문 첫글자를 대문자로 변경하여 처리하는 필터
 * @param  {string} 문자
 * @return {string} 문자
 */
app.filter('capitalize', function() {
  return function(input, dot) {
    if (!input) { return ''; }
    dot = dot ? '.' : '';
    return input.charAt(0).toUpperCase() + input.slice(1) + dot;
  };
});

app.filter('comma', function() {
  return function(str) {
    if (!str) { return ''; }
    return str + ',';
  };
});

app.filter('nation', function() {
  return function(nat) {
    if (!nat) {return ''}
    switch(nat) {
      case 'AU': return 'Australia';
      case 'BR': return 'Brazil';
      case 'CA': return 'Canada';
      case 'CH': return 'Switzerland';
      case 'DE': return 'Germany';
      case 'DK': return 'Denmark';
      case 'ES': return 'Spain';
      case 'FI': return 'Finland';
      case 'FR': return 'France';
      case 'GB': return 'United Kingdom';
      case 'IE': return 'Ireland';
      case 'IR': return 'Iran';
      case 'NL': return 'Netherlands';
      case 'NZ': return 'New Zealand';
      case 'TR': return 'Turkey';
      case 'US': return 'United States';
    }
  };
});
},{}],5:[function(require,module,exports){
!function(e,t,n){function r(e,t){return typeof e===t}function i(){var e,t,n,i,o,s,a;for(var d in b)if(b.hasOwnProperty(d)){if(e=[],t=b[d],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)s=e[o],a=s.split("."),1===a.length?T[a[0]]=i:(!T[a[0]]||T[a[0]]instanceof Boolean||(T[a[0]]=new Boolean(T[a[0]])),T[a[0]][a[1]]=i),w.push((i?"":"no-")+a.join("-"))}}function o(e){var t=E.className,n=T._config.classPrefix||"";if(N&&(t=t.baseVal),T._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}T._config.enableClasses&&(t+=" "+n+e.join(" "+n),N?E.className.baseVal=t:E.className=t)}function s(e,t){if("object"==typeof e)for(var n in e)C(e,n)&&s(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),i=T[r[0]];if(2==r.length&&(i=i[r[1]]),"undefined"!=typeof i)return T;t="function"==typeof t?t():t,1==r.length?T[r[0]]=t:(!T[r[0]]||T[r[0]]instanceof Boolean||(T[r[0]]=new Boolean(T[r[0]])),T[r[0]][r[1]]=t),o([(t&&0!=t?"":"no-")+r.join("-")]),T._trigger(e,t)}return T}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):N?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function d(){var e=t.body;return e||(e=a(N?"svg":"body"),e.fake=!0),e}function l(e,n,r,i){var o,s,l,u,c="modernizr",f=a("div"),p=d();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=i?i[r]:c+(r+1),f.appendChild(l);return o=a("style"),o.type="text/css",o.id="s"+c,(p.fake?p:f).appendChild(o),p.appendChild(f),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),f.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",u=E.style.overflow,E.style.overflow="hidden",E.appendChild(p)),s=n(f,e),p.fake?(p.parentNode.removeChild(p),E.style.overflow=u,E.offsetHeight):f.parentNode.removeChild(f),!!s}function u(e,t){return!!~(""+e).indexOf(t)}function c(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function f(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(c(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+c(t[i])+":"+r+")");return o=o.join(" or "),l("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function p(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function m(e,t,i,o){function s(){l&&(delete A.style,delete A.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var d=f(e,i);if(!r(d,"undefined"))return d}for(var l,c,m,h,g,y=["modernizr","tspan"];!A.style;)l=!0,A.modElem=a(y.shift()),A.style=A.modElem.style;for(m=e.length,c=0;m>c;c++)if(h=e[c],g=A.style[h],u(h,"-")&&(h=p(h)),A.style[h]!==n){if(o||r(i,"undefined"))return s(),"pfx"==t?h:!0;try{A.style[h]=i}catch(v){}if(A.style[h]!=g)return s(),"pfx"==t?h:!0}return s(),!1}function h(e,t){return function(){return e.apply(t,arguments)}}function g(e,t,n){var i;for(var o in e)if(e[o]in t)return n===!1?e[o]:(i=t[e[o]],r(i,"function")?h(i,n||t):i);return!1}function y(e,t,n,i,o){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+k.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?m(a,t,i,o):(a=(e+" "+_.join(s+" ")+s).split(" "),g(a,t,n))}function v(e,t,r){return y(e,n,n,t,r)}function S(e,t){return e-1===t||e===t||e+1===t}var b=[],x={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){b.push({name:e,fn:t,options:n})},addAsyncTest:function(e){b.push({name:null,fn:e})}},T=function(){};T.prototype=x,T=new T;var C,w=[],E=t.documentElement,N="svg"===E.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;C=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),x._l={},x.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),T.hasOwnProperty(e)&&setTimeout(function(){T._trigger(e,T[e])},0)},x._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},T._q.push(function(){x.addTest=s});var z="Moz O ms Webkit",_=x._config.usePrefixes?z.toLowerCase().split(" "):[];x._domPrefixes=_;N||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=w.elements;return"string"==typeof e?e.split(" "):e}function i(e,t){var n=w.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),w.elements=n+" "+e,l(t)}function o(e){var t=C[e[x]];return t||(t={},T++,e[x]=T,C[T]=t),t}function s(e,n,r){if(n||(n=t),g)return n.createElement(e);r||(r=o(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():b.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!i.canHaveChildren||S.test(e)||i.tagUrn?i:r.frag.appendChild(i)}function a(e,n){if(e||(e=t),g)return e.createDocumentFragment();n=n||o(e);for(var i=n.frag.cloneNode(),s=0,a=r(),d=a.length;d>s;s++)i.createElement(a[s]);return i}function d(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return w.shivMethods?s(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(w,t.frag)}function l(e){e||(e=t);var r=o(e);return!w.shivCSS||h||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),g||d(e,r),e}function u(e){for(var t,n=e.getElementsByTagName("*"),i=n.length,o=RegExp("^(?:"+r().join("|")+")$","i"),s=[];i--;)t=n[i],o.test(t.nodeName)&&s.push(t.applyElement(c(t)));return s}function c(e){for(var t,n=e.attributes,r=n.length,i=e.ownerDocument.createElement(N+":"+e.nodeName);r--;)t=n[r],t.specified&&i.setAttribute(t.nodeName,t.nodeValue);return i.style.cssText=e.style.cssText,i}function f(e){for(var t,n=e.split("{"),i=n.length,o=RegExp("(^|[\\s,>+~])("+r().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),s="$1"+N+"\\:$2";i--;)t=n[i]=n[i].split("}"),t[t.length-1]=t[t.length-1].replace(o,s),n[i]=t.join("}");return n.join("{")}function p(e){for(var t=e.length;t--;)e[t].removeNode()}function m(e){function t(){clearTimeout(s._removeSheetTimer),r&&r.removeNode(!0),r=null}var r,i,s=o(e),a=e.namespaces,d=e.parentWindow;return!z||e.printShived?e:("undefined"==typeof a[N]&&a.add(N),d.attachEvent("onbeforeprint",function(){t();for(var o,s,a,d=e.styleSheets,l=[],c=d.length,p=Array(c);c--;)p[c]=d[c];for(;a=p.pop();)if(!a.disabled&&E.test(a.media)){try{o=a.imports,s=o.length}catch(m){s=0}for(c=0;s>c;c++)p.push(o[c]);try{l.push(a.cssText)}catch(m){}}l=f(l.reverse().join("")),i=u(e),r=n(e,l)}),d.attachEvent("onafterprint",function(){p(i),clearTimeout(s._removeSheetTimer),s._removeSheetTimer=setTimeout(t,500)}),e.printShived=!0,e)}var h,g,y="3.7.3",v=e.html5||{},S=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,b=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,x="_html5shiv",T=0,C={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",h="hidden"in e,g=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){h=!0,g=!0}}();var w={elements:v.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:y,shivCSS:v.shivCSS!==!1,supportsUnknownElements:g,shivMethods:v.shivMethods!==!1,type:"default",shivDocument:l,createElement:s,createDocumentFragment:a,addElements:i};e.html5=w,l(t);var E=/^$|\b(?:all|print)\b/,N="html5shiv",z=!g&&function(){var n=t.documentElement;return!("undefined"==typeof t.namespaces||"undefined"==typeof t.parentWindow||"undefined"==typeof n.applyElement||"undefined"==typeof n.removeNode||"undefined"==typeof e.attachEvent)}();w.type+=" print",w.shivPrint=m,m(t),"object"==typeof module&&module.exports&&(module.exports=w)}("undefined"!=typeof e?e:this,t);var M=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return l("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();x.mq=M,T.addTest("cssall","all"in E.style);var k=x._config.usePrefixes?z.split(" "):[];x._cssomPrefixes=k;var j={elem:a("modernizr")};T._q.push(function(){delete j.elem});var A={style:j.elem.style};T._q.unshift(function(){delete A.style}),x.testAllProps=y,x.testAllProps=v,T.addTest("cssanimations",v("animationName","a",!0));var P=x._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];x._prefixes=P,T.addTest("csscalc",function(){var e="width:",t="calc(10px);",n=a("a");return n.style.cssText=e+P.join(t+e),!!n.style.length}),T.addTest("csschunit",function(){var e,t=j.elem.style;try{t.fontSize="3ch",e=-1!==t.fontSize.indexOf("ch")}catch(n){e=!1}return e}),function(){T.addTest("csscolumns",function(){var e=!1,t=v("columnCount");try{(e=!!t)&&(e=new Boolean(e))}catch(n){}return e});for(var e,t,n=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],r=0;r<n.length;r++)e=n[r].toLowerCase(),t=v("column"+n[r]),"breakbefore"!==e&&"breakafter"!==e&&"breakinside"!=e||(t=t||v(n[r])),T.addTest("csscolumns."+e,t)}();var I=e.CSS;T.addTest("cssescape",I?"function"==typeof I.escape:!1),T.addTest("cssexunit",function(){var e,t=j.elem.style;try{t.fontSize="3ex",e=-1!==t.fontSize.indexOf("ex")}catch(n){e=!1}return e});var W="CSS"in e&&"supports"in e.CSS,F="supportsCSS"in e;T.addTest("supports",W||F),T.addTest("cssfilters",function(){if(T.supports)return v("filter","blur(2px)");var e=a("a");return e.style.cssText=P.join("filter:blur(2px); "),!!e.style.length&&(t.documentMode===n||t.documentMode>9)}),T.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",i=0,o=P.length-1;o>i;i++)e=0===i?"to ":"",r+=t+P[i]+"linear-gradient("+e+"left top, #9f9, white);";T._config.usePrefixes&&(r+=t+"-webkit-"+n);var s=a("a"),d=s.style;return d.cssText=r,(""+d.backgroundImage).indexOf("gradient")>-1});var O=x.testStyles=l;T.addTest("hairline",function(){return O("#modernizr {border:.5px solid transparent}",function(e){return 1===e.offsetHeight})}),T.addTest("cssinvalid",function(){return O("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:invalid{width:50px}",function(e){var t=a("input");return t.required=!0,e.appendChild(t),t.clientWidth>10})}),T.addTest("cssmask",v("maskRepeat","repeat-x",!0)),T.addTest("csspointerevents",function(){var e=a("a").style;return e.cssText="pointer-events:auto","auto"===e.pointerEvents}),T.addTest("csspositionsticky",function(){var e="position:",t="sticky",n=a("a"),r=n.style;return r.cssText=e+P.join(t+";"+e).slice(0,-e.length),-1!==r.position.indexOf(t)}),T.addTest("csspseudoanimations",function(){var t=!1;if(!T.cssanimations||!e.getComputedStyle)return t;var n=["@",T._prefixes.join("keyframes csspseudoanimations { from { font-size: 10px; } }@").replace(/\@$/,""),'#modernizr:before { content:" "; font-size:5px;',T._prefixes.join("animation:csspseudoanimations 1ms infinite;"),"}"].join("");return T.testStyles(n,function(n){t="10px"===e.getComputedStyle(n,":before").getPropertyValue("font-size")}),t}),T.addTest("csstransitions",v("transition","all",!0)),T.addTest("csspseudotransitions",function(){var t=!1;if(!T.csstransitions||!e.getComputedStyle)return t;var n='#modernizr:before { content:" "; font-size:5px;'+T._prefixes.join("transition:0s 100s;")+"}#modernizr.trigger:before { font-size:10px; }";return T.testStyles(n,function(n){e.getComputedStyle(n,":before").getPropertyValue("font-size"),n.className+="trigger",t="5px"===e.getComputedStyle(n,":before").getPropertyValue("font-size")}),t}),T.addTest("cssreflections",v("boxReflect","above",!0)),T.addTest("cssremunit",function(){var e=a("a").style;try{e.fontSize="3rem"}catch(t){}return/rem/.test(e.fontSize)}),T.addTest("cssresize",v("resize","both",!0)),T.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&v("transform","scale(1)",!0)}),T.addTest("csstransforms3d",function(){var e=!!v("perspective","1px",!0),t=T._config.usePrefixes;if(e&&(!t||"webkitPerspective"in E.style)){var n,r="#modernizr{width:0;height:0}";T.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",O(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),T.addTest("cssvalid",function(){return O("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:valid{width:50px}",function(e){var t=a("input");return e.appendChild(t),t.clientWidth>10})}),O("#modernizr { height: 50vh; }",function(t){var n=parseInt(e.innerHeight/2,10),r=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).height,10);T.addTest("cssvhunit",r==n)}),O("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(t){var n=t.childNodes[2],r=t.childNodes[1],i=t.childNodes[0],o=parseInt((r.offsetWidth-r.clientWidth)/2,10),s=i.clientWidth/100,a=i.clientHeight/100,d=parseInt(50*Math.max(s,a),10),l=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).width,10);T.addTest("cssvmaxunit",S(d,l)||S(d,l-o))},3),O("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(t){var n=t.childNodes[2],r=t.childNodes[1],i=t.childNodes[0],o=parseInt((r.offsetWidth-r.clientWidth)/2,10),s=i.clientWidth/100,a=i.clientHeight/100,d=parseInt(50*Math.min(s,a),10),l=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).width,10);T.addTest("cssvminunit",S(d,l)||S(d,l-o))},3),O("#modernizr { width: 50vw; }",function(t){var n=parseInt(e.innerWidth/2,10),r=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).width,10);T.addTest("cssvwunit",r==n)}),T.addTest("customevent","CustomEvent"in e&&"function"==typeof e.CustomEvent),T.addTest("es6array",!!(Array.prototype&&Array.prototype.copyWithin&&Array.prototype.fill&&Array.prototype.find&&Array.prototype.findIndex&&Array.prototype.keys&&Array.prototype.entries&&Array.prototype.values&&Array.from&&Array.of)),T.addTest("es6collections",!!(e.Map&&e.Set&&e.WeakMap&&e.WeakSet)),T.addTest("es6math",!!(Math&&Math.clz32&&Math.cbrt&&Math.imul&&Math.sign&&Math.log10&&Math.log2&&Math.log1p&&Math.expm1&&Math.cosh&&Math.sinh&&Math.tanh&&Math.acosh&&Math.asinh&&Math.atanh&&Math.hypot&&Math.trunc&&Math.fround)),T.addTest("es6number",!!(Number.isFinite&&Number.isInteger&&Number.isSafeInteger&&Number.isNaN&&Number.parseInt&&Number.parseFloat&&Number.isInteger(Number.MAX_SAFE_INTEGER)&&Number.isInteger(Number.MIN_SAFE_INTEGER)&&Number.isFinite(Number.EPSILON))),T.addTest("es6object",!!(Object.assign&&Object.is&&Object.setPrototypeOf)),T.addTest("es6string",!!(String.fromCodePoint&&String.raw&&String.prototype.codePointAt&&String.prototype.repeat&&String.prototype.startsWith&&String.prototype.endsWith&&String.prototype.contains)),i(),o(w),delete x.addTest,delete x.addAsyncTest;for(var B=0;B<T._q.length;B++)T._q[B]();e.Modernizr=T}(window,document);
},{}],6:[function(require,module,exports){
// -----------------------------------------------------
// AngularJS 모듈 정의
// -----------------------------------------------------
angular.module('PersonListApp', ['infinite-scroll']);

// ------------------------------------------------------
// AngularJS 모듈 호출
// ------------------------------------------------------

// 컨트롤러
require('../controllers/PersonListController');
require('../controllers/PersonDetailController');

// 서비스
require('../services/PersonsService');
require('../services/PersonFactory');

// 필터
require('../filters/PersonListFilters');
},{"../controllers/PersonDetailController":2,"../controllers/PersonListController":3,"../filters/PersonListFilters":4,"../services/PersonFactory":8,"../services/PersonsService":9}],7:[function(require,module,exports){
/*! ScopeStudy.js © yamoo9.net, 2016 */
'use strict';

// AngularJS 모듈 정의
var app = angular.module('ScopeStudy', []);

// 정의 모듈에 컨트롤러 등록
app.controller('ParentController', ['$scope', parentFn]);
app.controller('ChildController', ['$scope', childFn]);

// 컨트롤러에 연결되는 함수 정의
// 부모 컨트롤러 함수
function parentFn($scope) {
  $scope.name = 'This is Parent Scope Property.';
  $scope.reset = function() {
    $scope.name = 'Reset Scope Property.';
  };
}

// 자식 컨트롤러 함수
function childFn($scope) {
  $scope.reset = function() {
    $scope.name = 'reset child scope Property';
  };
}
},{}],8:[function(require,module,exports){
/*! PersonFactory.js © yamoo9.net, 2016 */
'use strict';

var app = angular.module('PersonListApp');

app.factory('PersonFactory', ['$http', function($http) {

  // RESTFull Service
  // JSON
  // Client <- AJAX -> Server
  // $http 서비스 말고
  // ngResource 모듈 로드
  // $resource 서비스 쉽게 활용

  return function(page, count) {
    // 초기 값 설정
    page = page || 1;
    count = count || 20;
    // GET
    return $http.get('http://api.randomuser.me/?page='+page+'&results='+count);
  };

}]);
},{}],9:[function(require,module,exports){
/*! PersonsService.js © yamoo9.net, 2016 */
'use strict';

angular.module('PersonListApp').service('PersonsService', ['PersonFactory', function(PersonFactory){

  var _service = {

    'selectedPerson': null,
    'persons': [],

    'page': 1,
    'limit': 3,
    'count': 20,
    'hasMore': true,
    'isLoading': false,

    'loadPerson': function() {
      var _this = this;
      // 팩토리(함수) 실행
      // 비동기 통신을 통해 데이터를 받아와서 추가한다.
      if ( _this.hasMore && !_this.isLoading ) {
        PersonFactory(_this.page, _this.count).then(function(response) {
          angular.forEach(response.data.results, function(person) {
            _this.persons.push(person);
          })
        });
        _this.page += 1;
      }
    }
  };

  _service.loadPerson();

  // 비동기 데이터 로드
  // $http
  //   .get('/data/persons.json')
  //   .then(function(response) {
  //     angular.forEach(response.data.results, function(person){
  //       _service.persons.push(person);
  //     });
  //   });

  // 먼저 반환되었어도 객체가 반환되었기 때문에
  // 객체를 참조하게 되면 객체의 변경된 속성 값도 추후에 참조할 수 있다.
  return _service;

}]);
},{}]},{},[1]);

//# sourceMappingURL=app.bundle.js.map

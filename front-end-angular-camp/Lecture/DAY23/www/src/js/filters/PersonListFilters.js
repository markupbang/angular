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
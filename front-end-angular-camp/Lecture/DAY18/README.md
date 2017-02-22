###### Fast Campus ─ Front-End AngularJS CAMP

# DAY18

### 프로젝트 스타트킷(Project StartKit)

프론트엔드 개발 업무 자동화.

- Node.js | NPM | Bower 환경
- GulpJS 테스크 러너 활용
- Sass → CSS 프리프로세싱
- CSS Venders Prefix 자동 추가
- Browserify → JS 번들링
- 브라우저 싱크(Browser Sync): 실시간 변경 감지 및 브라우저 리로드

-

[project-startkit.zip](project-startkit.zip)

---

#### 0. HTML 인젝션(`wiredep`, `gulp-inject`) 주석 설정

Bower 또는 사용자 정의로 관리되는 파일들을 자동으로 HTML 문서에 주입힌다. `type` 값으로는 `css`, `js` 설정.

```html
<!-- bower:{type} -->
<!-- endbower -->
<!-- inject:{type} -->
<!-- endinject -->
```

-

#### 1. 커스텀 모더나이저 라이브러리 설치

- [gulp-modernizr](https://github.com/doctyper/gulp-modernizr)

[설치 이슈](https://github.com/doctyper/gulp-modernizr/issues/14) 확인 결과 아래와 같은 방법으로 설치.

```sh
$ npm cache clear
# npm install --save-dev {package}
$ npm i -D "gulp-modernizr@https://github.com/doctyper/gulp-modernizr/tarball/develop"
```

-

**gulp_tasks/custom-modernizr.js**

```js
/*! custom-modernizr.js © yamoo9.net, 2016 */
'use strict';

var gulp      = require('gulp');
var modernizr = require('gulp-modernizr');
var uglify    = require('gulp-uglify');
var config    = require('../gulp.config');

gulp.task('modernizr', ()=> {
  gulp.src(config.modernizr.src)
    .pipe(modernizr(config.modernizr.output_name, config.modernizr.options))
    .pipe(uglify())
    .pipe(gulp.dest(config.modernizr.output));
});
```

-

**gulp_tasks/default.js**

```js
/*! default.js © yamoo9.net, 2016 */
'use strict';

var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);

gulp.task('default', gulpsync.sync([
  'clear',
  'modernizr',
  ['browserify', 'sass'],
  'wiredep',
  'inject',
  'watch',
  'serve:dev'
]));
```

-

**gulp.config.js**

```js
/**
 * --------------------------------------------------------
 * gulp-modernizr 설정
 * https://github.com/Modernizr/customizr#config-file
 * -------------------------------------------------------- */
var setting_modernizr = {
  'src': src + 'js/app.js',
  'options': {
    // http://modernizr.com/download/
    'options' : [
        'addTest',
        // 'atRule',
        'domPrefixes',
        // 'hasEvent',
        // 'html5shiv',
        'html5printshiv',
        // 'load',
        'mq',
        // 'prefixed',
        // 'prefixes',
        // 'prefixedCSS',
        'setClasses',
        // 'testAllProps',
        // 'testProp',
        // 'testStyles'
    ],
    // https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json
    'tests': [
      'cssall',
      'cssanimations',
      'cssappearance',
      'cssbackdropfilter',
      'cssbackgroundblendmode',
      'cssbackgroundcliptext',
      'cssbackgroundposition-shorthand',
      'cssbackgroundposition-xy',
      'cssbackgroundrepeat',
      'cssbackgroundsize',
      'cssbackgroundsizecover',
      'cssborderimage',
      'cssborderradius',
      'cssboxshadow',
      'cssboxsizing',
      'csscalc',
      'csschecked',
      'csschunit',
      'csscolumns',
      'csscubicbezierrange',
      'cssdisplayrunin',
      'cssdisplaytable',
      'cssellipsis',
      'cssescape',
      'cssexunit',
      'cssfilters',
      'cssflexbox',
      'cssflexboxlegacy',
      'cssflexboxtweener',
      'cssflexwrap',
      'cssfontface',
      'cssgeneratedcontent',
      'cssgradients',
      'csshairline',
      'csshsla',
      'csshyphens',
      'cssinvalid',
      'csslastchild',
      'cssmask',
      'cssmediaqueries',
      'cssmultiplebgs',
      'cssnthchild',
      'cssobjectfit',
      'cssopacity',
      'cssoverflow-scrolling',
      'csspointerevents',
      'csspositionsticky',
      'csspseudoanimations',
      'csspseudotransitions',
      'cssreflections',
      'cssregions',
      'cssremunit',
      'cssresize',
      'cssrgba',
      'cssscrollbars',
      'cssshapes',
      'csssiblinggeneral',
      'csssubpixelfont',
      'csssupports',
      'csstarget',
      'csstextalignlast',
      'csstextshadow',
      'csstransforms',
      'csstransforms3d',
      'csstransformstylepreserve3d',
      'csstransitions',
      'cssuserselect',
      'cssvalid',
      'cssvhunit',
      'cssvmaxunit',
      'cssvminunit',
      'cssvwunit',
      'csswill-change',
      'csswrapflow',
      'custom-protocol-handler',
      'customevent',
      'es6array',
      'es6collections',
      'es6contains',
      'es6generators',
      'es6math',
      'es6number',
      'es6object',
      'es6promises',
      'es6string'
    ],
    'excludeTests': []
  },
  'output': src + 'js',
  'output_name': 'modernizr.custom.js'
};
```

-

#### 2. 의존 라이브러리 설치

Bower 패키지 매니저를 통해 프로젝트에 요구되는 라이브러리 설치.
일반적으로는 Sass, Browserify로 생성된 단일 파일로 해결하길 권장하지만, 상황에 따라 별도로 파일을 불러와야 할 경우 라이브러리 설치.
※ Bower 패키지 설치 이후, 자동으로 HTML 문서에 인젝션(주입) 된다.

- [**MeterializeCSS**: Material 디자인 기반의 최신 반응형 Front-End 프레임워크](http://materializecss.com/)
- [**animate.css**](http://daneden.github.io/animate.css/)

```sh
$ bower i -S materialize animate.css
```
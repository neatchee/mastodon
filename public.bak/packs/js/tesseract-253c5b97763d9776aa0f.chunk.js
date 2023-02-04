(window.webpackJsonp=window.webpackJsonp||[]).push([[334],{1404:function(t,e){t.exports=(t,e)=>`${t}-${e}-${Math.random().toString(16).slice(3,8)}`},1405:function(t,e){let r=!1;e.logging=r,e.setLogging=t=>{r=t},e.log=(...t)=>r?console.log.apply(this,t):null},1406:function(t,e,r){var n,o;n=function(){function t(){var t=arguments.length;if(0===t)throw new Error("resolveUrl requires at least one argument; got none.");var e=document.createElement("base");if(e.href=arguments[0],1===t)return e.href;var r=document.getElementsByTagName("head")[0];r.insertBefore(e,r.firstChild);for(var n,o=document.createElement("a"),a=1;a<t;a++)o.href=arguments[a],n=o.href,e.href=n;return r.removeChild(e),n}return t},void 0===(o="function"==typeof n?n.call(e,r,e,t):n)||(t.exports=o)},1494:function(t,e,r){const n=r(1404);let o=0;t.exports=({id:t,action:e,payload:r={}})=>{let a=t;return void 0===a&&(a=n("Job",o),o+=1),{id:a,action:e,payload:r}}},1495:function(t,e,r){const n=r(1627),o=r(1630),a=r(1494),{log:i}=r(1405),s=r(1404),{defaultOEM:c}=r(1631),{defaultOptions:l,spawnWorker:u,terminateWorker:p,onMessage:d,loadImage:f,send:h}=r(1632);let g=0;t.exports=(t={})=>{const e=s("Worker",g),{logger:r,errorHandler:y,...m}=n({...l,...t}),w={},b={};let v=u(m);g+=1;const E=(t,e)=>{w[t]=e},j=(t,e)=>{b[t]=e},x=({id:t,action:r,payload:n})=>new Promise(((o,a)=>{i(`[${e}]: Start ${t}, action=${r}`),E(r,o),j(r,a),h(v,{workerId:e,jobId:t,action:r,payload:n})}));return d(v,(({workerId:t,jobId:e,status:n,action:a,data:s})=>{if("resolve"===n){i(`[${t}]: Complete ${e}`);let r=s;"recognize"===a?r=o(s):"getPDF"===a&&(r=Array.from({...s,length:Object.keys(s).length})),w[a]({jobId:e,data:r})}else if("reject"===n){if(b[a](s),!y)throw Error(s);y(s)}else"progress"===n&&r(s)})),{id:e,worker:v,setResolve:E,setReject:j,load:t=>x(a({id:t,action:"load",payload:{options:m}})),writeText:(t,e,r)=>x(a({id:r,action:"FS",payload:{method:"writeFile",args:[t,e]}})),readText:(t,e)=>x(a({id:e,action:"FS",payload:{method:"readFile",args:[t,{encoding:"utf8"}]}})),removeFile:(t,e)=>x(a({id:e,action:"FS",payload:{method:"unlink",args:[t]}})),FS:(t,e,r)=>x(a({id:r,action:"FS",payload:{method:t,args:e}})),loadLanguage:(t="eng",e)=>x(a({id:e,action:"loadLanguage",payload:{langs:t,options:m}})),initialize:(t="eng",e=c,r)=>x(a({id:r,action:"initialize",payload:{langs:t,oem:e}})),setParameters:(t={},e)=>x(a({id:e,action:"setParameters",payload:{params:t}})),recognize:async(t,e={},r)=>x(a({id:r,action:"recognize",payload:{image:await f(t),options:e}})),getPDF:(t="Tesseract OCR Result",e=!1,r)=>x(a({id:r,action:"getPDF",payload:{title:t,textonly:e}})),detect:async(t,e)=>x(a({id:e,action:"detect",payload:{image:await f(t)}})),terminate:async()=>(null!==v&&(p(v),v=null),Promise.resolve())}}},1496:function(t,e){t.exports={TESSERACT_ONLY:0,LSTM_ONLY:1,TESSERACT_LSTM_COMBINED:2,DEFAULT:3}},1626:function(t,e,r){const n=r(1494),{log:o}=r(1405),a=r(1404);let i=0;t.exports=()=>{const t=a("Scheduler",i),e={},r={};let s=[];i+=1;const c=()=>Object.keys(e).length,l=()=>{if(0!==s.length){const t=Object.keys(e);for(let n=0;n<t.length;n+=1)if(void 0===r[t[n]]){s[0](e[t[n]]);break}}},u=(e,a)=>new Promise(((i,c)=>{const u=n({action:e,payload:a});s.push((async t=>{s.shift(),r[t.id]=u;try{i(await t[e].apply(this,[...a,u.id]))}catch(t){c(t)}finally{delete r[t.id],l()}})),o(`[${t}]: Add ${u.id} to JobQueue`),o(`[${t}]: JobQueue length=${s.length}`),l()}));return{addWorker:r=>(e[r.id]=r,o(`[${t}]: Add ${r.id}`),o(`[${t}]: Number of workers=${c()}`),l(),r.id),addJob:async(e,...r)=>{if(0===c())throw Error(`[${t}]: You need to have at least one worker before adding jobs`);return u(e,r)},terminate:async()=>{Object.keys(e).forEach((async t=>{await e[t].terminate()})),s=[]},getQueueLen:()=>s.length,getNumWorkers:c}}},1627:function(t,e,r){const n="browser"===r(1628)("type")?r(1406):t=>t;t.exports=t=>{const e={...t};return["corePath","workerPath","langPath"].forEach((r=>{void 0!==t[r]&&(e[r]=n(e[r]))})),e}},1628:function(t,e,r){(function(e){const n=r(1629);t.exports=t=>{const r={};return n()?r.type="electron":"object"==typeof window?r.type="browser":"function"==typeof importScripts?r.type="webworker":"object"==typeof e&&(r.type="node"),void 0===t?r:r[t]}}).call(this,r(303))},1629:function(t,e,r){(function(e){t.exports=function(){return"undefined"!=typeof window&&"object"==typeof window.process&&"renderer"===window.process.type||(!(void 0===e||"object"!=typeof e.versions||!e.versions.electron)||"object"==typeof navigator&&"string"==typeof navigator.userAgent&&navigator.userAgent.indexOf("Electron")>=0)}}).call(this,r(303))},1630:function(t,e){t.exports=t=>{const e=[],r=[],n=[],o=[],a=[];return t.blocks.forEach((i=>{i.paragraphs.forEach((e=>{e.lines.forEach((r=>{r.words.forEach((n=>{n.symbols.forEach((o=>{a.push({...o,page:t,block:i,paragraph:e,line:r,word:n})})),o.push({...n,page:t,block:i,paragraph:e,line:r})})),n.push({...r,page:t,block:i,paragraph:e})})),r.push({...e,page:t,block:i})})),e.push({...i,page:t})})),{...t,blocks:e,paragraphs:r,lines:n,words:o,symbols:a}}},1631:function(t,e,r){const n=r(1496);t.exports={defaultOEM:n.DEFAULT}},1632:function(t,e,r){const n=r(1633),o=r(1636),a=r(1637),i=r(1638),s=r(1639),c=r(1640);t.exports={defaultOptions:n,spawnWorker:o,terminateWorker:a,onMessage:i,send:s,loadImage:c}},1633:function(t,e,r){(function(e){const n=r(1406),{version:o,dependencies:a}=r(1634),i=r(1635);t.exports={...i,workerPath:void 0!==e&&"development"===e.env.TESS_ENV?n(`/dist/worker.dev.js?nocache=${Math.random().toString(36).slice(3)}`):`https://unpkg.com/tesseract.js@v${o}/dist/worker.min.js`,corePath:`https://unpkg.com/tesseract.js-core@v${a["tesseract.js-core"].substring(1)}/tesseract-core.${"object"==typeof WebAssembly?"wasm":"asm"}.js`}}).call(this,r(303))},1634:function(t){t.exports=JSON.parse('{"name":"tesseract.js","version":"2.1.1","description":"Pure Javascript Multilingual OCR","main":"src/index.js","types":"src/index.d.ts","unpkg":"dist/tesseract.min.js","jsdelivr":"dist/tesseract.min.js","scripts":{"start":"node scripts/server.js","build":"rimraf dist && webpack --config scripts/webpack.config.prod.js","profile:tesseract":"webpack-bundle-analyzer dist/tesseract-stats.json","profile:worker":"webpack-bundle-analyzer dist/worker-stats.json","prepublishOnly":"npm run build","wait":"rimraf dist && wait-on http://localhost:3000/dist/tesseract.dev.js","test":"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:* test:node:all","test:node":"nyc mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser-tpl":"mocha-headless-chrome -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:detect":"npm run test:browser-tpl -- -f ./tests/detect.test.html","test:browser:recognize":"npm run test:browser-tpl -- -f ./tests/recognize.test.html","test:browser:scheduler":"npm run test:browser-tpl -- -f ./tests/scheduler.test.html","test:browser:FS":"npm run test:browser-tpl -- -f ./tests/FS.test.html","lint":"eslint src","postinstall":"opencollective-postinstall || true"},"browser":{"./src/worker/node/index.js":"./src/worker/browser/index.js"},"author":"","contributors":["jeromewu"],"license":"Apache-2.0","devDependencies":{"@babel/core":"^7.7.7","@babel/preset-env":"^7.7.7","acorn":"^6.4.0","babel-loader":"^8.0.6","cors":"^2.8.5","eslint":"^5.16.0","eslint-config-airbnb":"^17.1.1","eslint-plugin-import":"^2.19.1","eslint-plugin-jsx-a11y":"^6.2.3","eslint-plugin-react":"^7.17.0","expect.js":"^0.3.1","express":"^4.17.1","mocha":"^5.2.0","mocha-headless-chrome":"^2.0.3","npm-run-all":"^4.1.5","nyc":"^15.0.0","rimraf":"^2.7.1","wait-on":"^3.3.0","webpack":"^4.41.4","webpack-bundle-analyzer":"^3.6.0","webpack-cli":"^3.3.10","webpack-dev-middleware":"^3.7.2"},"dependencies":{"bmp-js":"^0.1.0","file-type":"^12.4.1","idb-keyval":"^3.2.0","is-electron":"^2.2.0","is-url":"^1.2.4","node-fetch":"^2.6.0","opencollective-postinstall":"^2.0.2","regenerator-runtime":"^0.13.3","resolve-url":"^0.2.1","tesseract.js-core":"^2.2.0","zlibjs":"^0.3.1"},"repository":{"type":"git","url":"https://github.com/naptha/tesseract.js.git"},"bugs":{"url":"https://github.com/naptha/tesseract.js/issues"},"homepage":"https://github.com/naptha/tesseract.js","collective":{"type":"opencollective","url":"https://opencollective.com/tesseractjs"}}')},1635:function(t,e){t.exports={langPath:"https://tessdata.projectnaptha.com/4.0.0",workerBlobURL:!0,logger:()=>{}}},1636:function(t,e){t.exports=({workerPath:t,workerBlobURL:e})=>{let r;if(Blob&&URL&&e){const e=new Blob([`importScripts("${t}");`],{type:"application/javascript"});r=new Worker(URL.createObjectURL(e))}else r=new Worker(t);return r}},1637:function(t,e){t.exports=t=>{t.terminate()}},1638:function(t,e){t.exports=(t,e)=>{t.onmessage=({data:t})=>{e(t)}}},1639:function(t,e){t.exports=async(t,e)=>{t.postMessage(e)}},1640:function(t,e,r){const n=r(1406),o=t=>new Promise(((e,r)=>{const n=new FileReader;n.onload=()=>{e(n.result)},n.onerror=({target:{error:{code:t}}})=>{r(Error(`File could not be read! Code=${t}`))},n.readAsArrayBuffer(t)})),a=async t=>{let e=t;if(void 0===t)return"undefined";if("string"==typeof t)if(/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(t))e=atob(t.split(",")[1]).split("").map((t=>t.charCodeAt(0)));else{const r=await fetch(n(t));e=await r.arrayBuffer()}else t instanceof HTMLElement?("IMG"===t.tagName&&(e=await a(t.src)),"VIDEO"===t.tagName&&(e=await a(t.poster)),"CANVAS"===t.tagName&&await new Promise((r=>{t.toBlob((async t=>{e=await o(t),r()}))}))):(t instanceof File||t instanceof Blob)&&(e=await o(t));return new Uint8Array(e)};t.exports=a},1641:function(t,e,r){const n=r(1495);t.exports={recognize:async(t,e,r)=>{const o=n(r);return await o.load(),await o.loadLanguage(e),await o.initialize(e),o.recognize(t).finally((async()=>{await o.terminate()}))},detect:async(t,e)=>{const r=n(e);return await r.load(),await r.loadLanguage("osd"),await r.initialize("osd"),r.detect(t).finally((async()=>{await r.terminate()}))}}},1642:function(t,e){t.exports={OSD_ONLY:"0",AUTO_OSD:"1",AUTO_ONLY:"2",AUTO:"3",SINGLE_COLUMN:"4",SINGLE_BLOCK_VERT_TEXT:"5",SINGLE_BLOCK:"6",SINGLE_LINE:"7",SINGLE_WORD:"8",CIRCLE_WORD:"9",SINGLE_CHAR:"10",SPARSE_TEXT:"11",SPARSE_TEXT_OSD:"12"}},856:function(t,e,r){r(857);const n=r(1626),o=r(1495),a=r(1641),i=r(1496),s=r(1642),{setLogging:c}=r(1405);t.exports={OEM:i,PSM:s,createScheduler:n,createWorker:o,setLogging:c,...a}},857:function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var a=e&&e.prototype instanceof y?e:y,i=Object.create(a.prototype),s=new T(n||[]);return o(i,"_invoke",{value:L(t,r,s)}),i}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var d="suspendedStart",f="executing",h="completed",g={};function y(){}function m(){}function w(){}var b={};l(b,i,(function(){return this}));var v=Object.getPrototypeOf,E=v&&v(v(N([])));E&&E!==r&&n.call(E,i)&&(b=E);var j=w.prototype=y.prototype=Object.create(b);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function r(o,a,i,s){var c=p(t[o],t,a);if("throw"!==c.type){var l=c.arg,u=l.value;return u&&"object"==typeof u&&n.call(u,"__await")?e.resolve(u.__await).then((function(t){r("next",t,i,s)}),(function(t){r("throw",t,i,s)})):e.resolve(u).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,s)}))}s(c.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function L(t,e,r){var n=d;return function(o,a){if(n===f)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw a;return P()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var s=O(i,r);if(s){if(s===g)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var c=p(t,e,r);if("normal"===c.type){if(n=r.done?h:"suspendedYield",c.arg===g)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=h,r.method="throw",r.arg=c.arg)}}}function O(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,O(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=p(o,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function N(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:P}}function P(){return{value:e,done:!0}}return m.prototype=w,o(j,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:m,configurable:!0}),m.displayName=l(w,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,l(t,c,"GeneratorFunction")),t.prototype=Object.create(j),t},t.awrap=function(t){return{__await:t}},x(k.prototype),l(k.prototype,s,(function(){return this})),t.AsyncIterator=k,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new k(u(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(j),l(j,c,"Generator"),l(j,i,(function(){return this})),l(j,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=N,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(_),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:N(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}}]);
//# sourceMappingURL=tesseract-253c5b97763d9776aa0f.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[320],{1254:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return j}));var s,n=a(0),o=a(1),l=a.n(o),c=a(12),d=a(6),i=a(60),r=a(42),u=a(150),g=a.n(u),m=a(1508),_=a(52),b=a(176),p=a(1509);let j=Object(c.connect)(((e,t)=>{let{statusId:a}=t;return{language:e.getIn(["statuses",a,"language"]),versions:e.getIn(["history",a,"items"])}}),(e=>({onClose(){e(Object(i.c)())}})))(s=class extends l.a.PureComponent{render(){const{index:e,versions:t,language:a,onClose:s}=this.props,o=t.get(e),c=o.get("emojis").reduce(((e,t)=>(e[`:${t.get("shortcode")}:`]=t.toJS(),e)),{}),i={__html:Object(r.default)(o.get("content"),c)},u={__html:Object(r.default)(g()(o.get("spoiler_text")),c)},j=Object(n.a)(b.default,{timestamp:o.get("created_at"),short:!1}),O=Object(n.a)(m.a,{accountId:o.get("account")}),v=o.get("original")?Object(n.a)(d.b,{id:"status.history.created",defaultMessage:"{name} created {date}",values:{name:O,date:j}}):Object(n.a)(d.b,{id:"status.history.edited",defaultMessage:"{name} edited {date}",values:{name:O,date:j}});return Object(n.a)("div",{className:"modal-root__modal compare-history-modal"},void 0,Object(n.a)("div",{className:"report-modal__target"},void 0,Object(n.a)(_.a,{className:"report-modal__close",icon:"times",onClick:s,size:20}),v),Object(n.a)("div",{className:"compare-history-modal__container"},void 0,Object(n.a)("div",{className:"status__content"},void 0,o.get("spoiler_text").length>0&&Object(n.a)(l.a.Fragment,{},void 0,Object(n.a)("div",{className:"translate",dangerouslySetInnerHTML:u,lang:a}),Object(n.a)("hr",{})),Object(n.a)("div",{className:"status__content__text status__content__text--visible translate",dangerouslySetInnerHTML:i,lang:a}),!!o.get("poll")&&Object(n.a)("div",{className:"poll"},void 0,Object(n.a)("ul",{},void 0,o.getIn(["poll","options"]).map((e=>Object(n.a)("li",{},e.get("title"),Object(n.a)("span",{className:"poll__input disabled"}),Object(n.a)("span",{className:"poll__option__text translate",dangerouslySetInnerHTML:{__html:Object(r.default)(g()(e.get("title")),c)},lang:a})))))),Object(n.a)(p.a,{status:o,lang:a}))))}})||s}}]);
//# sourceMappingURL=compare_history_modal-518dea6baae8c0eabae7.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[321],{1252:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var s,i,o=a(0),l=a(1),d=a.n(l),r=a(2),n=a.n(r),c=a(20),m=a(6),b=a(7),h=a(52);const u=Object(m.f)({close:{id:"lightbox.close",defaultMessage:"Close"}});let p=Object(m.g)((i=class extends c.a{constructor(){super(...arguments),this.state={loading:!1,oembed:null},this.setIframeRef=e=>{this.iframe=e},this.handleTextareaClick=e=>{e.target.select()}}componentDidMount(){const{url:e}=this.props;this.setState({loading:!0}),Object(b.a)().post("/api/web/embed",{url:e}).then((e=>{this.setState({loading:!1,oembed:e.data});const t=this.iframe.contentWindow.document;t.open(),t.write(e.data.html),t.close(),t.body.style.margin=0,this.iframe.width=t.body.scrollWidth,this.iframe.height=t.body.scrollHeight})).catch((e=>{this.props.onError(e)}))}render(){const{intl:e,onClose:t}=this.props,{oembed:a}=this.state;return Object(o.a)("div",{className:"modal-root__modal report-modal embed-modal"},void 0,Object(o.a)("div",{className:"report-modal__target"},void 0,Object(o.a)(h.a,{className:"media-modal__close",title:e.formatMessage(u.close),icon:"times",onClick:t,size:16}),Object(o.a)(m.b,{id:"status.embed",defaultMessage:"Embed"})),Object(o.a)("div",{className:"report-modal__container embed-modal__container",style:{display:"block"}},void 0,Object(o.a)("p",{className:"hint"},void 0,Object(o.a)(m.b,{id:"embed.instructions",defaultMessage:"Embed this status on your website by copying the code below."})),Object(o.a)("input",{type:"text",className:"embed-modal__html",readOnly:!0,value:a&&a.html||"",onClick:this.handleTextareaClick}),Object(o.a)("p",{className:"hint"},void 0,Object(o.a)(m.b,{id:"embed.preview",defaultMessage:"Here is what it will look like:"})),d.a.createElement("iframe",{className:"embed-modal__iframe",frameBorder:"0",ref:this.setIframeRef,sandbox:"allow-same-origin",title:"preview"})))}},i.propTypes={url:n.a.string.isRequired,onClose:n.a.func.isRequired,onError:n.a.func.isRequired,intl:n.a.object.isRequired},s=i))||s}}]);
//# sourceMappingURL=embed_modal-235cacfa9e8334e01fee.chunk.js.map
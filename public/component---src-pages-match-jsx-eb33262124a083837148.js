(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[538],{395:function(e,t,a){"use strict";var l=a(4836);t.__esModule=!0,t.default=void 0;var r=l(a(7294)),n=l(a(1932)),c=l(a(2728)),s=a(970),u=function(e){return r.default.useContext(s.OptionsContext).useAutoGen?r.default.createElement(n.default,e):r.default.createElement(c.default,e)};t.default=u},1932:function(e,t,a){"use strict";var l=a(4836);t.__esModule=!0,t.default=void 0;var r=l(a(434)),n=l(a(7071)),c=l(a(7294)),s=l(a(5697)),u=a(1883),m=["title","crumbs","crumbLabel","crumbSeparator","disableLinks","hiddenCrumbs"],i=function(e){var t=e.title,a=e.crumbs,l=e.crumbLabel,s=e.crumbSeparator,i=e.disableLinks,d=e.hiddenCrumbs,o=(0,n.default)(e,m);return c.default.createElement(c.default.Fragment,null,t&&c.default.createElement("span",{className:"breadcrumb__title"},t),c.default.createElement("nav",{className:"breadcrumb","aria-label":"Breadcrumb"},c.default.createElement("ol",{className:"breadcrumb__list"},a.map((function(e,t){return d.includes(e.pathname)?null:c.default.createElement(c.default.Fragment,{key:t+"-"+e.pathname},!i.includes(e.pathname)&&c.default.createElement("li",{className:"breadcrumb__list__item"},c.default.createElement(u.Link,(0,r.default)({to:e.pathname,className:"breadcrumb__link",activeClassName:"breadcrumb__link__active","aria-current":t===a.length-1?"page":null},o),l&&t===a.length-1?l:e.crumbLabel)),i.includes(e.pathname)&&c.default.createElement("li",{className:"breadcrumb__list__item"},c.default.createElement("span",(0,r.default)({className:"breadcrumb__link__disabled"},o),l&&t===a.length-1?l:e.crumbLabel)),t===a.length-1?null:c.default.createElement("span",{className:"breadcrumb__separator","aria-hidden":"true"},s))})))))};i.defaultProps={title:"",crumbSeparator:" / ",crumbLabel:null,disableLinks:[],hiddenCrumbs:[]},i.propTypes={title:s.default.string,crumbSeparator:s.default.oneOfType([s.default.string,s.default.element]),crumbs:s.default.arrayOf(s.default.shape({location:s.default.shape(),pathname:s.default.string.isRequired})).isRequired,crumbLabel:s.default.string,disableLinks:s.default.arrayOf(s.default.string),hiddenCrumbs:s.default.arrayOf(s.default.string)};var d=i;t.default=d},2728:function(e,t,a){"use strict";var l=a(4836);t.__esModule=!0,t.default=void 0;var r=l(a(434)),n=l(a(7071)),c=l(a(7294)),s=l(a(5697)),u=a(1883),m=a(970),i=l(a(1775)),d=["title","location","crumbLabel","crumbSeparator"],o=function(e){var t=e.title,a=e.location,l=e.crumbLabel,s=e.crumbSeparator,o=(0,n.default)(e,d),b=c.default.useContext(m.OptionsContext).usePathPrefix,f=(0,i.default)({location:(0,r.default)({},a,{pathname:b?a.pathname.replace(new RegExp("^"+b),""):a.pathname}),crumbLabel:l,crumbSeparator:s}).crumbs,p=void 0===f?[]:f;return c.default.createElement(c.default.Fragment,null,t&&c.default.createElement("span",{className:"breadcrumb__title"},t),c.default.createElement("nav",{className:"breadcrumb","aria-label":"Breadcrumb"},c.default.createElement("ol",{className:"breadcrumb__list"},p.map((function(e,t){return c.default.createElement("li",{className:"breadcrumb__item",key:t},c.default.createElement(u.Link,(0,r.default)({to:e.pathname||"",className:"breadcrumb__link",activeClassName:"breadcrumb__link__active","aria-current":t===p.length-1?"page":null},o),e.crumbLabel),t===p.length-1?null:c.default.createElement("span",{className:"breadcrumb__separator","aria-hidden":"true"},e.crumbSeparator))})))))};o.defaultProps={title:"",crumbSeparator:" / "},o.propTypes={location:s.default.shape().isRequired,crumbLabel:s.default.string.isRequired,title:s.default.string,crumbSeparator:s.default.string};var b=o;t.default=b},3172:function(e,t,a){"use strict";var l=a(4836);t.__esModule=!0;var r=l(a(395));t.Breadcrumb=r.default;var n=l(a(1932));t.AutoGenCrumb=n.default;var c=a(2623);t.BreadcrumbContext=c.BreadcrumbContext,t.BreadcrumbConsumer=c.BreadcrumbConsumer,t.BreadcrumbProvider=c.BreadcrumbProvider;var s=l(a(1775));t.useBreadcrumb=s.default},1775:function(e,t,a){"use strict";var l=a(4836);t.__esModule=!0,t.default=void 0;var r=l(a(7294)),n=a(2623),c=function(e){var t=e.location,a=e.crumbLabel,l=e.crumbSeparator,c=r.default.useContext(n.BreadcrumbContext),s=c.crumbs,u=c.updateCrumbs;return r.default.useEffect((function(){u({location:t,crumbLabel:a,crumbSeparator:l})}),[t,a,l,u]),{crumbs:s}};t.default=c},3845:function(e,t,a){"use strict";var l=a(3172);t.aG=l.Breadcrumb,l.BreadcrumbContext,l.BreadcrumbConsumer,l.BreadcrumbProvider,l.useBreadcrumb,l.AutoGenCrumb},1810:function(e,t,a){"use strict";var l=a(7294),r=a(1883),n=a(8032),c=a(6581);t.Z=e=>{let t,s,u,{title:m,registeredTeams:i,date:d,slug:o,tesmSlug1:b,tesmSlug2:f,video_link:p,teamImage1:g,teamImage2:v}=e;p&&(t=p.split("=",-1),s=t[1],u=p.split(".")[1]);const{0:_,1:h}=(0,l.useState)(!1);return l.createElement(l.Fragment,null,l.createElement("div",{className:"flex flex-col lg:flex-row lg:justify-between mb-8 items-center last:mb-0 border-4 border-secondary-90 bg-secondary-100 border-opacity-100 rounded-4xl px-6 py-8 lg:py-16 lg:px-8"},l.createElement("div",{className:"flex-1 text-center lg:text-left mb-6 lg:mb-0 upcoming_gaming_list"},l.createElement("div",{className:"upcoming_gaming_text text-white"},l.createElement("p",null,d),l.createElement("h3",{className:"font-bold lg:text-35base mb-3 uppercase"},l.createElement(r.Link,{to:"/match/"+o,className:"hover:text-primary"},m)),l.createElement("span",{className:"text-primary"},i," Teams Registered"))),l.createElement("div",{className:"flex-shrink-0 lg:w-52 justify-center mb-6 lg:mb-0 text-center upcoming_play_video"},l.createElement("span",{className:"video_popup w-28 h-28 bg-primary rounded-full flex items-center justify-center mx-auto",role:"button",tabIndex:"0",onClick:()=>h(!0),onKeyPress:e=>console.log(e)},l.createElement(n.S,{src:"../../data/images/icons/play-btn2.webp",alt:"",__imageData:a(8297)}))," ",l.createElement("span",{className:"text-secondary block mt-4 lg:mt-8"},"Youtube Stream")),l.createElement("div",{className:"flex-1 flex justify-center items-center lg:justify-between lg:max-w-sm upcoming_gaming_thumb"},l.createElement(r.Link,{to:"/bettle-teams/"+b,className:"mx-1.5"},l.createElement(n.G,{className:"md:h-auto",image:(0,n.c)(g)||(0,n.c)(v),alt:""})),l.createElement("div",{className:"mx-1.5"},l.createElement(n.S,{src:"../../data/images/team-logo/game-vs1.webp",alt:"",__imageData:a(5201)})),l.createElement(r.Link,{to:"/bettle-teams/"+f,className:"mx-1.5"},l.createElement(n.G,{className:"md:h-auto",image:(0,n.c)(v)||(0,n.c)(g),alt:""})))),l.createElement(c.Z,{channel:u,videoId:s,isOpen:_,setOpen:h}))}},3869:function(e,t,a){"use strict";a.d(t,{Z:function(){return c}});var l=a(7294),r=a(3845),n=a.p+"static/breadcrumbs-bg-aead09dfeb2feab4bfcb4b524bd0b9a5.webp";var c=e=>{let{title:t,crumbLabel:a,location:c,pageContext:s}=e;const{breadcrumb:{crumbs:u}}=s,m=c.pathname.toLowerCase().split("/"),i=m[m.length-1].split("-");return l.createElement("section",{className:"breadcrumb-wrap relative pb-24 pt-24 lg:pt-36 mb-80 bg-cover bg-bottom",style:{backgroundImage:"url("+n+")"}},l.createElement("div",{className:" text-center mt-12 transform"},l.createElement(r.aG,{title:t,crumbs:u,crumbLabel:i.join(" "),disableLinks:["/games","/category","/profile","/date","/tag","/page","/blog","/blog/page","/blogs","/match"]}),l.createElement("span",{className:"hidden breadcrumb__title breadcrumb__list breadcrumb__separator breadcrumb__list__item breadcrumb__link__active"})))}},6551:function(e,t,a){"use strict";var l=a(7294);t.Z=e=>{let{heading:t,description:a,align:r,color:n,showDescription:c}=e;const s={showDescription:c||!1,align:r||"center",color:n||"primary"};return l.createElement("div",{className:"section-title"},l.createElement("div",{className:"container"},l.createElement("div",{align:s.align,className:"mx-auto"},l.createElement("h2",{className:"font-bold max-w-3xl"},t),s.showDescription&&l.createElement("p",{className:"max-w-xl mt-2 leading-7 text-18base"},a))))}},5520:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var l=a(7294),r=a(9680),n=a(3474),c=a(3869),s=a(1810),u=a(6551);var m=e=>{let{data:t}=e;return l.createElement("section",{className:"upcoming-gaming-section pb-16 md:pb-24"},l.createElement("div",{className:"container"},(null==t?void 0:t.section_title)&&l.createElement("div",{className:"section-title mb-15"},l.createElement(u.Z,Object.assign({heading:null==t?void 0:t.section_title.heading},t.section_title))),(null==t?void 0:t.items)&&(null==t?void 0:t.items.map((e=>{var t,a,r,n,c;return l.createElement(s.Z,{key:e.id,title:null==e?void 0:e.title,registeredTeams:null==e?void 0:e.registeredTeams,date:null==e?void 0:e.date,slug:null==e?void 0:e.slug,video_link:null==e||null===(t=e.liveStreaming)||void 0===t?void 0:t.link,teamImage1:null==e||null===(a=e.teams[0])||void 0===a?void 0:a.logo.src,teamImage2:null==e||null===(r=e.teams[1])||void 0===r?void 0:r.logo.src,tesmSlug1:null==e||null===(n=e.teams[0])||void 0===n?void 0:n.slug,tesmSlug2:null==e||null===(c=e.teams[1])||void 0===c?void 0:c.slug})})))))},i=a(2841),d=a(7193);var o=e=>{var t,a;let{data:s,location:u,pageContext:o}=e;const b=(0,i.normalizedData)((null==s||null===(t=s.allGeneral)||void 0===t?void 0:t.nodes)||[]),f=(0,i.normalizedData)((null==s?void 0:s.page.content)||[]);return l.createElement(n.Z,{data:{...b.menu,...b.footer}},l.createElement(r.Z,{title:"Match Page",pathname:"/"}),l.createElement(c.Z,{pageContext:o,location:u,title:"UPCOMING MATCH"}),l.createElement(m,{data:{items:null==s||null===(a=s.allMatch)||void 0===a?void 0:a.nodes}}),l.createElement(d.Z,{className:" -mt-10",data:f["funfact-section"]}))}},7071:function(e){e.exports=function(e,t){if(null==e)return{};var a,l,r={},n=Object.keys(e);for(l=0;l<n.length;l++)a=n[l],t.indexOf(a)>=0||(r[a]=e[a]);return r},e.exports.__esModule=!0,e.exports.default=e.exports},8297:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#f8b808","images":{"fallback":{"src":"/static/fdc95973546d2574f6e53e8c433306c3/bfafd/play-btn2.webp","srcSet":"/static/fdc95973546d2574f6e53e8c433306c3/35fc8/play-btn2.webp 13w,\\n/static/fdc95973546d2574f6e53e8c433306c3/2a980/play-btn2.webp 27w,\\n/static/fdc95973546d2574f6e53e8c433306c3/bfafd/play-btn2.webp 53w","sizes":"(min-width: 53px) 53px, 100vw"},"sources":[]},"width":53,"height":44}')},5201:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/1d44d2c6b40f9c3613568f7fa08f3cd1/34ef4/game-vs1.webp","srcSet":"/static/1d44d2c6b40f9c3613568f7fa08f3cd1/42570/game-vs1.webp 22w,\\n/static/1d44d2c6b40f9c3613568f7fa08f3cd1/ee92e/game-vs1.webp 44w,\\n/static/1d44d2c6b40f9c3613568f7fa08f3cd1/34ef4/game-vs1.webp 87w","sizes":"(min-width: 87px) 87px, 100vw"},"sources":[]},"width":87,"height":87}')}}]);
//# sourceMappingURL=component---src-pages-match-jsx-eb33262124a083837148.js.map
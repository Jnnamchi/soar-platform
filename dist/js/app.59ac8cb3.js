(function(e){function t(t){for(var o,r,s=t[0],u=t[1],c=t[2],l=0,p=[];l<s.length;l++)r=s[l],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&p.push(i[r][0]),i[r]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);d&&d(t);while(p.length)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,r=1;r<n.length;r++){var s=n[r];0!==i[s]&&(o=!1)}o&&(a.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},r={app:0},i={app:0},a=[];function s(e){return u.p+"js/"+({about:"about"}[e]||e)+"."+{about:"e4413c85"}[e]+".js"}function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={about:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var o="css/"+({about:"about"}[e]||e)+"."+{about:"a71383ca"}[e]+".css",i=u.p+o,a=document.getElementsByTagName("link"),s=0;s<a.length;s++){var c=a[s],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===o||l===i))return t()}var p=document.getElementsByTagName("style");for(s=0;s<p.length;s++){c=p[s],l=c.getAttribute("data-href");if(l===o||l===i)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var o=t&&t.target&&t.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete r[e],d.parentNode.removeChild(d),n(a)},d.href=i;var m=document.getElementsByTagName("head")[0];m.appendChild(d)})).then((function(){r[e]=0})));var o=i[e];if(0!==o)if(o)t.push(o[2]);else{var a=new Promise((function(t,n){o=i[e]=[t,n]}));t.push(o[2]=a);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=s(e);var p=new Error;c=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=i[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",p.name="ChunkLoadError",p.type=o,p.request=r,n[1](p)}i[e]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var p=0;p<c.length;p++)t(c[p]);var d=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},2876:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n("b85c"),r=n("d4ec"),i=n("bee2"),a=(n("b0c0"),function(){function e(t,n,o,i,a,s,u){Object(r["a"])(this,e),this.name=t,this.type=n,this.choices=o,this.columns=i,this.rows=a,this.items=s,this.answer=u}return Object(i["a"])(e,[{key:"isMatrix",value:function(){return"matrix"==this.type}},{key:"isText",value:function(){return"text"==this.type}},{key:"isRadio",value:function(){return"radio"==this.type}},{key:"countAnswers",value:function(){var e=0;if(this.isMatrix()){var t,n=Object(o["a"])(this.rows);try{for(n.s();!(t=n.n()).done;){var r=t.value;""!=r.answer&&e++}}catch(i){n.e(i)}finally{n.f()}}else if(""!=this.answer)return 1;return e}},{key:"getAnswer",value:function(){if(this.isMatrix()){var e,t=[],n=Object(o["a"])(this.rows);try{for(n.s();!(e=n.n()).done;){var r=e.value;t.push(r.answer)}}catch(i){n.e(i)}finally{n.f()}return t}return this.answer}}]),e}())},2992:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return u}));var o=n("b85c"),r=n("bee2"),i=n("d4ec"),a=(n("b0c0"),function e(t,n){Object(i["a"])(this,e),this.uid=t,n.length>0?this.answer=n:this.answer=[]}),s=function e(t,n){Object(i["a"])(this,e),this.name=t,this.questions=n},u=function(){function e(t,n){Object(i["a"])(this,e),this.title=t,this.pages=n}return Object(r["a"])(e,[{key:"countTotalQuestions",value:function(){var e,t=0,n=Object(o["a"])(this.pages);try{for(n.s();!(e=n.n()).done;){var r,i=e.value,a=Object(o["a"])(i.questions);try{for(a.s();!(r=a.n()).done;){var s=r.value;s.isMatrix()?t+=s.rows.length:t++}}catch(u){a.e(u)}finally{a.f()}}}catch(u){n.e(u)}finally{n.f()}return t}},{key:"countAnsweredQuestions",value:function(){var e,t=0,n=Object(o["a"])(this.pages);try{for(n.s();!(e=n.n()).done;){var r,i=e.value,a=Object(o["a"])(i.questions);try{for(a.s();!(r=a.n()).done;){var s=r.value;t+=s.countAnswers()}}catch(u){a.e(u)}finally{a.f()}}}catch(u){n.e(u)}finally{n.f()}return t}},{key:"isCompleted",value:function(){return this.countTotalQuestions()===this.countAnsweredQuestions()}},{key:"buildAnswerList",value:function(){var e,t=[],n=Object(o["a"])(this.pages);try{for(n.s();!(e=n.n()).done;){var r,i=e.value,s=[],u=Object(o["a"])(i.questions);try{for(u.s();!(r=u.n()).done;){var c=r.value;s.push(c.getAnswer())}}catch(l){u.e(l)}finally{u.f()}t.push(s)}}catch(l){n.e(l)}finally{n.f()}return new a("",t)}}]),e}()},"3ce2":function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return a})),n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return u}));n("d3b7");var o=n("2591"),r=(n("ea7b"),{apiKey:"AIzaSyAXVZp0kSLcFMo8VDQnrQlX-72N1WmZZYM",authDomain:"soar-platform.firebaseapp.com",projectId:"soar-platform",storageBucket:"soar-platform.appspot.com",messagingSenderId:"815543405247",appId:"1:815543405247:web:f9249949512e33ad43540a",measurementId:"${config.measurementId}"});o["a"].initializeApp(r);var i=o["a"];function a(){var e=o["a"].auth().currentUser;return e?e.uid:""}function s(){o["a"].auth().signOut().then((function(){console.log("Logged Out")}))}function u(){return new Promise((function(e,t){var n=o["a"].auth().onAuthStateChanged((function(t){n(),e(t)}),t)}))}},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9c0c":function(e,t,n){},afbc:function(e,t,n){"use strict";var o=n("1da1"),r=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b0e")),i=n("8c4f"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("div",{staticClass:"section-title"},[e._v("Welcome "+e._s(e.user.name))]),n("div",{staticClass:"subsection"},[n("div",{staticClass:"subsection-title"},[e._v("Your companies")]),n("div",{staticClass:"flex-parent"},[e._l(e.appData,(function(t){return n("div",{key:t.uid},[t.isOwndeBy(e.user)?n("div",[n("router-link",{staticClass:"unstyle-link company-select",attrs:{to:{name:"CompanyDashboard",params:{appData:e.appData,companyName:t.name}}}},[e._v(" "+e._s(t.name)+" ")])],1):e._e()])})),n("div",[n("router-link",{staticClass:"add-company",attrs:{to:"/addCompany"}},[e._v("Add New Company")])],1)],2)]),n("div",{staticClass:"subsection"},[n("div",{staticClass:"subsection-title"},[e._v("Your surveys to complete")]),e._l(e.appData,(function(t){return n("div",{key:t.name},[t.isParticipating(e.user)&&t.modules.length>0?n("div",[n("div",{staticClass:"company-name"},[e._v(e._s(t.name))]),e._l(t.modules,(function(o){return n("div",{key:o.name},[o.hasBeenCompletedBy(e.user.uid)?e._e():n("div",[n("div",{staticClass:"company-select",on:{click:function(n){return e.openStartModule(t.name,o.name)}}},[n("div",[e._v(e._s(o.name))]),n("div",{staticClass:"start-module-text"},[e._v("START NOW")])])])])})),n("div",{staticClass:"small-space"})],2):e._e()])}))],2)])},s=[],u=n("d4ec"),c=n("bee2"),l=n("262e"),p=n("2caf"),d=n("9ab4"),m=n("1b40"),h=n("b335"),f=(n("b329"),function(e){Object(l["a"])(n,e);var t=Object(p["a"])(n);function n(){var e;return Object(u["a"])(this,n),e=t.apply(this,arguments),e.user=Object(h["b"])(),e}return Object(c["a"])(n,[{key:"openStartModule",value:function(e,t){this.$router.push({name:"SurveySection",params:{companyName:e,SOARModuleName:t}})}}]),n}(m["c"]));Object(d["a"])([Object(m["b"])()],f.prototype,"appData",void 0),f=Object(d["a"])([m["a"]],f);var g=f,v=g,w=n("2877"),y=Object(w["a"])(v,a,s,!1,null,null,null),b=y.exports,O=n("3ce2");r["a"].use(i["a"]);var T=[{path:"/home",props:!0,name:"HomeMe",component:b},{path:"/survey",props:!0,name:"SurveySection",component:function(){return n.e("about").then(n.bind(null,"5ca2"))}},{path:"/addCompany",props:!0,name:"AddCompanySection",component:function(){return n.e("about").then(n.bind(null,"df36"))}},{path:"/company",props:!0,name:"CompanyDashboard",component:function(){return n.e("about").then(n.bind(null,"3711"))}},{path:"/login",props:!0,name:"LoginPage",component:function(){return n.e("about").then(n.bind(null,"a55b"))}},{path:"/SOARModuleView",props:!0,name:"SOARModuleView",component:function(){return n.e("about").then(n.bind(null,"acff"))}},{path:"/SOARModuleAnalysis",props:!0,name:"SOARModuleAnalysis",component:function(){return n.e("about").then(n.bind(null,"d5b9"))}}],E=new i["a"]({mode:"history",base:"",routes:T});E.beforeEach(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t,n,o){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t!=n){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,Object(O["c"])();case 4:if(e.sent){e.next=8;break}"/login"==t.path?o():o("/login"),e.next=9;break;case 8:"/login"==t.path?o("/home"):o();case 9:case"end":return e.stop()}}),e)})));return function(t,n,o){return e.apply(this,arguments)}}());t["a"]=E},b329:function(e,t,n){},b335:function(e,t,n){"use strict";n.d(t,"c",(function(){return p})),n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return f}));var o=n("b85c"),r=(n("b0c0"),n("2876")),i=n("2992"),a=n("d4ec"),s=n("bee2"),u=(n("a4d3"),n("e01a"),function(){function e(t,n,o,r,i,s,u){Object(a["a"])(this,e),this.uuid=t,this.name=n,this.size=o,this.description=r,this.category=i,this.admins=s,this.participants=u,this.modules=[]}return Object(s["a"])(e,[{key:"addAdmin",value:function(e){this.admins.push(e.uuid)}},{key:"addParticipant",value:function(e){this.participants.push(e.uuid)}},{key:"isOwndeBy",value:function(e){var t,n=Object(o["a"])(this.admins);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r==e.uuid)return!0}}catch(i){n.e(i)}finally{n.f()}return!1}},{key:"isParticipating",value:function(e){var t,n=Object(o["a"])(this.participants);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r==e.uuid)return!0}}catch(i){n.e(i)}finally{n.f()}return!1}},{key:"addSOARModule",value:function(e){this.modules.push(e)}}]),e}()),c=function(){function e(t,n,o){Object(a["a"])(this,e),this.uuid=t,this.name=n,this.email=o}return Object(s["a"])(e,[{key:"isAdmin",value:function(e){var t,n=Object(o["a"])(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r==this.uuid)return!0}}catch(i){n.e(i)}finally{n.f()}return!1}}]),e}(),l={title:"Growth Module",pages:[{name:"Base Business Evolution",questions:[{name:"Growing by taking advantage of market conditions & momentum - before pursuing any significant new strategic initiatives.",type:"matrix",columns:["Significant OPPORTUNITY","Modest OPPORTUNITY","Significant NECESSITY","Modest NECESSITY","LITTLE OR NO OPPORTUNITY OR NECESSITY","Don't Know","NOT APPLICABLE OR RELEVANT"],rows:[{question:"Achieving significant sales growth in the next few years by riding the wave of growth in market demand",answer:""},{question:"Achieving significant sales growth in the next few years - because market forces will allow us to raise prices on some or all products/services and/or customers",answer:""}],answer:[],choices:[],items:[]}]},{name:"Growing Wallet Share",questions:[{name:"Getting a bigger share of existing customer spending dollars.",type:"matrix",columns:["Significant OPPORTUNITY","Modest OPPORTUNITY","Significant NECESSITY","Modest NECESSITY","LITTLE OR NO OPPORTUNITY OR NECESSITY","Don't Know","NOT APPLICABLE OR RELEVANT"],rows:[{question:"Selling more of the same products or services those customers ARE currently buying from us",answer:""},{question:"Selling existing products or services those customers ARE NOT currently buying from us",answer:""},{question:"Expanding our product line to sell products or services we DON'T currently offer to existing customers",answer:""},{question:"Improving focus on up-selling - to encourage customers to expand the size of their purchases",answer:""}],answer:[],choices:[],items:[]}]},{name:"Expanding Market Share",questions:[{name:"Growing by securing new customers in existing markets.",type:"matrix",columns:["Significant OPPORTUNITY","Modest OPPORTUNITY","Significant NECESSITY","Modest NECESSITY","LITTLE OR NO OPPORTUNITY OR NECESSITY","Don't Know","NOT APPLICABLE OR RELEVANT"],rows:[{question:"Pursuing and selling to new Customersm- in existing markets, segments, geographies and channels",answer:""},{question:"Enhancing the company's Value Proposition - to make it more attractive to new customers",answer:""},{question:"Improving marketing and advertising to increase new customer awareness and perception of the company",answer:""},{question:"Improving sales force effectiveness to increase ability to identify and land new customers",answer:""}],answer:[],choices:[],items:[]}]},{name:"Growth From New Products",questions:[{name:"Using product development & upgrades to grow sales revenue.",type:"matrix",columns:["Significant OPPORTUNITY","Modest OPPORTUNITY","Significant NECESSITY","Modest NECESSITY","LITTLE OR NO OPPORTUNITY OR NECESSITY","Don't Know","NOT APPLICABLE OR RELEVANT"],rows:[{question:"Doing product upgrades and/or technological improvements/innovation to facilitate relaunching the product with new & improved features & benefits (Example: Increasing battery power of a mobile phone)",answer:""},{question:"Developing and/or sourcing new products that are extensions to current product lines (Example: Coke introducing Cherry Coke)",answer:""},{question:"Developing and/or sourcing new products where the changes are more extensive than product extensions but ARE connected to the core business and/or current product lines (Example: Coke introducing bottled water)",answer:""},{question:"Developing and/or sourcing new products are where the changes are more extensive than product extensions and are NOT connected to the core business and/or current product lines (completely new) (Example: Amazon offering cloud data storage services in its AWS division)",answer:""},{question:"Developing or introducing new products - in the form of existing products that are re-positioned to generate growth from new customers or markets (Example: aspirin being used for heart health)",answer:""},{question:"Developing or introducing new products and/or product lines - that are completely new to the world (Example: 3M's development of Post-It-Notes)",answer:""},{question:"Changing product technology, delivery mechanism, cost structure or customer experience - to leapfrog or obsolete existing players (Examples: Cell phones, Netflix, Uber, Starbucks, Southwest Airlines)",answer:""}],answer:[],choices:[],items:[]}]},{name:"Growth From New Segments, Locations, Geographies, Channels",questions:[{name:"Stretching from current comfort zone.",type:"matrix",columns:["Significant OPPORTUNITY","Modest OPPORTUNITY","Significant NECESSITY","Modest NECESSITY","LITTLE OR NO OPPORTUNITY OR NECESSITY","Don't Know","NOT APPLICABLE OR RELEVANT"],rows:[{question:"Selling into new Market SEGMENTS - using predominantly current products or technologies (perhaps with some modifications to adapt to the new segments)",answer:""},{question:"Opening new locations - in existing geographies",answer:""},{question:"Opening new locations in (or selling into) new Geographies - that ARE close to existing geographies",answer:""},{question:"Opening new locations in (or selling into) new Geographies - that ARE NOT close to existing geographies",answer:""},{question:"Selling through new Channels of Distribution",answer:""},{question:"Selling via E- Commerce - via platforms like Amazon",answer:""},{question:"Selling via E- Commerce - via the portals of retailers like Walmart, Target, Wayfair, etc",answer:""},{question:"Selling via E- Commerce - direct to consumers via the company's own site",answer:""}],answer:[],choices:[],items:[]}]},{name:"Non-Organic Growth",questions:[{name:"External Ways to Grow",type:"matrix",columns:["Significant OPPORTUNITY","Modest OPPORTUNITY","Significant NECESSITY","Modest NECESSITY","LITTLE OR NO OPPORTUNITY OR NECESSITY","Don't Know","NOT APPLICABLE OR RELEVANT"],rows:[{question:"Acquiring, or merging with, another business",answer:""},{question:"Acquiring product lines and/or customer lists from another business",answer:""},{question:"Vertical integration - acquire (or develop) supplier or customer's business",answer:""},{question:"Strategic hires - hire one or more people who can bring a significant customer base, unique expertise or access to markets or supply chains",answer:""},{question:"Entering into Joint Ventures or Alliances - to enhance ability to offer new capabilities, technologies, products, - expand ability to penetrate new markets, segments, geographies or channels",answer:""},{question:"Entering into Franchising and/or Licensing Agreements - to enhance ability to offer new capabilities, technologies, products, - expand ability to penetrate new markets, segments, geographies or channels",answer:""}],answer:[],choices:[],items:[]}]},{name:"Margins",questions:[{name:"Improve Gross Profit Margins",type:"matrix",columns:["Significant OPPORTUNITY","Modest OPPORTUNITY","Significant NECESSITY","Modest NECESSITY","LITTLE OR NO OPPORTUNITY OR NECESSITY","Don't Know","NOT APPLICABLE OR RELEVANT"],rows:[{question:"Raising prices on some or all products and/or customers",answer:""},{question:"Reducing discount s and allowances given to customers",answer:""},{question:"Reducing rebates to customers",answer:""},{question:"Reducing margin leakage - from customers who buy at prices that are not justified by the volume of purchases or other factors - when compared with other similar customers",answer:""},{question:"Reducing margin leakage - customers who are given discounts and/or rebates that are not justified by the volume of purchases or other factors - when compared with other similar customers",answer:""},{question:"Reducing margin leakage - customers who are under charged for freight, shipping and handling or other support or services that are not justified by the volume of purchases or other factors - when compared with other similar customers",answer:""},{question:"Reducing margin leakage - by quickly passing on supply chain, labor & other cost increases",answer:""},{question:'Improving analysis of the "Cost-to- Serve" customers - and using this information to maximize pricing and true customer profitability after taking Cost-to- Serve into account. (Cost-to-Serve are the costs derived from extra service, service and expenses incurred to serve specific customers - that are not captured in Cost of Goods sold).',answer:""}],answer:[],choices:[],items:[]},{name:"Other Ways to Improve Profitability & Gross Profit Margins",type:"matrix",columns:["Significant OPPORTUNITY","Modest OPPORTUNITY","Significant NECESSITY","Modest NECESSITY","LITTLE OR NO OPPORTUNITY OR NECESSITY","Don't Know","NOT APPLICABLE OR RELEVANT"],rows:[{question:"Improve product mix to focus on higher margin products",answer:""},{question:"Reducing the complexity, inefficiency & cost of estimating, quoting, order entry, picking, staging, fulfilling and shipping orders",answer:""},{question:"Improve supply chain to reduce costs and improve terms and conditions",answer:""},{question:"Improve raw material and/or product yields",answer:""},{question:"Reduce waste, scrap & inventory obsolescence",answer:""},{question:"Enhance value engineering and/or product redesign to reduce materials, labor or overhead costs or enhance value proposition",answer:""},{question:"Improve team member engagement, teamwork and morale - to facilitate improvement in productivity, sales growth, profitability and margin improvment",answer:""},{question:"Improve focus on continuous improvement and/or customer service/satisfaction - to facilitate improvement in productivity, sales growth, profitability and margin improvment",answer:""},{question:"Improve IT and/or information systems - to facilitate improvement in productivity, sales growth, profitability and margin improvment",answer:""}],answer:[],choices:[],items:[]}]},{name:"Details About You",questions:[{name:"What is your first and last name (optional)?",type:"text",columns:[],rows:[],answer:"",choices:[],items:[]},{name:"What is your work email address (optional)?",type:"text",columns:[],rows:[],answer:"",choices:[],items:[]},{name:"What department are you in (optional)?",type:"text",columns:[],rows:[],answer:"",choices:[],items:[]},{name:"What location do you work in (optional)?",type:"text",columns:[],rows:[],answer:"",choices:[],items:[]},{name:"What is your title (optional)?",type:"text",columns:[],rows:[],answer:"",choices:[],items:[]},{name:"How long have you worked for the company (optional)?",type:"radio",columns:[],rows:[],answer:"",choices:["Less than a year","1 - 2 years","3 - 5 years","6 - 10 years","11 - 20 years","More than 20 years"],items:[]},{name:"Describe the position in the organization that best fits your role (Required)",type:"radio",columns:[],rows:[],answer:"",choices:["C-Suite, including CEO, President, COO, Board Member, Owner","Executive Management, including General Manager, Senior/Executive Vice President","Vice President","Director","Manager","Supervisor","Non-manager - hourly","Non-manager - salary","Other"],items:[]}]}]};function p(){var e,t=[],n=Object(o["a"])(l.pages);try{for(n.s();!(e=n.n()).done;){var a,s=e.value,u=[],c=Object(o["a"])(s.questions);try{for(c.s();!(a=c.n()).done;){var p=a.value;u.push(new r["a"](p.name,p.type,p.choices,p.columns,p.rows,p.items,p.answer))}}catch(d){c.e(d)}finally{c.f()}t.push(new i["b"](s.name,u))}}catch(d){n.e(d)}finally{n.f()}return new i["a"](l.title,t)}function d(){return new c("ab3b453","John Nnamchi","john.nnamchi@simvo.io")}function m(){return new u("12345","Bloomberg LP",2e4,"Financial Information and News Company","Finance",[],[])}function h(){return new u("12344","Apple Inc",1e5,"Technology and consumer products","Technology",[],[])}function f(e){var t=m(),n=h();return e&&(t.addAdmin(e),t.addParticipant(e),n.addAdmin(e),n.addParticipant(e)),[t,n]}},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{staticClass:"nav-item",attrs:{to:"/home"}},[e._v("Home")]),e.userLoggedIn?n("a",{staticClass:"nav-item",on:{click:function(t){return e.logout()}}},[e._v("Logout")]):e._e()],1),n("router-view",{attrs:{appData:e.appData}})],1)},i=[],a=n("d4ec"),s=n("bee2"),u=n("262e"),c=n("2caf"),l=n("9ab4"),p=n("1b40"),d=n("b335"),m=n("3ce2"),h=function(e){Object(u["a"])(n,e);var t=Object(c["a"])(n);function n(){var e;return Object(a["a"])(this,n),e=t.apply(this,arguments),e.userLoggedIn=!1,e.appData=e.generateAppData(),e}return Object(s["a"])(n,[{key:"mounted",value:function(){this.userLoggedIn=!1,this.isLoggedIn()}},{key:"isLoggedIn",value:function(){var e=this;m["a"].auth().onAuthStateChanged((function(t){e.userLoggedIn=!!t}))}},{key:"logout",value:function(){var e=this;Object(m["d"])(),m["a"].auth().signOut().then((function(){e.$router.push("/login")}))}},{key:"generateAppData",value:function(){var e=Object(d["b"])();return Object(d["a"])(e)}}]),n}(p["c"]);h=Object(l["a"])([p["a"]],h);var f=h,g=f,v=(n("5c0b"),n("2877")),w=Object(v["a"])(g,r,i,!1,null,null,null),y=w.exports,b=n("afbc"),O=n("2f62");o["a"].use(O["a"]);var T=new O["a"].Store({state:{},mutations:{},actions:{},modules:{}});o["a"].config.productionTip=!1,new o["a"]({router:b["a"],store:T,render:function(e){return e(y)}}).$mount("#app")}});
//# sourceMappingURL=app.59ac8cb3.js.map
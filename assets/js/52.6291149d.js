(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{383:function(t,n,e){},448:function(t,n,e){"use strict";e(383)},527:function(t,n,e){"use strict";e.r(n);var a=e(110),r={name:"DetailLangSwitch",data:()=>({tab:null}),props:{value:String,langs:{type:Array,default(){var t,n;return(null===(t=this.$mapo.$options)||void 0===t||null===(n=t.content)||void 0===n?void 0:n.languages)||[]}},noRouteChange:Boolean,errors:Object},computed:{currentLang(){return this.langs[this.tab]}},watch:{tab(t){this.saveQparams(),this.$emit("input",this.langs[t])},value(t){this.tab=this.langs.indexOf(t)}},methods:{saveQparams(){if(this.noRouteChange)return;const{lang:t}=this.$route.query;t!==this.currentLang&&this.$router.replace({query:{...this.$route.query,lang:this.currentLang}})},hasErrors(t){const n=Object(a.getPointed)(this.errors||{},"translations."+t,!1);return n&&Object.keys(n).length}},mounted(){this.tab=this.langs.indexOf(this.$route.query.lang)}},s=(e(448),e(1)),o=Object(s.a)(r,(function(){var t=this,n=t._self._c;return n("v-tabs",{attrs:{"show-arrows":""},model:{value:t.tab,callback:function(n){t.tab=n},expression:"tab"}},t._l(t.langs,(function(e){return n("v-tab",{key:e},[n("v-badge",{attrs:{value:t.hasErrors(e),color:"error",dot:""}},[t._v("\n      "+t._s(e)+"\n    ")])],1)})),1)}),[],!1,null,null,null);n.default=o.exports}}]);
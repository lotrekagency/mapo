(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{284:function(e,t){e.exports={nameSpacedSlots:function(e,t){return Object.keys(e).filter(e=>e.startsWith(t)).map(e=>e.replace(t,""))}}},391:function(e,t,s){},459:function(e,t,s){"use strict";s(391)},537:function(e,t,s){"use strict";s.r(t);var n=s(110),i=s(284),o={name:"MenuManager",props:{value:{type:Object,required:!1},translatable:{type:Boolean,default:!0},lang:{type:String,required:!1},languages:{type:Array,default(){var e,t;return(null===(e=this.$mapo.$options)||void 0===e||null===(t=e.content)||void 0===t?void 0:t.languages)||[]}},usePatch:{type:Boolean,default(){var e,t;return(null===(e=this.$mapo.$options)||void 0===e||null===(t=e.content)||void 0===t?void 0:t.usePatch)||!1}},endpoint:{type:String,default:null},identifier:{type:String|Number,default:"new"},maxDepth:{type:Number,default:-1}},data(){return{selected:null,mobileOpened:!1,currentLang:this.lang||this.$i18n.locale,loading:!1,errors:{},model:{key:Math.random().toString(36).slice(2)},crud:this.$mapo.$api.crud(this.endpoint)}},watch:{currentLang(e){this.$emit("update:lang",e)},model(e){this.$emit("input",e)},lang(e){e&&this.languages.includes(e)&&(this.currentLang=e)},value(e){e&&(this.model=e)},currentLang(e){this.selected=null}},computed:{nodes:{get(){return this.translationsActive?(this.initTranslations(),this.model.translations[this.currentLang].nodes):this.model.nodes},set(e){return this.translationsActive?(this.initTranslations(),this.$set(this.model.translations[this.currentLang],"nodes",e)):this.$set(this.model,"nodes",e)}},isNew(){return this.identifier&&"new"==this.identifier},isReadonly(){return this.$mapo.$auth.routeMiddlewares.includes("permissions")?!this.$mapo.$auth.user.permissions.includes(this.isNew?"add":"change"):!!this.buttonClicked},translationsActive(){var e;return this.translatable&&!(null===(e=this.languages)||void 0===e||!e.length)},modelDiff(){return Object(n.diffObjs)(this.modelBkp,this.model)||{}},hasDiff(){return!!(this.modelDiff&&Object.keys(this.modelDiff).length>0)},apiSendPayload(){let e,t;return this.model.id?this.usePatch?(e=this.crud.partialUpdate,t=[this.model.id,this.modelDiff]):(e=this.crud.update,t=[this.model.id,this.model]):(e=this.crud.create,t=[this.model]),async()=>e(...t)},isMobile(){return this.$vuetify.breakpoint.xs}},async mounted(){if(this.identifier&&"new"!==this.identifier)try{this.model=await this.crud.detail(this.identifier)}catch(t){var e;this.$nuxt.error({statusCode:t.response.status,message:(null===(e=t.response.data)||void 0===e?void 0:e.detail)||this.$t("mapo.genericError")})}else this.value&&(this.model=this.value);this.modelBkp=Object(n.deepClone)(this.model)},methods:{nameSpacedSlots:i.nameSpacedSlots,save(){this.errors=null,this.loading=!0,this.apiSendPayload().then(e=>{this.model=e,this.modelBkp=Object(n.deepClone)(this.model),this.$mapo.$snack.open({message:this.isNew?this.$t("mapo.createSuccess"):this.$t("mapo.saveSuccess"),color:"success"}),this.isNew&&this.$router.replace({params:{detail:e.id}})}).catch(e=>{var t,s,n,i;this.errors=400==(null===(t=e.response)||void 0===t?void 0:t.status)&&(null===(s=e.response)||void 0===s?void 0:s.data)||null,this.parseErrors(this.errors),this.$mapo.$snack.open({message:(null===(n=e.response)||void 0===n||null===(i=n.data)||void 0===i?void 0:i.detail)||this.$t("mapo.genericError"),color:"error"})}).finally(()=>{this.loading=!1})},initTranslations(){this.model.translations=this.model.translations||{},this.model.translations[this.currentLang]||(this.model.translations[this.currentLang]={nodes:[]})},parseErrors(e){if(!e)return;const t=(e,s,n=null)=>{let{nodes:i,...o}=s||{};if(Object.keys(o).length>0){var a,l,r;if(this.currentLang==n||!this.translationsActive)this.selected=e,null===(a=this.$refs)||void 0===a||null===(l=a.treeview)||void 0===l||null===(r=l.$refs.nodes)||void 0===r||r.forEach(t=>t.openIfChild(e));this.$set(e,"errors",o)}let d=0;for(;i&&d<i.length;)t(e.nodes[d],s.nodes[d]),d++};this.translationsActive?Object.keys(e.translations).forEach(s=>t(this.model.translations[s],e.translations[s],s)):t(this.model,e)}}},a=(s(459),s(1)),l=Object(a.a)(o,(function(){var e=this,t=e._self._c;return e.model?t("div",{staticClass:"menu-manager--wrapper"},[t("v-navigation-drawer",{attrs:{bottom:e.isMobile,absolute:e.isMobile,permanent:!e.isMobile},model:{value:e.mobileOpened,callback:function(t){e.mobileOpened=t},expression:"mobileOpened"}},[t("MenuTreeview",{ref:"treeview",attrs:{nodes:e.nodes,"max-depth":e.maxDepth,title:"Menu: "+e.model.key},on:{"update:nodes":function(t){e.nodes=t}},scopedSlots:e._u([e.translationsActive?{key:"treeview.top",fn:function(){return[t("DetailLangSwitch",{attrs:{langs:e.languages,errors:e.errors},model:{value:e.currentLang,callback:function(t){e.currentLang=t},expression:"currentLang"}})]},proxy:!0}:null,{key:"treeview.bottom",fn:function(){return[t("v-btn",{attrs:{tile:"",loading:e.loading},on:{click:e.save}},[e._v("\n          "+e._s(e.$t("mapo.save"))+"\n        ")])]},proxy:!0}],null,!0),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1),e._v(" "),e.selected?t("MenuNodeEditor",e._b({attrs:{"menu-endpoint":e.endpoint,nodes:e.nodes,lang:e.currentLang,languages:e.languages,readonly:e.isReadonly},on:{delete:e.$refs.treeview.deleteSelectedNode},scopedSlots:e._u([e._l(e.nameSpacedSlots(e.$scopedSlots,"editor."),(function(t){return{key:t,fn:function(s){return[e._t("editor."+t,null,null,s)]}}}))],null,!0),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},"MenuNodeEditor",e.$attrs,!1),[e._l(e.nameSpacedSlots(e.$slots,"editor."),(function(s){return t("template",{slot:s},[e._t("editor."+s)],2)}))],2):t("div",{staticClass:"menu-manager--empty"},[t("v-icon",{attrs:{size:"60"}},[e._v(" mdi-resistor-nodes ")]),e._v(" "),t("p",[e._v(e._s(e.$t("mapo.menuManager.noSelectedNode")))])],1),e._v(" "),e.isMobile?t("v-btn",{staticClass:"menu-manager--bottom-btn",attrs:{tile:"",block:"",loading:e.loading},on:{click:e.save}},[e._v("\n    "+e._s(e.$t("mapo.save"))+"\n  ")]):e._e(),e._v(" "),e.isMobile?t("v-btn",{staticClass:"menu-manager--bottom-btn",attrs:{color:"primary",tile:""},on:{click:function(t){e.mobileOpened=!e.mobileOpened}}},[t("v-icon",[e._v("mdi-menu-open")])],1):e._e()],1):e._e()}),[],!1,null,null,null);t.default=l.exports}}]);
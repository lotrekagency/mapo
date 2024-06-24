(window.webpackJsonp=window.webpackJsonp||[]).push([[30,32],{279:function(e,t){e.exports={humanFileSize:function(e,t=!1,a=1){const s=t?1e3:1024;if(Math.abs(e)<s)return e+" B";const l=t?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"];let i=-1;const n=10**a;do{e/=s,++i}while(Math.round(Math.abs(e)*n)/n>=s&&i<l.length-1);return e.toFixed(a)+" "+l[i]},slugify:function(e){e=(e=(e=e||"").replace(/^\s+|\s+$/g,"")).toLowerCase();for(var t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;",a=0,s=t.length;a<s;a++)e=e.replace(new RegExp(t.charAt(a),"g"),"aaaaeeeeiiiioooouuuunc------".charAt(a));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")},titleCase:function(e){return e&&e[0].toUpperCase()+e.slice(1).toLowerCase()||""}}},284:function(e,t){e.exports={nameSpacedSlots:function(e,t){return Object.keys(e).filter(e=>e.startsWith(t)).map(e=>e.replace(t,""))}}},336:function(e,t,a){},354:function(e,t,a){"use strict";a(336)},355:function(e,t){},502:function(e,t,a){"use strict";a.r(t);a(21);var s=a(333),l=a.n(s),i=a(110),n=a(279),o=a(284),r={name:"Repeater",components:{Form:()=>a.e(70).then(a.bind(null,421)),draggable:l.a},data(){return{items:this.value?Object(i.deepClone)(this.value):[],tModalOpen:!1,tModalCallback:()=>{},collapsedStack:(this.value||[]).map(()=>!!this.collapsable)}},props:{value:{type:Array,default:()=>[]},fields:{type:Array|Object,default:()=>[]},errorMessages:{type:Array,default:()=>[]},label:String,readonly:Boolean,sortable:Boolean,collapsable:Boolean,translatable:Boolean,sortCallback:{type:Function,default:()=>{}},collapsedLabel:{type:String|Function,default:null},langs:{type:Array,default(){var e,t;return(null===(e=this.$mapo.$options)||void 0===e||null===(t=e.content)||void 0===t?void 0:t.languages)||[]}},currentLang:String,maxHeight:String|Number},watch:{value(e){const t=e=>!e||0==Object.keys(e).length;t(e)&&t(this.items)||JSON.stringify(e)===JSON.stringify(this.items)||(this.items=e&&Object(i.deepClone)(e)||[],e.length!=this.collapsedStack.length&&(this.collapsedStack=(e||[]).map(()=>!!this.collapsable)))},items:{handler(e){this.$emit("input",Object(i.deepClone)(e))},deep:!0},tModalOpen(e){!e&&this.tModalCallback()}},methods:{isExpanded(e){return!this.collapsedStack[e]},async addItem(e){const t={};if(this.hasTemplates){const e=await this.chooseTemplate();if(!e)return;t[e.tCodeField]=e.tCode}const a="number"==typeof e?e:this.items.length;this.items.splice(a,0,t),this.collapsedStack.splice(a,0,!1),this.sortable&&this.sortCallback({moved:{element:t,newIndex:a},items:this.items,eventType:"add"})},removeItem(e){const t=this.items[e];this.items.splice(e,1),this.collapsedStack.splice(e,1),this.sortable&&this.sortCallback({moved:{element:t,oldIndex:e},items:this.items,eventType:"remove"})},async chooseTemplate(){return this.tModalOpen=!0,new Promise(e=>{this.tModalCallback=function(t){e(t),this.tModalCallback=()=>{},this.tModalOpen=!1}})},getErrors(e){return(this.errorMessages||[])[e]||{}},getFields(e){if(this.hasTemplates){const t=this.templates.find(t=>e[t.tCodeField]==t.tCode);return t?t.fields:[]}return this.fields},templateSlots(e,t){if(this.hasTemplates){const a=this.templates.find(t=>e[t.tCodeField]==t.tCode);return Object(o.nameSpacedSlots)(t,`template.${a.tCode}.`).reduce((e,t)=>({[`template.${a.tCode}.${t}`]:t,...e}),{})}return Object.keys(t).reduce((e,t)=>({[t]:t,...e}),{})},getCollapsedLabel(e,t){const a=this.$t("mapo.repeater.item",{numberItem:t+1});switch(typeof this.collapsedLabel){case"string":return Object(i.getPointed)(e,this.collapsedLabel,a);case"function":return this.collapsedLabel(e);default:const t=this.getFields(e).find(e=>!e.type||"text"==e.type.lower());return Object(i.getPointed)(e,t.value,a)}},draggableReorder(e){const{newIndex:t,oldIndex:a}=e.moved,s=this.collapsedStack[a];this.collapsedStack.splice(a,1),this.collapsedStack.splice(t,0,s),this.sortCallback({...e,items:this.items,eventType:"move"})},toggleExpand(e,t){this.collapsedStack[e]=null==t?!this.collapsedStack[e]:!t,this.collapsedStack=[...this.collapsedStack]},collapseAll(){this.collapsedStack=this.collapsedStack.map(()=>!0)}},computed:{hasTemplates(){return"object"==typeof this.fields&&!Array.isArray(this.fields)},templates(){const e={};return this.hasTemplates&&Object.keys(this.fields).forEach(t=>{const a=this.fields[t],{preview:s,description:l}=a;e[t]={fields:a.fields||a,name:a.name||Object(n.titleCase)(t.replace(/_/," ")),tCode:a.tCode||t,tCodeField:a.tCodeField||"tCode",preview:s,description:l}}),Object.values(e)},maxHeightStyle(){if(void 0!==this.maxHeight){return{maxHeight:isNaN(this.maxHeight)?this.maxHeight:this.maxHeight+"px",paddingTop:"15px",overflowX:"hidden",overflowY:"auto"}}}}},c=(a(354),a(1)),d=a(355),p=a.n(d),u=Object(c.a)(r,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"container pa-0"},[t("div",{staticClass:"d-flex justify-space-between"},[t("span",{staticClass:"repeater-label text--secondary"},[e._v(e._s(e.label)+":")]),e._v(" "),e.collapsable?t("v-btn",{attrs:{outlined:"",tile:"",text:"",small:""},on:{click:e.collapseAll}},[e._v(e._s(e.$t("mapo.collapse")))]):e._e()],1),e._v(" "),t("draggable",{style:e.maxHeightStyle,attrs:{handle:".repeater-handle-sort",animation:"150"},on:{change:function(t){return e.draggableReorder(t)}},model:{value:e.items,callback:function(t){e.items=t},expression:"items"}},e._l(e.items,(function(a,s){return t("div",{key:s,staticClass:"repeater-line-wrapper",class:{expanded:!e.collapsable||e.isExpanded(s)}},[t("div",{staticClass:"d-flex"},[e.collapsable?t("div",{staticClass:"collapsed-preview"},[t("v-icon",{staticClass:"expand-icon",nativeOn:{click:function(t){return e.toggleExpand(s)}}},[e._v("mdi-chevron-down")]),e._v(" "),t("span",{staticClass:"v-label collapsed-label",domProps:{innerHTML:e._s(e.getCollapsedLabel(a,s))},on:{click:function(t){return e.toggleExpand(s,!0)}}})],1):e._e(),e._v(" "),e.isExpanded(s)?t("div",{staticClass:"repeater-fields"},[t("v-container",[t("Form",{attrs:{currentLang:e.translatable?e.currentLang:null,languages:e.langs,fields:e.getFields(a),errors:e.getErrors(s),readonly:e.readonly,immediate:""},scopedSlots:e._u([e._l(e.templateSlots(a,e.$scopedSlots),(function(t,a){return{key:t,fn:function(t){return[e._t(a,null,null,t)]}}}))],null,!0),model:{value:e.items[s],callback:function(t){e.$set(e.items,s,t)},expression:"items[index]"}},[e._l(e.templateSlots(a,e.$slots),(function(a,s){return t("template",{slot:a},[e._t(s)],2)}))],2)],1)],1):e._e(),e._v(" "),t("div",{staticClass:"repeater-side-bar grey lighten-2"},[t("span",{staticClass:"repeater-counter grey--text text--darken-2 text-truncate"},[e._v(e._s(s+1))]),e._v(" "),t("v-tooltip",{attrs:{right:""},scopedSlots:e._u([{key:"activator",fn:function({on:a,attrs:l}){return[!e.readonly&&e.sortable?t("v-icon",e._g(e._b({staticClass:"grey lighten-2 repeater-action repeater-add-line-index",attrs:{color:"grey darken-3"},on:{click:function(t){return e.addItem(s)}}},"v-icon",l,!1),a),[e._v("mdi-plus-circle-outline")]):e._e()]}}],null,!0)},[e._v(" "),t("span",[e._v(e._s(e.$t("mapo.repeater.addHere")))])]),e._v(" "),t("v-tooltip",{attrs:{right:""},scopedSlots:e._u([{key:"activator",fn:function({on:a,attrs:l}){return[t("v-hover",{scopedSlots:e._u([{key:"default",fn:function({hover:i}){return[e.readonly?e._e():t("v-icon",e._g(e._b({staticClass:"repeater-action repeater-remove-line",attrs:{color:i?"error":"grey darken-3"},on:{click:function(t){return e.removeItem(s)}}},"v-icon",l,!1),a),[e._v("mdi-minus-circle-outline")])]}}],null,!0)})]}}],null,!0)},[e._v(" "),t("span",[e._v(e._s(e.$t("mapo.remove")))])]),e._v(" "),!e.readonly&&e.sortable?t("v-icon",{staticClass:"repeater-action repeater-handle-sort",attrs:{color:"grey darken-3"}},[e._v("mdi-drag-horizontal")]):e._e()],1)])])})),0),e._v(" "),t("v-divider"),e._v(" "),t("div",{staticClass:"d-flex justify-end"},[t("v-btn",{staticClass:"repeater-add-line",attrs:{disabled:e.readonly,outlined:"",tile:"",text:""},on:{click:e.addItem}},[t("v-icon",[e._v("mdi-plus")]),e._v(" "+e._s(e.$t("mapo.add")))],1)],1),e._v(" "),e.hasTemplates?t("v-dialog",{attrs:{width:"600",scrollable:""},model:{value:e.tModalOpen,callback:function(t){e.tModalOpen=t},expression:"tModalOpen"}},[t("v-card",[t("v-card-title",{staticClass:"text-h5"},[e._v(e._s(e.$t("mapo.repeater.selectTemplate")))]),e._v(" "),t("v-card-text",[t("div",{staticClass:"row mt-4"},e._l(e.templates,(function(a,s){return t("div",{key:s,staticClass:"col-12 col-md-6 pa-0"},[t("div",{staticClass:"template-button",on:{click:function(t){return e.tModalCallback(a)}}},[t("span",{staticClass:"text-h5"},[e._v(e._s(a.name))]),t("br"),e._v(" "),t("span",[e._v(e._s(a.description))]),e._v(" "),a.preview?t("v-img",{attrs:{"max-height":"150","min-width":"250px",src:a.preview}}):t("v-skeleton-loader",{attrs:{boilerplate:"","min-width":"250px",type:"list-item-avatar-three-line"}})],1)])})),0)])],1)],1):e._e()],1)}),[],!1,null,"630a699e",null);"function"==typeof p.a&&p()(u);t.default=u.exports}}]);
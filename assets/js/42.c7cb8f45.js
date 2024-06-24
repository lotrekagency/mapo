(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{279:function(e,t){e.exports={humanFileSize:function(e,t=!1,i=1){const a=t?1e3:1024;if(Math.abs(e)<a)return e+" B";const s=t?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"];let n=-1;const r=10**i;do{e/=a,++n}while(Math.round(Math.abs(e)*r)/r>=a&&n<s.length-1);return e.toFixed(i)+" "+s[n]},slugify:function(e){e=(e=(e=e||"").replace(/^\s+|\s+$/g,"")).toLowerCase();for(var t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;",i=0,a=t.length;i<a;i++)e=e.replace(new RegExp(t.charAt(i),"g"),"aaaaeeeeiiiioooouuuunc------".charAt(i));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")},titleCase:function(e){return e&&e[0].toUpperCase()+e.slice(1).toLowerCase()||""}}},396:function(e,t,i){},464:function(e,t,i){"use strict";i(396)},542:function(e,t,i){"use strict";i.r(t);var a=i(110),s=i(279),n=i(30),r={name:"MediaEditor",data(){return{media:null,editing:!1,newFile:null,sameUrl:!1,currentLang:this.$i18n.locale}},props:{languages:{type:Array,default(){var e,t;return(null===(e=this.$mapo.$options)||void 0===e||null===(t=e.content)||void 0===t?void 0:t.languages)||[]}}},computed:{...Object(n.c)("mapo/media",["editMedia"]),fileSize(){return this.media&&Object(s.humanFileSize)(this.media.size)},dateCreated(){return this.media&&new Date(this.media.created).toLocaleString()},fileName(){return this.media&&this.media.file&&this.media.file.split("/").pop()},rotate(){return{transform:this.editing?"rotate(180deg)":"rotate(0deg)",transition:"transform .3s cubic-bezier(0.25, 0.8, 0.5, 1)"}},height(){switch(this.$vuetify.breakpoint.name){case"xs":return"50vh";default:return 425}},fields(){return[{value:"title",label:this.$t("mapo.titleTag"),attrs:{dense:!0}},{value:"description",label:this.$t("mapo.description"),attrs:{dense:!0}},{value:"alt_text",label:this.$t("mapo.altTag"),attrs:{dense:!0}}]},slotBindings(){return{model:this.media,currentLang:this.lang,langs:this.languages,fields:this.fields,readonly:!this.canEdit}},accept(){switch(this.media.mime_type&&this.media.mime_type.split("/")[0]){case"image":return"image/*";case"video":return"video/*";case"audio":return"audio/*";default:return"*"}},permissionsModel(){var e,t;return(null===(e=this.$mapo.$options)||void 0===e||null===(t=e.medias)||void 0===t?void 0:t.permissionsModel)||"media"},canEdit(){return this.$store.getters["mapo/user/hasModelPermission"](this.permissionsModel,"change")},canDelete(){return this.$store.getters["mapo/user/hasModelPermission"](this.permissionsModel,"delete")}},watch:{editMedia(e){this.media=Object(a.deepClone)(e),this.editing=!1,this.newFile=null,this.sameUrl=!1}},methods:{...Object(n.b)("mapo/media",["getRoot","closeEditor","deleteMedia","updateMedia"]),saveMedia(){this.updateMedia({...this.media,file:this.newFile||void 0,same_url:this.newFile&&this.sameUrl||void 0,language_code:this.$i18n.locale}).catch(e=>{var t,i;this.$mapo.$snack.open({message:(null===(t=e.response)||void 0===t||null===(i=t.data)||void 0===i?void 0:i.detail)||this.$t("mapo.genericError"),color:"error"})}).finally(()=>{this.newFile=null,this.sameUrl=!1})},confirmDelete(){this.$mapo.$confirm.open({title:this.$t("mapo.delete"),question:this.$t("mapo.mediaEditor.confirmDelete"),approveButton:{text:this.$t("mapo.delete"),attrs:{color:"red",text:!0}}}).then(e=>e&&this.deleteMedia(this.media).catch(e=>{var t,i;return this.$mapo.$snack.open({message:(null===(t=e.response)||void 0===t||null===(i=t.data)||void 0===i?void 0:i.detail)||this.$t("mapo.genericError"),color:"error"})}).finally(()=>{this.getRoot(),this.closeEditor()}))}}},l=(i(464),i(1)),o=Object(l.a)(r,(function(){var e=this,t=e._self._c;return e.media?t("div",{staticClass:"media-editor--wrapper"},[t("div",{staticClass:"img_overlay"},[t("v-btn",{staticClass:"img_overlay__button img_overlay__button--back",attrs:{small:"",icon:""},on:{click:e.closeEditor}},[t("v-icon",[e._v("mdi-arrow-left")])],1),e._v(" "),t("v-btn",{staticClass:"img_overlay__button img_overlay__button--href",attrs:{small:"",icon:"",href:e.media.file,target:"_blank"}},[t("v-icon",[e._v("mdi-open-in-new")])],1)],1),e._v(" "),t("MediaPreview",{staticClass:"media-editor--preview elevation-2",attrs:{media:e.media,contain:"",filename:"","media-controls":""}}),e._v(" "),t("v-overlay",{attrs:{absolute:""},on:{click:function(t){e.editing=!1}},model:{value:e.editing,callback:function(t){e.editing=t},expression:"editing"}}),e._v(" "),t("div",{staticClass:"dialog"},[t("div",{staticClass:"dialog__container"},[t("v-card",{staticClass:"dialog__content overflow-y-auto",class:{"py-0":!e.editing},attrs:{flat:"",tile:"","max-height":e.editing?e.height:"0px"}},[t("v-card-text",{staticClass:"flex-grow-0"},[t("v-row",{staticClass:"flex-md-row-reverse"},[t("v-col",{staticClass:"info-media",attrs:{md:"6",cols:"12"}},[t("table",{staticClass:"text-caption fill-height pb-md-10"},[t("tr",[t("td",{staticClass:"pr-3"},[t("b",[e._v(e._s(e.$t("mapo.fileName"))+":")])]),e._v(" "),t("td",[e._v(e._s(e.fileName))])]),e._v(" "),t("tr",[t("td",{staticClass:"pr-3"},[t("b",[e._v(e._s(e.$t("mapo.mime"))+":")])]),e._v(" "),t("td",[e._v(e._s(e.media.mime_type))])]),e._v(" "),t("tr",[t("td",{staticClass:"pr-3"},[t("b",[e._v(e._s(e.$t("mapo.created"))+":")])]),e._v(" "),t("td",[e._v(e._s(e.dateCreated))])]),e._v(" "),t("tr",[t("td",{staticClass:"pr-3"},[t("b",[e._v(e._s(e.$t("mapo.size"))+":")])]),e._v(" "),t("td",[e._v(e._s(e.fileSize))])]),e._v(" "),t("tr",[t("td",{staticClass:"pr-3"},[t("b",[e._v("URL:")])]),e._v(" "),t("td",[t("a",{attrs:{href:e.media.file,target:"_blank"}},[e._v(e._s(e.media.file))])])]),e._v(" "),t("tr",[t("td",{staticClass:"pr-3"},[t("b",[e._v(e._s(e.$t("mapo.linkedModels"))+":")])]),e._v(" "),t("td",[t("ul",e._l(e.media.links,(function(i){return t("li",{key:i.id},[t("b",[e._v(e._s(i.model)+" (id:"+e._s(i.id)+")")]),e._v(" - "+e._s(i.name)+"\n                      ")])})),0)])])])]),e._v(" "),t("v-col",{attrs:{md:"6",cols:"12"}},[t("v-row",[t("v-col",{attrs:{cols:"12"}},[t("DetailLangSwitch",{attrs:{langs:e.languages,"no-route-change":""},model:{value:e.currentLang,callback:function(t){e.currentLang=t},expression:"currentLang"}})],1)],1),e._v(" "),t("Form",{staticClass:"menu-node-editor--form",attrs:{currentLang:e.currentLang,languages:e.languages,fields:e.fields,moreSlotBindings:e.slotBindings,readonly:!e.canEdit},model:{value:e.media,callback:function(t){e.media=t},expression:"media"}}),e._v(" "),t("MediaFileChanger",{staticClass:"mt-6",attrs:{file:e.newFile,"maintain-url":e.sameUrl,accept:e.accept},on:{"update:file":function(t){e.newFile=t},"update:maintainUrl":function(t){e.sameUrl=t},"update:maintain-url":function(t){e.sameUrl=t}}})],1)],1)],1)],1),e._v(" "),t("v-btn",{class:{"pr-0":e.editing},attrs:{tile:"",depressed:"",width:"100%"},on:{click:function(t){e.editing=!e.editing}}},[t("span",[e._v(e._s(e.canEdit?e.$t("mapo.edit"):e.$t("mapo.mediaEditor.details")))]),e._v(" "),t("v-icon",{style:e.rotate},[e._v("mdi-chevron-up")]),e._v(" "),t("div",{staticClass:"edit_spacer",class:{"flex-grow-1":e.editing}}),e._v(" "),e.editing&&e.canEdit?t("v-btn",{attrs:{text:"",tile:"",color:"primary"},on:{click:e.saveMedia}},[e._v("\n          "+e._s(e.$t("mapo.save"))+"\n        ")]):e._e(),e._v(" "),e.editing&&e.canDelete?t("v-btn",{attrs:{text:"",tile:"",color:"error"},on:{click:function(t){return t.stopPropagation(),e.confirmDelete.apply(null,arguments)}}},[e._v("\n          "+e._s(e.$t("mapo.delete"))+"\n        ")]):e._e()],1)],1)])],1):e._e()}),[],!1,null,"766305dc",null);t.default=o.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{279:function(e,t){e.exports={humanFileSize:function(e,t=!1,i=1){const l=t?1e3:1024;if(Math.abs(e)<l)return e+" B";const n=t?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"];let o=-1;const r=10**i;do{e/=l,++o}while(Math.round(Math.abs(e)*r)/r>=l&&o<n.length-1);return e.toFixed(i)+" "+n[o]},slugify:function(e){e=(e=(e=e||"").replace(/^\s+|\s+$/g,"")).toLowerCase();for(var t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;",i=0,l=t.length;i<l;i++)e=e.replace(new RegExp(t.charAt(i),"g"),"aaaaeeeeiiiioooouuuunc------".charAt(i));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")},titleCase:function(e){return e&&e[0].toUpperCase()+e.slice(1).toLowerCase()||""}}},377:function(e,t,i){},440:function(e,t,i){"use strict";i(377)},519:function(e,t,i){"use strict";i.r(t);i(20);var l=i(279),n={name:"DropArea",props:{multiple:{type:Boolean,default:!1},light:{type:Boolean,default:!1},dark:{type:Boolean,default:!1},elevation:{type:Number|String,default:void 0}},data:()=>({editDialog:!1,editedItem:null,editedIndex:-1,dragover:!1,uploadedFiles:[]}),methods:{clearList(){this.uploadedFiles=[]},removeItem(e){const t=this.uploadedFiles.findIndex(t=>t.info.name===e);t>-1&&this.uploadedFiles.splice(t,1)},pickFile(){this.$refs.fileInput.click()},onFilePicked(e){this.procesFiles(e.target.files)},onDrop(e){this.dragover=!1,this.procesFiles(e.dataTransfer.files)},procesFiles(e){if(this.uploadedFiles.length>0&&(this.uploadedFiles=[]),!this.multiple&&e.length>1)this.$mapo.$snack.open({message:this.$t("mapo.dropArea.onlyOneFile"),color:"error"});else{const t=[];for(let i=0;i<e.length;i++)t.push(this.processFile(e[i]));this.uploadedFiles=t.slice()}},processFile:e=>({info:{objectURL:e.type.startsWith("image/")?URL.createObjectURL(e):null,name:e.name,size:Object(l.humanFileSize)(e.size,!0,2),rawsize:e.size,type:e.type},blob:e}),editItem(e){this.editedIndex=this.uploadedFiles.indexOf(e),this.editedItem=Object.assign({},e.info),this.editDialog=!0},saveEdit(){this.uploadedFiles[this.editedIndex].info=Object.assign({},this.editedItem),this.closeEdit()},closeEdit(){this.editDialog=!1,this.$nextTick(()=>{this.editedItem=null,this.editedIndex=-1})}},watch:{uploadedFiles(e){this.$emit("change",e)}}},o=(i(440),i(1)),r=Object(o.a)(n,(function(){var e=this,t=e._self._c;return t("v-card",e._b({class:{"grey darken-3":e.dragover},on:{drop:function(t){return t.preventDefault(),e.onDrop(t)},dragover:function(t){t.preventDefault(),e.dragover=!0},dragenter:function(t){t.preventDefault(),e.dragover=!0},dragend:function(t){t.preventDefault(),e.dragover=!1},dragleave:function(t){t.preventDefault(),e.dragover=!1}}},"v-card",{light:e.light,dark:e.dark,elevation:e.elevation},!1),[t("v-card-text",[t("v-row",{staticClass:"d-flex flex-column cursor-pointer",attrs:{dense:"",align:"center",justify:"center"},on:{click:function(t){return t.stopPropagation(),e.pickFile.apply(null,arguments)}}},[t("v-icon",{class:[e.dragover?"mt-2, mb-6":"mt-5"],attrs:{size:"60"}},[e._v("\n        mdi-cloud-upload\n      ")]),e._v(" "),t("p",[e._v(e._s(e.$t("mapo.dropArea.dropOrClick")))]),e._v(" "),t("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{type:"file",multiple:e.multiple},on:{change:e.onFilePicked}})],1),e._v(" "),t("v-virtual-scroll",{attrs:{items:e.uploadedFiles,height:64*e.uploadedFiles.length>256?256:64*e.uploadedFiles.length,"item-height":"64"},scopedSlots:e._u([{key:"default",fn:function(i){return[e._t("list-item.before",null,null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item",(function(){return[t("v-list-item",{key:i.item.info.name,staticClass:"drop-area--item"},[e._t("list-item.preview.before",null,null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item.preview",(function(){return[i.item.info.objectURL?t("v-list-item-avatar",{attrs:{tile:""}},[t("v-img",{attrs:{src:i.item.info.objectURL}})],1):e._e()]}),null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item.preview.after",null,null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item.content.before",null,null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item.content",(function(){return[t("v-list-item-content",{staticClass:"cursor-pointer",on:{click:function(t){return t.stopPropagation(),e.editItem(i.item)}}},[t("v-list-item-title",[e._v("\n                  "+e._s(i.item.info.name)+"\n                ")]),e._v(" "),t("v-list-item-subtitle",[e._v("\n                  "+e._s(i.item.info.type||"type/unknow")+", "+e._s(i.item.info.size)+"\n                ")])],1)]}),null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item.content.after",null,null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item.action.before",null,null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item.action",(function(){return[t("v-list-item-action",[t("v-btn",{attrs:{icon:""},on:{click:function(t){return t.stopPropagation(),e.removeItem(i.item.info.name)}}},[t("v-icon",[e._v(" mdi-close-circle ")])],1)],1)]}),null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item.action.after",null,null,{...i,editItem:e.editItem,removeItem:e.removeItem})],2)]}),null,{...i,editItem:e.editItem,removeItem:e.removeItem}),e._v(" "),e._t("list-item.after",null,null,{...i,editItem:e.editItem,removeItem:e.removeItem})]}}],null,!0)})],1),e._v(" "),t("v-card-actions",[t("v-spacer"),e._v(" "),e._t("actions",(function(){return[e.uploadedFiles&&e.uploadedFiles.length?t("v-btn",{attrs:{icon:""},on:{click:e.clearList}},[t("v-icon",[e._v("mdi-close")])],1):e._e()]}),{clearList:e.clearList})],2),e._v(" "),t("v-dialog",e._b({attrs:{"max-width":"500px"},model:{value:e.editDialog,callback:function(t){e.editDialog=t},expression:"editDialog"}},"v-dialog",{light:e.light,dark:e.dark,elevation:e.elevation},!1),[e.editedItem?t("v-card",[t("v-card-title",[e._t("editTitle",(function(){return[e.editedItem.objectURL?t("v-img",{attrs:{"max-height":"200",contain:"",src:e.editedItem.objectURL}}):e._e()]}),{editedItem:e.editedItem})],2),e._v(" "),t("v-card-text",[e._t("editContent",(function(){return[t("v-container",[t("v-row",[t("v-col",{attrs:{cols:"12"}},[t("v-text-field",{attrs:{label:e.$t("mapo.fileName")},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1)],1)],1)]}),{editedItem:e.editedItem})],2),e._v(" "),t("v-card-actions",[t("v-spacer"),e._v(" "),t("v-btn",{attrs:{color:"primary",text:""},on:{click:e.closeEdit}},[e._v(e._s(e.$t("mapo.cancel")))]),e._v(" "),t("v-btn",{attrs:{color:"primary",text:""},on:{click:e.saveEdit}},[e._v(e._s(e.$t("mapo.save")))])],1)],1):e._e()],1)],1)}),[],!1,null,"6eb2f99d",null);t.default=r.exports}}]);
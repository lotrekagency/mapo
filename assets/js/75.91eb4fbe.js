(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{492:function(t,e,s){},623:function(t,e,s){"use strict";s.r(e),s.d(e,"VOtpInput",(function(){return u}));s(331),s(492);var i=s(286),n=s(292),o=s(278),l=s(273),a=s(276),h=s(274);var u=Object(h.a)(i.default).extend().extend({name:"v-otp-input",directives:{ripple:o.a},inheritAttrs:!1,props:{length:{type:[Number,String],default:6},type:{type:String,default:"text"},plain:Boolean},data:()=>({initialValue:null,isBooted:!1,otp:[]}),computed:{outlined(){return!this.plain},classes(){return{...i.default.options.computed.classes.call(this),...n.a.options.computed.classes.call(this),"v-otp-input--plain":this.plain}}},watch:{isFocused:"updateValue",value(t){this.lazyValue=t,this.otp=(null==t?void 0:t.split(""))||[]}},created(){var t;this.$attrs.hasOwnProperty("browser-autocomplete")&&Object(a.a)("browser-autocomplete","autocomplete",this),this.otp=(null===(t=this.internalValue)||void 0===t?void 0:t.split(""))||[]},mounted(){requestAnimationFrame(()=>this.isBooted=!0)},methods:{focus(t,e){this.onFocus(t,e||0)},genInputSlot(t){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor,{staticClass:"v-input__slot",style:{height:Object(l.e)(this.height)},on:{click:()=>this.onClick(t),mousedown:e=>this.onMouseDown(e,t),mouseup:e=>this.onMouseUp(e,t)}}),[this.genDefaultSlot(t)])},genControl(t){return this.$createElement("div",{staticClass:"v-input__control"},[this.genInputSlot(t)])},genDefaultSlot(t){return[this.genFieldset(),this.genTextFieldSlot(t)]},genContent(){return Array.from({length:+this.length},(t,e)=>this.$createElement("div",this.setTextColor(this.validationState,{staticClass:"v-input",class:this.classes}),[this.genControl(e)]))},genFieldset(){return this.$createElement("fieldset",{attrs:{"aria-hidden":!0}},[this.genLegend()])},genLegend(){const t=this.$createElement("span",{domProps:{innerHTML:"&#8203;"}});return this.$createElement("legend",{style:{width:"0px"}},[t])},genInput(t){const e=Object.assign({},this.listeners$);return delete e.change,this.$createElement("input",{style:{},domProps:{value:this.otp[t],min:"number"===this.type?0:null},attrs:{...this.attrs$,autocomplete:"one-time-code",disabled:this.isDisabled,readonly:this.isReadonly,type:this.type,id:`${this.computedId}--${t}`,class:"otp-field-box--"+t},on:Object.assign(e,{blur:this.onBlur,input:e=>this.onInput(e,t),focus:e=>this.onFocus(e,t),keydown:this.onKeyDown,keyup:e=>this.onKeyUp(e,t)}),ref:"input",refInFor:!0})},genTextFieldSlot(t){return this.$createElement("div",{staticClass:"v-text-field__slot"},[this.genInput(t)])},onBlur(t){this.isFocused=!1,t&&this.$nextTick(()=>this.$emit("blur",t))},onClick(t){this.isFocused||this.isDisabled||!this.$refs.input[t]||this.onFocus(void 0,t)},onFocus(t,e){null==t||t.preventDefault(),null==t||t.stopPropagation();const s=this.$refs.input,i=this.$refs.input&&s[e||0];if(i)return document.activeElement!==i?(i.focus(),i.select()):void(this.isFocused||(this.isFocused=!0,i.select(),t&&this.$emit("focus",t)))},onInput(t,e){const s=+this.length-1,i=t.target.value,n=(null==i?void 0:i.split(""))||[],o=[...this.otp];for(let t=0;t<n.length;t++){const i=e+t;if(i>s)break;o[i]=n[t].toString()}n.length||o.splice(e,1),this.otp=o,this.internalValue=this.otp.join(""),e+n.length>=+this.length?(this.onCompleted(),this.clearFocus(e)):n.length&&this.changeFocus(e+n.length)},clearFocus(t){this.$refs.input[t].blur()},onKeyDown(t){t.keyCode===l.r.enter&&this.$emit("change",this.internalValue),this.$emit("keydown",t)},onMouseDown(t,e){t.target!==this.$refs.input[e]&&(t.preventDefault(),t.stopPropagation()),i.default.options.methods.onMouseDown.call(this,t)},onMouseUp(t,e){this.hasMouseDown&&this.focus(t,e),i.default.options.methods.onMouseUp.call(this,t)},changeFocus(t){this.onFocus(void 0,t||0)},updateValue(t){this.hasColor=t,t?this.initialValue=this.lazyValue:this.initialValue!==this.lazyValue&&this.$emit("change",this.lazyValue)},onKeyUp(t,e){t.preventDefault();const s=t.key;if(!["Tab","Shift","Meta","Control","Alt"].includes(s)&&!["Delete"].includes(s))return"ArrowLeft"===s||"Backspace"===s&&!this.otp[e]?e>0&&this.changeFocus(e-1):"ArrowRight"===s?e+1<+this.length&&this.changeFocus(e+1):void 0},onCompleted(){const t=this.otp.join("");t.length===+this.length&&this.$emit("finish",t)}},render(t){return t("div",{staticClass:"v-otp-input",class:this.themeClasses},this.genContent())}});e.default=u}}]);
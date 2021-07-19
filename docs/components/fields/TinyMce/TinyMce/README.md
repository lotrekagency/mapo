# TinyMce

This component wraps a [TinyMce](https://www.tiny.cloud/) instance. With the use of the v-model you can use this component to edit any content you like.

## Props

<!-- @vuese:TinyMce:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model property. Is the content that will populate the TinyMce instance.|`String`|`false`|-|
|conf|This is the main configuration of TinyMce. If setted will be merged with this component defaults.|`Object`|`false`|{}|
|label|This label will be shown at the top of the editor.|`String`|`false`|-|
|errorMessages|This is an array of validation errors that will be displayed under the editor.|`Array`|`false`|-|
|disabled|This set the component status to disabled, stopping the user interaction.|`Boolean`|`false`|false|
|bindevents|Use this prop to bind events. If set to true the component will emit every [TinyMce Event](https://www.tiny.cloud/docs/advanced/events/).|`Boolean`|`false`|false|

<!-- @vuese:TinyMce:props:end -->


## Events

<!-- @vuese:TinyMce:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|Fired when the v-model changes|Emits the content of the editor|
|`eventName`|This is a dynamic event emitter. If you activate the bindevents prop, you will be able to listen to every [TinyMce Event](https://www.tiny.cloud/docs/advanced/events/).|-|

<!-- @vuese:TinyMce:events:end -->




### Defaults

This is the default [TinyMce configuration](https://www.tiny.cloud/docs/configure/).

```js
{
  plugins: 'mapomedia preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  menubar: 'file edit view insert format tools table help',
  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile image mapomedia media template link anchor codesample | ltr rtl',
  toolbar_sticky: true,
  image_advtab: true,
  importcss_append: true,
  template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
  height: 600,
  image_caption: true,
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image imagetools table',
  skin: useDarkMode ? 'oxide-dark' : 'oxide',
  content_css: useDarkMode ? 'dark' : 'default',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}
```

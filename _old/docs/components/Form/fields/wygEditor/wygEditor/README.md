# wygEditor

This component wraps a [wygEditor](https://www.tiny.cloud/) instance. With the use of the v-model you can use this component to edit any content you like.

## Props

<!-- @vuese:wygEditor:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model property. Is the content that will populate the wygEditor instance.|`String`|`false`|-|
|conf|This is the main configuration of wygEditor. If setted will be merged with this component defaults.|`Object`|`false`|{}|
|label|This label will be shown at the top of the editor.|`String`|`false`|-|
|errorMessages|This is an array of validation errors that will be displayed under the editor.|`Array`|`false`|-|
|readonly|This set the component status to readonly, stopping the user interaction.|`Boolean`|`false`|false|
|bindevents|Use this prop to bind events. If set to true the component will emit every [wygEditor Event](https://www.tiny.cloud/docs/advanced/events/).|`Boolean`|`false`|false|

<!-- @vuese:wygEditor:props:end -->


## Events

<!-- @vuese:wygEditor:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|Fired when the v-model changes|Emits the content of the editor|
|`eventName`|This is a dynamic event emitter. If you activate the bindevents prop, you will be able to listen to every [wygEditor Event](https://www.tiny.cloud/docs/advanced/events/).|-|

<!-- @vuese:wygEditor:events:end -->




### Defaults

This is the default [wygEditor configuration](https://www.tiny.cloud/docs/configure/).

```js
{
  plugins: 'mapomedia preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
  menubar: 'file edit view insert format tools table help',
  menu: { insert: { title: 'Insert', items: 'link mapomedia media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor | insertdatetime' } },
  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | mapomedia media template link anchor codesample | ltr rtl',
  toolbar_sticky: true,
  image_advtab: true,
  importcss_append: true,
  template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
  height: 400,
  image_caption: true,
  quickbars_insert_toolbar: 'mapomedia quicktable',
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote mapomedia quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link mapomedia table',
  skin: useDarkMode ? 'oxide-dark' : 'oxide',
  content_css: useDarkMode ? 'dark' : 'default',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}
```
<br><br>

## Live Demo

<br>

::: warning LIVE DEMO 🎉🎉🎉
This is an interactive example. You can play with it but remember that all http features are disabled since there is no backend server.
:::

::: demo
<template>
  <v-app>
    <wygEditor v-model="tinyInput" :readonly="readonly" />
    <v-btn dark class="mb-2" @click.native="readonly = !readonly">
      {{ readonly ? "Enable" : "Disable" }} editor
    </v-btn>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      readonly: false,
      tinyInput: `
        <p style="text-align: center;"><span style="color: #bdc3c7;">&rarr; This is a full-featured editor demo. Please explore!
        &larr;</span></p>
        <p style="text-align: center;">&nbsp;</p>
        <h2 style="text-align: center;">TinyMCE is the world's most customizable, and flexible, rich text editor.</h2>
        <p style="text-align: center;"><strong> <span style="font-size: 14pt;"> <span style="color: #7e8c8d; font-weight: 600;">
                        A featherweight download, TinyMCE can handle any challenge you throw at it. </span> </span> </strong>
        </p>
        <p style="text-align: center;">&nbsp;</p>
        <table style="border-collapse: collapse; width: 85%; margin-left: auto; margin-right: auto; border: 0;">
            <tbody>
                <tr>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">🛠 50+
                            Plugins</span></td>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">💡 Premium
                            Support</span></td>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">🖍 Custom
                            Skins</span></td>
                    <td style="width: 25%; text-align: center; padding: 7px;"><span style="color: #95a5a6;">⚙ Full API
                            Access</span></td>
                </tr>
            </tbody>
        </table>
      `,
    };
  },
};
</script>
:::


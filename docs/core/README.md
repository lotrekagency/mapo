# Core Services 
## Context helpers aka $mapo

To make helper functions available across your app, Mapo inject some juice into Vue instances (client side),
the context (server side) and even in the Vuex store.
Following nuxt convention to prefix those functions with a $, you can find those helpers under the name $mapo.

The $mapo service can be accessed from context and this in pages, components, plugins, and store actions.


## Typedefs

<dl>
<dt><a href="#SnackMessage">SnackMessage</a> : <code><a href="#SnackMessage">SnackMessage</a></code></dt>
<dd><p>The payload that need to be sent to the store in order to make the snack appear.</p>
</dd>
<dt><a href="#ConfirmDialogOptions">ConfirmDialogOptions</a> : <code><a href="#ConfirmDialogOptions">ConfirmDialogOptions</a></code></dt>
<dd><p>The payload for the open function of the ConfirmDialog.</p>
</dd>
<dt><a href="#MapoRequestConfig">MapoRequestConfig</a> : <code><a href="#MapoRequestConfig">MapoRequestConfig</a></code></dt>
<dd><p>Additional option configuration. Here you can configure some mapo reserved options.</p>
</dd>
</dl>

<a name="SnackMessage"></a>

## SnackMessage : [<code>SnackMessage</code>](#SnackMessage)
The payload that need to be sent to the store in order to make the snack appear.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Contains the message to show. |
| color | <code>string</code> | Indicates the color of the close button. |

<a name="ConfirmDialogOptions"></a>

## ConfirmDialogOptions : [<code>ConfirmDialogOptions</code>](#ConfirmDialogOptions)
The payload for the open function of the ConfirmDialog.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the dialog. |
| question | <code>string</code> | The text in the body of the dialog. |
| dismissButton | <code>string</code> | The text in the dismiss Button. |
| approveButton | <code>string</code> | The text in the approve Button. |
| attrs | <code>Object</code> | An object with [props](https://vuetifyjs.com/en/api/v-dialog/) you want to inject into the confirm dialog. |

<a name="MapoRequestConfig"></a>

## MapoRequestConfig : [<code>MapoRequestConfig</code>](#MapoRequestConfig)
Additional option configuration. Here you can configure some mapo reserved options.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| multipart | <code>string</code> | Set the multipart politic. Accepts `'auto'|'force|'disable'`. If auto is set the request is transformed in multipart if any file is in the payload. If set to force the request is transformed in multipart no matter if files are found. If set to `'disable'` the request is never transformed in multipart. |


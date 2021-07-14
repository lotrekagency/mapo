# Core Services 
## Context helpers aka $mapo

To make helper functions available across your app, Mapo inject some juice into Vue instances (client side),
the context (server side) and even in the Vuex store.
Following nuxt convention to prefix those functions with a $, you can find those helpers under the name $mapo.

The $mapo service can be accessed from context and this in pages, components, plugins, and store actions.


## Members

<dl>
<dt><a href="#$api">$api</a></dt>
<dd><p>From here you can reach some utilities that simplify the interaction with the backend api.</p>
</dd>
<dt><a href="#$auth">$auth</a></dt>
<dd><p>From here you can reach some utilities that simplify the interaction with the user authentication flow.</p>
</dd>
<dt><a href="#$snack">$snack</a></dt>
<dd><p>From here you can manage the default popup messaging system of mapo.</p>
</dd>
<dt><a href="#$confirm">$confirm</a></dt>
<dd><p>From here you can manage the default confirm dialog of mapo.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SnackMessage">SnackMessage</a> : <code><a href="#SnackMessage">SnackMessage</a></code></dt>
<dd><p>The payload that need to be sent to the store in order to make the snack appear.</p>
</dd>
<dt><a href="#ConfirmDialogOptions">ConfirmDialogOptions</a> : <code><a href="#ConfirmDialogOptions">ConfirmDialogOptions</a></code></dt>
<dd><p>The payload for the open function of the ConfirmDialog.</p>
</dd>
</dl>

<a name="$api"></a>

## $api
From here you can reach some utilities that simplify the interaction with the backend api.

**Kind**: global variable  

* [$api](#$api)
    * [.crud(endpoint, [higherConf])](#$api.crud)
        * [.list([config])](#$api.crud.list) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
        * [.create(payload, [config])](#$api.crud.create) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
        * [.detail(id, [config])](#$api.crud.detail) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
        * [.updateOrCreate(payload, [config])](#$api.crud.updateOrCreate) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
        * [.update(id, payload, [config])](#$api.crud.update) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
        * [.partialUpdate(id, payload, [config])](#$api.crud.partialUpdate) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
        * [.delete(id, [config])](#$api.crud.delete) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
    * [.multipart(payload, file_attributes)](#$api.multipart) ⇒ [<code>FormData</code>](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

<a name="$api.crud"></a>

### $api.crud(endpoint, [higherConf])
This function generates a fully functional crud helper given the endpoint.

**Kind**: static method of [<code>$api</code>](#$api)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| endpoint | <code>string</code> |  | This is the endpoint that will be used for all the methods exposed by this function. |
| [higherConf] | [<code>AxiosRequestConfig</code>](https://axios-http.com/docs/req_config) | <code>{}</code> | This is an axios configuration object that allows you to inject all the additional options you want. |


* [.crud(endpoint, [higherConf])](#$api.crud)
    * [.list([config])](#$api.crud.list) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
    * [.create(payload, [config])](#$api.crud.create) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
    * [.detail(id, [config])](#$api.crud.detail) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
    * [.updateOrCreate(payload, [config])](#$api.crud.updateOrCreate) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
    * [.update(id, payload, [config])](#$api.crud.update) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
    * [.partialUpdate(id, payload, [config])](#$api.crud.partialUpdate) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
    * [.delete(id, [config])](#$api.crud.delete) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)

<a name="$api.crud.list"></a>

#### crud.list([config]) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
This makes a GET http call to the crud endpoint. Returns as a promise the server response.

**Kind**: static method of [<code>crud</code>](#$api.crud)  

| Param | Type |
| --- | --- |
| [config] | [<code>AxiosRequestConfig</code>](https://axios-http.com/docs/req_config) | 

<a name="$api.crud.create"></a>

#### crud.create(payload, [config]) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
This makes a POST http call with the data specified in the payload to the crud endpoint. Returns as a promise the server response.

**Kind**: static method of [<code>crud</code>](#$api.crud)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | The payload containing the data that we want to send. |
| [config] | [<code>AxiosRequestConfig</code>](https://axios-http.com/docs/req_config) | This is a further axios configuration object that allows you to override the options previously setted. |

<a name="$api.crud.detail"></a>

#### crud.detail(id, [config]) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
This makes a GET http call to the crud endpoint slash the given id. Returns as a promise the server response.

**Kind**: static method of [<code>crud</code>](#$api.crud)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the data we want to get from the server. |
| [config] | [<code>AxiosRequestConfig</code>](https://axios-http.com/docs/req_config) | This is a further axios configuration object that allows you to override the options previously setted. |

<a name="$api.crud.updateOrCreate"></a>

#### crud.updateOrCreate(payload, [config]) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
This shortcut calls the update method or the create method depending on the presence of the id field in the payload.

**Kind**: static method of [<code>crud</code>](#$api.crud)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | The payload containing the data that we want to send. |
| [config] | [<code>AxiosRequestConfig</code>](https://axios-http.com/docs/req_config) | This is a further axios configuration object that allows you to override the options previously setted. |

<a name="$api.crud.update"></a>

#### crud.update(id, payload, [config]) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
This makes a PUT http call to the crud endpoint slash the given id, sending the payload. Returns as a promise the server response.

**Kind**: static method of [<code>crud</code>](#$api.crud)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the data we want to update. |
| payload | <code>Object</code> | The payload containing the data that we want to send. |
| [config] | [<code>AxiosRequestConfig</code>](https://axios-http.com/docs/req_config) | This is a further axios configuration object that allows you to override the options previously setted. |

<a name="$api.crud.partialUpdate"></a>

#### crud.partialUpdate(id, payload, [config]) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
This makes a PATCH http call to the crud endpoint slash the given id, sending the payload. Returns as a promise the server response.

**Kind**: static method of [<code>crud</code>](#$api.crud)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the data we want to partially update. |
| payload | <code>Object</code> | The payload containing the data that we want to send. |
| [config] | [<code>AxiosRequestConfig</code>](https://axios-http.com/docs/req_config) | This is a further axios configuration object that allows you to override the options previously setted. |

<a name="$api.crud.delete"></a>

#### crud.delete(id, [config]) ⇒ [<code>Promise.&lt;AxiosResponse&gt;</code>](https://axios-http.com/docs/res_schema)
This makes a DELETE http call to the crud endpoint slash the given id. Returns as a promise the server response.

**Kind**: static method of [<code>crud</code>](#$api.crud)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the data we want to delete from the server. |
| [config] | [<code>AxiosRequestConfig</code>](https://axios-http.com/docs/req_config) | This is a further axios configuration object that allows you to override the options previously setted. |

<a name="$api.multipart"></a>

### $api.multipart(payload, file_attributes) ⇒ [<code>FormData</code>](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
This lets you transform a js object containing files in a multipart request with all the classic data in a single attribute (data) 
and all the files each one in a single attribute named with the dotted path of the file.

**Kind**: static method of [<code>$api</code>](#$api)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | The payload of the request that needs to be trasformed. |
| file_attributes | <code>Array.&lt;String&gt;</code> | The list of dotted path of all the file attributes that need to be attached to the request. |

<a name="$auth"></a>

## $auth
From here you can reach some utilities that simplify the interaction with the user authentication flow.

**Kind**: global variable  

* [$auth](#$auth)
    * [.login(payload)](#$auth.login)
    * [.logout()](#$auth.logout)
    * [.getInfo()](#$auth.getInfo) ⇒ <code>UserData</code>

<a name="$auth.login"></a>

### $auth.login(payload)
Here you can submit your login credentials to the vuex store.

**Kind**: static method of [<code>$auth</code>](#$auth)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | { username, password } aka user credentials for the login request. |

<a name="$auth.logout"></a>

### $auth.logout()
This simply commits a logout to the vuex store.

**Kind**: static method of [<code>$auth</code>](#$auth)  
<a name="$auth.getInfo"></a>

### $auth.getInfo() ⇒ <code>UserData</code>
This refresh user informations present in vuex store and returns them.

**Kind**: static method of [<code>$auth</code>](#$auth)  
<a name="$snack"></a>

## $snack
From here you can manage the default popup messaging system of mapo.

**Kind**: global variable  

* [$snack](#$snack)
    * [.open(payload)](#$snack.open) ⇒ <code>Promise</code>
    * [.close()](#$snack.close)

<a name="$snack.open"></a>

### $snack.open(payload) ⇒ <code>Promise</code>
This send a message to the snack vuex store bringing up the component that carries the message to the user.

**Kind**: static method of [<code>$snack</code>](#$snack)  

| Param | Type | Description |
| --- | --- | --- |
| payload | [<code>SnackMessage</code>](#SnackMessage) | The payload containing the message. |

<a name="$snack.close"></a>

### $snack.close()
This closes all the opened snack instances.

**Kind**: static method of [<code>$snack</code>](#$snack)  
<a name="$confirm"></a>

## $confirm
From here you can manage the default confirm dialog of mapo.

**Kind**: global variable  

* [$confirm](#$confirm)
    * [.open(payload)](#$confirm.open) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.accept()](#$confirm.accept)
    * [.close()](#$confirm.close)

<a name="$confirm.open"></a>

### $confirm.open(payload) ⇒ <code>Promise.&lt;boolean&gt;</code>
This open the Confirm dialog component showing to the user a question. Returns a promise with the user response.

**Kind**: static method of [<code>$confirm</code>](#$confirm)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - The response from the user interaction.  

| Param | Type | Description |
| --- | --- | --- |
| payload | [<code>ConfirmDialogOptions</code>](#ConfirmDialogOptions) | The payload containing the information to show to the user in the confirm dialog. |

<a name="$confirm.accept"></a>

### $confirm.accept()
This forces the dialog to close, giving a positive response.

**Kind**: static method of [<code>$confirm</code>](#$confirm)  
<a name="$confirm.close"></a>

### $confirm.close()
This forces the dialog to close, giving a negative response.

**Kind**: static method of [<code>$confirm</code>](#$confirm)  
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

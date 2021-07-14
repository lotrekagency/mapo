# ConfirmDialog

This component is embedded in the default layout. It's a dynamic dialog which is used to ask the user for confirmation before performing an operation.<br> For example: `Do you really want to delete the content 'abcd'?` <br><br> It can be globally accessed with [this.$mapo.$confirm](/core/#confirm)

## Props

<!-- @vuese:ConfirmDialog:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|v-model boolean that controll the status of the dialog (opened/closed)|`Boolean`|`false`|false|
|question|The text in the body of the dialog.|`String`|`false`|Are you sure of what you are doing?|
|title|The title of the dialog.|`String`|`false`|Confirm|
|dismissButton|The text plus props passed to the dismiss Button.|`{ text: String, attrs: Object }`|`false`|{"text":"Cancel","attrs":{"text":true}}|
|approveButton|The text plus props passed to the approve Button.|`{ text: String, attrs: Object }`|`false`|{"text":"Ok","attrs":{"color":"primary","text":true}}|

<!-- @vuese:ConfirmDialog:props:end -->


## Events

<!-- @vuese:ConfirmDialog:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|Fired when the v-model changes.|Emits `true|false` based on the dialog status `open|close`.|
|open|Fired when the dialog opens|-|
|close|Fired when the dialog closes|-|

<!-- @vuese:ConfirmDialog:events:end -->


## Slots

<!-- @vuese:ConfirmDialog:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|activator|Activator slot, this follows the logics of <a href="https://vuetifyjs.com/en/api/v-dialog/#api-slots" target="__blank">vuetify activator</a>.|-|

<!-- @vuese:ConfirmDialog:slots:end -->


## Methods

<!-- @vuese:ConfirmDialog:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|open|This open the Confirm dialog component showing to the user a question. Returns a promise with the user response. See [this.$mapo.$confirm.open](/core/#confirm)|The payload containing the information to show to the user in the confirm dialog.|
|accept|This forces the dialog to close, giving a positive response. See [this.$mapo.$confirm.close](/core/#confirm)|-|
|close|This forces the dialog to close, giving a positive response. See [this.$mapo.$confirm.accept](/core/#confirm)|-|

<!-- @vuese:ConfirmDialog:methods:end -->



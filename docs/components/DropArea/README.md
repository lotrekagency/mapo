# DropArea

This component creates a drop area for uploads. You can drag and drop over the button or click it to load the files. When files are loaded into the component it will emit an event containing all the files. This component will not take care of the actual file upload.

## Props

<!-- @vuese:DropArea:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|multiple|This determines whether the component accepts multiple files or a single file.|`Boolean`|`false`|false|
|light|Light theme (style).|`Boolean`|`false`|false|
|dark|Dark theme (style).|`Boolean`|`false`|false|
|elevation|Elevation shadow (style).|`Number|String`.|`false`|undefined|

<!-- @vuese:DropArea:props:end -->


## Events

<!-- @vuese:DropArea:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|Fires when the list of files loaded changes [File](https://developer.mozilla.org/en-US/docs/Web/API/File) and info are some custom info about the file.|This emits a list of files in the format {info, blob} where the blob is a|

<!-- @vuese:DropArea:events:end -->


## Slots

<!-- @vuese:DropArea:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|actions|Slot to provide custom button actions inside the drop area|`<v-btn @click="clearList" icon><v-icon>mdi-close</v-icon></v-btn>`|
|editTitle|Slot to provide custom edit card title. Exposes `editedItem`.|`<v-img v-if="editedItem.objectURL" max-height="200" contain :src="editedItem.objectURL"></v-img>`|
|editContent|Slot to provide custom edit card content. Exposes `editedItem`.|`<v-container><v-row><v-col cols="12"><v-text-field v-model="editedItem.name" label="File name"></v-text-field></v-col></v-row></v-container>`|

<!-- @vuese:DropArea:slots:end -->



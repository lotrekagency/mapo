const mapping = {
    text: "v-text-field",
    select: "v-select",
    date: "date-field",
    textarea: "v-textarea",
    switch: "v-switch",
    slider: "v-slider",
    file: "v-file-input",
    editor: "tiny-mce",
    media: "media-field",
    m2m: "m2m-field",
    mediaList: "media-m2m-field"
}

const props = {
    "v-text-field": {
        outlined: true
    },
    "v-textarea": {
        outlined: true
    },
    "v-select": {
        itemText: "text",
        itemValue: "value"
    }
}

const dateFunc = function ({ val }) {
    return val && new Date(val).toISOString().split("T")[0];
};

const accessor = {
    "v-date-picker": {
        get: dateFunc, set: dateFunc
    },
    "date-field": {
        get: dateFunc, set: dateFunc
    }
}
export default {
    mapping, props, accessor
}
const mapping = {
    text: "vTextField",
    select: "vSelect",
    date: "DateField",
    textarea: "vTextarea",
    switch: "vSwitch",
    slider: "vSlider",
    file: "FileField",
    editor: "wygEditor",
    media: "MediaField",
    enhancedMedia: "EnhancedMediaField",
    fks: "FksField",
    m2m: "FksField",
    mediaList: "MediaM2mField",
    seoPreview: "SeoPreview",
    repeater: "Repeater",
    color: "ColorField"
}

const props = {
    vSelect: {
        itemText: "text",
        itemValue: "value"
    },
    MediaField: {
        outlined: false
    },
    EnhancedMediaField: {
        outlined: false
    },
    vSwitch: {
        inset: true,
        ripple: false
    },
    FksField:{
        itemValue: "id",
        returnObject: true,
    },
    All : {
        outlined: true,
        class: "rounded-0",
    }
}

const dateFunc = function ({ val }) {
    return val && new Date(val).toISOString().split("T")[0];
};

const accessor = {
    vDatePicker: {
        get: dateFunc, set: dateFunc
    },
    DateField: {
        get: dateFunc, set: dateFunc
    },
    SeoPreview: {
        get: ({ val }) => ({ title: "", permalink: "", description: "", ...val }),
        set: ({ val }) => ({ title: "", permalink: "", description: "", ...val })
    }
}
export default {
    mapping, props, accessor
}

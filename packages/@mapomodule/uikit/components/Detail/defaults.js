const mapping = {
    text: "vTextField",
    select: "vSelect",
    date: "DateField",
    textarea: "vTextarea",
    switch: "vSwitch",
    slider: "vSlider",
    file: "vFileInput",
    editor: "TinyMce",
    media: "MediaField",
    m2m: "M2mField",
    mediaList: "MediaM2mField",
    seoPreview: "SeoPreview"
}

const props = {
    vSelect: {
        itemText: "text",
        itemValue: "value"
    },
    vSwitch: {
        inset: true,
        ripple: false
    },
    M2mField:{
        itemValue: "id",
        returnObject: true,
    },
    All : {
        outlined: true,
        // dense: true
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
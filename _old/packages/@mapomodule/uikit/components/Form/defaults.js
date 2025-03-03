const components = {
    // vuetify
    vTextField: () => import("vuetify/lib/components/VTextField"),
    vSelect: () => import("vuetify/lib/components/VSelect"),
    vTextarea: () => import("vuetify/lib/components/VTextarea"),
    vSwitch: () => import("vuetify/lib/components/VSwitch"),
    vSlider: () => import("vuetify/lib/components/VSlider"),
    vAutocomplete: () => import("vuetify/lib/components/VAutocomplete"),
    vCheckbox: () => import("vuetify/lib/components/VCheckbox"),
    vCombobox: () => import("vuetify/lib/components/VCombobox"),
    vFileInput: () => import("vuetify/lib/components/VFileInput"),
    vInput: () => import("vuetify/lib/components/VInput"),
    vOtpInput: () => import("vuetify/lib/components/VOtpInput"),
    vOverflowBtn: () => import("vuetify/lib/components/VOverflowBtn"),
    vRangeSlider: () => import("vuetify/lib/components/VRangeSlider"),
    vRating: () => import("vuetify/lib/components/VRating"),
    vRadioGroup: () => import("vuetify/lib/components/VRadioGroup"),

    // customs
    wygEditor: () => import("@mapomodule/uikit/components/Form/fields/wygEditor/wygEditor.vue"),
    wygEditorCKE: () => import("@mapomodule/uikit/components/Form/fields/wygEditorCKE/wygEditorCKE.vue"),
    DateField: () => import("@mapomodule/uikit/components/Form/fields/DateField.vue"),
    TimeField: () => import("@mapomodule/uikit/components/Form/fields/TimeField.vue"),
    DateTimeField: () => import("@mapomodule/uikit/components/Form/fields/DateTimeField.vue"),
    FksField: () => import("@mapomodule/uikit/components/Form/fields/FksField.vue"),
    MediaM2mField: () => import("@mapomodule/uikit/components/Form/fields/MediaM2mField.vue"),
    MediaField: () => import("@mapomodule/uikit/components/Form/fields/MediaField.vue"),
    EnhancedMediaField: () => import("@mapomodule/uikit/components/Form/fields/EnhancedMediaField.vue"),
    SeoPreview: () => import("@mapomodule/uikit/components/Form/fields/SeoPreview.vue"),
    FileField: () => import("@mapomodule/uikit/components/Form/fields/FileField.vue"),
    Repeater: () => import("@mapomodule/uikit/components/Form/fields/Repeater.vue"),
    ColorField: () => import("@mapomodule/uikit/components/Form/fields/ColorField.vue"),
    MapField: () => import("@mapomodule/uikit/components/Form/fields/mapField/mapField.vue"),
}

const mapping = {
    text: components.vTextField,
    select: components.vSelect,
    date: components.DateField,
    time: components.TimeField,
    datetime: components.DateTimeField,
    textarea: components.vTextarea,
    switch: components.vSwitch,
    slider: components.vSlider,
    file: components.FileField,
    editor: components.wygEditorCKE,
    media: components.MediaField,
    enhancedMedia: components.EnhancedMediaField,
    fks: components.FksField,
    m2m: components.FksField,
    mediaList: components.MediaM2mField,
    seoPreview: components.SeoPreview,
    repeater: components.Repeater,
    color: components.ColorField,
    map: components.MapField
}

const attrs = {
    vSelect: {
        itemText: "text",
        itemValue: "value"
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
    mapping, attrs, accessor, components
}

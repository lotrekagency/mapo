const defaultConfig = ({ assetsBasePath, isDark }) => {
    const config = {
        language: "en",
        height: 300,
        toolbarCanCollapse: true,
        removePlugins: "elementspath",
        resize_enabled: false,
        removePlugins: "image,exportpdf",
        extraPlugins: "image2",
        versionCheck: false,
        iframe_attributes: {
            sandbox: "allow-same-origin allow-scripts allow-popups allow-forms",
        },
        toolbar: [
            {
                name: "clipboard",
                items: [
                    "Cut",
                    "Copy",
                    "Paste",
                    "PasteText",
                    "PasteFromWord",
                    "-",
                    "Undo",
                    "Redo",
                ],
            },
            {
                name: "styles",
                items: [
                    "Styles",
                    "Format",
                    "Font",
                    "FontSize",
                    "-",
                    "JustifyLeft",
                    "JustifyCenter",
                    "JustifyRight",
                    "JustifyBlock",
                ],
            },
            { name: "colors", items: ["TextColor", "BGColor"] },
            { name: "tools", items: ["Maximize", "ShowBlocks"] },
            
            "/",
            {
                name: "basicstyles",
                items: [
                    "Bold",
                    "Italic",
                    "Underline",
                    "Strike",
                    "Subscript",
                    "Superscript",
                    "-",
                    "RemoveFormat",
                ],
            },
            {
                name: "paragraph",
                items: [
                    "NumberedList",
                    "BulletedList",
                    "-",
                    "Outdent",
                    "Indent",
                    "-",
                    "Blockquote",
                    "CreateDiv",
                    "-",
                    "BidiLtr",
                    "BidiRtl",
                    "Language",
                ],
            },
            { name: "links", items: ["Link", "Unlink", "Anchor"] },
            {
                name: "insert",
                items: [
                    "Table",
                    "HorizontalRule",
                    "Smiley",
                    "SpecialChar",
                    "PageBreak",
                    "Iframe",
                    "insertMedia",
                ],
            },
            {
                name: "document",
                items: ["Source"],
            },
        ],
        skin: `moono,${assetsBasePath}skins/moono/`,
        // skin: isDark
        //     ? `moono-dark,${assetsBasePath}skins/moono-dark/`
        //     : `moono,${assetsBasePath}skins/moono/`,
    };

    return config;
};

export default defaultConfig;

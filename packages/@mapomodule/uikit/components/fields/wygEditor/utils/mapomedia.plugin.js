export default function (callback) {
    const pluginmanager = window.tinymce.util.Tools.resolve('tinymce.PluginManager');
    const pluginname = "mapomedia"
    pluginmanager.add(pluginname, function (editor, url) {
        const conf = {
            icon: 'image',
            tooltip: 'Insert image/video/audio/docs',
            onAction: () => callback().then(html => {
                editor.focus();
                editor.undoManager.transact(() => editor.selection.setContent(html))
                editor.selection.setCursorLocation();
                editor.nodeChanged();
            }).catch(() => null)
        }
        editor.addCommand('mceMapoMedia', () => callback().then(html => {
            editor.focus();
            editor.undoManager.transact(() => editor.selection.setContent(html))
            editor.selection.setCursorLocation();
            editor.nodeChanged();
        }).catch(() => null))
        editor.ui.registry.addButton(pluginname, conf);
        editor.ui.registry.addMenuItem(pluginname, { text: "Mapo Media...", ...conf });
        return {
            getMetadata: function () {
                return {
                    name: "Mapo Media",
                };
            }
        };
    }
    );
}
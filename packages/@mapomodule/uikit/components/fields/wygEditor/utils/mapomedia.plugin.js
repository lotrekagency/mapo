export default function (callback) {
    const pluginmanager = window.tinymce.util.Tools.resolve('tinymce.PluginManager');
    pluginmanager.add('mapomedia', function (editor, url) {
        const conf = ['mapomedia', {
            icon: 'image',
            text: 'Mapo Media',
            onAction: () => callback().then(html => {
                editor.focus();
                editor.undoManager.transact(() => editor.selection.setContent(html))
                editor.selection.setCursorLocation();
                editor.nodeChanged();
            }).catch(() => null)
        }]
        editor.addCommand('mceMapoMedia', () => callback().then(html => {
            editor.focus();
            editor.undoManager.transact(() => editor.selection.setContent(html))
            editor.selection.setCursorLocation();
            editor.nodeChanged();
        }).catch(() => null))
        editor.ui.registry.addButton(...conf);
        editor.ui.registry.addMenuItem(...conf);
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
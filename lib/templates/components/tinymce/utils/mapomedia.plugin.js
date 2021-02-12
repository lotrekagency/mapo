
const register = (editor, callback) => {
    const conf = ['mapomedia', {
        icon: 'image',
        text: 'Mapo Media',
        onAction: () => callback().then(result => setContent(editor, result)).catch(() => null)
    }]
    editor.addCommand('mceMapoMedia', () => callback().then(result => setContent(editor, result)).catch(() => null))
    editor.ui.registry.addButton(...conf);
    editor.ui.registry.addMenuItem(...conf);
};

const setContent = (editor, html) => {
    editor.focus();
    editor.undoManager.transact(() => editor.selection.setContent(html))
    editor.selection.setCursorLocation();
    editor.nodeChanged();
};

export default function (callback) {
    const pluginmanager = window.tinymce.util.Tools.resolve('tinymce.PluginManager');
    pluginmanager.add('mapomedia', (editor) => register(editor, callback));
}

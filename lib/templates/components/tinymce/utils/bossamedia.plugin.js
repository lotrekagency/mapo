
const register = (editor, callback) => {
    const conf = ['bossamedia', {
        icon: 'image',
        text: 'Bossanova Media',
        onAction: () => setContent(editor, callback())
    }]
    editor.addCommand('mceBossaMedia', () => setContent(editor, callback()))
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
    if (!pluginmanager.lookup['bossamedia']) {
        pluginmanager.add('bossamedia', (editor) => register(editor, callback));
    }
}

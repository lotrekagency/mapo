
const register = (editor, callback) => {
    const conf = ['bossamedia', {
        icon: 'image',
        text: 'Bossanova Media',
        onAction: () => callback().then(result => setContent(editor, result)).catch(() => null)
    }]
    editor.addCommand('mceBossaMedia', () => callback().then(result => setContent(editor, result)).catch(() => null))
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

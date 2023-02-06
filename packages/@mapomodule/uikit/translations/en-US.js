export default {
    mapo: {
        // Generics
        cancel: "Cancel",
        save: "Save",
        apply: "Apply",
        confirm: "Confirm",
        ok: "OK",
        close: "Close",
        edit: "Edit",
        delete: "Delete",
        add: "Add",
        remove: "Remove",
        clear: "Clear",
        expand: "Expand",
        collapse: "Collapse",
        search: "Search...",
        create: "Create",
        createContinue: "Create and continue",
        saveContinue: "Save and continue",
        back: "Back",
        genericError: "Something whent bad, please try again later...",
        saveSuccess: "Item saved succesfully!",
        createSuccess: "Item succesfully created!",
        confirmDelete: "Are you sure you want to delete this item?",
        unsavedData: "Exit page?",
        confirmLeaveChanges: "Changes you made may not be saved.",
        fetchingData: "Fetching data...",
        login: "Login",
        loginError: "Cannot login right now. Try again later.",
        logout: "Logout",
        // Elements
        name: "Name",
        description: "Description",
        mime: "MIME Type",
        fileName: "File name",
        folder: "Folder",
        created: "Created at",
        size: "Size",
        altTag: "Alt Tag",
        titleTag: "Title Tag",
        linkedModels: "Linked Models",

        // pages/index.vue
        index: {
            welcomeMessage:
                "Congratulations!! 🥳 You successfully installed Mapo!",
        },

        // ConfirmDialog.vue
        confirmDialog: {
            areYouSure: "Are you sure of what you are doing?",
        },
        // DropArea.vue
        dropArea: {
            dropOrClick: "Drop your file(s) here, or click to select them.",
            onlyOneFile: "Only one file can be uploaded at a time...",
        },

        // Form/fields/MediaField.vue
        mediaField: {
            confirmRemove: "Are you sure to want to remove this media?",
        },
        // Form/fields/MediaM2mField.vue
        mediaM2MField: {
            mediaCarousel: "Media Carousel",
            editSelection: "Edit selection",
        },
        // Form/fields/Repeater.vue
        repeater: {
            addHere: "Add here",
            selectTemplate: "Select template",
            item: "Item {numberItem}",
        },
        // Form/fields/SeoPreview.vue
        seoPreview: {
            title: "It was the best of times, it was the blurst of times, it was the ...",
            description:
                "This is an example description that will get replaced when you start typing. Make sure to keep descriptions mobile-friendly and keyword-rich!",
        },

        // List/List.vue
        list: {
            allSelected: "All items selected",
            NSelected: "{numberItems} items selected",
            selectAll: "Select all",
        },
        // List/ListActions.vue
        listActions: {
            groupActions: "Group actions",
            permanentDelete: "Permanent delete",
            selectionRequired: "You need to select at least one item.",
        },
        // List/ListFilters.vue
        listFilters: { filter: "Filter" },
        // List/ListHead.vue
        listHead: { addNew: "Add new" },
        // List/ListQuickEdit.vue
        listQuickEdit: { badInput: "Bad input, correct wrong fields." },
        // List/ListTable.vue
        listTable: {
            quickAdd: "Quick Add",
            toggleOrder: "Toggle reordering",
            errorOrder: "Reorder failed",
        },
        // MenuManager/MenuNodeEditor.vue
        menuNodeEditor: {
            editNode: "Editing",
            linkTypeLabel: "Link type",
            styleLabel: "Style",
            openInNewTabLabel: "Open in a new tab",
            relContentTypeLabel: "Type of page",
            relPageIdLabel: "Page",
            staticLabel: "Static Url",
            relational: "Relational",
            static: "Static",
        },
        // MenuManager/MenuManager.vue
        menuManager: {
            noSelectedNode: "Select a node to edit or create a new one."
        },
        // MenuManager/MenuTreeview.vue
        menuTreeview:{
            newNode: "Create node",
            noRootNodes: "No nodes here. Create a new one!",
            areYouSureDelete: "Are you sure to delete current node and all it's childs ?"
        },
        mediaEditor: {
            changeFile: "Change File",
            maintainOldUrl: "Maintain old URL",
            confirmDelete: "Are you sure you want to delete this media?",
            details: "Details",
        },
        // MediaManager/MediaFolders.vue
        mediaFolders: {
            goBack: "Go back",
            noFolders: "No folders here... Create a new one!",
            newFolder: "Add new folder",
            editFolder: "Edit folder",
            folderName: "Folder name",
            confirmDelete:
                "Are you sure to delele this folder and all its content?",
        },
        // MediaManager/MediaGallery.vue
        mediaGallery: { noMediaFound: "No media found..." },
        // MediaManager/MediaManager.vue
        mediaManager: {
            gallery: "Gallery",
            uploader: "Uploader",
            fileInfo: "File info succesfully updated",
        },
        // MediaManager/MediaUploader.vue
        mediaUploader: { success: "{numberFiles} files succesfully uploaded", tooLarge: "Warning! Optimize before upload!" },
    },
};

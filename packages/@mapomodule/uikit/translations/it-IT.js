export default {
    mapo: {
        // Generics
        cancel: "Annulla",
        save: "Salva",
        apply: "Applica",
        confirm: "Conferma",
        ok: "OK",
        close: "Chiudi",
        edit: "Modifica",
        delete: "Elimina",
        add: "Aggiungi",
        remove: "Rimuovi",
        clear: "Rimuovi",
        expand: "Espandi",
        collapse: "Comprimi",
        search: "Cerca...",
        create: "Crea",
        createContinue: "Crea e continua",
        saveContinue: "Salva e continua",
        back: "Indietro",
        genericError: "Qualcosa è andato storto, riprova più tardi...",
        saveSuccess: "Elemento salvato con successo!",
        createSuccess: "Elemento creato con successo!",
        confirmDelete: "Vuoi veramente eliminare questo elemento?",
        unsavedData: "Uscire dalla pagina?",
        confirmLeaveChanges: "I dati non sono ancora stati salvati.",
        fetchingData: "Caricamento in corso...",
        login: "Login",
        loginError:
            "Impossibile effettuare il login in questo momento. Riprova più tardi.",
        logout: "Esci",
        // Elements
        name: "Nome",
        description: "Descrizione",
        mime: "Tipo MIME",
        fileName: "Nome File",
        folder: "Cartella",
        created: "Creato il",
        size: "Dimensioni",
        altTag: "Alt Tag",
        titleTag: "Title Tag",
        linkedModels: "Modelli collegati",
        searchLocation: "Cerca luogo",
        latitude: "Latitudine",
        longitude: "Longitudine",

        // pages/index.vue
        index: {
            welcomeMessage:
                "Congratulazioni!! 🥳 Mapo è stato installato correttamente!",
        },

        // ConfirmDialog.vue
        confirmDialog: {
            areYouSure: "Sei sicuro di ciò che vuoi fare?",
        },
        // DropArea.vue
        dropArea: {
            dropOrClick:
                "Trascina qui i tuoi file, o clicca per selezionarne uno",
            onlyOneFile: "È possibile caricare un solo file alla volta...",
        },

        // Form/fields/MediaField.vue
        mediaField: { confirmRemove: "Vuoi veramente rimuovere questo media?" },
        // Form/fields/MediaM2mField.vue
        mediaM2MField: {
            mediaCarousel: "Galleria Media",
            editSelection: "Modifica selezione",
        },
        // Form/fields/Repeater.vue
        repeater: {
            addHere: "Aggiungi qui",
            selectTemplate: "Seleziona template",
            item: "Elemento n.{numberItem}",
        },
        // Form/fields/SeoPreview.vue
        seoPreview: {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description:
                "Questa è una descrizione di esempio che verrà sostituita non appena inizierai a compilare i campi. Assicurati che le descrizioni siano mobile-friendly e keyword-rich!",
        },

        // List/List.vue
        list: {
            allSelected: "Tutti gli elementi selezionati",
            NSelected: "{numberItems} elementi selezionati",
            selectAll: "Seleziona tutti",
        },
        // List/ListActions.vue
        listActions: {
            groupActions: "Azioni di gruppo",
            permanentDelete: "Eliminazione permanente",
            selectionRequired: "Devi selezionare almeno un elemento",
        },
        // List/ListFilters.vue
        listFilters: { filter: "Filtra" },
        // List/ListHead.vue
        listHead: { addNew: "Aggiungi nuovo" },
        // List/ListQuickEdit.vue
        listQuickEdit: {
            badInput: "Alcuni campi sono compilati in modo errato.",
        },
        // List/ListTable.vue
        listTable: {
            quickAdd: "Aggiunta veloce",
            toggleOrder: "Attiva/Disattiva riordinamento elementi",
            errorOrder: "Riordinamento fallito",
        },
        // MenuManager/MenuNodeEditor.vue
        menuNodeEditor: {
            editNode: "Nodo",
            title: "Titolo",
            linkTypeLabel: "Tipo di link",
            styleLabel: "Stile",
            openInNewTabLabel: "Apri in una nuova finestra",
            relContentTypeLabel: "Tipo di pagina",
            relPageIdLabel: "Pagina",
            staticLabel: "Url Statica",
            relational: "Relazionale",
            static: "Statico",
        },
        // MenuManager/MenuManager.vue
        menuManager: {
            noSelectedNode: "Seleziona un nodo o creane uno nuovo."
        },
        // MenuManager/MenuTreeview.vue
        menuTreeview:{
            newNode: "Crea nodo",
            noRootNodes: "Non c'è nessun nodo qui, creane uno nuovo!",
            areYouSureDelete: "Sei sicuro di voler eliminare questo nodo e tutti i suoi discendenti?"
        },
        // MediaManager/MediaEditor.vue
        mediaEditor: {
            changeFile: "Cambia File",
            maintainOldUrl: "Mantieni URL precedente",
            confirmDelete: "Vuoi veramente eliminare questo media?",
            details: "Dettagli",
        },
        // MediaManager/MediaFolders.vue
        mediaFolders: {
            goBack: "Torna indietro",
            noFolders: "Non sono presenti cartelle... Creane una!",
            newFolder: "Crea nuova cartella",
            imageFolder: "Tutte le immagini",
            videoFolder: "Tutti i video",
            audioFolder: "Tutti gli audio",
            docFolder: "Tutti i documenti",
            editFolder: "Modifica cartella",
            folderName: "Nome cartella",
            confirmDelete:
                "Vuoi veramente eliminare questa cartella e tutti i suoi contenuti?",
        },
        // MediaManager/MediaGallery.vue
        mediaGallery: {
            noMediaFound: "Nessun media individuato...",
            selectAll: "Seleziona pagina",
            deselectAll: "Deseleziona pagina",
            selectedAssets: "elementi selezionati",
            deleteSelected: "Stai per eliminare {number} elementi. Vuoi proseguire?",
            deleteSuccess: "{number} elementi eliminati!"
        },
        // MediaManager/MediaManager.vue
        mediaManager: {
            gallery: "Galleria",
            uploader: "Caricamento Media",
            fileInfo: "File info succesfully updated",
        },
        // MediaManager/MediaUploader.vue
        mediaUploader: { optimizingFiles: "Ottimizzazione dei file..", uploadingFiles: "Upload dei file..", success: "{numberFiles} file caricati", tooLarge: "Attenzione! Ottimizza prima di caricare!" },
    },
};

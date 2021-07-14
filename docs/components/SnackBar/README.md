# SnackBar

This component is embedded in the default layout. It remains hidden watching for changes in vuex status 'mapo/app/snackbar'. If a message is gained from the vuex getter, it shows up revealing the message. To open the snakbar from wherever you want, you can simply use this.$mapo.$snack.open({...props}});


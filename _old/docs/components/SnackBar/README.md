# SnackBar

This component is embedded in the default layout. It remains hidden watching for changes in vuex status 'mapo/app/snackbar'. If a message is gained from the vuex getter, it shows up revealing the message.<br><br> To open the snakbar from wherever you want, you can refer to [this.$mapo.$snack.open](/core/#snack);


### Example usage:

```js
this.$mapo.$snack.open({
  message: "Only one file can be uploaded at a time..",
  color: "error",
});
```


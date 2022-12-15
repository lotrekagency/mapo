<template>
  <div class="d-flex flex-column fill-height">
    <Form v-bind="$attrs" :fields="fields"> </Form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    fields() {
      return [
        {
          group: {
            name: "groupTest",
          },
          fields: [
            {
              value: "textValueTest",
              label: "textLabelTest",
              type: "text",
            },
            {
              value: "dateValueTest",
              label: "dateLabelTest",
              type: "date",
            },
            {
              value: "datetimeValueTest",
              label: "datetimeLabelTest",
              type: "datetime",
            }
          ]
        }
      ]
    }
  }
};
</script>

<template>
  <div style="background: black">
    <v-checkbox
      v-for="(option, id) in options" :key="id"
      :label="option"
      :input-value="isSelected(id)"
      @change="changed($event, id)"
    >
    </v-checkbox>
  </div>
</template>

<script>
export default {

  props: {
    value: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    }
  },

  methods: {
    isSelected(id){
      for(let selection of this.value){
        if(selection == id){
          return true
        }
      }
      return false
    },
    changed(value, id){
      id=parseInt(id)
      let newArr = [...this.value]
      if(value){
        newArr.push(id)
        this.$emit('input', newArr)
      }
      else{
        for(let i in newArr){
          if(newArr[i] == id){
            newArr.splice(i, 1)
            this.$emit('input', newArr)
            break
          }
        }
      }

    }
  }
}
</script>
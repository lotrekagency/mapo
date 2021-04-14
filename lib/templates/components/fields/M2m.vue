<template>
  <div>
    <v-checkbox
      v-for="(option, index) in options" :key="index"
      :label="option[label]"
      :input-value="isSelected(option[id])"
      :light="!dark"
      :dark="dark"
      @change="changed($event, option[id])"
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
      type: Array,
      required: true,
    },
    id: {
      type: String | Number,
      default: 'id'
    },
    label: {
      type: String | Number,
      default: 'label'
    },
    dark: {
      type: Boolean,
      default: false,
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
      }
      else{
        for(let i in newArr){
          if(newArr[i] == id){
            newArr.splice(i, 1)
            break
          }
        }
      }
      this.$emit('input', newArr)

    }
  }
}
</script>
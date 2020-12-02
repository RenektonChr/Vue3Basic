<template>
  <img :src="result && result.message">
</template>

<script>
import { defineComponent } from "vue"
import axios from 'axios'

export default defineComponent({
  async setup() {
    const rowData = await axios.get('https://dog.ceo/api/breeds/image/random')
    return {
      result: rowData.data
    }
  }
})
</script>

<style>

</style>
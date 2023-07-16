<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot/>
  </div>
</template>

<script>
export default {
  // TODO: [ emit ]
  methods: {
    onDrop (e) {
      // данные того, что приземлилось
      const transferData = JSON.parse(e.dataTransfer.getData('payload'))

      this.$emit('drop', transferData)
    }
  }
}
</script>

<style lang="css" scoped>
</style>

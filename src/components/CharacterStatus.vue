<template>
  <div class="status">
    <img v-if="status === 'Alive'" src="@/assets/icons/alive.png" :alt="status">
    <img v-else-if="status === 'Dead'" src="@/assets/icons/dead.png" :alt="status">
    <img v-else src="@/assets/icons/int-point.png" :alt="status">
  </div>
</template>

<script>
export default {
  name: "CharacterStatus",
  props: {
    status: String
  },
}
</script>

<style scoped>

</style>

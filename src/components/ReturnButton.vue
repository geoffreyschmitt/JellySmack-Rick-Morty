<template>
  <button class="return-btn" type="button" v-on:click="$router.go(-1)">Retour</button>
</template>

<script>
export default {
  name: "ReturnButton"
}
</script>

<style scoped>
.return-btn {
  cursor     : pointer;
  color      : white;
  background : var(--color-primary);
  font-size  : calc(14px + (16 - 14) * ((100vw - 320px) / (1920 - 320)));
  padding    : .5em 1.25em;
  border     : none;
}
</style>

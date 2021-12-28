<template>
  <header class="main-header">
    <router-link class="header__logo" to="/">
      <img alt="Rick & Morty logo" src="../assets/logo.png">
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.main-header {
  background          : var(--color-primary) url(../assets/cucumber.png);
  background-repeat   : no-repeat;
  background-position : 96% 100%;
  padding             : 0 4%;
  display             : flex;
  justify-content     : space-between;
  align-items         : center;
}
</style>

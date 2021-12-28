<template>
  <div class="layout">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './Header';

export default {
  components: {
    Header
  },
  name: "BaseLayout"
}
</script>

<style scoped>

.main-header + .content {
  padding-top : 1.5rem;
}
</style>

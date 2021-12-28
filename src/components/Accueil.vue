<template>
  <main class="homepage" :class="{'homepage-loaded':loaded}">
    <picture class="entrance-img">
      <source srcset="../assets/home-portal@0.5x.png"
              media="(max-height: 500px)" @load="loadedEntranceImg">
      <img src="../assets/home-portal.png" alt="Rick et Morty" @load="loadedEntranceImg"/>
    </picture>
    <router-link class="btn btn-discover" to="/characters">Découvrir</router-link>
  </main>
</template>

<script>
export default {
  name: "Accueil",
  data() {
    return {
      loaded: false
    };
  },
  methods: {
    loadedEntranceImg() {
      this.loaded = true
    }
  }
}
</script>

<style scoped>
.homepage {
  position        : relative;
  height          : 100vh;
  background      : var(--color-tertiary) url(../assets/home-bg.jpg);
  background-size : cover;
  display         : flex;
  justify-content : center;
  /*align-items     : center;*/
}

.homepage .entrance-img {
  opacity    : 0;
  max-height : 550px;
  transition : all .7s ease-in-out;
}

.homepage-loaded .entrance-img {
  opacity : 1;
}

.btn-discover {
  opacity    : 0;
  transition : all .3s ease-in-out .6s;
  position   : absolute;
  top        : 50%;
  transform  : translate3d(0, 0, 0);
}

.homepage-loaded .btn-discover {
  opacity   : 1;
  transform : translate3d(0, -50%, 0);
}
</style>

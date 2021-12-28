<template>
  <div class="character-card" :class="{'character-card--skeleton' : !isLoaded}">
    <CharacterCardDetail v-if="isLoaded" :character="character"/>
    <CharacterCardSkeletonDetail v-else/>
  </div>
</template>

<script>
import CharacterCardDetail from './CharacterCardDetail';
import CharacterCardSkeletonDetail from './CharacterCardSkeletonDetail';

export default {
  components: {
    CharacterCardDetail,
    CharacterCardSkeletonDetail,
  },
  name: 'CharacterCard',
  props: {
    character: Object
  },
  data() {
    return {
      isLoaded: false
    };
  },
  created: function () {
    let img = new Image();

    img.onload = () => {
      this.onImgLoad();
    }
    img.src = this.character.image;
  },
  methods: {
    onImgLoad() {
      this.isLoaded = true
    }
  }
}
</script>

<style scoped>
.character-card {
  border : 1px solid #dddbdd;
}
</style>

<template>
  <div class="character-card-details">
    <div class="character-card__image-wrapper">
      <img class="character-card__image" :src="character.image" :alt="'avatar ' + character.name">
    </div>
    <div class="character-card__name">
      {{ character.name }}
    </div>
    <div class="character-card__infos">
      <div class="character-card__status">
        <CharacterStatus :status="character.status" />
      </div>
      <div class="character-card__gender">
        <CharacterGender :gender="character.gender" />
      </div>
    </div>
    <div class="character-card__species">
      {{ character.species }}
    </div>

    <router-link
        class="btn character-card__btn"
        :to="{name: 'character', params: {id: character.id}}">
      En savoir plus
    </router-link>
  </div>
</template>

<script>
import CharacterStatus from "@/components/CharacterStatus"
import CharacterGender from "@/components/CharacterGender"

export default {
  components: {
    CharacterStatus,
    CharacterGender,
  },
  name: "CharacterCardDetail",
  props: {
    character: Object
  },
}
</script>

<style scoped>
.character-card-details {
  height         : 100%;
  display        : flex;
  flex-direction : column;
  align-items    : center;
}

.character-card__image-wrapper {
  position         : relative;
  width            : 100%;
  padding-bottom   : 100%;
  background-color : #DDDBDD;
}

.character-card__image {
  position : absolute;
  top      : 0;
  left     : 0;
  width    : 100%;
  height   : 100%;
}

.character-card__name,
.character-card__infos,
.character-card__btn {
  width     : 100%;
  max-width : calc(100% - 2rem);
  margin    : 0 auto;
}

.character-card__name {
  text-align    : center;
  font-size     : calc(16px + (20 - 16) * ((100vw - 320px) / (1920 - 320)));
  margin-top    : .75em;
  margin-bottom : auto;
}

.character-card__infos {
  margin          : .75rem 0 .5rem;
  width           : 100%;
  display         : flex;
  justify-content : space-around;
}

.character-card__species {
  margin : .25rem 0 .5rem;
}

.character-card__btn {
  text-align    : center;
  margin-bottom : 1rem;
}
</style>

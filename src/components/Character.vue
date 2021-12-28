<template>
  <section class="character">
    <header class="character__header">
      <div class="character__header-bg"></div>
      <img class="character__image" :src="character.image" :alt="'avatar ' +  character.name">
      <div class="character__name">{{ character.name }}</div>
      <div class="character__infos">
        <div v-if="character.status" class="character__info character__status">
          <span class="character__info-title">Status</span>
          <span class="character__info-content"><CharacterStatus :status="character.status"/></span>
        </div>
        <div v-if="character.gender" class="character__info character__gender">
          <span class="character__info-title">Genre</span>
          <span class="character__info-content"><CharacterGender :gender="character.gender"/></span>
        </div>
        <div v-if="character.species" class="character__info character__species">
          <span class="character__info-title">Espèce</span>
          <span class="character__info-content">{{ character.species }}</span>
        </div>
        <div v-if="character.type" class="character__info character__type">
          <span class="character__info-title">Type</span>
          <span class="character__info-content">{{ character.type }}</span>
        </div>
        <ReturnButton/>
      </div>
    </header>
    <section class="character-section character__origin">
      <div class="character-section__title">Origine</div>
      <div class="character-section__content">{{ character.origin.name }}</div>
    </section>
    <section class="character-section character__location">
      <div class="character-section__title">Localisation</div>
      <div class="character-section__content">{{ character.location.name }}</div>
    </section>
    <section v-if="episodes.length" class="character-section character__episodes">
      <div class="character-section__title">Liste des épisodes ou le personnage est présent</div>
      <div class="character-section__content episodes-list">
        <span class="episode-item" v-for="episode in episodes" :key="episode">{{ episode.episode }} - {{episode.air_date}} - {{ episode.name }}</span>
      </div>
    </section>
  </section>
</template>

<script>
import ReturnButton from "@/components/ReturnButton"
import CharacterStatus from "@/components/CharacterStatus"
import CharacterGender from "@/components/CharacterGender"

export default {
  components: {
    CharacterStatus,
    CharacterGender,
    ReturnButton
  },
  name: "Character",
  props: {
    id: {
      type: Number,
      default: null
    },
  },
  data() {
    return {
      charactersPage: `https://rickandmortyapi.com/api/character/${this.$props.id}`,
      character: {},
      episodes: [],
    };
  },
  created() {
    this.updatePageData();
  },
  methods: {
    async updatePageData() {
      const response = await fetch(this.charactersPage);
      this.character = await response.json();

      for (const episodeApiUrl of this.character.episode) {
        const episodeResponse = await fetch(episodeApiUrl);
        this.episodes.push(await episodeResponse.json());
      }
    },
  }
}
</script>

<style scoped>
.character__header {
  display               : grid;
  grid-template-columns : 4% auto 1fr 4%;
  grid-template-rows    : 2fr 1fr;
}

.character__header > .character__header-bg {
  grid-column : 1/-1;
  grid-row    : 1;
  background  : var(--color-secondary);
}

.character__header > .character__image {
  grid-column : 2;
  grid-row    : 1/3;
  padding     : 1rem 0;
}

.character__header > .character__name {
  grid-column    : 3;
  grid-row       : 1;
  padding        : 0 1.5rem;
  font-family    : 'Get Schwifty', arial, sans-serif;
  color          : var(--color-quaternary);
  font-size      : calc(35px + (70 - 35) * ((100vw - 320px) / (1920 - 320)));
  letter-spacing : 0.025em;
  text-shadow    : 0 0 10px var(--color-primary);
}

.character__image {
  border-radius : 50%;
}

.character__header > .character__infos {
  grid-column : 3;
  grid-row    : 2;
  padding     : 0 1.5rem;
}

.character__name {
  display     : flex;
  align-items : center;
}

.character__infos {
  display     : flex;
  align-items : center;
}

.character__info {
  display        : flex;
  flex-direction : column;
}

.character__info .character__info-title {
  text-align : center;
}

.character__info .character__info-content {
  margin-top      : .25rem;
  flex            : 1 0 2.5rem;
  display         : flex;
  justify-content : center;
  align-items     : center;
}

.character__info + .character__info {
  padding-left : 1.5rem;
}

.character__infos > .return-btn {
  margin-left : auto;
}

.character-section {
  padding : 1rem 4%;
}

.character-section .character-section__title {
  margin-bottom : 1rem;
}

.character-section__title {
  position       : relative;
  font-size      : calc(25px + (35 - 25) * ((100vw - 320px) / (1920 - 320)));
  padding-bottom : .25em;
  color          : var(--color-quaternary);
}

.character-section__title:after {
  content    : '';
  position   : absolute;
  bottom     : 0;
  left       : 0;
  width      : 3rem;
  height     : 2px;
  background : var(--color-secondary);
}

.episodes-list {
  display        : flex;
  flex-direction : column;
}

.episodes-list .episode-item + .episode-item {
  padding-top : .5rem;
}
</style>

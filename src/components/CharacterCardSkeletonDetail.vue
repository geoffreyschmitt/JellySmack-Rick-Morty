<template>
  <div class="character-card-skeleton-detail">
    <div class="character-card-skeleton-detail__image-placeholder"></div>
    <div class="character-card-skeleton-detail__name-placeholder"></div>
    <div class="character-card-skeleton-detail__infos-placeholder">
      <div class="character-card-skeleton-detail__info-placeholder"></div>
      <div class="character-card-skeleton-detail__info-placeholder"></div>
      <div class="character-card-skeleton-detail__info-placeholder"></div>
    </div>
    <div class="character-card-skeleton-detail__btn-placeholder"></div>
  </div>
</template>

<script>
export default {
  name: "CharacterCardSkeletton"
}
</script>

<style scoped>
.character-card-skeleton-detail {
  width : 100%;
}

.character-card-skeleton-detail__image-placeholder,
.character-card-skeleton-detail__name-placeholder,
.character-card-skeleton-detail__info-placeholder,
.character-card-skeleton-detail__btn-placeholder {
  background-color : #DDDBDD;
  position         : relative;
  overflow         : hidden;
}

.character-card-skeleton-detail__image-placeholder {
  padding-bottom : 100%;
}

.character-card-skeleton-detail__name-placeholder {
  height    : 23px;
  font-size : calc(16px + (20 - 16) * ((100vw - 320px) / (1920 - 320)));
  max-width : 40%;
  margin    : 0.75em auto 0;
}

.character-card-skeleton-detail__infos-placeholder {
  margin          : 0.75rem 0;
  display         : flex;
  justify-content : space-around;
}

.character-card-skeleton-detail__info-placeholder {
  width  : 25px;
  height : 25px;
}

.character-card-skeleton-detail__btn-placeholder {
  height        : 34px;
  max-width     : calc(100% - 2rem);
  margin: 0 auto;
  margin-bottom : 1rem;
}

.character-card-skeleton-detail__image-placeholder::after,
.character-card-skeleton-detail__name-placeholder::after,
.character-card-skeleton-detail__info-placeholder::after,
.character-card-skeleton-detail__btn-placeholder::after {
  position         : absolute;
  top              : 0;
  right            : 0;
  bottom           : 0;
  left             : 0;
  transform        : translateX(-100%);
  background-image : linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
  );
  animation        : shimmer 5s infinite;
  content          : '';
}

@keyframes shimmer {
  100% {
    transform : translateX(100%);
  }
}

</style>

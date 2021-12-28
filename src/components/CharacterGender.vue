<template>

  <div class="gender">
    <img v-if="gender === 'Male'" src="@/assets/icons/gender-m.png" :alt="gender">
    <img v-else-if="gender === 'Female'" src="@/assets/icons/gender-f.png" :alt="gender">
    <img v-else-if="gender === 'Genderless'" src="@/assets/icons/gender-fm.png" :alt="gender">
    <img v-else src="@/assets/icons/int-point.png" :alt="gender">
  </div>
</template>

<script>
export default {
  name: "CharacterGender",
  props: {
    gender: String
  },
}
</script>

<style scoped>

</style>

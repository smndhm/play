<template>
  <img
    class="user"
    :class="{
      'user-creator': user.isCreator,
      'user-current': user.isCurrentUser
    }"
    :src="`${user.picture}?size=small`"
    :alt="user.name"
  />
</template>

<script>
export default {
  name: "Avatar",
  props: {
    user: { type: Object, required: true }
  }
};
</script>

<style lang="scss" scoped>
.user {
  @apply rounded-full ring-2 ring-white;
}
</style>

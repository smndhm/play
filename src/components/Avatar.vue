<template>
  <img
    class="user"
    :class="{
      'user-creator': user.isCreator,
      'user-current': user.isCurrent,
    }"
    :src="`${user.picture}?size=small`"
    :alt="user.name"
  />
</template>

<script>
export default {
  name: "Avatar",
  props: {
    user: { type: Object, required: true },
  },
};
</script>

<style lang="scss" scoped>
.user {
  @apply rounded-full ring-2 ring-white;
  &.user-creator {
    @apply ring-offset-2 ring-blue-400;
  }
  &.user-current {
    @apply ring-blue-300;
    &.user-creator {
      @apply ring-offset-0 ring-blue-400;
    }
  }
}
</style>

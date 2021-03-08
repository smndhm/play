<template>
  <main id="home">
    <h2>
      Les grands évènements méritent
      <span>une bande son sans fausse note</span>
    </h2>
    <p>
      Anniversaires, mariages, soirées :<br />constituez la playlist parfaite
      avec vos amis.
    </p>
    <div class="actions">
      <router-link class="btn" to="/lists">Commencer</router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="scss">
main {
  @apply text-center text-gray-900 max-w-2xl mx-auto px-4 py-16;
  h2 {
    @apply text-4xl font-extrabold;
    span {
      @apply text-blue-600;
    }
  }
  p {
    @apply text-xl font-semibold text-gray-700 py-4;
  }
}
/**
  Button
  .btn
 */
.btn {
  // display
  @apply inline-block;
  // spacing
  @apply py-3 px-6;
  // styling
  @apply rounded-full bg-blue-600 hover:bg-blue-700;
  // font
  @apply text-white font-extrabold text-xl;
  /** .btn.btn-small */
  &.btn-block {
    @apply w-full;
  }
  /** disabled */
  &[disabled] {
    @apply bg-gray-300 cursor-not-allowed;
  }
}
</style>

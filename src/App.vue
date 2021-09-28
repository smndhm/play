<template>
  <div id="dz-root"></div>
  <header>
    <h1><router-link to="/">Play</router-link></h1>
  </header>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss" scoped>
header {
  @apply bg-black flex items-center h-16 px-4;
  h1 {
    @apply text-2xl font-extrabold text-white;
  }
}
</style>

<style lang="scss">
#dzplayer {
  visibility: hidden;
}
</style>

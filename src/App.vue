<template>
  <div id="dz-root"></div>
  <header>
    <h1><router-link to="/">Play</router-link></h1>
  </header>
  <router-view />
</template>

<script>
/*global DZ*/
export default {
  methods: {
    init() {
      /* Init Deezer SDK */
      DZ.init({
        appId: document.location.host === "smndhm.github.io" ? 255742 : 153461,
        channelUrl: `${document.location.origin}${document.location.pathname}channel.html`,
        player: {
          onload: (dzInit) => {
            console.log("DZ.init", dzInit); // eslint-disable-line no-console
          },
        },
      });
    },
  },
  mounted() {
    window.dzAsyncInit = () => {
      this.init();
    };
    (() => {
      var e = document.createElement("script");
      e.src = "https://e-cdns-files.dzcdn.net/js/min/dz.js";
      e.async = true;
      document.getElementById("dz-root").appendChild(e);
    })();
  },
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

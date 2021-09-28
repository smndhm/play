<template>
  <main id="login">
    <h2>Connectez-vous</h2>
    <p>Pour continuer connectez-vous avec votre service de streaming</p>
    <div class="actions">
      <a class="btn" :href="deezerHref">
        Se connecter avec Deezer
      </a>
      <a class="btn" :href="spotifyHref">
        Se connecter avec Spotify
      </a>
    </div>
  </main>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      platforms: {
        spotify: {
          clientId: "0566ca591a9743be8639473c4857557a",
          scopes: [
            "user-read-private",
            "user-read-email",
            "user-library-read",
            "user-top-read",
            "playlist-read-private",
          ],
        },
        deezer: {
          app_id:
            document.location.host === "smndhm.github.io" ? 100004 : 153461,
          perms: ["basic_access"],
        },
      },
    };
  },
  mounted() {
    console.log(this.$router);
    // set access token
    if (this.$router?.currentRoute?._value?.query?.access_token) {
      localStorage.accessToken = JSON.stringify({
        platform:
          this.$router?.currentRoute?._value?.query?.platform === "deezer"
            ? "deezer"
            : "spotify",
        token: this.$router.currentRoute._value.query.access_token,
      });
      this.$router.push(this.$route.query.redirect || "/lists"); // default redirect to /lists
    }
  },
  computed: {
    spotifyHref() {
      const [url] = window.location.href.split("?");
      return `https://accounts.spotify.com/authorize?response_type=code&client_id=${
        this.platforms.spotify.clientId
      }&scope=${encodeURIComponent(
        this.platforms.spotify.scopes.join(" ")
      )}&redirect_uri=${encodeURIComponent(
        `https://europe-west1-playback-smndhm.cloudfunctions.net/app/authorize/spotify`
        //`http://127.0.0.1:5001/playback-smndhm/europe-west1/app/authorize/spotify`
      )}${
        this.$router?.currentRoute?._value?.query?.redirect
          ? `&state=${encodeURIComponent(
              `${url}?redirect=${this.$router.currentRoute._value.query.redirect}&platform=spotify`
            )}`
          : ""
      }`;
    },
    deezerHref() {
      const [url] = window.location.href.split("?");
      return `https://connect.deezer.com/oauth/auth.php?app_id=${
        this.platforms.deezer.app_id
      }&scope=${encodeURIComponent(
        this.platforms.deezer.perms.join(" ")
      )}&redirect_uri=${encodeURIComponent(
        `https://europe-west1-playback-smndhm.cloudfunctions.net/app/authorize/deezer`
        // `http://127.0.0.1:5001/playback-smndhm/europe-west1/app/authorize/deezer`
      )}${
        this.$router?.currentRoute?._value?.query?.redirect
          ? `&state=${encodeURIComponent(
              encodeURIComponent(
                `${url}?redirect=${this.$router.currentRoute._value.query.redirect}&platform=deezer`
              )
            )}`
          : ""
      }`;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.actions {
  .btn {
    @apply m-2;
  }
}
</style>

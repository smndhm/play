<template>
  <main id="login">
    <h2>Connectez-vous</h2>
    <p>Pour continuer connectez-vous avec votre service de streaming</p>
    <div class="actions">
      <button role="button" class="btn" @click="login('deezer')">
        Se connecter avec Deezer
      </button>
      <button
        role="button"
        class="btn"
        dibsabled
        @click="login('spotify')"
        disabled
      >
        Se connecter avec Spotify
      </button>
    </div>
  </main>
</template>

<script>
/*global DZ*/
export default {
  name: "Home",
  methods: {
    login(platform) {
      if (platform === "deezer") {
        DZ.login(
          ({ authResponse, authInitDate }) => {
            console.log(authResponse, authInitDate);
            if (authResponse.accessToken) {
              localStorage.accessToken = JSON.stringify({
                platform,
                token: authResponse.accessToken,
                expire: Math.floor(authInitDate / 1000 + authResponse.expire)
              });
              this.$router.push(this.$route.query.redirect || "/lists"); // default redirect to /lists
            }
          },
          { perms: "basic_access" }
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.actions {
  .btn {
    @apply m-2;
  }
}
</style>

<template>
  <h3>{{ track.title }}</h3>
  <ul>
    <template v-if="track.users.length > 1">
      <!-- favorites -->
      <li v-if="favorites.length">
        Dans les favoris de
        <a
          v-for="{ name, link } in favorites"
          :key="link"
          :href="link"
          class="comma-separated"
          >{{ name }}</a
        >.
      </li>
      <!-- Charts -->
      <li v-if="charts.length">
        Titre du moment de
        <a
          v-for="{ name, link } in charts"
          :key="link"
          :href="link"
          class="comma-separated"
          >{{ name }}</a
        >.
      </li>
      <!-- Playlists -->
      <li v-for="{ name, link, playlists } in playlists" :key="link">
        Dans la playlist
        <a
          v-for="{ title, link } in playlists"
          :key="link"
          :href="link"
          class="comma-separated"
          >{{ title }}</a
        >
        de <a :href="link">{{ name }}</a
        >.
      </li>
    </template>
    <template v-if="track.users.length === 1">
      <li>
        Ce titre est pour <a :href="userTrack.link">{{ userTrack.name }}</a
        >.
      </li>
      <li>Présent dans les favoris.</li>
      <li>Présent dans les titres du moment.</li>
      <li v-for="{ link, playlists } in playlists" :key="link">
        Présent dans la playlist
        <a
          v-for="{ title, link } in playlists"
          :key="link"
          :href="link"
          class="comma-separated"
          >{{ title }}</a
        >.
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "dataTrack",
  props: {
    track: { type: Object, required: true },
    users: { type: Array, required: true },
  },
  methods: {
    getUserData(userId) {
      return this.users.find((user) => user.id === userId);
    },
  },
  computed: {
    favorites() {
      return this.track.users.reduce((acc, user) => {
        if (user.favorite) acc.push(this.getUserData(user.id));
        return acc;
      }, []);
    },
    charts() {
      return this.track.users.reduce((acc, user) => {
        if (user.chart) acc.push(this.getUserData(user.id));
        return acc;
      }, []);
    },
    playlists() {
      return this.track.users.reduce((acc, user) => {
        if (user.playlists) {
          const userData = this.getUserData(user.id);
          userData.playlists = user.playlists;
          acc.push(userData);
        }
        return acc;
      }, []);
    },
    userTrack() {
      return this.playlists[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.comma-separated + .comma-separated:before {
  content: ", ";
}
h3 {
  @apply font-extrabold text-2xl;
}
p {
  @app;
}
</style>

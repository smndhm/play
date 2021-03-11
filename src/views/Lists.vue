<template>
  <main id="lists">
    <h2>Mes listes</h2>
    <p>Retrouvez ici les listes auxquelles vous participez.</p>
    <ul>
      <li v-for="list in lists" :key="list.id">
        <router-link :to="`/lists/${list.id}`" class="list-item">
          <div class="users">
            <avatar v-for="user in list.users" :key="user.id" :user="user" />
          </div>
          <span class="others">{{ others(list.users) }}</span>
        </router-link>
      </li>
    </ul>
    <div class="actions">
      <button
        role="button"
        class="btn btn-block"
        :disabled="loading"
        @click="create"
      >
        Créer une liste
      </button>
    </div>
  </main>
</template>

<script>
import playback from "@/playback.service";
import Avatar from "@/components/Avatar.vue";
export default {
  name: "Home",
  components: {
    Avatar,
  },
  data() {
    return {
      loading: true,
      lists: [],
    };
  },
  methods: {
    initApi() {
      const { platform, token } = JSON.parse(localStorage.accessToken);
      playback.setHeaders(platform, token);
    },
    async create() {
      try {
        this.loading = true;
        const { id } = await playback.createList();
        this.$router.push(`/lists/${id}`);
      } catch (err) {
        console.error(err);
        // TODO display error
      } finally {
        this.loading = false;
      }
    },
    others(users) {
      const others = users
        .filter((user) => !user.isCurrent)
        .map((user) => user.name)
        .join(", ");
      if (others.length) return `Avec ${others}`;
      else return "Liste vide";
    },
  },
  async created() {
    this.initApi();
    this.lists = await playback.getLists();
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
main {
  @apply text-left;
  .others {
    @apply text-xl ml-2;
  }
}
</style>

<style lang="scss">
.list-item {
  @apply flex items-center rounded-full p-2 m-1 bg-blue-50 mb-4 transition-colors hover:bg-blue-100;
}
.users {
  @apply flex-shrink-0 inline-flex align-middle;
  .user + .user {
    @apply -ml-6;
  }
}
</style>

<template>
  <main id="list">
    <!-- 
    <h2>List</h2>
    <p>This is the list {{ id }}</p>
    <button role="button" class="btn" @click="join">Join</button>
    <button role="button" class="btn" @click="leave">Leave</button>
    -->
    <h2>Liste avec</h2>
    <ul>
      <li class="users" v-for="user in data.users" :key="user.id">
        <avatar :user="user" />
      </li>
    </ul>
    <ul>
      <li>
        <data-track
          v-for="track in data.trackList"
          :key="track.id"
          :track="track"
          :users="data.users"
        />
      </li>
    </ul>
  </main>
</template>

<script>
import playback from "@/playback.service";
import Avatar from "@/components/Avatar.vue";
import dataTrack from "@/components/dataTrack.vue";

export default {
  name: "Home",
  components: {
    Avatar,
    dataTrack
  },
  data() {
    return {
      id: this.$route.params.reference,
      data: {}
    };
  },
  methods: {
    initApi() {
      const { platform, token } = JSON.parse(localStorage.accessToken);
      playback.setHeaders(platform, token);
    },
    async join() {
      this.data = await playback.joinList(this.id);
      console.log(this.data);
    },
    async leave() {
      try {
        this.data = await playback.leaveList(this.id);
        console.log(this.data);
      } catch (err) {
        console.error(err);
        this.$router.push("/lists");
      }
    }
  },
  computed: {},
  async created() {
    try {
      this.initApi();
      this.data = await playback.getList(this.id);
    } catch (err) {
      console.error(err);
      this.$router.push("/lists");
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  @apply text-left;
}
</style>

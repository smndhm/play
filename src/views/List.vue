<template>
  <main id="list">
    <div id="users">
      <ul class="users">
        <li class="user" v-for="user in data.users" :key="user.id">
          <avatar :user="user" />
        </li>
      </ul>
      <button role="button" class="btn" @click="join">Join</button>
      <button role="button" class="btn" @click="leave">Leave</button>
    </div>

    <div id="play">
      <button role="button" class="btn" @click="play">Play</button>
    </div>

    <ul id="tracklist" class="list-item">
      <li v-for="track in data.trackList" :key="track.id">
        <data-track :track="track" :users="data.users" />
      </li>
    </ul>
  </main>
</template>

<script>
/*global DZ*/
import playback from "@/playback.service";
import Avatar from "@/components/Avatar.vue";
import dataTrack from "@/components/dataTrack.vue";

export default {
  name: "Home",
  components: {
    Avatar,
    dataTrack,
  },
  data() {
    return {
      id: this.$route.params.reference,
      data: {},
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
    },
    play() {
      DZ.player.playTracks(this.tracks, ({ tracks }) => {
        console.log("blu", tracks);
      });
    },
  },
  computed: {
    tracks() {
      return this.data.trackList.map((track) => track.id);
    },
  },
  async created() {
    try {
      this.initApi();
      this.data = await playback.getList(this.id);
    } catch (err) {
      console.error(err);
      this.$router.push("/lists");
    }
  },
  mounted() {
    DZ.ready((dzReady) => {
      console.log("DZ.ready", dzReady);
      // Load tracks
      DZ.player.playTracks(this.tracks, false, ({ tracks }) => {
        console.log("DZ.player.playTracks", tracks);
      });
      DZ.Event.subscribe("current_track", function() {
        console.log("current_track", arguments);
      });
    });
  },
};
</script>

<style lang="scss" scoped>
main {
  @apply text-center;
  .list-item {
    @apply text-left;
  }
}
</style>

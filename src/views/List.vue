<template>
  <main id="list">
    <aside>
      <!-- <button role="button" class="btn" @click="play">Ecouter</button> -->
      <div>
        <ul class="users">
          <li class="user" v-for="user in data.users" :key="user.id">
            <avatar :user="user" />
          </li>
        </ul>
        <!-- <div class="actions">
          <button role="button" class="btn" @click="join" v-if="!hasJoined">
            Rejoindre
          </button>
          <button role="button" class="btn" @click="leave" v-else>
            Quitter
          </button>
        </div> -->
      </div>
    </aside>

    <ul id="tracklist" class="list">
      <li v-for="track in data.trackList" :key="track.id" class="list-item">
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
      console.log(this.tracks.join(","));
      DZ.player.playTracks(this.tracks, ({ tracks }) => {
        console.log("blu", tracks);
      });
    },
  },
  computed: {
    hasJoined() {
      return this.data.users && this.data.users.some((user) => user.isCurrent);
    },
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
    // DZ.ready((dzReady) => {
    //   console.log("DZ.ready", dzReady);
    //   // Load tracks
    //   console.log(this.tracks);
    //   DZ.player.playTracks(this.tracks, false, ({ tracks }) => {
    //     console.log("DZ.player.playTracks", tracks, tracks.join(","));
    //   });
    //   DZ.Event.subscribe("current_track", function() {
    //     console.log("current_track", arguments);
    //   });
    // });
  },
};
</script>

<style lang="scss" scoped>
main {
  @apply text-left;
  aside {
    @apply flex justify-between;
    .users {
      @apply relative z-10;
    }
    .actions {
      @apply -ml-6 inline relative z-0;
      .btn {
        @apply py-2 pl-8 pr-3 text-base;
      }
    }
  }
  .list-item {
    @apply py-4 px-6;
  }
  #tracklist {
    @apply pt-4;
  }
}
</style>

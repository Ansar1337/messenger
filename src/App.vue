<script async setup>
import {useUserStore} from "@/store/user.js";
import {useUserListStore} from "@/store/userList.js";
import {useMessageStore} from "@/store/message.js";

const userStore = useUserStore();
const userListStore = useUserListStore();
const messageStore = useMessageStore();

await userStore.loadUserData();
await userListStore.loadUserListData();
await messageStore.loadMessageData();
</script>

<template>
  <router-view/>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
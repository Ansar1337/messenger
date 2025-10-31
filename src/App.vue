<script setup>
import Chat from "@/components/module_chat/Chat.vue";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/user.js";
import {useUserListStore} from "@/store/userList.js";
import asdasdasdas from "@/view.vue";

const userStore = useUserStore();
const userList = useUserListStore();

onMounted(() => {
  userStore.loadUserData();
  userList.loadUserListData();
});
// const tv = ref(0);
</script>

<template>
  <router-view></router-view>
  <!--  <asdasdasdas :test_view="tv"></asdasdasdas>
    {{tv}}-->
  <!--  <button @click="tv++; q++; console.log(tv, q)">+1</button>-->
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
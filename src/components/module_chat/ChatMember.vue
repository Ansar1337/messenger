<script setup>
import {useUserListStore} from "@/store/userList.js";

const userList = useUserListStore();
</script>

<template>

  <div class="chat-members">
    <div
        class="chat-member-info"
        v-for="user in userList.users"
        :key="user.nickname">
      <div class="icon">
        <img
            :src="user.icon"
            alt="chat-member-icon"/>
      </div>
      <div class="nickname">{{ user.nickname }}</div>
      <div :class="`status-${user.status}`"></div>
      <button class="btn-lock btn-unlock">Заблокировать</button>
    </div>
  </div>

</template>

<style scoped>

.chat-members {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.chat-member-info {
  display: flex;
  gap: 10px;
  align-items: center;
}

.status-online {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #0ae80d;
}

.status-away {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #d5e404;
}

.status-offline {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #ec0932;
}

.icon img {
  width: 30px;
  height: 30px;
}

.nickname {
  width: 40px;
}
</style>
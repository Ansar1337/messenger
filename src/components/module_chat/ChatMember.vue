<script setup>
defineProps(["icon","nickname","status"]);
</script>

<template>
  <div class="chat-member-info">
    <div class="icon"><img src="../../../public/images/free-user-icon-3296-thumb.png" alt="chat-member-icon">
    </div>
    <div class="nickname">{{nickname}}</div>
    <div :class="`status-${status}`"></div>
    <button class="btn-lock btn-unlock">Заблокировать</button>
  </div>

</template>

<style scoped>
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
</style>
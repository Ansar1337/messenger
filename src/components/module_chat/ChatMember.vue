<script setup>

defineProps(["icon", "nickname", "status"]);
const isMuted = defineModel("isMuted");
</script>

<template>

  <div class="chat-members-container">
    <div class="chat-member-info">
      <div class="icon">
        <img :src="icon" alt="chat-member-icon">
      </div>
      <div class="nickname">{{ nickname }}</div>
      <div :class="`status-${status}`"></div>
      <button
          type="button"
          class="btn-lock btn-unlock"
          @click="isMuted=!isMuted"
          :title="isMuted ? 'Unmute' : 'Mute'">
        {{ isMuted ? '🔇' : '🔈' }}
      </button>
    </div>
  </div>

</template>

<style scoped>

.chat-members-container {
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
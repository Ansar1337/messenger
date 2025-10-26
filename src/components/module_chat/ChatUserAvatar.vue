<script setup>
import {ref} from "vue";
import {useUserStore} from "@/store/user.js";

const userStore = useUserStore();

const props = defineProps({
  image: {
    type: String,
    default: "/images/free-user-icon-3296-thumb.png"
  }
});

const imageSrc = ref(props.image);
const isOpen = ref(false);

function openWindow() {
  isOpen.value = true;
}

function closeWindow() {
  isOpen.value = false;
}

function fileDownload(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    imageSrc.value = e.target.result;
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <div class="image-container">
    <img :src="imageSrc" alt="preview" class="preview-image" @click="openWindow">
  </div>

  <div v-if="isOpen" class="image-window">
    <input type="file" @change="fileDownload">
    <button @click="closeWindow"></button>
  </div>
</template>

<style scoped>

.image-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-image {
  width: 30px;
  height: 30px;
}

</style>
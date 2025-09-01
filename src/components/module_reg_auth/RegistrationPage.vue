<script setup>
import {ref} from "vue";

const form = ref({
  username: "",
  password: "",
  confirmPassword: ""
});

const isRegister = ref(false);

function toggleMode() {
  isRegister.value = !isRegister.value;
}
</script>

<template>
  <!--  Логотип и название-->
  <div class="auth-container">
    <div class="auth-header">
      <!--      <img src="/assets/logo.svg" alt="Логотип">-->
      <h1>Чат-проект</h1>
    </div>
  </div>

  <!--  Форма-->
  <form @submit="submit" class="auth-form">
    <input
        v-model="form.username"
        type="text"
        placeholder="Логин"
        required
    />
    <input
        v-model="form.password"
        type="password"
        placeholder="Пароль"
        required
    />
    <input
        v-if="isRegister"
        v-model="form.confirmPassword"
        type="password"
        placeholder="Подтвердите пароль"
        required
    />
    <!--    Кнопки-->
    <button>
      {{ isRegister ? "Создать" : "Войти" }}
    </button>
    <button type="button" @click="toggleMode">
      {{ isRegister ? "У меня уже есть аккаунт" : "Создать новый аккаунт" }}
    </button>
  </form>


</template>

<style scoped>

</style>
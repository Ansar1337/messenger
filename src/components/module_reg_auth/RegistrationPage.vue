<script setup>
import {ref, reactive} from "vue";
import FieldSet from "@/components/module_reg_auth/FieldSet.vue";

const form = reactive({
  username: "",
  password: "",
  confirmPassword: ""
});

// error message
const error = ref("");

const isRegister = ref(false);

// toggle
function toggleMode() {
  isRegister.value = !isRegister.value;
  error.value = "";
}

// submit form function
function submit(e) {
  e.preventDefault();
  error.value = "";
  if (isRegister.value) {
    if (form.password !== form.confirmPassword) {
      error.value = "Passwords are not matching";
    } else if (form.password === form.confirmPassword) {
      alert(`Registration successful! User: ${form.username} `);
    }
  } else {
    if (form.username === "Ansar" && form.password === "1234") {
      alert("Success!");
    } else {
      error.value = "Incorrect username or password";
    }
  }
}
</script>

<template>
  <!--  Logo and heading-->
  <div class="auth-container">
    <div class="auth-header">
      <!--      <img src="/assets/logo.svg" alt="Логотип">-->
      <h1>Чат-проект</h1>
    </div>
  </div>

  <!--  Form-->
  <form @submit="submit" class="auth-form">
    <FieldSet
        v-model="form.username"
        type="text"
        placeholder="Логин"
        name="login"
        required="true"
    />
    <input
        v-model="form.password"
        type="password"
        placeholder="Пароль"
        name="passwd"
        required
    />
    <input
        v-if="isRegister"
        v-model="form.confirmPassword"
        type="password"
        placeholder="Подтвердите пароль"
        name="passwd2"
        required
    />

    <!--    Error message-->
    <p v-if="error" style="color:red">{{ error }}</p>

    <!--    Buttons-->
    <button>
      {{ isRegister ? "Создать" : "Войти" }}
    </button>
    <button type="button" @click="toggleMode">
      {{ isRegister ? "У меня уже есть аккаунт" : "Создать новый аккаунт" }}
    </button>
  </form>


</template>

<style scoped>
.auth-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 50px;
}
</style>
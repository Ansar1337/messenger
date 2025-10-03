<script setup>
import {ref, reactive} from "vue";
import WrappedInput from "@/components/module_reg_auth/WrappedInput.vue";
import {useRouter} from "vue-router";
import Chat from "@/components/module_chat/Chat.vue";
import {useUserStore} from "@/store/user.js";
import {validateUser, registerUser} from "@/helpers/dataProvider.js";

const router = useRouter();

const userStore = useUserStore();

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
  if (!isRegister.value) {
    const validUser = validateUser(form.username, form.password);
    if (validUser.status === "error") {
      error.value = validUser.data;
    } else {
      userStore.logIn();
    }
  } else {
    const registeredUser = registerUser(form.username, form.password);
    if (registeredUser.status === "error") {
      error.value = registeredUser.data;
    } else {
      userStore.logIn();
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
    <WrappedInput
        field-caption="Username"
        v-model="form.username"
        type="text"
        placeholder="Логин"
        name="login"
        required="true"
    />
    <WrappedInput
        field-caption="Password"
        v-model="form.password"
        type="password"
        placeholder="Пароль"
        name="passwd"
        required="true"
    />
    <WrappedInput
        field-caption="Repeat Password"
        v-if="isRegister"
        v-model="form.confirmPassword"
        type="password"
        placeholder="Подтвердите пароль"
        name="passwd2"
        required="true"
    />

    <!--    Error message-->
    <p v-if="error" style="color:red">{{ error }}</p>

    <!--    Buttons-->
    <button type="submit" class="auth-button">
      {{ isRegister ? "Создать" : "Войти" }}
    </button>
    <button type="button" @click="toggleMode" class="auth-button">
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

.auth-button {
  border-radius: 15px;
}
</style>
<script setup>
import {ref, reactive, computed} from "vue";
import WrappedInput from "@/components/module_reg_auth/WrappedInput.vue";
import {useUserStore} from "@/store/user.js";
import {validateUser, registerUser} from "@/helpers/dataProvider.js";
import {useLocaleStore} from "@/store/locale.js";
import Locale from "@/components/locale/Locale.vue";

const userStore = useUserStore();
const localeStore = useLocaleStore();

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
    validateUser(form.username, form.password).then(async validUser => {
      if (validUser.status === "error") {
        error.value = computed(() => localeStore.locale[validUser.payload.message]);
      } else {
        await userStore.startSession();
      }
    });
  } else {
    registerUser(form.username, form.password).then(async registeredUser => {
      if (registeredUser.status === "error") {
        error.value = computed(() => localeStore.locale[registeredUser.payload.message]);
      } else {
        await userStore.startSession();
      }
    });
  }
}
</script>

<template>
  <!--Logo and heading-->
  <div class="auth-container">
    <div class="auth-header">
      <h1>Чат-проект</h1>
      <Locale/>
    </div>
  </div>
  <!--Form-->
  <form @submit="submit" class="auth-form">
    <WrappedInput
        :field-caption=localeStore.locale.placeholder_login
        v-model="form.username"
        type="text"
        :placeholder=localeStore.locale.placeholder_login
        name="login"
        required="true"
    />
    <WrappedInput
        :field-caption=localeStore.locale.placeholder_pass
        v-model="form.password"
        type="password"
        :placeholder=localeStore.locale.placeholder_pass
        name="passwd"
        required="true"
    />
    <WrappedInput
        :field-caption=localeStore.locale.repeat_pass
        v-if="isRegister"
        v-model="form.confirmPassword"
        type="password"
        :placeholder=localeStore.locale.repeat_pass
        name="passwd2"
        required="true"
    />

    <!--    Error message-->
    <p v-if="error" style="color:red">{{ error }}</p>

    <!--    Buttons-->
    <button type="submit" class="auth-button">
      {{ isRegister ? localeStore.locale.label_create : localeStore.locale.label_login }}
    </button>
    <button type="button" @click="toggleMode" class="auth-button">
      {{ isRegister ? localeStore.locale.label_acc : localeStore.locale.label_create_acc }}
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
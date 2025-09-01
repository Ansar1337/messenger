<script setup>
// const form = document.getElementById("authForm");
// const username = document.getElementById("username");
// const password = document.getElementById("password");
// const confirmPassword = document.getElementById("confirmPassword");
// const loginBtn = document.getElementById("loginBtn");
// const createAccBtn = document.getElementById("createAccBtn");

// createAccBtn.addEventListener("click")

import {ref} from "vue";

let form = ref(null);


</script>

<template>
  <!--  Логотип и название-->
  <div class="auth-container">
    <div class="auth-header">
      <!--      <img src="/assets/logo.svg" alt="Логотип">-->
      <h1>Чат-проект</h1>
    </div>

    <!--  Форма-->
    <form ref="form" class="auth-form">
      <input type="text" id="username" placeholder="Логин" required>
      <input type="password" id="password" placeholder="Пароль" required>
      <input type="password" id="confirmPassword" placeholder="Подтвердите пароль" style="display: none">
    </form>

    <div class="reg-btns">
      <button class="login-btn" id="loginBtn">Войти</button>
      <button class="create-acc-btn" id="createAccBtn">Создать новый аккаунт</button>
    </div>
  </div>
</template>
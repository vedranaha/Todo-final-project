<template>
  <div class="signin">
    <h1>Sign Up</h1>

    <form @submit.prevent="signIn">
      <input
        class="inputField"
        type="email"
        placeholder="Your email"
        v-model="email"
      />
      <input
        class="inputField"
        type="password"
        placeholder="Your Password"
        v-model="password"
      />
      <input
        class="inputField"
        type="password"
        placeholder="Confirm Your Password"
        v-model="confirmPassword"
      />
      <button type="submit">Sign Up</button>
    </form>
    <p>
      Have an account?
      <PersonalRouter :route="route" :routerText="routerText" />
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";

// Create Data constants
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

// Use constants to to use personalrouter "Props"
const route = "/auth";
const routerText = "Sign In";
</script>

<style>
.signin {
  width: 100%;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  margin: 10px;
}
</style>

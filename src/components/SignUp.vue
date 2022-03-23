<template>
  <div class="signin">
    <h1>Sign Up</h1>
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>
    <form @submit.prevent="signUp">
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
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";

// Create Data constants
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);

// Use constants to to use personalrouter "Props"
const route = "/auth";
const routerText = "Sign In";

//Function to sign up User to Supabase with timeOut() method to showing errors good-ux
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  } else {
    errorMsg.value = "Passwords do not match";
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
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

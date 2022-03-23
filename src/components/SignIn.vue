<template>
  <div class="signin">
    <h1>Sign in</h1>

    <form @submit.prevent="signIn">
      <div v-if="errorMsg">
        <p>{{ errorMsg }}</p>
      </div>
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
      <button type="submit">Sign In</button>
    </form>
    <p>
      Don't have an account?
      <PersonalRouter :route="route" :routerText="routerText" />
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

// Create Data constants
const email = ref(null);
const password = ref(null);
const redirect = useRouter();
const errorMsg = ref(null);

// Use constants to use personalrouter "Props"
const route = "/auth/sign-up";
const routerText = "Sign Up";

//Add function to Login to supaBase
async function signIn() {
  try {
    await useUserStore().signIn(email.value, password.value);
    // if (error) throw error;
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = "Error: ${error.message}";
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

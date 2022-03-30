<template>
  <div
    class="bg-gray-200 rounded py-16 px-12 m-16 flex flex-col items-center justify-center"
  >
    <!-- Sign up -->
    <h1>Sign Up</h1>
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>
    <form @submit.prevent="signUp" class="mt-8 mb-4">
      <div class="mb-4">
        <label for="userEmail" class="sr-only">Email address</label>
        <input
          class="border-solid border border-gray-400 rounded px-2 py-3"
          type="email"
          v-model="email"
          placeholder="Email address"
          required
        />
      </div>
      <div class="mb-4">
        <label for="userEmail" class="sr-only">Password</label>
        <input
          class="border-solid border border-gray-400 rounded px-2 py-3"
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="mb-4">
        <label for="userEmail" class="sr-only">Password</label>
        <input
          class="border-solid border border-gray-400 rounded px-2 py-3"
          type="password"
          v-model="confirmPassword"
          placeholder="confirm Password"
          required
        />
      </div>
      <div class="my-4 flex items-center">
        <input class="h-4 w-4 mr-2" type="checkbox" id="userRemember" />
        <label for="userRemember">Remember me</label>
      </div>
      <button
        class="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3"
        type="submit"
      >
        Sign up
      </button>
    </form>
    <p>
      Have an account?
      <PersonalRouter :route="route" :routerText="routerText" />
    </p>
  </div>
</template>
<!----<div class="signin">
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
  </div>--->

<script setup>
import { ref } from "vue";
import PersonalRouter from "../components/PersonalRouter.vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";

// Create Data constants
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
const redirect = useRouter();

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

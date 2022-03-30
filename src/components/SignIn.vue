<template>
  <div
    class="bg-gray-200 rounded py-16 px-12 m-16 flex flex-col items-center justify-center"
  >
    <!-- Sign in with User profile image -->
    <img
      class="rounded-full h-32 w-32"
      src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
      alt="user avatar"
    />
    <form @submit.prevent="signIn" class="mt-8 mb-4">
      <div class="mb-4">
        <label for="userEmail" class="sr-only">Email address</label>
        <input
          class="border-solid border border-gray-400 rounded px-2 py-3"
          type="email"
          id="userEmail"
          v-model="email"
          placeholder="Email address"
          required
        />
      </div>
      <div>
        <label for="userEmail" class="sr-only">Password</label>
        <input
          class="border-solid border border-gray-400 rounded px-2 py-3"
          type="password"
          v-model="password"
          placeholder="Password"
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
        Sign in
      </button>
    </form>
    <a href="#" class="self-start">Forgot the password?</a>
    <p>
      Don't have an account?
      <PersonalRouter :route="route" :routerText="routerText" />
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PersonalRouter from "../components/PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { supabase } from "../supabase";
import { storeToRefs } from "pinia";

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
    errorMsg.value = error.message;
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

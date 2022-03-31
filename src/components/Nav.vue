<template>
  <nav
    class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800"
  >
    <div class="container flex flex-wrap justify-between mx-auto">
      <a href="/" class="flex items-center">
        <img class="ml-8 h-8 sm:h-9" src="../assets/logo_vh3.png" alt="logo" />
        <span
          class="self-center ml-4 text-xl font-semibold whitespace-nowrap text-orange-400 dark:text-gray-300"
          >Todo app Vue3 - Supabase</span
        >
      </a>
      <img
        class="w-8 h-8 mr-1 rounded-full"
        src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="user photo"
      />
      <button class="mr-10" @click="signOut">Sign Out</button>
    </div>
  </nav>
</template>
<style></style>

<script setup>
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { computed } from "vue";
// Get user from store
const user = computed(() => useUserStore().$state.user);
// Setup ref to router
const redirect = useRouter();
// signOut function
async function signOut() {
  await useUserStore().signOut();
  redirect.push({ path: "/auth" });
}
</script>

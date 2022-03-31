<template>
  <nav class="bg-sky-300 rounded py-2 center flex flex-row justify-center">
    <a href="/" class="flex items-center">
      <img
        class="w-10 h-10 sm:h-9 mr-20"
        src="../assets/logo_vh3.png"
        alt="logo"
      />
    </a>
    <button
      type="button"
      class="text-orange-800 italic font-bold"
      @click="signOut"
    >
      Sign Out
    </button>
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

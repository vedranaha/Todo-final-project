<template>
  <div class="nav">
    <a href="/" class="flex a">
      <img class="w-16" src="../assets/logo_vh3.png" alt="logo" />
    </a>
    <button class="button-signOut" @click="signOut">Sign Out</button>
  </div>
</template>
<style>
.nav {
  margin: 20px 0px 0px 50px;
  display: flex;
  flex-direction: row;
}
/*.button-signOut {
  margin-left: 300px;
}*/
</style>

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

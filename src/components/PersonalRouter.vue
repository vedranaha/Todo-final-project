<template>
  <router-link :to="route">{{ routerText }}</router-link>
</template>

<script setup>
defineProps({
  route: String,
  routerText: String,
});
</script>

<style></style>

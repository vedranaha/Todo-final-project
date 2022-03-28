<template>
  <h1>{{ item.title }}</h1>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps(["item"]);
</script>

<style></style>

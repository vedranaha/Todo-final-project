<script setup>
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";
import TaskItem from "./TaskItem.vue";

// const user = supabase.auth.user();

// Print User Email to Frontend
const user = computed(() => useUserStore().$state.user);
const userEmail = useUserStore().user.email;
const userName = userEmail.split("@")[0];

// Fetch tasks from supabase database
let tasks = ref([]);

async function getTasks() {
  tasks.value = await useTaskStore().fetchTasks();
  console.log(tasks.value);
}
getTasks();

//functions
const newItem = ref("");
const newTitle = ref("");
const task = useTaskStore();

const newTask = () => {
  useTaskStore().insertTask(newItem.value, user.useUserStore);
  newItem.value = "";
  getTasks();
};
</script>

<template>
  <div>
    <h3 class="text-welcome">Welcome {{ userName }}</h3>
    <form @submit.prevent="newTask">
      <input v-model="newItem" placeholder="here we go" id="task" />
      <button>Add Todo</button>
    </form>
    <div>
      <TaskItem :item="task" v-for="(task, index) in tasks" />
    </div>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>

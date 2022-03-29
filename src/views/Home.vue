<template>
  <Nav />
  <NewTask />
  <div>
    <TaskItem
      @childToggle="toggleTask"
      :item="task"
      v-for="(task, index) in tasks"
    />
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>

<script setup>
//import NewTask from "../components/NewTask.vue";
import NewTask from "../components/NewTask.vue";
import Nav from "../components/Nav.vue";
import TaskItem from "../components/TaskItem.vue";
import { ref, computed } from "vue";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";

// Fetch tasks from supabase database
let tasks = ref([]);

// function to get tasks form supabase
async function getTasks() {
  tasks.value = await useTaskStore().fetchTasks();
  // Print tasks on console
  console.log(tasks.value);
}
getTasks();

// function to toggle finishas
async function toggleTask(item) {
  const toggleComplete = !item.is_complete;
  const toggleId = item.id;
  await useTaskStore().toggleComplete(toggleComplete, toggleId);
  getTasks();
}
</script>

<style></style>

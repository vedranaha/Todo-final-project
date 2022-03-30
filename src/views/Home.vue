<template>
  <Nav />
  <NewTask @childAddTodo="addTodo" />
  <div>
    <TaskItem
      class=""
      @childToggle="toggleTask"
      @childRemove="remove"
      @childEdit="edit"
      :item="task"
      v-for="(task, index) in tasks"
    />
  </div>
</template>

<style></style>

<script setup>
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

// Individual Functions
async function addTodo(newTodo) {
  await useTaskStore().addTask(newTodo);
  getTasks();
}

// function to toggle finishas
async function toggleTask(item) {
  const toggleComplete = !item.is_complete;
  const toggleId = item.id;
  await useTaskStore().toggleComplete(toggleComplete, toggleId);
  getTasks();
}
//Edit Items
async function edit(item) {
  await useTaskStore().editTask(item);
  getTasks();
}

// Remove Items
async function remove(item) {
  await useTaskStore().deleteTask(item.id);
  getTasks();
}
</script>

<style></style>

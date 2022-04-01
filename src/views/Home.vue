<template>
  <Nav />
  <NewTask @childAddTodo="addTodo" />
  <div class="flex flex-col flex-wrap justify-center">
    <table
      class="flex-wrap bg-center w-90% m-6 text-sm text-center text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Task name</th>
          <th scope="col" class="px-6 py-3">Completion</th>
          <th scope="col" class="px-6 py-3">Expire</th>
          <th scope="col" class="px-6 py-3"></th>
          <th scope="col" class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <TaskItem1
          @childToggle="toggleTask"
          @childRemove="remove"
          @childEdit="edit"
          :item="task"
          v-for="(task, index) in tasks"
        />
      </tbody>
    </table>
  </div>
</template>

<style></style>

<script setup>
import NewTask from "../components/NewTask.vue";
import Nav from "../components/Nav.vue";
import TaskItem1 from "../components/TaskItem1.vue";
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

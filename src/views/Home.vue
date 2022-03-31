<template>
  <Nav />
  <NewTask @childAddTodo="addTodo" />

  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th scope="col" class="px-6 py-3">Task name</th>
        <th scope="col" class="px-6 py-3">completion</th>
        <th scope="col" class="px-6 py-3">Date</th>
        <th scope="col" class="px-6 py-3"></th>
        <th scope="col" class="px-6 py-3">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Sliver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4 text-right">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit</a
                >
              </td>
            </tr> -->
      <!-- INYECTA COMPONENTE ACA -->

      <TaskItem1
        @childToggle="toggleTask"
        @childRemove="remove"
        @childEdit="edit"
        :item="task"
        v-for="(task, index) in tasks"
      />
    </tbody>
  </table>
</template>

<style></style>

<script setup>
import NewTask from "../components/NewTask.vue";
import Nav from "../components/Nav.vue";
import TaskItemVue from "../components/TaskItem.vue";
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

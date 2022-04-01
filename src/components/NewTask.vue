<script setup>
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";
import TaskItem from "./TaskItem1.vue";

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
  useTaskStore().insertTask(newItem.value, user);
  newItem.value = "";
  getTasks();
};
</script>

<template>
  <div>
    <form @submit.prevent="newTask">
      <div class="mb-6">
        <label
          for="title"
          class="block m-10 text-xl font-medium text-sky-700 dark:text-gray-300"
          >Welcome {{ userName }}
        </label>
        <input
          v-model="newItem"
          placeholder="here we go"
          id="task"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-800"
        />
      </div>
      <button
        type="submit"
        class="text-gray bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Add Todo
      </button>
    </form>
  </div>
</template>

<style>
/* .done {
  text-decoration: line-through;
} */
</style>

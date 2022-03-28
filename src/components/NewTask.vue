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

// VEDRANA FIND OUT WHAT THESE VARIABLES ARE USED FOR
const newTodo = ref("");
const hideCompleted = ref(false);

let id = 0;

//const dataTask = computed(() => {
//  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value;
//});

//async function filteredTodos() {
//  (await taskStore.hideCompleted.value)
//   ? todos.value.filter((t) => !t.done)
//  : todos.value;
//}

// Function that adds a new todo to supabase backend
async function addTodo() {
  console.log(newTodo.value);
  if (newTodo.value.length > 0) {
    await taskStore.addTodo(newTodo.value);
  }
  return (newTodo.value = "");
}

//todos.value.push({ id: id++, text: newTodo.value, done: false });
//newTodo.value = "";
//console.log(todos.value);

// function removeTodo(todo) {
//   todos.value = todos.value.filter((t) => t !== todo);
// }
</script>

<template>
  <div>
    <!-- <h3 class="text-welcome">
      Welcome <span>{{ changeUser() }}</span>
    </h3> -->
    <h3 class="text-welcome">Welcome {{ userName }}</h3>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="here we go" />
      <button>Add Todo</button>
    </form>
    <!-- <ol>
      <li v-for="todo in dataTask" :key="todo.id">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
        <button @click="removeTodo(todo)">🗑️</button>
      </li>
    </ol> -->
    <!-- <button @click="hideCompleted = !hideCompleted">
      {{ hideCompleted ? "Show all" : "Hide completed" }}
    </button> -->
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

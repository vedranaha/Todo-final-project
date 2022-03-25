<script setup>
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../store/task";

const taskStore = useTaskStore();

const user = supabase.auth.user();
function changeUser() {
  const email = user.email;
  const index = email.indexOf("@");
  return email;
}
const newTodo = ref("");
const hideCompleted = ref(false);
const todos = ref([]);
let id = 0;

const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value;
});

async function addTodo() {
  console.log(newTodo.value);
  await taskStore.addTodo(newTodo.value);
  // todos.value.push({ id: id++, text: newTodo.value, done: false });
  // newTodo.value = "";
  // console.log(todos.value);
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo);
}
</script>

<template>
  <div>
    <h3 class="text-welcome">
      Welcome <span>{{ changeUser() }}</span>
    </h3>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="here we go" />
      <button>Add Todo</button>
    </form>
    <ol>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo)">🗑️</button>
      </li>
    </ol>
    <button @click="hideCompleted = !hideCompleted">
      {{ hideCompleted ? "Show all" : "Hide completed" }}
    </button>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>

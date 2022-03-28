<template>
  <div class="img">
    <p>
      {{ item.title }}
      <img
        @click="edit(Task)"
        class="icon"
        src="../assets/edit-interface-sign.png"
        alt=""
      />
      <img
        @click="complete(index)"
        class="icon"
        src="../assets/checked-symbol.png"
        alt=""
      />
      <img
        @click="deleteItem(index)"
        class="icon"
        src="../assets/delete-icon-13.jpg"
        alt=""
      />
    </p>
  </div>

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
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps(["item"]);
</script>

<style>
.img {
  display: flex;
  margin: 10px;
}
.icon {
  width: 20px;
  height: 20px;
  padding-left: 20px;
}
</style>

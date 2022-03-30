<template>
  <div class="img">
    <h2 class="flex flex-col items-center">
      {{ item.title }}
    </h2>

    <div class="flex-task">
      <button v-if="!item.is_complete" @click="toggleTodo()">
        <img class="icon" src="../assets/checked-symbol.png" alt="" />
      </button>
      <button v-if="item.is_complete" @click="toggleTodo()">
        <img class="icon" src="../assets/check-4831.svg" alt="" />
      </button>
      <button @click="edit()">
        <img class="icon" src="../assets/edit-interface-sign.png" alt="" />
      </button>
      <button @click="remove()">
        <img class="icon" src="../assets/delete-icon-13.jpg" alt="" />
      </button>
    </div>
    <!-- Edit dialog -->
    <input
      v-if="editMode"
      v-model="item.title"
      class=""
      id="editTitle"
      type="text"
      placeholder="Task..."
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task.js";

const task = useTaskStore();
const tasks = ref([]);

const editMode = ref(null);
const getTasks = async () => {
  tasks.value = await task.fetchTasks();
};
// FUNCTIONS

const edit = async () => {
  console.log(props.item);
  if (editMode.value === false) {
    editMode.value = !editMode.value;
  } else {
    await task.editTask(props.item.title, props.item.id);
    getTasks();
    editMode.value = !editMode.value;
  }
};
// export the component as an array item that you can call by item.title for example
const props = defineProps(["item"]);

// Signifier to access taskDone/is_complete on subase boolean
let taskDone = true; // toggle boolean value

// Definition of emits to use in parent component for methods
const emit = defineEmits(["childToggle", "childRemove", "childEdit"]);

//toggle done and undone function with "emit" to parent component
function toggleTodo() {
  emit("childToggle", props.item);
}

//Delete task
function remove() {
  emit("childRemove", props.item);
}
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

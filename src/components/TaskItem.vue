<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Task name</th>
          <th scope="col" class="px-6 py-3">completion</th>
          <th scope="col" class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            {{ item.title }}
          </th>
          <td class="px-6 py-4"></td>
          <td class="px-6 py-4"></td>
          <td class="px-6 py-4"></td>
          <td class="px-6 py-4 text-right">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
            >
          </td>
        </tr>
      </tbody>
    </table>
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

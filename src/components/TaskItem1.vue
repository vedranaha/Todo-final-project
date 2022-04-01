<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th
      scope="row"
      class="px-12 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
    >
      {{ item.title }}
    </th>
    <td class="px-6 py-4">
      <button v-if="!item.is_complete" @click="toggleTodo()">
        <BellIcon class="h-5 w-5 text-blue-500" />
      </button>
      <button v-if="item.is_complete" @click="toggleTodo()">
        <CheckIcon class="h-5 w-5 text-blue-500" />
      </button>
    </td>

    <td>
      <button @click="edit()">
        <PencilIcon class="h-5 w-5 text-blue-500" />
      </button>
      <input
        v-if="editMode"
        v-model="item.title"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
        id="editTitle"
        type="text"
        placeholder="Task..."
      />
    </td>
    <td class="px-6 py-4 text-right">
      <button @click="remove()">
        <TrashIcon class="h-5 w-5 text-blue-500" />
      </button>
    </td>
  </tr>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task.js";
import { GlobeAltIcon } from "@heroicons/vue/outline";
import { CheckIcon } from "@heroicons/vue/outline";
import { BellIcon } from "@heroicons/vue/outline";
import { TrashIcon } from "@heroicons/vue/outline";
import { PencilIcon } from "@heroicons/vue/outline";

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

<style></style>

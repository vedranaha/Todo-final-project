<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
    >
      {{ item.title }}
    </th>
    <td class="px-6 py-4">
      <button v-if="!item.is_complete" @click="toggleTodo()">
        <CheckIcon class="h-5 w-5 text-blue-500" />
      </button>
      <button v-if="item.is_complete" @click="toggleTodo()">
        <BellIcon class="h-5 w-5 text-blue-500" />
      </button>
    </td>
    <td class="px-6 py-4">
      <div class="relative">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          datepicker=""
          datepicker-orientation="bottom right"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
          placeholder="Select date"
        />
      </div>
    </td>
    <td class="px-6 py-4">
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

<template>
  <div class="img">
    <p>
      {{ item.title }}
    </p>

    <div class="flex-task">
      <button v-if="!item.is_complete" @click="toggleTodo()">
        <img class="icon" src="../assets/checked-symbol.png" alt="" />
      </button>
      <button v-if="item.is_complete" @click="toggleTodo()">
        <img class="icon" src="../assets/check-4831.svg" alt="" />
      </button>
      <button @click="toggleEdit()">
        <img class="icon" src="../assets/edit-interface-sign.png" alt="" />
      </button>
      <button @click="remove()">
        <img class="icon" src="../assets/delete-icon-13.jpg" alt="" />
      </button>
    </div>
    <!-- Edit dialog -->
    <div class="flex-edit" v-if="editDialog">
      <input class="" placeholder="Edit Task" v-model="editTodo" type="text" />
      <button class="" type="submit" @click.prevent="edit()">Add</button>
    </div>
    <p v-if="empty" class="">
      {{ errorInput }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
let empty = ref(false); // for editing a task
let errorInput = ref(""); // error message variable

let editTodo = ref(""); //value from edit dialog
let editDialog = ref(false); //initially hidden

// export the component as an array item that you can call by item.title for example
const props = defineProps(["item"]);

// Signifier to access taskDone/is_complete on subase boolean
let taskDone = true; // toggle boolean value

// Definition of emits to use in parent component for methods
const emit = defineEmits([
  "childToggle",
  "childRemove",
  "childToggleEdit",
  "childEdit",
]);

//toggle done and undone function with "emit" to parent component
function toggleTodo() {
  emit("childToggle", props.item);
}

// Error Handling
function errHandl() {
  errorInput.value = "Field cannot be empty";
  empty.value = true;
}
// Show Edit Dialog
function toggleEdit() {
  editDialog.value = !editDialog.value;
  editTodo.value = props.item.title;
}
// Edit task
function edit() {
  if (editTodo.value === "") errHandl();
  // shows error message
  else {
    empty.value = false; // hides error message
    editDialog.value = false; // hides edit dialog
    const editValues = {
      oldValue: props.item,
      newValue: editTodo.value,
    };
    emit("childEdit", editValues);
    // pendings[index] = editTodo.value; // modifies text
    editTodo.value = ""; // clears input field
  }
}
// Delete task
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

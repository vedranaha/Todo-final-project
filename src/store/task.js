import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    //new task function
    async addTodo(title) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          title: title,
          is_complete: false,
          user_id: useUserStore().user.id,
        },
      ]);
      if (error) throw error;
      if (task) {
        this.task = task.value;
        console.log(this.task);
      }
    },
  },
});

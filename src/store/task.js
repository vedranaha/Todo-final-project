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
      return this.tasks;
    },
    //new task function
    async insertTask(title) {
      console.log(useUserStore());
      const { data, error } = await supabase.from("tasks").insert([
        {
          title: title,
          is_complete: false,
          user_id: useUserStore().user.id,
        },
      ]);
      if (error) throw error;
    },
    async toggleEdit(title, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title })
        .match({ id: id });
    },

    async toggleComplete(bool, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          is_complete: bool,
        })
        .match({ id: id });
    },
    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: id });
    },
  },
});

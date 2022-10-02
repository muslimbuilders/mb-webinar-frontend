<!-- eslint-disable -->
<template>
  <div class="my-2">
    <form @submit.prevent="addTask">
      <label for="title" class="font-bold">Title</label>
      <div class="grid grid-cols-12 items-center gap-2 my-2">
        <div class="col-span-10">
          <input
            required
            type="text"
            id="title"
            name="title"
            v-model="name"
            class="w-full p-3 border-2 rounded outline-none"
          />
        </div>
        <div class="col-span-2">
          <button
            class="bg-green-500 flex justify-center w-full font-bold rounded py-3 text-[12px] md:text-xl font-medium text-white"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <div
              v-if="loading"
              class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
            ></div>

            <div v-else class="font-medium text-sm">Add Task</div>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "@/Utils/axios.config.js";

export default {
  name: "AddTask",
  data() {
    return {
      name: "",
      loading: false,
    };
  },
  methods: {
    addTask() {
      this.loading = true;
      let payload = {
        name: this.name,
        description: "Task",
      };
      axios
        .post("/create-task", payload)
        .then((response) => {
          console.log(response);
          this.$toast.success("Task created successfully");
          location.reload();
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;

          console.log(error);
        });
    },
  },
};
</script>

<style></style>

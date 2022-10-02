<!-- eslint-disable -->
<template>
  <div>
    <div
      v-show="Overlay"
      class="px-10 flex absolute inset-x-0 justify-center cursor-pointer items-center overlay transform transition duration-300"
    >
      <div class="z-[12] w-[400px] transform transition duration-300">
        <div class="rounded-md bg-white px-4 pt-5 pb-1">
          <form @submit.prevent="editTask">
            <input
              required
              type="text"
              id="title"
              name="title"
              v-model="name"
              class="w-full p-3 border-2 rounded outline-none"
            />

            <div class="flex justify-between">
              <div
                @click="closeModal"
                class="bg-red-500 rounded my-4 py-3 px-4 text-[12px] font-medium text-white"
              >
                Cancel
              </div>
              <button
                class="bg-green-500 rounded my-4 py-3 px-4 text-[12px] font-medium text-white"
                     :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <div
              v-if="loading"
              class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
            ></div>

            <div v-else class="font-medium text-sm">Edit Task</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "@/Utils/axios.config.js";

export default {
  props: ["Overlay", "closeModal", "data"],
  data() {
    return {
      name: "",
      loading: false,
    };
  },
  mounted() {
    this.name = this.data.name;
  },
  methods: {
    editTask() {
      this.loading = true;
      let payload = {
        name: this.name,
        description: "Task",
      };
      axios
        .put(`/task/${this.data.id}`, payload)
        .then((response) => {
          console.log(response);
          this.$toast.success("Task updated successfully");
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

<style>
.overlay {
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
</style>

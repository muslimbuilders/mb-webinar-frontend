<!-- eslint-disable -->
<template>
  <div>
    <Header />
    <Loader v-if="loading" />
    <div class="w-1/2 pt-24 container mx-auto">
      <AddTodo />
      <div class="mt-4">
        <div v-if="YetTodos.length > 0">
          <div
            class="grid grid-cols-12 items-center gap-2 mb-4 mt-2"
            v-for="(item, idx) in YetTodos"
            :key="idx"
          >
            <div class="col-span-10 flex items-center space-x-2">
              <div
                :class="item.status ? 'border-green-400' : 'border-red-400'"
                class="text-balck truncate w-full font-medium border-l-4 bg-gray-300 rounded-r p-2"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="col-span-2 flex gap-1 justify-end cursor-pointer">
              <div
                @click="handleTaskCompleted(item.id)"
                class="bg-green-500 rounded py-1 px-2"
              >
                <i class="text-white fa-solid fa-check"></i>
              </div>
              <img
                @click="handleEdit(item)"
                src="@/assets/Svg/edit.svg"
                alt=""
                class="h-8 w-8"
              />

              <img
                @click="deleteTask(item.id)"
                src="@/assets/Svg/delete.svg"
                alt=""
                class="h-8 w-8"
              />
            </div>
          </div>
        </div>
        <div v-else class="text-red-500 text-center">No Task Added</div>

        <div class="mt-12">
          <p
            class="font-medium mb-2 underline"
            v-if="completedTodos.length > 0"
          >
            Completed Task(s)
          </p>
          <div
            class="grid grid-cols-12 items-center gap-2 mb-4"
            v-for="(item, idx) in completedTodos"
            :key="idx"
          >
            <div class="col-span-10 flex items-center space-x-2">
              <div
                :class="item.status ? 'border-green-400' : 'border-red-400'"
                class="text-balck truncate w-full font-medium border-l-4 bg-gray-300 rounded-r p-2"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="col-span-2 flex gap-1 justify-end cursor-pointer">
              <div
                @click="handleTaskInComplete(item.id)"
                class="bg-green-500 rounded py-1 px-2"
              >
                <i class="text-white fa-solid fa-cancel"></i>
              </div>
              <img
                @click="deleteTask(item.id)"
                src="@/assets/Svg/delete.svg"
                alt=""
                class="h-8 w-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditTask
      v-if="Overlay"
      :data="itemToEdit"
      :Overlay="Overlay"
      :closeModal="handleModal"
    />
  </div>
</template>
<!-- eslint-disable -->

<script>
import Header from "../components/Header.vue";
import AddTodo from "../components/AddTodo.vue";
import axios from "@/Utils/axios.config.js";
import Loader from "../components/Loader.vue";
import EditTask from "../components/EditTask.vue";

export default {
  components: { Header, AddTodo, Loader, EditTask },
  data() {
    return {
      todoList: [],
      itemToEdit: null,
      loading: false,
      Overlay: false,
    };
  },
  computed: {
    completedTodos() {
      return this.todoList.filter((item) => item.status);
    },
    YetTodos() {
      return this.todoList.filter((item) => !item.status);
    },
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      this.loading = true;

      axios
        .get("/tasks")
        .then((res) => {
          this.todoList = res.data.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    deleteTask(id) {
      this.loading = true;

      axios
        .delete(`/task/${id}`)
        .then((response) => {
          console.log(response);
          this.$toast.success("Task deleted successfully");
          this.getTasks();
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;

          console.log(error);
        });
    },
    handleTaskCompleted(id) {
      this.loading = true;

      axios
        .put(`/complete/${id}`, { status: true })
        .then((response) => {
          console.log(response);
          this.$toast.success("Task Updated successfully");
          this.getTasks();

          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;

          console.log(error);
        });
    },
    handleTaskInComplete(id) {
      this.loading = true;

      axios
        .put(`/complete/${id}`, { status: false })
        .then((response) => {
          console.log(response);
          this.$toast.success("Task Updated successfully");
          this.getTasks();
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    handleModal() {
      this.Overlay = !this.Overlay;
    },
    handleEdit(item) {
      this.handleModal();
      this.itemToEdit = item;
    },
  },
};
</script>

<style>
.form-check {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.form-check input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #eee;
  border: 1px solid #ec3237;
  box-sizing: border-box;
  border-radius: 2px;
}

/* On mouse-over, add a grey background color */
.form-check:hover input[type="checkbox"] ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.form-check input[type="checkbox"]:checked ~ .checkmark {
  background-color: #ed3237;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.form-check input[type="checkbox"]:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.form-check .checkmark:after {
  left: 7px;
  top: 2px;
  width: 7px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>

<template>
  <nav class="border-b-2 bg-white border-gray-100 shadow-sm">
    <div class="py-9 items-center justify-center max-w-6xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-10">
          <router-link
            to="/student-dashboard"
            class="font-medium text-gray-500 hover:text-black"
          >
            Dashboard
          </router-link>
          <router-link
            to="/student-subjects"
            class="font-medium text-gray-500 hover:text-black"
          >
            Matérias
          </router-link>
         
        </div>

        <div class="flex space-x-10 items-center">
          <span class="text-base font-medium text-gray-500">
            Seja bem-vindo, {{ username }}
          </span>
          <router-link @click="handleLogout" to="/">
            <p class="text-base font-medium text-red-600">Sair</p>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    this.username = this.$store.state.user.name;
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      this.$store.dispatch("logout");
    },
  },
};
</script>


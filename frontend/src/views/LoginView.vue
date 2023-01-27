<template>
  <div class="flex h-screen justify-center items-center">
    <div
      class="space-y-4 flex flex-col p-6 rounded-lg shadow-lg bg-white -mt-10"
    >
      <h2 class="text-center text-2xl font-bold text-gray-900">
        Entrar com sua conta
      </h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-1">
          <input
            type="email"
            class="p-2 w-full border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 sm:text-sm"
            placeholder="Email"
          />
          <input
            type="password"
            class="p-2 w-full border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 sm:text-sm"
            placeholder="Senha"
          />
        </div>
        <div class="flex justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              class="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label class="ml-2 text-sm text-gray-900"> Lembrar-me </label>
          </div>
          <div class="text-sm">
            <router-link
              to="/"
              class="font-medium text-blue-600 hover:underline"
            >
              Esqueceu sua senha?
            </router-link>
          </div>
        </div>
        <button
          class="px-6 py-2 w-full rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-800"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleLogin() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

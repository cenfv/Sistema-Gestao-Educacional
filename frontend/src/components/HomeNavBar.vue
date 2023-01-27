<template>
  <nav class="shadow-md ">
    <div class="py-7 max-w-6xl mx-auto">
      <div class="flex justify-between items-center my-3">
        <div class="flex space-x-10">
          <router-link
            to="/"
            class="font-medium  text-gray-500 hover:text-blue-600"
          >
            Home
          </router-link>
          <router-link
            to="/about"
            class="font-medium  text-gray-500 hover:text-blue-600"
          >
            Quem somos
          </router-link>
          <router-link
            to="/contact"
            class="font-medium  text-gray-500 hover:text-blue-600"
          >
            Contato
          </router-link>
          <router-link
            to="/news"
            class="font-medium  text-gray-500 hover:text-blue-600"
          >
            Novidades
          </router-link>
        </div>

        <button>
          <router-link
            to="/login"
            class="px-6 py-2 rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-800"
          >
            Entrar
          </router-link>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

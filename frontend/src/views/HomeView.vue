<template>
  <div>
    <div class="mt-14 sm:text-center lg:text-left">
      <div class="tracking-tight font-extrabold text-gray-700 text-5xl">
        <h1 class="block">Ferramenta para enriquecer</h1>
        <h1 class="block text-gray-700 xl:inline">seus estudos</h1>
      </div>
      <p class="text-gray-500 max-w-xl mt-5 text-xl mx-0">
        Descubra uma maneira inovadora de organizar e realizar as suas provas.
        Conheça a nossa plataforma e dê o próximo passo para a sua aprovação!
      </p>
      <div class="flex space-x-2 mt-4">
        <div class="flex">
          <router-link
            to="/login"
            class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-900"
          >
            Começar agora!
          </router-link>
        </div>
        <div class="flex">
          <router-link
            to=""
            class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-400"
          >
            Sobre
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

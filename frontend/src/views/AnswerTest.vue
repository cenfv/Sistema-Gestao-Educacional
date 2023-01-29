<template>
  <div
    class="flex flex-col bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2"
  >
    <h1 className="self-center text-3xl font-bold text-gray-900 sm:text-4xl">
      Banco de dados
    </h1>
    <div>
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        {{ test.title }}
      </h1>
      <p className="mt-1">
        {{ new Date(test.createdAt).toLocaleDateString() }}
      </p>
    </div>
    <p className="text-lg font-normal text-justify">
      {{ test.description }}
    </p>
    <div class="mt-16">
      <div class="flex">
        <p className="text-lg font-semibold">Total de questões:</p>
        <p className="text-lg font-bold">&nbsp;{{ test.questions.length }}</p>
      </div>
      <div class="flex">
        <p className="text-lg font-semibold">Status:</p>
        <p className="text-lg text-red-600 font-bold">&nbsp;Não realizado</p>
      </div>
    </div>
    <v-btn color="#1f2937" class=" mt-5 w-5/12 text-white self-center"
      >Iniciar Prova</v-btn
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      test: {
        title: "",
        description: "",
        questions: [],
        createdAt: "",
      },
    };
  },
  mounted() {
    this.handleGetTest();
  },
  methods: {
    handleGetTest() {
      axios
        .get(`${process.env.VUE_APP_API}/tests/${this.$route.params.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.test = response.data.test;
        });
    },
  },
};
</script>

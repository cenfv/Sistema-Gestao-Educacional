<template>
  <div
    class="flex flex-col bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2"
  >
    <h1 class="self-center text-3xl font-bold text-gray-900 sm:text-4xl">
      {{ this.subjectName  }}
    </h1>
    <div>
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
        {{ test.title }}
      </h1>
      <p class="mt-1">
        {{ new Date(test.createdAt).toLocaleDateString() }}
      </p>
    </div>
    <p class="text-lg font-normal text-justify">
      {{ test.description }}
    </p>
    <div class="mt-16">
      <div class="flex">
        <p class="text-lg font-semibold">Total de questões:</p>
        <p class="text-lg font-bold">&nbsp;{{ test.questions.length }}</p>
      </div>
      <div class="flex">
        <p class="text-lg font-semibold">Status:</p>
        <p class="text-lg text-red-600 font-bold">&nbsp;Não realizado</p>
      </div>
    </div>
    <v-btn
      @click="handleStartTest"
      color="#1f2937"
      class="mt-5 w-5/12 text-white self-center"
      >Iniciar Prova</v-btn
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      subjectName: this.$store.state.test.subjectName,
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
  computed: {
    formattedQuestions() {
      return this.test.questions.map((question) => {
        return {
          id: question,
          answer: "",
        }
      }); 
    }
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
    handleStartTest() {
      this.$store.dispatch("setQuestions", {
        questionIndex: 0,
        id: this.$route.params.id,
        subject: this.$route.params.id,
        questions: this.formattedQuestions,
      });
      this.$router.push(`/test/answer/question`);
    },
  },
};
</script>

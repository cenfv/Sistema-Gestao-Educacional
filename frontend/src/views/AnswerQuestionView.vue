<template>
  <div
    class="flex flex-col bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2"
  >
    <div>
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
        {{ question.title }}
      </h1>
      <p class="mt-1">
        {{ new Date(question.createdAt).toLocaleDateString() }}
      </p>
    </div>
    <p class="text-lg font-normal text-justify">
      {{ question.description }}
    </p>
    <img
      src="https://via.placeholder.com/400x200?text=PLACEHOLDER"
      className="mx-auto mt-5 max-h-72"
      alt="Imagem questão"
    />
    <p class="text-lg font-semibold">Selecione uma alternativa:</p>
    <div class="grid grid-cols-2">
      <button
        @click="handleAnswerQuestion"
        class="p-4 m-3 rounded-md shadow-sm text-base font-medium text-white bg-gray-700 hover:bg-gray-800 hover:scale-105"
        v-for="(alternative, index) in question.alternatives"
        :key="alternative.description"
      >
        {{ getLetter(index) }} {{ alternative.description }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      questionIndex: this.$store.state.test.questionIndex,
      question: {
        title: "",
        description: "",
        createdAt: "",
        alternatives: [
          {
            description: "",
          },
        ],
      },
    };
  },
  mounted() {
    this.handleGetQuestion();
  },
  watch: {
    id() {
      this.handleGetQuestion();
    },
    questionIndex() {
      this.handleGetQuestion();
    },
  },
  methods: {
    handleGetQuestion() {
      axios
        .get(
          `${process.env.VUE_APP_API}/questions/${
            this.$store.state.test.questions[this.questionIndex].id
          }`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.question = response.data.question;
        });
    },
    getLetter(index) {
      return String.fromCharCode(97 + index) + ")";
    },
    handleAnswerQuestion() {
      this.$store.dispatch("incrementQuestionIndex");
      this.questionIndex = this.$store.state.test.questionIndex;
    },
  },
};
</script>

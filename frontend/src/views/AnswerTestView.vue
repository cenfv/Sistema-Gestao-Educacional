<template>
  <div
    class="flex flex-col bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2"
  >
    <h1 class="self-center text-3xl font-bold text-gray-900 sm:text-4xl">
      {{ this.subjectName }}
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
        <p v-if="this.mode === 'create'" class="text-lg text-red-600 font-bold">
          &nbsp;Não realizado
        </p>
        <p v-else class="text-lg text-green-600 font-bold">
          &nbsp;Prova já realizada
        </p>
      </div>
      <div v-if="mode === 'review'" class="flex items-center">
        <p class="text-lg font-semibold">Nota:</p>
        <p class="ml-2 text-lg text-green-600 font-bold">
          {{ Number(this.grade).toFixed(2) }}
        </p>
      </div>
    </div>
    <v-btn
      v-if="this.mode === 'create'"
      @click="handleStartTest"
      color="#1f2937"
      class="mt-5 w-5/12 text-white self-center"
      >Iniciar Prova</v-btn
    >
    <v-btn
      v-else
      @click="handleStartTest"
      color="#1f2937"
      class="mt-5 w-5/12 text-white self-center"
      >Revisar a prova</v-btn
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      subjectName: this.$store.state.test.subjectName,
      subject: this.$store.state.test.subject,
      grade: "",
      mode: "create",
      questions: {},
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
    this.handleVerifyHasUserSubmitted();
  },
  computed: {
    formattedQuestions() {
      return this.test.questions.map((question) => {
        return {
          id: question,
          answer: "",
        };
      });
    },
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
    handleVerifyHasUserSubmitted() {
      axios
        .get(
          `${process.env.VUE_APP_API}/submissions/student/${this.$store.state.user.id}/subject/${this.subject}/test/${this.$route.params.id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.submission) {
            this.mode = "review";
            this.questions = response.data.submission.questions;
            this.grade = response.data.submission.testGrade;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleStartTest() {
      if (this.mode === "create") {
        this.$store.dispatch("setQuestions", {
          questionIndex: 0,
          id: this.$route.params.id,
          subject: this.subject,
          questions: this.formattedQuestions,
        });
      } else if (this.mode === "review") {
        this.$store.dispatch("setQuestions", {
          questionIndex: 0,
          id: this.$route.params.id,
          subject: this.subject,
          questions: this.questions,
        });
      }
      console.log(this.$store.state.test);
      this.$router.push(`/test/answer/question`);
    },
  },
};
</script>

<template class="min-h-screen">
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <h1 class="text-3xl font-bold text-gray-900">Adicionar prova</h1>
    <p class="text-lg font-normal text-gray-900">
      Crie provas para seus alunos.
    </p>

    <div>
      <h3 class="text-2xl font-bold text-gray-900">Cadastrar nova prova:</h3>
    </div>
    <form @submit.prevent="handleCreateSubject" class="flex flex-col space-y-3">
      <input
        v-model="name"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        placeholder="Nome da matéria"
        name="name"
      />
      <v-autocomplete
        multiple
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        :items="questions"
        v-model="selectedQuestions"
        label="Questões"
        placeholder="Selecione as questões"
        item-value="_id"
        item-title="title"
        item-text="title"
        chips
      >
      </v-autocomplete>

      <div className="flex justify-end">
        <button
          className="mt-3 w-36 py-3 text-white font-medium rounded-lg text-center drop-shadow-lg 5 bg-blue-500 hover:bg-blue-700 "
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      questions: [],
      selectedQuestions: [],
    };
  },
  created() {
    this.handleGetQuestions();
  },
  methods: {
    handleGetQuestions() {
      axios
        .get("http://localhost:3000/questions", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.questions = response.data.question;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

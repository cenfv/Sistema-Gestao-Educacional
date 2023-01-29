<template>
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Questões</h1>
        <p class="text-lg font-normal text-gray-900">
          Todos as questões serão exibidos aqui
        </p>
      </div>
      <div class="flex">
        <router-link
          to="/question-register"
          class="flex py-3 px-3 text-white text-sm font-normal rounded-lg text-center drop-shadow-lg 5 bg-gray-700 hover:bg-slate-900"
        >
          <div class="flex mr-2 items-baseline">
            <v-icon icon="mdi-account-plus"></v-icon>
          </div>
          Cadastrar questão
        </router-link>
      </div>
    </div>
    <div class="mt-8">
      <v-text-field
        v-model="searchTerm"
        filled
        label="Buscar questão"
        prepend-inner-icon="mdi-magnify"
        class="w-3/4 bg-white rounded-lg focus:outline-none focus:ring"
      ></v-text-field>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Título</th>
            <th class="text-left">Criado em:</th>
            <th class="text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in filteredData" :key="question._id">
            <td>{{ question.title }}</td>
            <td>{{ question.createdAt }}</td>
            <td class="flex space-x-4">
              <div
                @click="handleUpdateQuestion(question._id)"
                class="flex items-center cursor-pointer hover:scale-125"
              >
                <v-icon size="22" icon="mdi-note-edit"></v-icon>
              </div>

              <div
                @click="handleDeleteQuestion(question._id)"
                class="flex items-center cursor-pointer hover:scale-125"
              >
                <v-icon size="22" icon="mdi-delete"></v-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  title: "QuestionView",
  data() {
    return {
      questions: [],
      searchTerm: "",
    };
  },
  mounted() {
    this.handleGetQuestions();
  },
  computed: {
    filteredData() {
      return this.questions.filter((question) => {
        return question.title.includes(this.searchTerm);
      });
    },
  },

  methods: {
    handleGetQuestions() {
      axios
        .get(`${process.env.VUE_APP_API}/questions`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.questions = response.data.question.filter((question) => {
            question.createdAt = new Date(
              question.createdAt
            ).toLocaleDateString();
            return question.title.includes(this.searchTerm);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleUpdateQuestion(id) {
      this.$router.push({
        name: "question-update",
        params: {
          id: id,
        },
      });
    },
    handleDeleteQuestion(id) {
      axios
        .delete(`${process.env.VUE_APP_API}/questions/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

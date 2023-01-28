<template class="min-h-screen">
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <h1 class="text-3xl font-bold text-gray-900">Adicionar matéria</h1>
    <p class="text-lg font-normal text-gray-900">
      Crie matérias para seus alunos.
    </p>

    <div>
      <h3 class="text-2xl font-bold text-gray-900">Cadastrar nova Matéria:</h3>
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
        :items="students"
        v-model="selectedStudents"
        label="Alunos"
        placeholder="Selecione os alunos"
        item-value="_id"
        item-title="name"
        item-text="name"
        chips
      >
      </v-autocomplete>
      <v-autocomplete
        multiple
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        :items="tests"
        v-model="selectedTests"
        label="Provas"
        placeholder="Provas atribuídas"
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
      name: "",
      students: [],
      tests: [],
      selectedStudents: [],
      selectedTests: [],
    };
  },
  created() {
    this.handleGetStudents();
    this.handleGetTests();
  },
  methods: {
    handleGetStudents() {
      axios
        .get(`${process.env.VUE_APP_API}/students`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.student);
          this.students = response.data.student;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleGetTests() {
      axios
        .get(`${process.env.VUE_APP_API}/tests`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.test);
          this.tests = response.data.test;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCreateSubject() {
      axios
        .post(
          `${process.env.VUE_APP_API}/subjects`,
          {
            name: this.name,
            students: this.selectedStudents,
            tests: this.selectedTests,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
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

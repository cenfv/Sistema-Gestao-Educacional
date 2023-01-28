<template>
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <div>
      <h1 v-if="mode === 'create'" class="text-3xl font-bold text-gray-900">
        Cadastrar aluno
      </h1>
      <h1 v-else class="text-3xl font-bold text-gray-900">Alterar aluno</h1>

      <p v-if="mode === 'create'" class="text-lg font-normal text-gray-900">
        Cadastre seus alunos, inserindo suas respectivas informações
      </p>
      <p v-else class="text-lg font-normal text-gray-900">
        Altere seu aluno inserindo suas respectivas informações
      </p>
    </div>
    <form @submit.prevent="handleSaveStudent" class="flex flex-col space-y-3">
      <input
        v-model="name"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        placeholder="Nome completo"
        name="name"
      />
      <input
        v-model="enrollNumber"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        placeholder="Número de matrícula"
        name="enrollNumber"
      />
      <v-autocomplete
        multiple
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        :items="subjects"
        v-model="selectedSubjects"
        label="Matérias"
        placeholder="Selecione as matérias que deseja cadastrar o aluno"
        item-value="_id"
        item-title="name"
        item-text="name"
        chips
      >
      </v-autocomplete>
      <input
        type="email"
        v-model="email"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        placeholder="Endereço de e-mail"
        name="email"
      />
      <input
        type="password"
        v-model="password"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        placeholder="Senha"
        name="password"
      />
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
      enrollNumber: "",
      email: "",
      password: "",
      subjects: [],
      selectedSubjects: [],
      mode: this.$route.params.id ? "edit" : "create",
    };
  },
  mounted() {
    this.handleGetSubjects();
    if (this.$route.params.id) {
      axios
        .get(`${process.env.VUE_APP_API}/students/${this.$route.params.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.name = response.data.student.name;
          this.enrollNumber = response.data.student.enrollmentNumber;
          this.email = response.data.student.email;
          this.password = response.data.student.password;
          console.log(response.data.student);
          this.selectedSubjects = response.data.student.subjects;
        });
    }
  },

  methods: {
    handleGetSubjects() {
      axios
        .get(`${process.env.VUE_APP_API}/subjects`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.subjects = response.data.subject;
          console.log(this.subjects);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSaveStudent() {
      if (this.$route.params.id) {
        axios
          .put(
            `${process.env.VUE_APP_API}/students/${this.$route.params.id}`,
            {
              name: this.name,
              enrollmentNumber: this.enrollNumber,
              email: this.email,
              password: this.password,
              subjects: this.selectedSubjects,
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
      } else {
        axios
          .post(
            `${process.env.VUE_APP_API}/students`,
            {
              name: this.name,
              enrollmentNumber: this.enrollNumber,
              email: this.email,
              password: this.password,
              subjects: this.selectedSubjects,
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
      }
    },
  },
};
</script>

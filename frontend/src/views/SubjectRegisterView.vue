<template class="min-h-screen">
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <h1 v-if="mode === 'create'" class="text-3xl font-bold text-gray-900">
      Adicionar matéria
    </h1>
    <h1 v-else class="text-3xl font-bold text-gray-900">Alterar matéria</h1>
    <p v-if="mode === 'create'" class="text-lg font-normal text-gray-900">
      Crie matérias para seus alunos.
    </p>
    <p v-else class="text-lg font-normal text-gray-900">
      Altere o conteúdo da matéria inserindo suas respectivas informações
    </p>

    <form @submit.prevent="handleSaveSubject" class="flex flex-col space-y-3">
      <input
        v-model="name"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        placeholder="Nome da matéria"
        :class="{ 'ring ring-red-300': v$.name.$error }"
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
      <div v-for="(error, index) of v$.$errors" :key="index">
        <div class="text-red-400">{{ error.$message }}</div>
      </div>
      <div class="flex justify-end">
        <button
          class="mt-3 w-36 py-3 text-white font-medium rounded-lg text-center drop-shadow-lg 5 bg-blue-500 hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </form>
    <div
      class="flex justify-end mt-4 font-semibold"
      v-if="message.type === 'error' || message.type === 'success'"
    >
      <div
        :class="message.type === 'error' ? 'text-red-400' : 'text-green-400'"
      >
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: "",
      students: [],
      tests: [],
      selectedStudents: [],
      selectedTests: [],
      mode: this.$route.params.id ? "edit" : "create",
      message: {
        type: "",
        text: "",
      },
    };
  },
  validations() {
    return {
      name: {
        required: helpers.withMessage("O nome é obrigatório", required),
        minLength: helpers.withMessage(
          "O nome deve possuir no mínimo 4 caracteres",
          minLength(4)
        ),
      },
    };
  },
  created() {
    this.handleGetStudents();
    this.handleGetTests();
    if (this.mode === "edit") {
      axios
        .get(`${process.env.VUE_APP_API}/subjects/${this.$route.params.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.name = response.data.subject.name;
          this.selectedStudents = response.data.subject.students;
          this.selectedTests = response.data.subject.tests;
        });
    }
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
    async handleSaveSubject() {
      const res = await this.v$.$validate();
      if (!res) {
        this.v$.$touch();
        return;
      }
      if (this.mode === "edit") {
        axios
          .put(
            `${process.env.VUE_APP_API}/subjects/${this.$route.params.id}`,
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
            if (response.status === 200 && response.statusText === "OK") {
              this.message.type = "success";
              this.message.text = "Matéria atualizado com sucesso";
              setTimeout(() => {
                this.$router.push("/subject");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response.data.validationError) {
              this.message.text = error.response.data.validationError;
              this.message.type = "error";
            } else {
              this.message.text = "Houve um erro ao atualizar a matéria";
              this.message.type = "error";
            }
          });
      } else {
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
            if (response.status === 201 && response.statusText === "Created") {
              this.message.type = "success";
              this.message.text = "Matéria cadastrada com sucesso";
              setTimeout(() => {
                this.$router.push("/subject");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response.data.validationError) {
              this.message.text = error.response.data.validationError;
              this.message.type = "error";
            } else {
              this.message.text = "Houve um erro ao cadastrar a matéria";
              this.message.type = "error";
            }
        
          });
      }
    },
  },
};
</script>

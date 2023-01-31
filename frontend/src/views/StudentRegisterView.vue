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
        Altere o conteúdo do aluno inserindo suas respectivas informações
      </p>
    </div>
    <form @submit.prevent="handleSaveStudent" class="flex flex-col space-y-3">
      <input
        v-model="name"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        :class="{ 'ring ring-red-300': v$.name.$error }"
        placeholder="Nome completo"
        name="name"
      />

      <input
        v-model="enrollNumber"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        :class="{ 'ring ring-red-300': v$.enrollNumber.$error }"
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
        :class="{ 'ring ring-red-300': v$.email.$error }"
        placeholder="Endereço de e-mail"
        name="email"
      />
      <input
        type="password"
        v-model="password"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        :class="{ 'ring ring-red-300': v$.password.$error }"
        placeholder="Senha"
        name="password"
      />
      <div v-for="(error, index) of v$.$errors" :key="index">
        <div class="text-red-400">{{ error.$message }}</div>
      </div>

      <div class="flex justify-end">
        <button
        class="mt-3 w-36 py-3 text-white font-medium rounded-lg text-center drop-shadow-lg 5 bg-gray-700 hover:bg-gray-800"
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
import { required, minLength, email, helpers } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: "",
      enrollNumber: "",
      email: "",
      password: "",
      subjects: [],
      selectedSubjects: [],
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
        required: helpers.withMessage("O Nome é obrigatório", required),
        minLength: helpers.withMessage(
          "O Nome deve possuir no mínmo 6 caracteres",
          minLength(6)
        ),
      },
      enrollNumber: {
        required: helpers.withMessage(
          "O Número de matrícula é obrigatório",
          required
        ),
        minLength: helpers.withMessage(
          "O Número de matrícula deve possuir no mínmo 6 caracteres",
          minLength(6)
        ),
      },
      email: {
        required: helpers.withMessage("O e-mail é obrigatório", required),
        email: helpers.withMessage("O e-mail deve ser válido", email),
      },
      password: {
        required: helpers.withMessage("A Senha é obrigatória", required),
        minLength: helpers.withMessage(
          "A senha deve possuir no mínmo 6 caracteres",
          minLength(6)
        ),
      },
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

    async handleSaveStudent() {
      const res = await this.v$.$validate();
      if (!res) {
        this.v$.$touch();
        return;
      }
      if (this.mode === "edit") {
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
            if (response.status === 200 && response.statusText === "OK") {
              this.message.type = "success";
              this.message.text = "Aluno atualizado com sucesso";
              setTimeout(() => {
                this.$router.push("/student");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response.data.validationError) {
              this.message.text = error.response.data.validationError;
              this.message.type = "error";
            } else {
              this.message.text = "Houve um erro ao atualizar o estudante";
              this.message.type = "error";
            }
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
            if (response.status === 201 && response.statusText === "Created") {
              this.message.type = "success";
              this.message.text = "Aluno cadastrado com sucesso";
              setTimeout(() => {
                this.$router.push("/student");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response.data.validationError) {
              this.message.text = error.response.data.validationError;
              this.message.type = "error";
            } else {
              this.message.text = "Houve um erro ao cadastrar o estudante";
              this.message.type = "error";
            }
          });
      }
    },
  },
};
</script>

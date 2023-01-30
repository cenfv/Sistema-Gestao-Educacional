<template class="min-h-screen">
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <h1 class="text-3xl font-bold text-gray-900">Adicionar prova</h1>
    <p v-if="mode === 'create'" class="text-lg font-normal text-gray-900">
      Crie provas para seus alunos.
    </p>

    <p v-else class="text-lg font-normal text-gray-900">
      Altere o conteúdo da prova inserindo suas respectivas informações
    </p>
    <form @submit.prevent="handleSaveTest" class="flex flex-col space-y-3">
      <input
        v-model="title"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        :class="{ 'ring ring-red-300': v$.title.$error }"
        placeholder="Título da prova"
        name="title"
      />
      <input
        v-model="description"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        :class="{ 'ring ring-red-300': v$.description.$error }"
        placeholder="Descrição da prova"
        name="description"
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
      title: "",
      description: "",
      questions: [],
      selectedQuestions: [],
      mode: this.$route.params.id ? "edit" : "create",
      message: {
        type: "",
        text: "",
      },
    };
  },
  validations() {
    return {
      title: {
        required: helpers.withMessage("O Título é obrigatório", required),
        minLength: helpers.withMessage(
          "O Título deve possuir no mínimo 6 caracteres",
          minLength(6)
        ),
      },
      description: {
        required: helpers.withMessage("A descrição é obrigatória", required),
        minLength: helpers.withMessage(
          "A descrição deve possuir no mínmo 6 caracteres",
          minLength(6)
        ),
      },
    };
  },
  created() {
    this.handleGetQuestions();
    if (this.$route.params.id) {
      axios
        .get(`${process.env.VUE_APP_API}/tests/${this.$route.params.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.title = response.data.test.title;
          this.description = response.data.test.description;
          this.selectedQuestions = response.data.test.questions;
        });
    }
  },
  computed: {
    formattedQuestion: {
      get() {
        return this.selectedQuestions.map((question) => {
          return {
            question: question,
          };
        });
      },
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
          this.questions = response.data.question;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async handleSaveTest() {
      const res = await this.v$.$validate();
      if (!res) {
        this.v$.$touch();
        return;
      }
      if (this.mode === "edit") {
        axios
          .put(
            `${process.env.VUE_APP_API}/tests/${this.$route.params.id}`,
            {
              title: this.title,
              description: this.description,
              questions: this.selectedQuestions,
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
              this.message.text = "Prova atualizado com sucesso";
              setTimeout(() => {
                this.$router.push("/test");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response.data.validationError) {
              this.message.text = error.response.data.validationError;
              this.message.type = "error";
            } else {
              this.message.text = "Houve um erro ao atualizar a prova";
              this.message.type = "error";
            }
          });
      } else {
        axios
          .post(
            `${process.env.VUE_APP_API}/tests`,
            {
              title: this.title,
              description: this.description,
              questions: this.selectedQuestions,
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
              this.message.text = "Prova cadastrada com sucesso";
              setTimeout(() => {
                this.$router.push("/test");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response.data.validationError) {
              this.message.text = error.response.data.validationError;
              this.message.type = "error";
            } else {
              this.message.text = "Houve um erro ao cadastrar a prova";
              this.message.type = "error";
            }
          });
      }
    },
  },
};
</script>

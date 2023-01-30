<template class="min-h-screen">
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <h1 v-if="mode === 'create'" class="text-3xl font-bold text-gray-900">
      Adicionar questão
    </h1>
    <h1 v-else class="text-3xl font-bold text-gray-900">Alterar questão</h1>
    <p v-if="mode === 'create'" class="text-lg font-normal text-gray-900">
      Crie questões para as suas provas.
    </p>
    <p v-else class="text-lg font-normal text-gray-900">
      Altere o conteúdo da questão inserindo suas respectivas informações
    </p>

    <form @submit.prevent="handleSaveQuestion" class="flex flex-col space-y-3">
      <input
        v-model="title"
        :class="{ 'ring ring-red-300': v$.title.$error }"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        placeholder="Título da questão"
        name="title"
      />
      <textarea
        v-model="description"
        placeholder="Enunciado da questão"
        :class="{ 'ring ring-red-300': v$.description.$error }"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
      ></textarea>

      <div
        v-for="alternative in alternatives"
        :key="alternative.id"
        class="flex justify-center items-center"
      >
        <input
          :class="{ 'ring ring-red-300': v$.description.$error }"
          v-model="alternative.description"
          placeholder="Descrição da alternativa"
          class="bg-white rounded-lg p-4 drop-shadow-lg min-w-full focus:outline-none focus:ring"
        />

        <div
          class="flex items-center cursor-pointer hover:scale-110"
          @click="handleRemoveAlternative(alternative.id)"
        >
          <v-icon size="22" class="absolute -ml-8" icon="mdi-delete"></v-icon>
        </div>
      </div>
      <button
        @click="handleAddAlternative"
        class="font-medium m-2 self-start text-gray-700"
        type="button"
      >
        + Adicionar alternativa
      </button>
      <select
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        v-model="selectedAlternative"
        :class="{ 'ring ring-red-300': v$.selectedAlternative.$error }"
      >
        <option value="" disabled>Selecione a alternativa correta</option>
        <option
          v-for="alternative in alternatives"
          :value="alternative"
          :key="alternative.id"
        >
          {{ alternative.description }}
        </option>
      </select>
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
import { required, minLength, helpers } from "@vuelidate/validators";

export default {
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "",
      description: "",
      selectedAlternative: "",
      alternatives: [{ id: 0, description: "" }],
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
          "A descrição deve possuir no mínimo 6 caracteres",
          minLength(6)
        ),
      },
      selectedAlternative: {
        required: helpers.withMessage(
          "A alternativa correta é obrigatória",
          required
        ),
      },
      alternatives: {
        required,
        minLength: helpers.withMessage(
          "A questão deve possuir no mínimo 2 alternativas",
          minLength(2)
        ),
      },
    };
  },
  mounted() {
    if (this.$route.params.id) {
      axios
        .get(`${process.env.VUE_APP_API}/questions/${this.$route.params.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.title = response.data.question.title;
          this.description = response.data.question.description;
          this.alternatives = response.data.question.alternatives;
          this.selectedAlternative = {
            description: this.alternatives
              .filter((alternative) => {
                if (
                  alternative._id === response.data.question.correctAlternative
                ) {
                  return alternative.description;
                }
              })
              .at(0).description,
            _id: response.data.question.correctAlternative,
          };

          console.log(this.selectedAlternative);
        });
    }
  },
  methods: {
    handleAddAlternative() {
      this.alternatives.push({
        id: this.alternatives[this.alternatives.length - 1].id + 1,
        description: "",
      });
    },
    handleRemoveAlternative(id) {
      if (this.alternatives.length === 1) return;

      this.alternatives = this.alternatives.filter(
        (alternative) => alternative.id !== id
      );
    },
    async handleSaveQuestion() {
      const res = await this.v$.$validate();
      if (!res) {
        this.v$.$touch();
        return;
      }
      if (this.mode === "edit") {
        axios
          .put(
            `${process.env.VUE_APP_API}/questions/${this.$route.params.id}`,
            {
              title: this.title,
              description: this.description,
              alternatives: this.alternatives,
              correctAlternative: this.selectedAlternative.id,
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
              this.message.text = "Questão atualizada com sucesso";
              setTimeout(() => {
                this.$router.push("/question");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response.data.validationError) {
              this.message.text = error.response.data.validationError;
              this.message.type = "error";
            } else {
              this.message.text = "Houve um erro ao atualizar a questão";
              this.message.type = "error";
            }
          });
      } else {
        axios
          .post(
            `${process.env.VUE_APP_API}/questions`,
            {
              title: this.title,
              description: this.description,
              alternatives: this.alternatives,
              correctAlternative: this.selectedAlternative.id,
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
              this.message.text = "Questão cadastrada com sucesso";
              setTimeout(() => {
                this.$router.push("/question");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response.data.validationError) {
              this.message.text = error.response.data.validationError;
              this.message.type = "error";
            } else {
              this.message.text = "Houve um erro ao cadastrar a questão";
              this.message.type = "error";
            }
          });
      }
    },
  },
};
</script>

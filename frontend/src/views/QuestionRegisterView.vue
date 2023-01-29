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

    <form
      @submit.prevent="handleCreateQuestion"
      class="flex flex-col space-y-3"
    >
      <input
        v-model="title"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        placeholder="Título da questão"
        name="title"
      />
      <textarea
        v-model="description"
        placeholder="Enunciado da questão"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
      ></textarea>

      <div
        v-for="alternative in alternatives"
        :key="alternative.id"
        class="flex justify-center items-center"
      >
        <input
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
        class="font-medium m-2 self-start text-blue-500"
        type="button"
      >
        + Adicionar alternativa
      </button>
      <select
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        v-model="selectedAlternative"
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

      <div className="flex justify-end">
        <button
          className="mt-3 w-36  py-3  text-white font-medium rounded-lg text-center drop-shadow-lg 5 bg-blue-500 hover:bg-blue-700 "
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
  components: {},
  data() {
    return {
      title: "",
      description: "",
      selectedAlternative: "",
      alternatives: [{ id: 0, description: "" }],
      mode: this.$route.params.id ? "edit" : "create",
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
    handleCreateQuestion() {
      console.log(this.selectedAlternative);
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
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

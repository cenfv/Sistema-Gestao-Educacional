<template>
  <div>
    <div class="min-h-screen bg-gray-50">
      <LoggedNavbar />
      <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 mt-5 shadow-md">
        <h1 class="mt-3 text-3xl font-bold text-gray-900 sm:text-3xl">
          Adicionar questão
        </h1>
        <p class="mt-2 text-lg font-normal text-gray-900 sm:text-lg">
          Crie questões para as suas provas.
        </p>
        <div>
          <h3 class="mt-5 text-2xl font-bold text-gray-900">
            Criar nova questão:
          </h3>
        </div>
        
        <form>
          <div class="flex flex-col">
            
            <input
              class="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
              placeholder="Título da questão"
              name="title"
            />
            <textarea
              label="Label"
              placeholder="Enunciado da questão"
              name="description"
              class="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
            >
            </textarea>

            <input
              v-for="alternative in alternatives"
              :key="alternative.id"
              v-model="alternative.description"
              placeholder="Descrição da alternativa"
              class=" bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
            />
            <font-awesome-icon icon="fa-solid fa-trash" />
            
            <button @click="handleAddAlternative" class=" font-medium m-2 self-start text-blue-500" type="button">+ Adicionar alternativa</button>
            <select
              class="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
              v-model="selectedAlternative"
            >
              <option value="" disabled>Selecione a alternativa correta</option>
              <option
                v-for="alternative in alternatives"
                :value="alternative.id"
                :key="alternative.id"
              >
                {{ alternative.description }}
              </option>
            </select>
          </div>
          
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedAlternative: "",
      alternatives: [
        { id: 1, description: "" },
        
      ],
    };
  },
  methods: {
    handleAddAlternative() {
      this.alternatives.push({ id: this.alternatives.length + 1, description: "" });
    }
  },
};
</script>

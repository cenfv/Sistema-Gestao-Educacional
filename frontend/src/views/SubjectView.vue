<template class="min-h-screen">
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <h1 class="text-3xl font-bold text-gray-900">Adicionar matéria</h1>
    <p class="text-lg font-normal text-gray-900">
      Crie matérias para seus alunos.
    </p>

    <div>
      <h3 class="text-2xl font-bold text-gray-900">Cadastrar nova Matéria:</h3>
    </div>
    <form
      @submit.prevent="handleCreateQuestion"
      class="flex flex-col space-y-3"
    >
      <input
        v-model="name"
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        placeholder="Nome da matéria"
        name="name"
      />
      <select
        class="bg-white rounded-lg p-4 drop-shadow-lg focus:outline-none focus:ring"
        v-model="selectedStudents"
        
        multiple = "true"
      >
        <option value="" disabled>
          Selecione os estudantes que participarão da matéria:
        </option>
        <option
          v-for="student in students"
          :value="student.id"
          :key="student.id"
        >
          {{ student.name }}
        </option>
      </select>
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
    };
  },
  created() {
    this.getStudents();
    console.log(this.students);
    //this.getTests();
  },
  methods: {
    getStudents() {
      axios
        .get("http://localhost:3000/students", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.student)
          this.students = response.data.student;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

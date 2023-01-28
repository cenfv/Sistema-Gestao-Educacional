<template>
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Alunos</h1>
        <p class="text-lg font-normal text-gray-900">
          Todos os alunos serão exibidos aqui
        </p>
      </div>
      <div class="flex">
        <router-link
          to="/student-register"
          class="flex py-3 px-3 text-white text-sm font-normal rounded-lg text-center drop-shadow-lg 5 bg-slate-700 hover:bg-slate-900"
        >
          <div class="flex mr-2 items-baseline">
            <v-icon icon="mdi-account-plus"></v-icon>
          </div>
          Cadastrar aluno
        </router-link>
      </div>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Número de matrícula</th>
          <th class="text-left">E-mail</th>
          <th class="text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.name">
          <td>{{ student.name }}</td>
          <td>{{ student.enrollmentNumber }}</td>
          <td>{{ student.email }}</td>
          <td class="flex space-x-4">
            <div
              @click="handleUpdateUser(student._id)"
              class="flex items-center cursor-pointer hover:scale-125"
            >
              <v-icon size="22" icon="mdi-note-edit"></v-icon>
            </div>

            <div
              @click="handleDeleteUser()"
              class="flex items-center cursor-pointer hover:scale-125"
            >
              <v-icon size="22" icon="mdi-delete"></v-icon>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "StudentView",
  data() {
    return {
      students: [],
    };
  },
  mounted() {
    this.handleGetStudents();
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
    handleUpdateUser(id) {
      this.$router.push({ name: 'student-update', params: { id: id }});
    },
    handleDeleteUser() {
      console.log("delete");
    },
  },
};
</script>

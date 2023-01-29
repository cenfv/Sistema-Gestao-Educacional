<template>
    <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Matérias</h1>
          <p class="text-lg font-normal text-gray-900">
            Todos as matérias serão exibidas aqui
          </p>
        </div>
        <div class="flex">
          <router-link
            to="/subject-register"
            class="flex py-3 px-3 text-white text-sm font-normal rounded-lg text-center drop-shadow-lg 5 bg-slate-700 hover:bg-slate-900"
          >
            <div class="flex mr-2 items-baseline">
              <v-icon icon="mdi-account-plus"></v-icon>
            </div>
            Cadastrar questão
          </router-link>
        </div>
      </div>
      <div class="mt-8">
        <v-text-field
          v-model="searchTerm"
          filled
          label="Buscar questão"
          prepend-inner-icon="mdi-magnify"
          class="w-3/4 bg-white rounded-lg focus:outline-none focus:ring"
        ></v-text-field>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">Criado em:</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in filteredData" :key="subject._id">
              <td>{{ subject.name }}</td>
              <td>{{ subject.createdAt }}</td>
              <td class="flex space-x-4">
                <div
                  @click="handleUpdateSubject(subject._id)"
                  class="flex items-center cursor-pointer hover:scale-125"
                >
                  <v-icon size="22" icon="mdi-note-edit"></v-icon>
                </div>
  
                <div
                  @click="handleDeleteSubject(subject._id)"
                  class="flex items-center cursor-pointer hover:scale-125"
                >
                  <v-icon size="22" icon="mdi-delete"></v-icon>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    name: "SubjectView",
    data() {
      return {
        subjects: [],
        searchTerm: "",

      };
    },
    mounted() {
      this.handleGetSubjects();
    },
    computed: {
      filteredData() {
        return this.subjects.filter((subject) => {
          return subject.name.includes(this.searchTerm);
        });
      },
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
            this.subjects = response.data.subject.filter((subject) => {
              subject.createdAt = new Date(
                subject.createdAt
              ).toLocaleDateString("pt-BR");
              return subject.name.includes(this.searchTerm);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleUpdateSubject(id) {
        this.$router.push({
          name: "subject-update",
          params: {
            id: id,
          },
        });
      },
      handleDeleteSubject(id) {
        axios
          .delete(`${process.env.VUE_APP_API}/subjects/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
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
  
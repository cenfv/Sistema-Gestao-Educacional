<template>
    <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Provas</h1>
          <p class="text-lg font-normal text-gray-900">
            Todos as provas serão exibidos aqui
          </p>
        </div>
        <div class="flex">
          <router-link
            to="/test-register"
            class="flex py-3 px-3 text-white text-sm font-normal rounded-lg text-center drop-shadow-lg 5 bg-slate-700 hover:bg-slate-900"
          >
            <div class="flex mr-2 items-baseline">
              <v-icon icon="mdi-account-plus"></v-icon>
            </div>
            Cadastrar Prova
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
              <th class="text-left">Título</th>
              <th class="text-left">Descrição</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="test in filteredData" :key="test._id">
              <td>{{ test.title }}</td>
              <td>{{ test.createdAt }}</td>
              <td class="flex space-x-4">
                <div
                  @click="handleUpdateTest(test._id)"
                  class="flex items-center cursor-pointer hover:scale-125"
                >
                  <v-icon size="22" icon="mdi-note-edit"></v-icon>
                </div>
  
                <div
                  @click="handleDeleteTest(test._id)"
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
    title: "TestView",
    data() {
      return {
        tests: [],
        searchTerm: "",
      };
    },
    mounted() {
      this.handleGetTests();
    },
    computed: {
      filteredData() {
        return this.tests.filter((test) => {
          return test.title.includes(this.searchTerm);
        });
      },
    },
  
    methods: {
      handleGetTests() {
        axios
          .get(`${process.env.VUE_APP_API}/tests`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.tests = response.data.test.filter((test) => {
              test.createdAt = new Date(
                test.createdAt
              ).toLocaleDateString();
              return test.title.includes(this.searchTerm);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleUpdateTest(id) {
        this.$router.push({
          name: "test-update",
          params: {
            id: id,
          },
        });
      },
      handleDeleteTest(id) {
        axios
          .delete(`${process.env.VUE_APP_API}/tests/${id}`, {
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
  
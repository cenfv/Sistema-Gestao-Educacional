<template>
  <div class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Histórico do aluno</h1>
        <p class="text-lg font-normal text-gray-900">
          Todos as suas notas serão exibidos aqui
        </p>
      </div>
    </div>
    <div class="mt-8">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Matéria</th>
            <th class="text-left">Provas realizadas</th>
            <th class="text-left">Total de provas</th>
            <th class="text-left">Média final</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="userStatistic in userStatistics"
            :key="userStatistic.subject"
          > 
            <td>{{ userStatistic.subjectName }}</td>
            <td>{{ userStatistic.tests }}</td>
            <td>{{ userStatistic.totalTests }}</td>
            <td>{{ Number(userStatistic.averageGrade).toFixed(2) }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userStatistics: {},
    };
  },
  mounted() {
    this.handleGetUserStatistics();
  },
  methods: {
    handleGetUserStatistics() {
      axios
        .get(
          `${process.env.VUE_APP_API}/submissions/student/${this.$store.state.user.id}/statistics`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.userStatistics = response.data.statistics;
          console.log(this.userStatistics);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

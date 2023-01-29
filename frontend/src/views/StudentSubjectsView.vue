<template>
  <div class="grid grid-cols-1 sm:grid-cols-3">
    <v-card class="m-2" max-width="344" v-for="subject in subjects" :key="subject._id">
      <v-card-text>
        <p class="text-h4 text--primary">{{ subject.name }}</p>
        <div class="text--primary">{{subject.tests.length}} provas no total</div>
        <div class="mt-8 text--primary">
          Visualize informações referentes à disciplina de {{ subject.name }}.
        </div>
      </v-card-text>
      <v-card-actions @click="handleViewTest(subject._id)">
        <v-btn variant="text" class="text-sky-700"> Visualizar </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$store.state.user.id,
      subjects: [],
      testsQuantity: 0,
    };
  },
  mounted() {
    this.handleGetStudentSubjects();
  },
  methods: {
    handleGetStudentSubjects() {
      console.log(this.id);
      axios
        .get(`${process.env.VUE_APP_API}/students/${this.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.subjects = response.data.student.subjects;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleViewTest(id){
      this.$router.push(`/subject/${id}/tests`);
    }
  },
};
</script>

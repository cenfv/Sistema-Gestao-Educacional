<template>
  <div v-if="loading" class="flex space-x-4 items-center">
    <h1 class="text-2xl font-bold text-gray-900">Carregando...</h1>  <v-progress-circular  indeterminate model-value="20"></v-progress-circular>
  </div>
  <div v-else-if="!receivedTests" class="bg-white max-w-6xl mx-auto rounded-lg p-10 shadow-md space-y-2">
   <div class="flex items-center space-x-4">
     <h1 class="text-3xl font-bold text-gray-900">Oops...</h1> 
     <h1 class="text-2xl font-semibold text-gray-900">Nenhuma matéria encontrada</h1>
   </div>
   <p class="text-lg font-normal text-gray-900">Entre em contato com seu professor para se inscrever em uma matéria.</p>
   </div>
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
     receivedTests: true,
     loading: false
   };
 },
 mounted() {
   this.handleGetStudentSubjects();
 },
 methods: {
   handleGetStudentSubjects() {
     console.log(this.id);
     this.loading = true;
     axios
       .get(`${process.env.VUE_APP_API}/students/${this.id}`, {
         headers: {
           authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       })
       .then((response) => {
         this.subjects = response.data.student.subjects;
         if (!this.subjects.length > 0) {
           this.receivedTests = false;
         }
         this.loading = false;
       })
        .catch((error) => {
          this.receivedTests = false;
          console.log(error);
        });
    },
    handleViewTest(id) {
      this.$router.push(`/subject/${id}/tests`);
    },
  },
};
</script>

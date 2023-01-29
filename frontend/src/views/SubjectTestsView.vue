<template>
  <div class="grid grid-cols-1 ">
    <v-card class="m-2" v-for="test in tests" :key="test._id">
      <v-card-text>
        <p class="text-h4 text--primary">{{ test.title }}</p>
        <div class="mt-2 text--primary">
          {{ test.description }}.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="handleViewTest(test._id)" variant="text" class="text-sky-700"> Visualizar prova </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      tests: [],
    };
  },
  mounted() {
    this.handleGetSubjectTests();
  },
  methods: {
    handleGetSubjectTests() {
      console.log(this.id);
      axios
        .get(`${process.env.VUE_APP_API}/subjects/${this.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.tests = response.data.subject.tests;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleViewTest(id){
      this.$router.push(`/test/answer/${id}`);
    }
  },
};
</script>

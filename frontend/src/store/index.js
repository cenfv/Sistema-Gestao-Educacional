import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      name: "",
      id: "",
      email: "",
      isLogged: false,
    },
    test: {
      id: "",
      subject: "",
      questionIndex: 0,
      questions: [
        {
          id: "",
          answer: "",
        },
      ],
    },
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = {
        name: "",
        id: "",
        email: "",
        isLogged: false,
      };
    },
    setTest(state, payload) {
      state.test = payload;
    },
    incrementQuestionIndex(state) {
      state.test.questionIndex++;
    },
    decrementQuestionIndex(state) {
      state.test.questionIndex--;
    },
    answerQuestion(state, payload) {
      state.test.questions[payload.questionIndex].answer = payload.answer;
    }
  },
  actions: {
    setUser({ commit }, { name, id, email }) {
      const payload = {
        name,
        id,
        email,
        isLogged: true,
      };
      commit("setUser", payload);
    },
    logout({ commit }) {
      commit("logout");
    },
    setQuestions({ commit }, payload) {
      commit("setTest", payload);
    },
    incrementQuestionIndex({ commit }) {
      if (this.state.test.questionIndex === this.state.test.questions.length -1) return;
      commit("incrementQuestionIndex");
    },
    decrementQuestionIndex({ commit }) {
      if (this.state.test.questionIndex === 0) return;
      commit("decrementQuestionIndex");
    },
    answerQuestion({ commit }, {questionIndex, answer}) {
      const payload = {
        questionIndex,
        answer
      }
      commit("answerQuestion", payload);
    }
  },
  modules: {},
});

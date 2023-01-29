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
      commit("incrementQuestionIndex");
    }
  },
  modules: {},
});

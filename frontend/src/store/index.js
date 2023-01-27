import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      name: "",
      id: "",
      email: "",
      isLogged: false,
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
  },
  modules: {},
});

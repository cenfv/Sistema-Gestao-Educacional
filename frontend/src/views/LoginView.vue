<template>
  <div class="flex h-screen justify-center items-center">
    <div
      class="space-y-4 flex flex-col p-6 rounded-lg shadow-lg bg-white -mt-10"
    >
      <h2 class="text-center text-2xl font-bold text-gray-900">
        Entrar com sua conta
      </h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-1">
          <input
            v-model="email"
            type="email"
            :class="{ 'ring ring-red-300': v$.email.$error }"
            class="p-2 w-full border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
            placeholder="Email"
          />
          <input
            v-model="password"
            type="password"
            :class="{ 'ring ring-red-300': v$.password.$error }"
            class="p-2 w-full border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
            placeholder="Senha"
          />
        </div>

        <div class="flex justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              class="h-4 w-4 text-gray-600 border-gray-300 rounded"
            />
            <label class="ml-2 text-sm text-gray-900"> Lembrar-me </label>
          </div>
          <div class="text-sm">
            <router-link
              to="/"
              class="font-medium text-gray-700 hover:underline"
            >
              Esqueceu sua senha?
            </router-link>
          </div>
        </div>
        <button
          class="px-6 py-2 w-full rounded-md shadow-sm text-base font-medium text-white bg-gray-700 hover:bg-gray-800"
        >
          Entrar
        </button>
      </form>
      <div>
        <div v-for="(error, index) of v$.$errors" :key="index">
          <div class="text-red-400">{{ error.$message }}</div>
        </div>

        <div
          class="flex justify-end font-semibold"
          v-if="message.type === 'error' || message.type === 'success'"
        >
          <div
            :class="
              message.type === 'error' ? 'text-red-400' : 'text-green-400'
            "
          >
            {{ message.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      message: {
        type: "",
        text: "",
      },
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage("O e-mail é obrigatório", required),
        email: helpers.withMessage("O e-mail deve ser válido", email),
      },
      password: {
        required: helpers.withMessage("A Senha é obrigatória", required),
        minLength: helpers.withMessage(
          "A senha deve possuir no mínmo 6 caracteres",
          minLength(6)
        ),
      },
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.v$.$validate();
      if (!res) {
        this.v$.$touch();
        return;
      }
      axios
        .post(`${process.env.VUE_APP_API}/auth/login`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200 && response.statusText === "OK") {
            localStorage.setItem("token", response.data.token);
            this.$store.dispatch("setUser", {
              id: response.data.user._id,
              name: response.data.user.name,
              email: response.data.user.email,
            });
            this.message.type = "success";
            this.message.text = "Login realizado com sucesso";
            setTimeout(() => {
              console.log(response.data.user)
              if (response.data.user.role === 1) this.$router.push("/subject");
              else {
                this.$router.push("/student-dashboard");
              }
            }, 1000);
          } else {
            this.message.type = "error";
            this.message.text = "Credenciais inválidas";
          }
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            this.message.text = "Credenciais inválidas";
            this.message.type = "error";
          } else {
            this.message.text = "Erro ao tentar se conectar ao servidor";
            this.message.type = "error";
          }
        });
    },
  },
};
</script>

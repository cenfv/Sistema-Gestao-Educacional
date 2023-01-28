<template>
  <v-app>
    <v-main>
      <router-view name="navbar" />
      <div class="max-w-6xl m-4 sm:mx-auto">
      <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style>
  main {
    background-color: rgb(249 250 251);
  }
  nav {
    background-color: white;
  }
</style>
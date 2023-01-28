<template>
  <router-view name="navbar" />
    <div class="max-w-6xl m-4 sm:mx-auto">
      <router-view name="default" />
    </div>
</template>
<style>
  body {
    background-color: rgb(249 250 251);
  }
  nav {
    background-color: white;
  }
</style>
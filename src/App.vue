<template>
  <div id="app">
    <header>
      <span>Carsharing Calculator</span>
    </header>
    <main>
      <input v-model="driving" />
      <input v-model="parking" />
      <cost-list v-bind:driving="driving" v-bind:parking="parking"></cost-list>
    </main>
  </div>
</template>

<script>
import CostList from './components/CostList';

export default {
  name: 'app',
  data() {
    return {
      driving: 10,
      parking: 5,
    };
  },
  components: {
    CostList,
  },
};
</script>

<style src="vue-material/dist/vue-material.css"></style>

<style>

</style>

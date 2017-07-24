<template>
  <div id="app">
    <header>
      <h1 class="md-headline">Carsharing-Preisvergleich</h1>
    </header>
    <main>
      <md-layout md-gutter>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>Fahren</label>
            <md-input type="number" v-model="driving"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Parken</label>
            <md-input type="number" v-model="parking"></md-input>
          </md-input-container>
        </form>
      </md-layout>
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
.md-headline {
  padding: 0 24px;
}
</style>

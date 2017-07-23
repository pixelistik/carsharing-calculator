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
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>

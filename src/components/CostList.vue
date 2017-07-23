<template>
  <div class="cost-list">
    <h1>Cost for {{ driving }} minutes of driving, {{ parking }} minutes of parking</h1>


    <ul>
      <li v-for="tariff in tariffs">
        {{ tariff.totalCost }}
      </li>
    </ul>
  </div>
</template>

<script>
import Calculator from '@/Calculator';

const calculator = Object.create(Calculator);

export default {
  name: 'cost-list',
  props: ['driving', 'parking'],
  data() {
    return {
      msg: 'Welcome to Your Vue.js PWA',
    };
  },
  computed: {
    tariffs() {
      return calculator.calculateAllCosts(this.driving, this.parking);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
}

a {
  color: #35495E;
}
</style>

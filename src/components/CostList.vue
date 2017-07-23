<template>
  <div class="cost-list phone-viewport">
    <h1>Cost for {{ driving }} minutes of driving, {{ parking }} minutes of parking</h1>

    <md-list>
      <md-list-item v-for="tariff in tariffs">
        <span>{{ tariff.totalCost }}</span>
      </md-list-item>
    </md-list>
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

a {
  color: #35495E;
}
</style>

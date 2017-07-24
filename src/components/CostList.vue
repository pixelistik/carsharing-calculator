<template>
  <md-layout md-gutter class="cost-list">
    <md-layout md-flex="100">
      <h2 class="md-headline">Kosten:</h2>
    </md-layout>
    <md-layout>
      <md-table class="tariffs">
        <md-table-body>
          <md-table-row v-for="tariff in tariffs" :key="tariff.name">
            <md-table-cell>
              {{ tariff.name }}
            </md-table-cell>
            <md-table-cell>
              {{ tariff.totalCost | currency }}
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-layout>
  </md-layout>
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
  filters: {
    currency(value) {
      const formattedNumber = value
        .toFixed(2)
        .replace('.', ',');
      return `${formattedNumber} €`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.md-input-container label,
.md-input-container input  {
  margin-left: 24px;
}
</style>

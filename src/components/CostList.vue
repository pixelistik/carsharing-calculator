<template>
  <div class="md-layout cost-list">
    <div class="md-layout-item">
      <h2 class="md-headline">
        Kosten:
      </h2>
      <md-table class="tariffs">
        <md-table-row
          v-for="tariff in costs"
          :key="tariff.name"
        >
          <md-table-cell>
            {{ tariff.name }}
          </md-table-cell>
          <md-table-cell>
            {{ tariff.totalCost | currency }}
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import Calculator from '@/Calculator';

const calculator = Object.create(Calculator);

export default {
  name: 'CostList',
  filters: {
    currency(value) {
      const formattedNumber = value
        .toFixed(2)
        .replace('.', ',');
      // eslint-disable-next-line no-irregular-whitespace
      return `${formattedNumber} €`; // Unicode NBSP
    },
  },
  props: ['driving', 'parking', 'kilometers', 'tariffs', 'filter'],
  data() {
    return {
      msg: 'Welcome to Your Vue.js PWA',
    };
  },
  computed: {
    costs() {
      return calculator.calculateAllCosts(this.driving, this.parking, this.kilometers)
        .filter(this.filter);
    },
  },
  created() {
    calculator.tariffs = this.tariffs;
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

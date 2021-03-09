<template>
  <div class="filter">
    <div 
      v-for="filterCategory in filterCategories" 
      :key="filterCategory.name" 
      class="filter--category"
    >
      <h3 class="filter--category--name">
        {{ filterCategory.name }}
      </h3>
      <div 
        v-for="filterValue in filterCategory.values" 
        :key="filterCategory.name + filterValue.name"
        class="filter--value"
      >
        <md-checkbox
          v-model="filterValue.selected"
          class="md-primary"
        >
          {{ filterValue.name }}
        </md-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
const _ = require('lodash');

export default {
  name: 'AutoFilter',
  props: ['items'],
  data() {
    return {
      filterCategories: [],
    };
  },
  computed: {
    filterFunction() {
      const vm = this;

      return (item) => {
        if (typeof item.filterProperties === 'undefined') {
          return true;
        }

        const categories = Object.keys(item.filterProperties);

        return categories.reduce((result, category) => {
          const valueInItem = item.filterProperties[category];

          const categoryInFilter = _.find(vm.filterCategories, ['name', category]);
          const valueInFilter = _.find(categoryInFilter.values, ['name', valueInItem]);

          return result && valueInFilter.selected;
        }, true);
      };
    },
  },
  watch: {
    filterCategories: {
      handler: function filterCategories() {
        this.$emit('filterchanged', this.filterFunction);
      },
      deep: true,
    },
  },
  created() {
    this.filterCategories = this.extractFilterCategoriesFromItems();
  },
  methods: {
    extractFilterCategoriesFromItems() {
      const collectedCategories = {};

      this.items.forEach((item) => {
        if (typeof item.filterProperties === 'undefined') {
          return;
        }
        const categories = Object.keys(item.filterProperties);

        categories.forEach((name) => {
          if (typeof collectedCategories[name] === 'undefined') {
            collectedCategories[name] = {
              values: [],
            };
          }
          collectedCategories[name].values.push({
            name: item.filterProperties[name],
            selected: true,
          });
        });
      });

      const collectedCategoryNames = Object.keys(collectedCategories);

      return collectedCategoryNames.map(
        collectedCategoryName =>
          ({
            name: collectedCategoryName,
            values: _.uniqBy(collectedCategories[collectedCategoryName].values, 'name'),
          })
      );
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

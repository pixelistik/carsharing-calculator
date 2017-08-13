<template>
  <div class="filter">
    <div class="filter--category" v-for="filterCategory in filterCategories">
      <span class="filter--category--name">{{ filterCategory.name }}</span>
      <div class="filter--value" v-for="filterValue in filterCategory.values">
        <label>
          <input type="checkbox" v-model="filterValue.selected" />
          {{ filterValue.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
const _ = require('lodash');

export default {
  name: 'auto-filter',
  props: ['items'],
  created() {
    this.filterCategories = this.extractFilterCategoriesFromItems();
  },
  data() {
    return {
      filterCategories: [],
    };
  },
  computed: {
    filterFunction() {
      const vm = this;

      return (item) => {
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
          }),
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

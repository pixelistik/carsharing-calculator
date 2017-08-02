<template>
  <div class="filter">
    <div class="filter--category" v-for="filterCategory in filterCategories">
      <span class="filter--category--name">{{ filterCategory.name }}</span>
      <div class="filter--value" v-for="filterValue in filterCategory.values">
        {{ filterValue }}
      </div>
    </div>
  </div>
</template>

<script>
const _ = require('lodash');

export default {
  name: 'auto-filter',
  props: ['items'],
  data() {
    return {
      bla: 'Welcome to Your Vue.js PWA',
    };
  },
  computed: {
    filterCategories() {
      const collectedCategories = {};

      this.items.forEach((item) => {
        const categories = Object.keys(item.filterProperties);
        // const name = categories[0];

        categories.forEach((name) => {
          if (typeof collectedCategories[name] === 'undefined') {
            collectedCategories[name] = {
              values: [],
            };
          }
          collectedCategories[name].values.push(item.filterProperties[name]);
        });
      });

      const collectedCategoryNames = Object.keys(collectedCategories);

      return collectedCategoryNames.map(
        collectedCategoryName =>
          ({
            name: collectedCategoryName,
            values: _.uniq(collectedCategories[collectedCategoryName].values),
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

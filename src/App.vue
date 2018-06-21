<template>
  <div id="app">
    <header>
      <h1 class="md-headline">Carsharing-Kostenrechner</h1>
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
          <md-input-container>
            <label>Kilometer</label>
            <md-input type="number" v-model="kilometers"></md-input>
          </md-input-container>
        </form>
      </md-layout>
      <cost-list
        v-bind:driving="driving"
        v-bind:parking="parking"
        v-bind:kilometers="kilometers"
        v-bind:tariffs="tariffs"
        v-bind:filter="filter"
      ></cost-list>
      <md-button
        class="md-fab md-fab-bottom-right md-primary filter-button"
        v-on:click="openDialog('filterdialog')"
      >
        <md-icon>filter_list</md-icon>
      </md-button>
      <md-dialog ref="filterdialog">
        <md-dialog-content>
          <md-dialog-title>Tarife filtern</md-dialog-title>
          <auto-filter v-bind:items="tariffs" v-on:filterchanged="updateFilter"></auto-filter>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="closeDialog('filterdialog')">Ok</md-button>
        </md-dialog-actions>
      </md-dialog>
    </main>
    <footer>
      <md-card>
        <md-card-header>
          <div class="md-title">Info:</div>
        </md-card-header>
        <md-card-content>
          <p>
          Alle Angaben ohne Gewähr. Dieser Rechner ist kein Angebot der genannten Carsharing-Betreiber.
        </p>
        <p>
          <a href="http://pixelistik.de/impressum.html">Impressum</a>
          <a href="https://github.com/pixelistik/carsharing-calculator">Sourcecode</a>
        </p>
        </md-card-content>
      </md-card>
    </footer>
  </div>
</template>

<script>
import CostList from '@/components/CostList';
import tariffs from '@/tariffs';
import AutoFilter from '@/components/AutoFilter';

export default {
  name: 'app',
  data() {
    return {
      driving: 10,
      parking: 5,
      kilometers: 200,
      tariffs,
      filter: () => true,
    };
  },
  components: {
    CostList,
    AutoFilter,
  },
  methods: {
    updateFilter: function updateFilter(data) {
      this.filter = data;
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
  },
};
</script>

<style src="vue-material/dist/vue-material.css"></style>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.md-headline {
  padding: 0 24px;
}

.filter-button.md-fab {
  position: fixed;
}
</style>

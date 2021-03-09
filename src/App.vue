<template>
  <div id="app">
    <header>
      <h1 class="md-headline">
        Carsharing-Kostenrechner
      </h1>
    </header>
    <main>
      <div class="md-layout md-gutter">
        <form
          novalidate
          @submit.stop.prevent="submit"
        >
          <md-field>
            <label for="driving">Fahren</label>
            <md-input
              id="driving"
              v-model="driving"
              type="number"
              step="5"
            />
          </md-field>
          <md-field>
            <label for="parking">Parken</label>
            <md-input
              id="parking"
              v-model="parking"
              type="number"
              step="5"
            />
          </md-field>
          <md-field>
            <label for="kilometers">Kilometer</label>
            <md-input
              id="kilometers"
              v-model="kilometers"
              type="number"
              step="5"
            />
          </md-field>
        </form>
      </div>
      <cost-list
        :driving="driving"
        :parking="parking"
        :kilometers="kilometers"
        :tariffs="tariffs"
        :filter="filter"
      />
      <md-button
        class="md-fab md-fab-bottom-right md-primary filter-button"
        aria-label="Filter"
        @click="openDialog('filterdialog')"
      />
      <md-dialog ref="filterdialog">
        <md-dialog-content>
          <md-dialog-title>Tarife filtern</md-dialog-title>
          <auto-filter
            :items="tariffs"
            @filterchanged="updateFilter"
          />
        </md-dialog-content>
        <md-dialog-actions>
          <md-button
            class="md-primary"
            @click="closeDialog('filterdialog')"
          >
            Ok
          </md-button>
        </md-dialog-actions>
      </md-dialog>
    </main>
    <footer>
      <md-card>
        <md-card-header>
          <div class="md-title">
            Info:
          </div>
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
  name: 'App',
  components: {
    CostList,
    AutoFilter,
  },
  data() {
    return {
      driving: 10,
      parking: 5,
      kilometers: 6,
      tariffs,
      filter: () => true,
    };
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

.filter-button {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill="white"/> <path d="M0 0h24v24H0z" fill="none"/> </svg>');
  background-position: center center;
  background-repeat: no-repeat;
}

.filter-button.md-fab {
  position: fixed;
}
</style>

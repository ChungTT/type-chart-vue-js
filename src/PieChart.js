import { Pie, Bar } from "vue-chartjs";
import Vue from 'vue';
// import "hartjs-plugin-piechart-outlabels"
import "chartjs-plugin-piechart-outlabels";

export default {
  extends: Pie,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  }
};

Vue.component('charts-chartjs-bar', {
  extends: Bar,
  props: {
    data: {
      type: Object,
      default()
      {
        return {};
      },
    },
    options: {
      type: Object,
      default()
      {
        return {};
      },
    },
  },
  mounted()
  {
    this.renderChart(this.data, this.options);
  },
});

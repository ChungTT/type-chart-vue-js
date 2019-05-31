<template>
  <div id="app">

    <div class="wrap-pie-chart">
      <pie-chart :data="chartData" :option="options"></pie-chart>
    </div>

    <div class="wrap-chart-bar">
      <div class="debt-chart">
        <charts-chartjs-bar
          :data="data2"
          :options="options2"
          :height="320"
          ref="barChart"
        />
      </div>
      <div class="current-title">
        <div class="rectangle">
          <span>Current redeployment yield <br>on platform</span>
        </div>
      </div>
      <div class="debt-legend">
        <template v-for="v in data2.datasets">
          <div
            class="debt-legend-line"
            :style="'color:' + v.backgroundColor"
          >
            <span :style="'background-color:' + v.backgroundColor" v-show ="v.label != null"/>{{ v.label }}
          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import PieChart from "./PieChart.js";

const monthlyRevenue = [2.5,3,1,0,0,0];
const loanValue = [10,5,7,0,0,0];
const curent = [0,0,0,9,12,8.6];
const monthlyRevenueColor = '#8ED1C9';
const loanValueColor = '#694C74';
const currentColor = '#d0c1d7';
const labelArr = [['Mar','2019'], ['Apr','2019'],['May','2019'],['Jun','2019'],['Jul','2019'],['Avg','2019']];
const charPaddingObj = {left: 20, right: 40, top: 15, bottom: 20};

export default {
  name: "App",
  components: {
    PieChart
  },
  data() {
    return {
      	options2: {
	      	layout: {
                padding: charPaddingObj,
	        },
            legend: {
                display: false,
            },
            responsive: true,
            aspectRatio: 2,
            maintainAspectRatio: false,
            
            scales: {
            yAxes: [{
                stacked: true,
                reverse: false,
                ticks: {
                  min: 0,
                  max: 14,
                  stepSize: 2,
                  fontSize: 10,
                  fontColor: '#694E76',
                  fontStyle: 'bold',
                  beginAtZero: true,
                    callback(value, index)
                    {
                      if( index == 0) {
                        return 'Yield';
                      }
                      return `${value }%`;
                    },
                  },
            }
            ],
            xAxes: [{
                stacked: true,
                gridLines: {display: false}, ticks: {fontSize: 15, fontColor: '#694E76'}}],
            },
            animation: {
              duration: 1,
              onComplete: function () {
                  var chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                    ctx.textAlign = 'center';
                    var fontArgs = ctx.font.split(' ');
                    var newSize = '15px';
                    ctx.font = newSize + ' ' + fontArgs[fontArgs.length - 1];
                    ctx.fillStyle = "#694E76";
                    ctx.textBaseline = 'bottom';
                    console.log(Chart.helpers,123456);
                    Chart.helpers.each(chartInstance.getDatasetMeta(0).data, function(rectangle, index) {
                    rectangle.draw = function() {
                      chartInstance.chart.ctx.setLineDash([10, 10]);
                      Chart.elements.Rectangle.prototype.draw.apply(this, arguments);
                    }
                  }, null);
                  
                  var meta = chartInstance.controller.getDatasetMeta(2);
                  var bar =  meta.data[3];
                  ctx.fillText('Expected YTM', bar._model.x, bar._model.y - 5);

                  var meta = chartInstance.controller.getDatasetMeta(2);
                  var bar =  meta.data[4];
                  ctx.fillText('Max', bar._model.x, bar._model.y - 5);

                  var meta = chartInstance.controller.getDatasetMeta(2);
                  var bar =  meta.data[5];
                  ctx.fillText('Min', bar._model.x, bar._model.y - 5);
                  ctx.setLineDash([10, 10]);

              }
          }
        },
        data2: {
          xLabels: labelArr,
        	datasets: [
	            {
                label: 'NAV',
                backgroundColor: loanValueColor,
                data: loanValue,
                borderColor: loanValueColor,
                radius: 0,
                fill: false,
              },
              {
                label: 'Cash distributions',
                backgroundColor: monthlyRevenueColor,
                data: monthlyRevenue,
                borderColor: monthlyRevenueColor,
                radius: 0,
                fill: false,
	          },
            {
	            backgroundColor: currentColor,
	            data: curent,
	            borderColor: monthlyRevenueColor,
	            radius: 0,
              fill: false,
              borderWidth:2,

            },
	        ],
	      },
      chartData: {
        labels: ["Green", "Red", "Blue"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [1, 10, 5]
          }
        ]
      },
      options:{
            zoomOutPercentage: 20, // makes chart 40% smaller (50% by default, if the preoprty is undefined)
            plugins: {
                legend: false,
                outlabels: {
                    text: '%l',
                    color: 'white',
                    stretch: 30,
                    font: {
                        resizable: true,
                        minSize: 12,
                        maxSize: 18
                    }
                }
            }
        },
      responsive:true,
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrap-pie-chart canvas {
  width: 400px !important;
  height: 100% !important;
  margin: 100px auto;
}
 .debt-legend{
    display: flex;
    text-align: left;
    padding-left: 10px;
    margin-bottom: 30px;
 }
  .debt-legend span{
    margin-right: 5px;
    border-radius: 50%;
    min-height: 25px;
    min-width: 25px;
    border: 1px solid #fff;
    display: inline-block;
  }
  .debt-legend .debt-legend-line {
      font-size: 12px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      padding: 0px 20px;
  }
  .current-title {
      position: absolute;
      top: 0;
      right: 10%;
  }
  .current-title .rectangle {
        border: 1px solid #694C74;
        border: 1px solid #694E76;
        border-bottom: none;
        position: relative;
        height: 10px;
        overflow: visible;
        margin-top: 15px;
        margin-bottom: 30px;
        top: 20px;
  }
  .current-title span {
        font-size: 0.8rem;
        text-align: center;
        color: #694C74;
        position: relative;
        top: -11px;
        margin: 0px 40px;
        background: #fff;
        padding: 0px 4px;
        display: inline-block;
      
  }
    .wrap-chart-bar {
      position: relative;
      padding: 50px 0 15px;
        max-width: 1024px;
    margin: 100px auto;
    }
</style>

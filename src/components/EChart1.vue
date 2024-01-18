<template>
  <div class="echart" id="kfchart" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name:"EChart1",
  data() {
    return {
      kfChart: {},
      pieData: [
        {
          value: 3,
          name: "业务资产"
        },
        {
          value: 3,
          name: "系统资产"
        },
        {
          value: 2,
          name: "系统组件与单元资产"
        }
      ],
      pieName: [],
      myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
    };
  },
  mounted() {
    this.initDate(); //数据初始化
    this.initEcharts();
  },
  methods: {
    initDate() {
      for (let i = 0; i < this.pieData.length; i++) {
        // this.xData[i] = i;
        // this.yData =this.xData[i]*this.xData[i];
        this.pieName[i] = this.pieData[i].name;
      }
    },
    initEcharts() {
      // 饼图
      const option = {
        legend: {
          // 图例
          data: this.pieName,
          right: "10%",
          top: "10%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "资产类型数量分布图",
          top: "0%",
          left: "center"
        },
        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "30%", //饼图半径
            data: this.pieData
          }
        ]
      };
      console.log(this.seriesData);
      // const optionFree = {
      //   xAxis: {},
      //   yAxis: {},
      //   series: [
      //     {
      //       data: this.seriesData,
      //       type: "line",
      //       smooth: true
      //     }
      //   ]
      // };
      this.kfChart = echarts.init(document.getElementById("kfchart"));
      this.kfChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.kfChart.resize();
      });
    }
  }
};
</script>
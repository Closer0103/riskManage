<template>
  <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name:"EChart2",
  data() {
    return {
      myChart: {},
      pieData2: [
        {
          value: 0,
          name: "很高"
        },
        {
          value: 1,
          name: "高"
        },
        {
          value: 2,
          name: "中"
        },
        {
          value: 3,
          name: "低"
        },
        {
          value: 2,
          name: "很低"
        }
      ],
      pieName2: [],
      myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
    };
  },
  mounted() {
    this.initDate(); //数据初始化
    this.initEcharts();
  },
  methods: {
    initDate() {
      for (let i = 0; i < this.pieData2.length; i++) {
        // this.xData[i] = i;
        // this.yData =this.xData[i]*this.xData[i];
        this.pieName2[i] = this.pieData2[i].name;
      }
    },
    initEcharts() {
      // 饼图
      const option = {
        legend: {
          // 图例
          data: this.pieName2,
          right: "10%",
          top: "10%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "资产价值分布图",
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
            data: this.pieData2
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
      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  }
};
</script>
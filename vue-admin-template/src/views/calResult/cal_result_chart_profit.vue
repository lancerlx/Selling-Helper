
<template>
  <div class="calculate_charts" id="main_2">
  </div>
</template>
 
<script>
export default {
  name: "Echarts1",
  methods: {
    myEcharts() {
      var myChart = this.$echarts.init(document.getElementById("main_2"));
      //配置图表
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
      };
      option = {
        color: ["#654BC1", "#3B9156", "#FF562E"],
        title: {
          text: "项目总收益",
          left: "left",
        },
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "45%",
            style: {
              text: "{name|121}\n{value|(万元)}",
              textAlign: "center",
              fill: "#000000", //文字的颜色
              rich: {
                value: {
                  fontSize: 12,
                  color: "balck",
                },
                name: {
                  fontSize: 48,
                },
              },
              width: 30,
              height: 30,
              fontSize: 48,
              fontFamily: " PingFangSC, PingFangSC-Medium",
            },
          },
        ],
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c} 万元}",
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 12,
              color: "balck",
            },
          },
        },
        legend: {
          left: "center",
          top: "bottom",
          data: [],
        },

        series: [
          {
            name: "项目总投资",
            type: "pie",
            radius: [80, 140],
            center: ["50%", "50%"],
            itemStyle: {
              borderRadius: 0,
              borderColor: "#fff",
              borderWidth: 2,
            },

            data: [
              { value: 60, name: "光伏" },
              { value: 33, name: "储能" },
              { value: 28, name: "充电桩" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
  },
};
</script>
 
<style scoped>
.calculate_charts {
  width: 557px;
  height: 368px;
  background: #ffff;
  border-radius: 8px;
  box-shadow: 0px 3px 7px 0px rgba(205, 204, 206, 0.3);
}
</style>
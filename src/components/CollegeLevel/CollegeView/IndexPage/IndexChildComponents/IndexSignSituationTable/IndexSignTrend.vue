<template>
  <div class="IndexSignTrend">
    <div class="firstTab">
      <div class="trendTitle">
        <img src="@/assets/u100.png">
        <span id="smallTitle">签到情况趋势图</span>
      </div>
      <Tabs size="small">
        <TabPane label="班级">
          <div id="mainfirst" :style="{width:'auto',height:'400px'}"></div>
        </TabPane>
        <TabPane label="学院">
          <div id="mainSecond" :style="{width:'auto',height:'400px'}"></div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "IndexSignTrend",
  data() {
    return {
      charts: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLinefirst();
    });
    this.$nextTick(() => {
      this.drawLineSecond();
    });
  },
  methods: {
    // 点击年级和专业按钮显示不同的图表
    firstTableShow() {
      this.$nextTick(() => {
        this.drawLinefirst();
      });
    },
    SecondTableShow() {
      this.$nextTick(() => {
        this.drawLineSecond();
      });
    },
    drawLinefirst() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainfirst"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["到课率", "早退率", "请假率"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "到课率",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "早退率",
            type: "bar",
            stack: "广告",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "请假率",
            type: "bar",
            stack: "广告",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      });
    },
    drawLineSecond() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainSecond"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["到课率", "早退率", "请假率"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "到课率",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "早退率",
            type: "bar",
            stack: "广告",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "请假率",
            type: "bar",
            stack: "广告",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "广告",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "搜索引擎",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                normal: {
                  type: "dashed"
                }
              },
              data: [[{ type: "min" }, { type: "max" }]]
            }
          },
          {
            name: "百度",
            type: "bar",
            barWidth: 5,
            stack: "搜索引擎",
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.trendTitle {
  margin: 10px;
}
#smallTitle {
  font-size: 15px;
  margin-left: 6px;
}
.tabBtn {
  width: 90px;
  display: flex;
  margin: 10px 500px;
}
.grade {
  width: 40px;
  height: auto;
  text-align: center;
  background: rgb(151, 149, 149);
  cursor: pointer;
}
.major {
  width: 40px;
  height: auto;
  text-align: center;
  background: rgb(240, 240, 240);
  cursor: pointer;
}
</style>



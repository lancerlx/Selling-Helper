<template>
  <div>
    <div class="head-card">
     
      <span >收益测算结果 
      <img class="compare" :src="require('@/icons/dashboardIcon/icon_compare.png')" >
      </span>
      <div class="button-area">
        <button class="myButton">返回</button>
        <button class="myButton" @click="addResult">新增</button>
        <button class="myButton">保存</button>
        <button class="myButton">下载</button>
      </div>
    </div>
    <div class="chart">
      <cal-charts-invest></cal-charts-invest>
      <cal-charts-profit></cal-charts-profit>
    </div>
    <div class="scene_title">场景明细</div>
    <div v-for="(item, index) in listData" :key="index">
      <el-card class="box-card">
        <div class="itemBox" v-for="(data, index2) in item.items" :key="index2">
          <el-row>
            <el-col :span="2">
              <div class="check_icon">
                <el-checkbox v-model="checked"> </el-checkbox>
                <img
                  class="img"
                  :src="
                    data.type == '储能'
                      ? require('@/icons/dashboardIcon/icon_storage.png')
                      : data.type == '充电桩'
                      ? require('@/icons/dashboardIcon/icon_charge.png')
                      : require('@/icons/dashboardIcon/icon_light.png')
                  "
                />
                <div>{{ data.type }}</div>
              </div>
            </el-col>
            <el-col class="lineBox" :span="10">
              <div
                class="line"
                :style="{ 'border-color': color[data.type] }"
              ></div>
              <el-row>
                <el-col :span="8">
                  <p :style="{ 'font-size': '18px' }">项目总投资</p>
                  <p :style="{ color: color[data.type], 'font-size': '48px' }">
                    {{ data.totalInvest
                    }}<span style="font-size: 20px">万元</span>
                  </p>
                </el-col>
                <el-col :span="8">
                  <p :style="{ 'font-size': '18px' }">项目总收益</p>
                  <p :style="{ color: color[data.type], 'font-size': '48px' }">
                    {{ data.totalProfit
                    }}<span style="font-size: 20px">万元</span>
                  </p>
                </el-col>
                <el-col :span="8">
                  <p :style="{ 'font-size': '18px' }">投资回收周期</p>
                  <p :style="{ color: color[data.type], 'font-size': '48px' }">
                    {{ data.avgCost }}<span style="font-size: 20px">年</span>
                  </p>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-col :span="12">
                <p :style="{ 'font-size': '18px' }">年平均收入</p>
                <p :style="{ 'font-size': '36px' }">
                  {{ data.avgIncome }}<span style="font-size: 20px">万元</span>
                </p>
              </el-col>
              <el-col :span="12">
                <p :style="{ 'font-size': '18px' }">年平均成本</p>
                <p :style="{ 'font-size': '36px' }">
                  {{ data.avgCost }}<span style="font-size: 20px">万元</span>
                </p>
              </el-col>
            </el-col>
            <el-col :span="2">
              <el-popover placement="bottom" width="300" trigger="click">
                <div class="part">
                  <div
                    class="part-item"
                    v-for="(item, index3) in list"
                    :key="index3"
                  >
                    <el-image
                      class="operation_icon"
                      :src="myImage(item)"
                      @click="clickBtn(item)"
                    />
                    <span class="operation_title">{{ name[index3] }}</span>
                  </div>
                </div>

                <el-button slot="reference"
                  ><i class="el-icon-more moreIcon"></i
                ></el-button>
              </el-popover>
              <!-- <i class="el-icon-more moreIcon"></i> -->
            </el-col>
          </el-row>
          <el-row style="border-bottom: 1px solid #eee">
            <el-col style="height: 20px" :span="2"> </el-col>
            <el-col :span="3">
              <p :style="{ 'font-size': '18px' }">ROI</p>
              <p :style="{ color: color[data.type], 'font-size': '36px' }">
                {{ data.roi }}<span style="font-size: 20px">%</span>
              </p>
            </el-col>
            <el-col :span="4">
              <p :style="{ 'font-size': '18px' }">IRR</p>
              <p :style="{ color: color[data.type], 'font-size': '36px' }">
                {{ data.irr }}<span style="font-size: 20px">%</span>
              </p>
            </el-col>
            <el-col :span="3">
              <p :style="{ 'font-size': '18px' }">NPV</p>
              <p :style="{ color: color[data.type], 'font-size': '36px' }">
                {{ data.npv }}<span style="font-size: 20px">元</span>
              </p>
            </el-col>
            <el-col :span="5">
              <p :style="{ 'font-size': '18px' }">平均年利润(税前)</p>
              <p :style="{ 'font-size': '36px' }">
                {{ data.avgPorfitBeforeTax
                }}<span style="font-size: 20px">万元</span>
              </p>
            </el-col>
            <el-col :span="5">
              <p :style="{ 'font-size': '18px' }">平均年利润(税后)</p>
              <p :style="{ 'font-size': '36px' }">
                {{ data.avgPorfitAfterTax
                }}<span style="font-size: 20px">万元</span>
              </p>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import calChartsInvest from "@/views/calResult/cal_result_chart_invest.vue";
import calChartsProfit from "@/views/calResult/cal_result_chart_profit.vue";
export default {
  name: "calResultSence",
  components: {
    calChartsInvest,
    calChartsProfit
  },

  data() {
    return {
      checked:'',
      listData: [
        {
          items: [
            {
              totalInvest: 285.45,
              totalProfit: 110,
              avgIncome: 300,
              avgCost: 200,
              recall: 3,
              roi: 32.87,
              irr: 21.79,
              npv: 111,
              avgPorfitBeforeTax: 11.83,
              avgPorfitAfterTax: 8.87,
              type: "光伏",
            },
            {
              totalInvest: 285.45,
              totalProfit: 110,
              avgIncome: 300,
              avgCost: 200,
              recall: 3,
              roi: 32.87,
              irr: 21.79,
              npv: 111,
              avgPorfitBeforeTax: 11.83,
              avgPorfitAfterTax: 8.87,
              type: "充电桩",
            },
            {
              totalInvest: 285.45,
              totalProfit: 110,
              avgIncome: 300,
              avgCost: 200,
              recall: 3,
              roi: 32.87,
              irr: 21.79,
              npv: 111,
              avgPorfitBeforeTax: 11.83,
              avgPorfitAfterTax: 8.87,
              type: "储能",
            },
          ],
        },
      ],
      color: {
        风机: "rgb(51, 117, 255)",
        光伏: "rgb(106,74,200,1)",
        储能: "rgb(0,147,79,1)",
        充电桩: "rgb(255,86,46,1)",
      },
      list: ["info", "download", "delete", ],
      name: ["详情", "下载", "删除", ],
    };
  },
  methods: {
    addResult() {
      this.$router.push({ path: "/Form/index" });
    },
    myImage(item) {
      return require("@/icons/dashboardIcon/icon_" + item + ".png");
    },
  },
};
</script>

<style scoped>
.box-container {
  width: 1133px;
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}

.check_icon {
  padding-top: 20px;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.check_icon .img {
  margin: 20px 0;
  width: 35px;
  height: 35px;
}

.moreIcon {
  /* margin-top: 125px; */
  transform: rotate(90deg);
}

.lineBox {
  position: relative;
}

.line {
  contain: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80%;
  height: 1px;
  border-bottom: 1px dashed;
}
.head-card {
  height: 60px;
  /* background: #f0f1f3; */
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: row;
  align-content: center;
  font-size: 25px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: rgba(74, 74, 74, 0.85);
  line-height: 36px;
  margin:20px
}
.button-area {
  margin-left:auto;
}
.myButton {
  width: 105px;
  height: 44px;
  margin:10px;
  background: #068273;
  border-radius: 8px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  line-height: 22px;
}
.part {
  display: flex;
  flex-direction: row;
}
.part-item {
  margin: 10px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.more-more {
  display: flex;
  flex-direction: row;
}
.operation_icon {
  width: 26px;
  height: 26px;
}

.operation_title {
  width: 50px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #595959;
  line-height: 20px;
}
.chart{
  display:flex;
  flex-direction: row;
  /* justify-content:space-between; */
  /* padding:30px 20px */
}
.scene_title{
  font-size: 25px;
font-family: PingFangSC, PingFangSC-Medium;
font-weight: 500;
text-align: left;
color: rgba(74,74,74,0.85);
line-height: 36px;
margin:20px;

}
.head-left{
  width:290px;
  display: flex;
  flex-direction: row;
  align-content: space-between;
}
.compare{
  width: 25px;
  height:25px;
}
</style>

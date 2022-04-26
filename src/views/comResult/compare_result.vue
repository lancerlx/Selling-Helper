<template>
  <div class="compare-container">
    <div class="top">
      <template v-for="i in 3">
        <div class="topBox" :key="i">
          <div class="topTitle">
            收益预测{{ i == 1 ? "一" : i == 2 ? "二" : "三" }}
          </div>
          <div class="iconBox">
            <img
              class="img"
              :src="require('@/icons/dashboardIcon/icon_storage.png')"
            />
            <img
              class="img"
              :src="require('@/icons/dashboardIcon/icon_charge.png')"
            />
            <img
              class="img"
              :src="require('@/icons/dashboardIcon/icon_light.png')"
            />
          </div>
          <div>2022/04/06 16:37</div>
        </div>
        <div class="vs" v-if="i != 3" :key="i">vs</div>
      </template>
    </div>
    <div
      class="containerBox"
      v-for="(data, index) in listData[0].items"
      :key="index"
    >
      <div
        class="form-container-light leftTitle"
        :style="{ background: data.backColor }"
      >
        <p :style="{ color: color[data.type] }">
          {{ data.type }}
        </p>
      </div>
      <div class="formBox" v-for="i of 3" :key="i">
        <div
          :class="
            i == index + 1
              ? 'form-container-light active'
              : 'form-container-light'
          "
          :style="{
            'border-color': color[data.type],
            background: data.backColor,
          }"
        >
          <div
            :style="{ background: color[data.type] }"
            class="tag"
            v-if="i == index + 1"
          >
            周期最短
          </div>
          <el-row>
            <el-col :span="12">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.totalInvest }}
              </p>
              <p :style="{ 'font-size': '10px' }">项目总投资</p>
            </el-col>
            <el-col :span="12">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.totalProfit }}
              </p>
              <p :style="{ 'font-size': '10px' }">项目总收益</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.recall }}
              </p>
              <p :style="{ 'font-size': '10px' }">投资回收期(年)</p>
            </el-col>
            <el-col class="centerBox" :span="8">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.roi }}
              </p>
              <p :style="{ 'font-size': '10px' }">ROI(%)</p>
            </el-col>
            <el-col :span="8">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.irr }}
              </p>
              <p :style="{ 'font-size': '10px' }">IIR(%)</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p :style="{ 'font-size': '30px' }">
                {{ data.avgIncome }}
              </p>
              <p :style="{ 'font-size': '10px' }">平均年收入(万元)</p>
            </el-col>
            <el-col :span="12">
              <p :style="{ 'font-size': '30px' }">
                {{ data.avgCost }}
              </p>
              <p :style="{ 'font-size': '10px' }">平均年成本(万元)</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p :style="{ 'font-size': '30px' }">
                {{ data.avgPorfitBeforeTax }}
              </p>
              <p :style="{ 'font-size': '10px' }">平均年利润(税前/万元)</p>
            </el-col>
            <el-col :span="12">
              <p :style="{ 'font-size': '30px' }">
                {{ data.avgPorfitAfterTax }}
              </p>
              <p :style="{ 'font-size': '10px' }">平均年利润(税后/万元)</p>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="form-container-storage">
          <el-row>
            <el-col :span="12">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.totalInvest }}
              </p>
              <p :style="{ 'font-size': '10px' }">项目总投资</p>
            </el-col>
            <el-col :span="12">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.totalProfit }}
              </p>
              <p :style="{ 'font-size': '10px' }">项目总收益</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.recall }}
              </p>
              <p :style="{ 'font-size': '10px' }">投资回收期(年)</p>
            </el-col>
            <el-col :span="8">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.roi }}
              </p>
              <p :style="{ 'font-size': '10px' }">ROI(%)</p>
            </el-col>
            <el-col :span="8">
              <p :style="{ color: color[data.type], 'font-size': '30px' }">
                {{ data.irr }}
              </p>
              <p :style="{ 'font-size': '10px' }">IIR(%)</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p :style="{ 'font-size': '30px' }">
                {{ data.avgIncome }}
              </p>
              <p :style="{ 'font-size': '10px' }">平均年收入(万元)</p>
            </el-col>
            <el-col :span="12">
              <p :style="{ 'font-size': '30px' }">
                {{ data.avgCost }}
              </p>
              <p :style="{ 'font-size': '10px' }">平均年成本(万元)</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p :style="{ 'font-size': '30px' }">
                {{ data.avgPorfitBeforeTax }}
              </p>
              <p :style="{ 'font-size': '10px' }">平均年利润(税前/万元)</p>
            </el-col>
            <el-col :span="12">
              <p :style="{ 'font-size': '30px' }">
                {{ data.avgPorfitAfterTax }}
              </p>
              <p :style="{ 'font-size': '10px' }">平均年利润(税后/万元)</p>
            </el-col>
          </el-row>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
              avgPorfitBeforeTax: 11.83,
              avgPorfitAfterTax: 8.87,
              type: "light",
              backColor: "#f6f2fe",
            },
            {
              totalInvest: 285.45,
              totalProfit: 110,
              avgIncome: 300,
              avgCost: 200,
              recall: 3,
              roi: 32.87,
              irr: 21.79,
              avgPorfitBeforeTax: 11.83,
              avgPorfitAfterTax: 8.87,
              type: "charge",
              backColor: "#ffd9ca",
            },
            {
              totalInvest: 285.45,
              totalProfit: 110,
              avgIncome: 300,
              avgCost: 200,
              recall: 3,
              roi: 32.87,
              irr: 21.79,
              avgPorfitBeforeTax: 11.83,
              avgPorfitAfterTax: 8.87,
              type: "storage",
              backColor: "#e1f5ea",
            },
          ],
        },
      ],
      color: {
        wind: "rgb(51, 117, 255)",
        light: "rgb(106,74,200,1)",
        storage: "rgb(0,147,79,1)",
        pile: "rgb(255,86,46,1)",
      },
    };
  },
};
</script>

<style scoped>
.compare-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form-container-light {
  position: relative;
  width: 290px;
  /* width: 100%; */
  height: 430px;
  background: #f5f2ff;
  line-height: 12px;
  margin: 20px;
  padding: 45px 20px;
  border-radius: 10px;
  /* display: flex;
  flex-direction: column; */
}
.form-container-light .el-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-container-light .el-row .el-col:nth-last-child(1) {
  text-align: right;
}

.centerBox {
  text-align: center;
}

p {
  color: #7d7b82;
}

.tag {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -90px;
  width: 180px;
  height: 24px;
  border-radius: 0 0 20px 20px;
  text-align: center;
  line-height: 24px;
  color: #fff;
}

.active {
  border: 1px solid;
}

.containerBox {
  display: flex;
  align-items: center;
}

.formBox {
  /* flex: 1; */
  display: flex;
  align-items: center;
}

.leftTitle {
  width: 80px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.top {
  padding: 12px 80px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}

.topBox {
  width: 240px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  
}

.topBox .iconBox {
  margin: 12px 0;
  width: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.vs {
  width: 30px;
  height: 30px;
  font-size: 26px;
  background: #ff8d7b;
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
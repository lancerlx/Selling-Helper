<template>
  <div class="app-container">
    <div class="scene-container">
      <div class="title">已选场景</div>
      <div class="item-container">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="bottom-item"
          :style="{
            color: item.color,
            borderColor: item.color,
            background: item.fillColor,
          }"
        >
          {{ item.name }}
        </div>
        <el-popover placement="top" width="800" v-model="visible">
          <calculate-scene></calculate-scene>
          <button class="additem" slot="reference">+</button>
        </el-popover>
      </div>
    </div>
    <div class="start-calculate">
      <span style="width: 160">填写测算明细</span>
      <div class="block">
        <el-cascader :options="options">
          <template slot-scope="{ node, data }">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </template>
        </el-cascader>
      </div>
      <button class="toCalculate" @click="goCalResult">开始测算</button>
    </div>
    <!-- 是否显示  光伏start-->
    <div v-if="lightSite">
      <div style="padding-top: 20px">
        <el-card class="box-card">
          <div class="topBox">
            <span class="form_name" style="background-color: #614cba"
              >光伏</span
            >
            <div class="moreBox" @click="lightIsShow = !lightIsShow">
              <div class="iconName">
                {{ lightIsShow ? "收起" : "展开" }}
              </div>
              <i class="icon el-icon-arrow-up" v-if="false"></i>
              <i class="icon el-icon-arrow-down" v-else></i>
            </div>
          </div>
          <el-form :inline="true" v-model="lightForm" class="demo-form-inline">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="光伏装机容量(kW)"></el-form-item>
                <el-input v-model="lightForm.device_capacity" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="单位成本(元/kW)"></el-form-item>
                <el-input v-model="lightForm.unit_cost" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="项目所在地"></el-form-item>
                <el-input v-model="lightForm.region" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="年平均有效光照小时数(h)"></el-form-item>
                <el-input v-model="lightForm.effective_hour" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="光伏自发自用率(%)"></el-form-item>
                <el-input v-model="lightForm.produce_use_rate" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="光伏系统效率(%)"></el-form-item>
                <el-input v-model="lightForm.system_rate" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="光伏第一年衰减率(%)"></el-form-item>
                <el-input v-model="lightForm.reduction_rate" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="光伏后续年衰减率(%)"></el-form-item>
                <el-input
                  v-model="lightForm.follow_reduction_rate"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="售电电价(元/kWh)"></el-form-item>
                <el-input v-model="lightForm.selling_price" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="反向上网电价(元/kWh)"></el-form-item>
                <el-input
                  v-model="lightForm.selling_net_price"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="光伏售电增值税率(%)"></el-form-item>
                <el-input v-model="lightForm.selling_vat_rate" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="光伏电站折旧年限(年)"></el-form-item>
                <el-input
                  v-model="lightForm.depreciation_year"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="光伏电站折旧残值(%)"></el-form-item>
                <el-input
                  v-model="lightForm.depreciation_value"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="光伏电站运营成本(万元)"></el-form-item>
                <el-input v-model="lightForm.operating_cost" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="使用年限(年)"></el-form-item>
                <el-input v-model="lightForm.device_age" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="lightIsShow">
                <el-form-item label="所得税率"></el-form-item>
                <el-input v-model="lightForm.income_tax_rate" placeholder="" />
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <!-- 是否显示  光伏end> -->
    <!-- 是否显示  储能start -->
    <div v-if="storageSite">
      <div style="padding-top: 20px">
        <el-card class="box-card">
          <div class="topBox">
            <span class="form_name" style="background-color: #3b9156"
              >储能</span
            >
            <div class="moreBox" @click="StorageIsShow = !StorageIsShow">
              <div class="iconName">
                {{ StorageIsShow ? "收起" : "展开" }}
              </div>
              <i class="icon el-icon-arrow-up" v-if="StorageIsShow"></i>
              <i class="icon el-icon-arrow-down" v-else></i>
            </div>
          </div>
          <el-form
            :inline="true"
            v-model="storageForm"
            class="demo-form-inline"
          >
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="单位成本"></el-form-item>
                <el-input v-model="storageForm.unit_cost" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="储能电池容量"></el-form-item>
                <el-input
                  v-model="storageForm.device_capacity"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7">
                <el-form-item label="储能电池投资"></el-form-item>
                <el-input v-model="storageForm.total_invest" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="项目所在地"></el-form-item>
                <el-input v-model="storageForm.region" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="年均运行天数"></el-form-item>
                <el-input
                  v-model="storageForm.device_running_day"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7">
                <el-form-item label="峰时电价"></el-form-item>
                <el-input v-model="storageForm.high_price" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="平时电价"></el-form-item>
                <el-input v-model="storageForm.normal_price" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="谷时电价"></el-form-item>
                <el-input v-model="storageForm.low_price" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="储能电池充电深度"></el-form-item>
                <el-input
                  v-model="storageForm.device_charging_depth"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="储能电池放电深度"></el-form-item>
                <el-input
                  v-model="storageForm.device_discharging_depth"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="储能电池可用容量"></el-form-item>
                <el-input
                  v-model="storageForm.device_useful_capacity"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="全生命周期充放电次数"></el-form-item>
                <el-input v-model="storageForm.cycles_number" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="电池衰减率"></el-form-item>
                <el-input v-model="storageForm.reduction_rate" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="充放电策略"></el-form-item>
                <el-input v-model="storageForm.charge_policy" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="电池年衰减率"></el-form-item>
                <el-input
                  v-model="storageForm.battery_reduction_rate"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="系统充放电效率"></el-form-item>
                <el-input
                  v-model="storageForm.charge_system_rate"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="峰时售电电价"></el-form-item>
                <el-input v-model="storageForm.selling_price" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="电池售电增值率"></el-form-item>
                <el-input
                  v-model="storageForm.selling_vat_rate"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="储能电池折旧年限"></el-form-item>
                <el-input
                  v-model="storageForm.depreciation_year"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="储能电池折旧残值"></el-form-item>
                <el-input
                  v-model="storageForm.depreciation_value"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="储能电池年运营成本"></el-form-item>
                <el-input v-model="storageForm.operating_cost" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="StorageIsShow">
                <el-form-item label="所得税率"></el-form-item>
                <el-input
                  v-model="storageForm.income_tax_rate"
                  placeholder=""
                />
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <!-- 是否显示  储能end-->
    <!-- 是否显示  充电桩start-->
    <div v-if="pileSite">
      <div style="padding-top: 20px">
        <el-card class="box-card">
          <div class="topBox">
            <span class="form_name" style="background-color: #ff562e"
              >充电桩</span
            >
            <div class="moreBox" @click="pileIsShow = !pileIsShow">
              <div class="iconName">
                {{ pileIsShow ? "收起" : "展开" }}
              </div>
              <i class="icon el-icon-arrow-up" v-if="false"></i>
              <i class="icon el-icon-arrow-down" v-else></i>
            </div>
          </div>
          <el-form :inline="true" v-model="pileForm" class="demo-form-inline">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="充电桩类型"></el-form-item>
                <el-input v-model="pileForm.pile_type" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="充电桩功率"></el-form-item>
                <el-input v-model="pileForm.pile_power_rate" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="充电桩数量"></el-form-item>
                <el-input v-model="pileForm.pile_count" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="单位成本"></el-form-item>
                <el-input v-model="pileForm.unit_cost" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="充电总容量"></el-form-item>
                <el-input v-model="pileForm.device_capacity" placeholder="" />
              </el-col>
              <el-col :span="7">
                <el-form-item label="交流充电桩充电服务费"></el-form-item>
                <el-input v-model="pileForm.pile_service_fee" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="单日充电车辆数量"></el-form-item>
                <el-input
                  v-model="pileForm.daliy_charge_count"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="单日充电量"></el-form-item>
                <el-input
                  v-model="pileForm.daliy_charge_total_count"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="年充电天数"></el-form-item>
                <el-input v-model="pileForm.charge_count" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="总充电量"></el-form-item>
                <el-input
                  v-model="pileForm.charge_total_count"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="充电桩售电增值率"></el-form-item>
                <el-input v-model="pileForm.selling_vat_rate" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="充电桩折旧年限"></el-form-item>
                <el-input v-model="pileForm.depreciation_year" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="充电桩折旧残值"></el-form-item>
                <el-input
                  v-model="pileForm.depreciation_value"
                  placeholder=""
                />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="充电桩年运营成本"></el-form-item>
                <el-input v-model="pileForm.operating_cost" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="峰时电价"></el-form-item>
                <el-input v-model="pileForm.high_price" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="平时电价"></el-form-item>
                <el-input v-model="pileForm.normal_price" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="谷时电价"></el-form-item>
                <el-input v-model="pileForm.low_price" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="使用年限"></el-form-item>
                <el-input v-model="pileForm.device_age" placeholder="" />
              </el-col>
              <el-col :span="7" v-if="pileIsShow">
                <el-form-item label="所得税率"></el-form-item>
                <el-input v-model="pileForm.income_tax_rate" placeholder="" />
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
    <!-- 是否显示  充电桩end-->
  </div>
</template>

<script>
import calculateScene from "../dashboard/component/calculate_scene.vue";
export default {
  components: {
    calculateScene,
  },
  data() {
    return {
      options: [
        {
          value: "resident",
          label: "居民",
          children: [
            {
              value: "under_thousand",
              label: "不满1千伏",
              children: [
                {
                  value: "under_2760",
                  label: "年用电小于2760千瓦时",
                },
                {
                  value: "btwn_2761-4800",
                  label: "年用电2761-4880千瓦时",
                },
                {
                  value: "above_4801",
                  label: "年用电大于4801千瓦时",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "factory",
          label: "大工业",
          children: [
            {
              value: "1_to_10",
              label: "1-10千伏",
            },
            {
              value: "20",
              label: "20千伏",
            },
            {
              value: "35",
              label: "35千伏",
            },
            {
              value: "110",
              label: "110千伏",
            },
            {
              value: "above_220",
              label: "220千伏及以上",
            },
          ],
        },
      ],
      formInline: {
        user: "",
        region: "",
      },
      name: "calculateScence",
      xmszd: "",
      list: [],
      StorageIsShow: false,
      pileIsShow: false,
      lightIsShow: false,
      lightSite: false,
      storageSite: false,
      pileSite: false,
      pileForm: {
        high_price: "",
        normal_price: "",
        low_price: "",
        income_tax_rate: "",
        device_age: "",
        operating_cost: "",
        depreciation_value: "",
        depreciation_year: "",
        selling_vat_rate: "",
        unit_cost: "",
        device_capacity: "",
        pile_type: "",
        pile_power_rate: "",
        pile_count: "",
        pile_service_fee: "",
        daliy_charge_count: "",
        daliy_charge_total_count: "",
        charge_count: "",
        charge_total_count: "",
      },
      storageForm: {
        reduction_rate: "",
        total_invest: "",
        region: "",
        device_capacity: "",
        selling_price: "",
        operating_cost: "",
        depreciation_value: "",
        depreciation_year: "",
        selling_vat_rate: "",
        income_tax_rate: "",
        selling_price: "",
        unit_cost: "",
        device_running_day: "",
        high_price: "",
        normal_price: "",
        low_price: "",
        device_charging_depth: "",
        device_discharging_depth: "",
        device_useful_capacity: "",
        cycles_number: "",
        charge_policy: "",
        battery_reduction_rate: "",
        charge_system_rate: "",
      },
      lightForm: {
        device_capacity: "",
        unit_cost: "",
        region: "",
        effective_hour: "",
        produce_use_rate: "",
        system_rate: "",
        reduction_rate: "",
        follow_reduction_rate: "",
        selling_price: "",
        selling_net_price: "",
        selling_vat_rate: "",
        depreciation_year: "",
        depreciation_value: "",
        operating_cost: "",
        device_age: "",
        income_tax_rate: "",
      },
      selectList: [],
      moreStatus: false,
      color: {
        风机: "rgb(51, 117, 255)",
        光伏: "rgba(97,76,186,1)",
        储能: "rgb(59, 145, 86)",
        充电桩: "rgb(255, 86, 46)",
      },
      visible: false,
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.$store.state.scene.scene.forEach((b) => {
        b.status = 1;
        b.moreStatus = false;
        if (b.name == "光伏") {
          this.lightSite = true;
        }
        if (b.name == "储能") {
          this.storageSite = true;
        }
        if (b.name == "充电桩") {
          this.pileSite = true;
        }
      });
      this.list = this.$store.state.scene.scene;
    },
    goCalResult() {
      let str = "";
      this.list.forEach((item) => {
        str = str + item.name + ",";
      });
      if (Object.keys(this.lightForm).length == 0) {
        alert("kong");
      }
      this.$store.dispatch("addLightForm", this.lightForm);
      this.$store.dispatch("addstorageForm", this.storageForm);
      this.$store.dispatch("addpileForm", this.pileForm);
      this.$router.push({ path: "/cal_result/index" });
      console.log("goCalResult", this.storageForm);
    },
  },
};
</script>

<style scoped>
.start-calculate {
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #4a4a4a;
  line-height: 28px;
}
.scene-container {
  height: 120px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 3px 7px 0px rgba(205, 204, 206, 0.3);
}

.form_name {
  color: white;
  height: 44px;
  width: 114px;
  line-height: 44px;
  margin-top: -20px;
  margin-left: -20px;
  padding-left: 20px;
  padding-right: 40px;
  border-radius: 5px;
  border-bottom-right-radius: 30px;
}
.title {
  width: 83px;
  height: 70px;
  font-size: 20px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #4a4a4a;
  line-height: 70px;
}
.item-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item-select-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 76px;
}
.note-container {
  margin-top: 15px;
  padding: 0 20px;
  border: 1px dashed #068273;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 55px;
}

.note-1 {
  width: 64px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #4a4a4a;
  line-height: 22px;
}
.note-2 {
  width: 624px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #4a4a4a;
  line-height: 20px;
  margin-left: 15px;
}
.top-item {
  margin-right: 10px;
  border-radius: 10px;
  border-width: 1px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  line-height: 22px;
}
.bottom-item {
  margin: 5px;
  border-radius: 10px;
  border: 1px solid #068273;
  width: 90px;
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.select-title {
  width: 112px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #6d7278;
  line-height: 22px;
}
.toCalculate {
  margin-right: auto;
}
.selectBox {
  width: 100%;
}
.topBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.moreBox {
  display: flex;
  align-items: center;
}

.iconName {
  font-size: 14px;
  color: #333;
  margin-right: 12px;
}

.icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: #fff;
  background: #068273;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.additem {
  margin: 5px;
  border-radius: 10px;
  border: 1px solid #ffff;
  width: 90px;
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.toCalculate {
  width: 105px;
  height: 44px;
  margin: 10px;
  background: #068273;
  border-radius: 8px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  line-height: 22px;
}
</style>

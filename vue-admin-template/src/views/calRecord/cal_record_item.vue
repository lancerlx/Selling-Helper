<template>
  <div class="container">
    <div class="container-top">
       <!-- <el-checkbox
            v-model="checked"
            style="width: 23px; height: 23px"
          ></el-checkbox>
          <div class="cal_name">测算名称</div> -->
         <el-row>
  <el-col :span="1"><div class="allCheck"><el-checkbox
            v-model="checked"
            style="width: 23px; height: 23px"
          ></el-checkbox></div></el-col>
  <el-col :span="4"><div class="cal_name">测算名称</div></el-col>
  <el-col :span="10"><div class="cal_name">测算场景</div></el-col>
  <el-col :span="4"><div class="cal_name">测算地点</div></el-col>
  <el-col :span="4"><div class="cal_name">测算时间</div></el-col>
  <el-col :span="1"><div class="cal_name">操作</div></el-col>
</el-row>
    </div>
    <div v-for="(item, index) in dataList" :key="index">
      <!-- <div class="container-top" v-if="index == 0">
        <el-checkbox v-model="checked"></el-checkbox>
        <div class="title">{{ item.name }}</div>
        <div class="project-location">项目地点:{{ item.address }}</div>
      </div> -->
      <div class="container-bottom">
        <div class="container-left">
          <el-checkbox
            v-model="checked"
            style="width: 23px; height: 23px"
          ></el-checkbox>
          <div class="calculate_1">{{ item.profit }}</div>
          <div
            class="bottom-item"
            v-for="(only, i) in item.scene"
            :key="i"
            :style="{
              color: only.color,
              background: only.fillColor,
            }"
          >
            {{ only.scene }}
          </div>
        </div>
        <div class="container-right">
        <div class="project-location">{{ item.address }}</div>
          <div class="caculate-time">{{ item.calculateTime }}</div>
          <el-popover placement="bottom" width="400" trigger="click">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calculateRecordItem",
  props: {
    dataList: Array,
  },
  data() {
    return {
      list: ["edit", "info", "download", "delete"],
      name: ["重署名", "详情", "下载", "删除"],
    };
  },
  methods: {
    myImage(item) {
      return require("@/icons/dashboardIcon/icon_" + item + ".png");
    },
    clickBtn(index) {
      console.log("calculateRecordItem_clickBtn", index);
    },
  },
};
</script>

<style scoped>
.el-row{
  width: 100%;
}
.container {
  display: flex;
  flex-direction: column;
}
.container-top {
  padding: 0 24px;
  width: 100%;
  height: 60px;
  background: #f0f1f3;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title {
  margin-left: 12px;
  font-size: 24px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  line-height: 33px;
}
.project-location {
  margin-left: auto;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  line-height: 25px;
}
.container-bottom {
  padding: 0 24px;
  height: 98px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.container-bottom_1 {
  height: 98px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.calculate_1 {
  margin-right: 12px;
  font-size: 20px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: rgba(74, 74, 74, 0.85);
  line-height: 28px;
}

.container {
  width: 100% !important;
}

.container-left,
.container-right {
  display: flex;
  flex:3;
  align-items: center;
  /* justify-content:space-around */
}

.caculate-time {
  /* margin-right: 12px; */
  color: #757776;
}

.moreIcon {
  transform: rotate(90deg);
}
.tag {
  margin-right: 12px;
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
  margin: 10px;
  width: 50px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #595959;
  line-height: 20px;
}
 .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
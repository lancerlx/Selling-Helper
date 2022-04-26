<template>
  <div class="scence-container">
    <div class="title">测算场景</div>
    <div class="item-container">
      <scene-item
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        class="top-item"
        :style="{ background: item.fillColor }"
        @selectSceneItem="selectSceneItem"
      />
    </div>
    <div class="note-container">
      <div class="note-1">场景说明</div>
      <div class="note-2">
        分为风、光、储、充四大基础场景，并支持选择多种基础场景进行自定义场景的组合。
      </div>
    </div>
    <div class="item-select-container">
      <span class="select-title">已选综合场景:</span>
      <div
        v-for="(item, index) in selectList"
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

      <el-button
        class="toCalculate"
        type="primary"
        @click="goRoute"
      >去测算</el-button>
    </div>
  </div>
</template>

<script>
import sceneItem from './calculate_scene_item.vue'

export default {
  components: {
    sceneItem
  },
  data() {
    return {
      name: 'calculateScence',
      list: [
        { name: '风机', price: 2000, color: '#3375FF', fillColor: '#E5F6FF' },
        { name: '光伏', price: 4000, color: '#614CBA', fillColor: '#F5F2FF' },
        { name: '储能', price: 1800, color: '#3B9156', fillColor: '#E2F6E9' },
        { name: '充电桩', price: 500, color: '#FF562E', fillColor: '#FFF0E9' }
      ],
      selectList: []
    }
  },

  methods: {
    goRoute() {
      let str = ''
      this.selectList.forEach((item) => {
        str = str + item.name + ','
      })
       this.$store.dispatch("gocompute",this.selectList);
      this.$router.push({ path: '/Form/index', query: { id: str }})
    },
    selectSceneItem(item) {
      const index = this.$data.selectList.indexOf(item)
      if (index < 0) {
        this.$data.selectList.push(item)
      } else {
        this.$data.selectList.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
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
  margin-left: auto;
}
</style>

<template>
  <div
    class="scene-item"
    :style="{ borderColor: isSelect ? item.color : '' }"
    @click="selectItem"
  >
    <div class="title" :style="{ color: item.color }">{{ item.name }}</div>
    <img class="icon">
    <div class="price">{{ item.price }}元/kwh</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      name: 'calculateSceneItem',
      isSelect: false
    }
  },
  methods: {
    selectItem() {
      this.$data.isSelect = !this.$data.isSelect
      this.$emit('selectSceneItem', this.item)
    }
  }
}
</script>

<style scoped>
.scene-item {
  width: 180px;
  height: 110px;
  border: 1px solid #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px 15px;
  align-items: center;
}
.title {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  line-height: 25px;
}
.icon {
  width: 35px;
  height: 35px;
  background: #c3e8d1;
  border-radius: 12px;
}
.price {
  font-size: 24px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  color: #4a4a4a;
  line-height: 24px;
  height: 24px;
}
</style>

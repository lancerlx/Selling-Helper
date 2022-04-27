<template>
  <div class="cal-container">
    <div class="container">{{ name }}</div>
    <div class="item-container">
      <el-popover
        v-model="visible"
        placement="top"
        width="300px;"
        height="300px;"
      >
        <calculateScene />
        <el-button slot="reference">添加</el-button>
      </el-popover>
      <caculateform />
    </div>
  </div>
</template>

<script>

import calculateScene from './component/calculate_scene.vue'
export default {
  components: { calculateScene, },
  data() {
    return {
      name: '测算收益'
    }
  }
}
</script>

<style scoped>
.container {
  background: palegoldenrod;
}
.item-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>

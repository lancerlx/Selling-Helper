<template>
  <div class="library-container">
    <div class="top">
      测算工具首页产品库
      <div class="search-box">
        <input
          type="text"
          v-model="keyword"
          class="input"
          placeholder="输入关键字搜索"
        />
        <button class="btn" @click="search">搜索</button>
      </div>
    </div>
    <div class="bottom">
      <img class="center" :src="require('@/icons/dashboard_1.png')" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods:{
    search(){
      
    }
  }
};
</script>

<style scoped>
.library-container {
  display: flex;
  flex-direction: column;
}
.top {
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
}
.change {
  width: 77px;
  margin: 10px;
}
.search-box {
  width: 329px;
}
</style>
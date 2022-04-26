<template>
  <div
    class="project-item"
    :style="{ borderColor: isSelect ? item.color : '' }"
  >
    <div class="item-left">
      <div class="title" >{{ item.name }}</div>
      <div class="titleInfo">{{ item.date }}</div>
    </div>
    <div class="projectState">{{ item.state }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      name: "projectItem",
    };
  },
  methods:{
    isSelect(){
      
    }
  }
};
</script>

<style scoped>
.project-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px 15px;
  align-items: center;
}
.title {
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #4a4a4a;
  line-height: 25px;
}
.titleInfo {
  width: 72px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #4a4a4a;
  line-height: 20px;
}
.projectState {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #4a4a4a;
  line-height: 20px;
}
</style>


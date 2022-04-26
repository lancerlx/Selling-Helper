<template>
  <div class="container">
    <div class="left">
      <calculate-scence class="cal" />
      <!-- <div>{{ name }}产品库 -->
        <productLibrary></productLibrary>
      <!-- </div> -->
    </div>
    <div class="right">
      <div class="calendar">
        <Calendar :sundayStart="true"></Calendar>
        <!-- npm i vue-calendar-component --save -->
      </div>
      <div class="project" >
        <myProject></myProject>
      </div>
    </div>
  </div>
</template>

<script>
import calculateScence from "./component/calculate_scene.vue";
import Calendar from "vue-calendar-component";
import myProject from './component/my_project.vue';
import ProductLibrary from './component/productLibrary.vue';

export default {
  components: {
    calculateScence,
    Calendar,
    myProject,
    ProductLibrary,
  },
  data() {
    return {
      name: "测算工具首页",
      calendar_value: new Date(),
    };
  },
  mounted() {
    // this.$refs.datePick.focus() // 让日历组件默认触发焦点事件
  },
  methods: {
    chooseDate() {
      this.$refs.datePick.focus(); // 选择日期后依旧触发焦点
    },
  },
};
</script>

<style scoped>
.container {
  background: white;
  display: flex;
  flex-direction: row;
  height: 800px;
}
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.cal {
  padding: 20px;
}
.product {
  height: 330px;
  background: firebrick;
}
.right {
  /* background: fuchsia; */
  width: 328px;
  display: flex;
  flex-direction: column;
}
.calendar {
  width: 280px;
  height: 314px;
}
.project {
  flex: 1;
  width: 100%;
  background: greenyellow;
}
</style>

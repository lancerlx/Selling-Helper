<template>
  <div class="myproject">
    我的项目
    <img key="plus" @click="clickPlus()" :src="require('@/icons/dashboardIcon/icon_plus.png')"/>
    <project-item v-for="(item, index) in myProjectList"
        :key="index"
        :item="item"
        class="myProject-item"
        :style="{ background: item.fillColor }"
      />
  </div>
</template>

<script>
import projectItem from '@/views/dashboard/component/my_project_item.vue'

export default {
  name:'myProject',
   components: {
    projectItem
  },
  methods:{
    clickPlus(){
        console.log("myProject_clickPlus")
    }
  },
  data (){
    return{
      myProjectList: [
        { name: '项目名称-', date:'2022.03.17', state:'待反馈', fillColor: '#E5F6FF' },
        { name: '项目名称-', date:'2022.03.17', state:'已延期', fillColor: '#F5F2FF' },
        { name: '项目名称-', date:'2022.03.17', state:'待反馈', fillColor: '#E2F6E9' },
        { name: '项目名称-', date:'2022.03.17', state:'已完结', fillColor: '#FFF0E9' },
        { name: '项目名称-', date:'2022.03.17', state:'已完结', fillColor: '#FFF0E9' }
      ]
    }
  }

}
</script>

<style>
.myproject{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:space-between;
  padding:27px;
}
.myProject-item{
  width: 275px;
height: 70px;
background: #e7f6ed;
border-radius: 8px;
margin:5px;


}
</style>
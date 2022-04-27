<template>
  <div class="rec-container">
    <div class="title">{{ name }}</div>
    <rec-item
      class="item-container"
      v-for="(item, index) in recordList"
      :key="index"
      :dataList="item.list"
      :style="{
          color: item.color,
          borderColor: item.color,
          background: item.fillColor,
        }"
    />
       <el-pagination
       class="pages"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10]"
      :page-size="10"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="120">
    </el-pagination>
  </div>
</template>

<script>
import recItem from "@/views/calRecord/cal_record_item.vue";
export default {
  name: "caculateRecord",
  components: {
    recItem,
  },
  data() {
    return {
      
      name: "测算记录",
      recordList: [
        {
          list: [
            {
              name: "综合能源项目",
              profit: "收益测算一",
              scene: [ { scene: "风机", color: "#3375FF", fillColor: "#E5F6FF" },
                { scene: "光伏", color: "#614CBA", fillColor: "#F5F2FF" },
                { scene: "储能", color: "#3B9156", fillColor: "#E2F6E9" },
                { scene: "充电桩", color: "#FF562E", fillColor: "#FFF0E9" }
              ],
              address: "宁波",
              calculateTime: "2022/04/06 16:37",
            },
            {
              name: "综合能源项目",
              profit: "收益测算二",
              scene: [{ scene: "风机", color: "#3375FF", fillColor: "#E5F6FF" },
                { scene: "光伏", color: "#614CBA", fillColor: "#F5F2FF" },
                { scene: "储能", color: "#3B9156", fillColor: "#E2F6E9" },
                { scene: "充电桩", color: "#FF562E", fillColor: "#FFF0E9" }],
              address: "宁波",
              calculateTime: "2022/04/06 16:37",
            },
          ],
        },
       
      ],
      // list: [
      //   { scene: "风机", color: "#3375FF", fillColor: "#E5F6FF" },
      //   { scene: "光伏", color: "#614CBA", fillColor: "#F5F2FF" },
      //   { scene: "储能", color: "#3B9156", fillColor: "#E2F6E9" },
      //   { scene: "充电桩", color: "#FF562E", fillColor: "#FFF0E9" },
      // ],
    };
  },
  
};
</script>

<style scoped>
.item-container {
  /* width: 1134px; */
  padding: 0 24px;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: auto; */
  border-radius: 8px;
  box-shadow: 0px 3px 7px 0px rgba(205, 204, 206, 0.3);
}

.title {
  margin-left:24px;
  width: 83px;
  height: 70px;
  font-size: 20px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #4a4a4a;
  line-height: 70px;
}
.pages{
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  
}
::v-deep .el-pagination.is-background.el-pager li:not(.disabled){
    background-color:#fff;/*进行修改未选中背景和字体*/
    color:#fff;
}

::v-deep .el-pagination.is-background.el-pager li:not(.disabled).active{
  background-color:green;/*进行修改选中项背景和字体*/
  color:#fff;
}



</style>


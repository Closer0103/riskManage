<template>
  <div>

    <menu-frame top-index="4">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="业务评估记录" name="1">
          <h1>业务评估记录</h1>
          <el-table
              :data="table1"
              style="width: 100%">
            <el-table-column
                prop="name"
                label="资产名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="评估时间"
                width="360">
            </el-table-column>
            <el-table-column
                prop="value"
                label="资产价值"
                width="180">
            </el-table-column>
            <el-table-column
                prop="max"
                label="满分"
                width="180">
            </el-table-column>
            <el-table-column
                prop="importance"
                label="业务重要性价值"
                width="180">
            </el-table-column>
          </el-table>
          <h1>系统资产评估记录</h1>
          <el-table
              :data="table2"
              style="width: 100%">
            <el-table-column
                prop="name"
                label="资产名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="评估时间"
                width="360">
            </el-table-column>
            <el-table-column
                prop="value"
                label="资产价值"
                width="180">
            </el-table-column>
            <el-table-column
                prop="max"
                label="满分"
                width="180">
            </el-table-column>
            <el-table-column
                prop="baomi"
                label="保密性"
                width="180">
            </el-table-column>
            <el-table-column
                prop="wanzheng"
                label="完整性"
                width="180">
            </el-table-column>
            <el-table-column
                prop="keyong"
                label="可用性"
                width="180">
            </el-table-column>
          </el-table>
          <h1>系统组件与单元资产评估记录</h1>
          <el-table
              :data="table3"
              style="width: 100%">
            <el-table-column
                prop="name"
                label="资产名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="评估时间"
                width="360">
            </el-table-column>
            <el-table-column
                prop="value"
                label="资产价值"
                width="180">
            </el-table-column>
            <el-table-column
                prop="max"
                label="满分"
                width="180">
            </el-table-column>
            <el-table-column
                prop="baomi"
                label="保密性"
                width="180">
            </el-table-column>
            <el-table-column
                prop="wanzheng"
                label="完整性"
                width="180">
            </el-table-column>
            <el-table-column
                prop="keyong"
                label="可用性"
                width="180">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="威胁评估记录" name="2">
          <ThreatEva></ThreatEva>
        </el-tab-pane>
        <el-tab-pane label="脆弱性评估记录" name="3">
          <VulEva></VulEva>
        </el-tab-pane>
        <el-tab-pane label="安全措施评估记录" name="4">
          <MethodsEva></MethodsEva>
        </el-tab-pane>
      </el-tabs>

    </menu-frame>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import MenuFrame from "@/components/MenuFrame.vue";
import VulEva from "@/components/VulEva.vue";
import MethodsEva from "@/components/MethodsEva.vue";
import ThreatEva from "@/components/ThreatEva.vue"

export default defineComponent({
  components: {MethodsEva, VulEva, MenuFrame, ThreatEva},
  data() {
    return{
      activeName:'1',
      table1:[],
      table2:[],
      table3:[]
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getCon(i){
      if (i <= 1)
        return "很低"
      else if(i <= 2)
        return "低"
      else if(i <= 3)
        return "中"
      else if(i <= 4)
        return "高"
      else if(i <= 5)
        return "很高"
      else
        return "中"
    },
    getData(){
      var test = JSON.parse(localStorage.getItem("businessEvaInfo"))
      for (var item1 of test)
      {
        item1.value = this.getCon(item1.importance / item1.max * 5)
      }
      this.table1 = test


      var test2 = JSON.parse(localStorage.getItem("systemEvaInfo"))
      for (var item2 of test2)
      {
        item2.value = this.getCon((item2.keyong+item2.wanzheng+item2.baomi) /3/ item2.max * 5)
      }
      this.table2 = test2
      var test3 = JSON.parse(localStorage.getItem("componentEvaInfo"))
      for (var item3 of test3)
      {
        item3.value = this.getCon((item3.keyong+item3.wanzheng+item3.baomi) /3/ item3.max * 5)
      }
      this.table3 = test3
    }
  },
  mounted() {
    this.getData()
  }
})
</script>



<style scoped>

</style>
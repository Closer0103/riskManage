<template>
  <div>
    <menu-frame>
      <h1>风险评估</h1>
      <el-tabs type="border-card">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="date"
              label="资产名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="kind"
              label="资产类型"
              width="180">
          </el-table-column>
          <el-table-column
              prop="is"
              label="评估状态"
              width="180">
          </el-table-column>
          <el-table-column
              label="操作">
            <el-button type="text"><a href="/detail">进行评估</a></el-button>
          </el-table-column>
        </el-table>
      </el-tabs>
    </menu-frame>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import MenuFrame from "@/components/MenuFrame.vue";
export default defineComponent({
  components: {MenuFrame},
  data() {
    return {
      tableData: [{
        date: '资产1',
        is:'未评估',
        kind:'业务资产'
      }, {
        date: '资产2',
        is:'未评估',
        kind:'系统资产'
      }, {
        date: '资产3',
        is:'未评估',
        kind:'系统组件与单元资产'
      }]
    }
  }
})
</script>



<style scoped>

</style>
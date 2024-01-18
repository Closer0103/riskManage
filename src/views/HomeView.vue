<template>
  <div class="home">
    <!-- 主体菜单框架 -->
    <menu-frame top-index="0">
      <el-card style="width: 97.5%">
        <span style="font-weight: bold">当前项目：</span>
        <span style="color: red">项目1</span>
        <el-button type="primary" @click="goto" style="margin-left: 80%">查看其他项目</el-button>
      </el-card>
      <el-row style="margin-top: 50px">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <b>资产类型数量信息</b>
            </div>
            <div>
              <EChart1></EChart1>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <b>资产价值信息</b>
            </div>
            <div>
              <EChart2></EChart2>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </menu-frame>

  </div>
</template>

<script>
// @ is an alias to /src

import MenuFrame from "@/components/MenuFrame.vue";
import EChart1 from "@/components/EChart1.vue";
import EChart2 from "@/components/EChart2.vue";

export default {
  name: 'HomeView',
  components: {
    MenuFrame,
    EChart1,
    EChart2
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    goto(){
      this.$router.push('/entry')
    }
  }
}
</script>

<style>
.box-card {
  width: 95%
}
</style>

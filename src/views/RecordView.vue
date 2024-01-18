<template>
  <div>

    <menu-frame top-index="3" :is-show-aside="false" aside-index="1">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="业务识别记录" name="1">
          <h1>业务识别记录</h1>
          <el-table
              :data="tableBusiness"
              style="width: 100%">
            <el-table-column
                prop="business_num"
                label="业务编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="business_name"
                label="业务名称"
                width="360">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="识别时间"
                width="360">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="getDetail(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>

          <h1>系统资产识别记录</h1>
          <el-table
              :data="tableSystem"
              style="width: 100%">
            <el-table-column
                prop="system_num"
                label="系统资产编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="system_name"
                label="系统资产名称"
                width="360">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="识别时间"
                width="360">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="getDetail2(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>

          <h1>系统组件和单元资产识别记录</h1>
          <el-table
              :data="tableComponent"
              style="width: 100%">
            <el-table-column
                prop="component_num"
                label="资产编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="component_name"
                label="资产名称"
                width="360">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="识别时间"
                width="360">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="getDetail3(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="威胁识别记录" name="2">
          <ThreatInfo></ThreatInfo>
        </el-tab-pane>
        <el-tab-pane label="脆弱性识别记录" name="3">
          <VulInfo></VulInfo>
        </el-tab-pane>
        <el-tab-pane label="安全措施识别记录" name="4">
          <MethodsInfo></MethodsInfo>
        </el-tab-pane>
      </el-tabs>

    </menu-frame>


    <el-dialog
        title="查看详情"
        :visible.sync="dialogVisible"
        width="40%">
          <span>
            <p v-html="text"></p>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>



<script>
import MenuFrame from "@/components/MenuFrame.vue";
import VulInfo from "@/components/VulInfo.vue";
import MethodsInfo from "@/components/MethodsInfo.vue";
import ThreatInfo from"@/components/ThreatInfo.vue";
export default {
  name: 'RecordView',
  components: {
    MethodsInfo,
    VulInfo,
    MenuFrame,
    ThreatInfo,
  },
  data() {
    return {
      activeName:'1',
      tableBusiness: [],
      tableSystem: [],
      tableComponent: [],
      text:'',
      text_x:'',
      dialogVisible:false
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getData() {
      var test = localStorage.getItem("businessIdentifyInfo")
      this.tableBusiness = JSON.parse(test)
      var test2 = localStorage.getItem("systemIdentifyInfo")
      this.tableSystem = JSON.parse(test2)
      var test3 = localStorage.getItem("componentIdentifyInfo")
      this.tableComponent= JSON.parse(test3)
    },
    getDetail(detail){
      this.dialogVisible = true
      console.log(detail)
      var text1 =
          "<div style='font-size:15px'>" +
          "<b>业务编号：</b>" + detail.business_num +
          "<br/><b>业务名称：</b>" + detail.business_name +
          "<br/><b>识别时间：</b>" + detail.create_time +
          "<h2>属性识别信息</h2>" +
          "<b>业务功能：</b>"+detail.business_func +
          "<br/><b>业务范围：</b>"+detail.business_range +
          "<br/><b>覆盖地域：</b>"+detail.business_region +
          "<br/><b>业务对象：</b>"+detail.business_object +
          "<br/><b>业务流程：</b>"+detail.business_flow
      var text2 = ""
      var text3 =
          "<h2>定位识别信息</h2>" +
          "<b>业务属性与职能定位：</b>"+detail.business_role+
          "<br/><b>与发展规划目标契合度：</b>"+detail.business_fitness+
          "<br/><b>业务布局的位置和作用：</b>"+detail.business_layout+
          "<br/><b>竞争关系中竞争力强弱：</b>"+detail.business_competitiveness
      var text4 = ""
      var text5 =
          "<h2>完整性与关联性识别信息</h2>" +
          "<b>完整性等级：</b>"+detail.business_integrity+
          "<br/><b>关联类别：</b>"+detail.business_class+
          "<br/><b>关联程度：</b>"+detail.business_relation + "</div>"
      for(var item of detail.business_attribute)
      {
        text2 += "<br/><b>" + item.name +"：</b>"+ item.value
      }
      for(var item2 of detail.business_position)
      {
        text2 += "<br/><b>" + item2.name +"：</b>"+ item2.value
      }
      this.text = text1 + text2 + text3 + text4 + text5
    },
    /*        system_kind:this.system.kind,
        system_load:this.system.value,
        system_business:this.system.value1,
        system_property:this.system.value2,*/
    getDetail2(detail){
      this.dialogVisible = true
      this.text =
          "<div style='font-size:15px'>" +
          "<b>系统资产编号：</b>" + detail.system_num +
          "<br/><b>系统资产名称：</b>" + detail.system_name +
          "<br/><b>识别时间：</b>" + detail.create_time +
          "<br/><b>系统资产类型：</b>"+detail.system_kind +
          "<br/><b>承载类别：</b>"+detail.system_load +
          "<br/><b>业务关联程度：</b>"+detail.system_business +
          "<br/><b>资产关联程度：</b>"+detail.system_property
    },
    getDetail3(detail){
      this.dialogVisible = true
      this.text =
          "<div style='font-size:15px'>" +
          "<b>资产编号：</b>" + detail.component_num +
          "<br/><b>资产名称：</b>" + detail.component_name +
          "<br/><b>识别时间：</b>" + detail.create_time +
          "<br/><b>资产分类：</b>"+detail.component_kind1 +
          "<br/><b>资产种类：</b>"+detail.component_kind2
    },
  },
  mounted() {
    this.getData()
  }
}
</script>


<style scoped>

</style>
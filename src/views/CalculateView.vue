<template>
  <div>
    <menu-frame top-index="5">
      <el-card>
        <div style="font-size: 18px">
          <span style="font-weight: bold">当前项目：</span>
          <span style="color:darkblue">项目1</span><br>

        </div>
        <el-divider></el-divider>
        <span style="font-weight: bold">风险等级：</span>
        <span style="color:red">{{ label }}</span>
        <el-rate
            style="margin-top: -19px;margin-left: 110px"
            v-model="all_value"
            disabled
            show-score
            :colors="['#90EE90','#FF9900','red']"
            text-color="black"
            score-template="{value}">
        </el-rate>
        <el-descriptions  title="风险计算详情" :column="1" style="width:40%;margin-top: 25px" border>

          <el-descriptions-item label="业务资产风险">
            <el-rate
                v-model="business_value"
                disabled
                show-score
                :colors="['#90EE90','#FF9900','red']"
                text-color="black"
                score-template="{value}">
            </el-rate>
          </el-descriptions-item>

          <el-descriptions-item label="系统资产风险">
            <el-rate
                v-model="system_value"
                disabled
                show-score
                :colors="['#90EE90','#FF9900','red']"
                text-color="black"
                score-template="{value}">
            </el-rate>
          </el-descriptions-item>

          <el-descriptions-item label="单元资产风险">
            <el-rate
                v-model="component_value"
                disabled
                show-score
                :colors="['#90EE90','#FF9900','red']"
                text-color="black"
                score-template="{value}">
            </el-rate>
          </el-descriptions-item>

          <el-descriptions-item label="威胁风险">
            <el-rate
                v-model="threat_value"
                disabled
                show-score
                :colors="['#90EE90','#FF9900','red']"
                text-color="black"
                score-template="{value}">
            </el-rate>
          </el-descriptions-item>

          <el-descriptions-item label="脆弱性风险">
            <el-rate
                v-model="vul_value"
                disabled
                show-score
                :colors="['#90EE90','#FF9900','red']"
                text-color="black"
                score-template="{value}">
            </el-rate>
          </el-descriptions-item>

          <el-descriptions-item label="安全措施风险">
            <el-rate
                v-model="method_value"
                disabled
                show-score
                :colors="['#90EE90','#FF9900','red']"
                text-color="black"
                score-template="{value}">
            </el-rate>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </menu-frame>

  </div>
</template>

<script>

import MenuFrame from "@/components/MenuFrame.vue";
export default {
  name: 'CalculateView',
  components: {
    MenuFrame
  },
  data() {
    return {
      all_value: 0,
      component_value: 0,
      system_value: 0,
      business_value: 0,
      threat_value: 0,
      vul_value: 0,
      method_value: 0,
      label: '计算中'
    }
  },
  methods: {
    getRiskLevel() //初步演示用函数
    {
      //计算组件评分（量纲：1-5）
      var component_count = 0
      var component_sum = 0
      var component_avg = 0
      var componentInfo = JSON.parse(localStorage.getItem("componentEvaInfo"))
      console.log(componentInfo)
      for (var component of componentInfo) {
        component_count += 1
        var temp_data_com = 5 * (component.baomi + component.wanzheng + component.keyong) / (3 * component.max)
        component_sum += temp_data_com
      }
      component_avg = component_sum / component_count
      console.log(component_avg)
      this.component_value = component_avg.toFixed(2)
      //计算系统评分（量纲：1-5）
      var system_count = 0
      var system_sum = 0
      var system_avg = 0
      var systemInfo = JSON.parse(localStorage.getItem("systemEvaInfo"))
      console.log(systemInfo)
      for (var system of systemInfo) {
        system_count += 1
        var sys_data_com = 5 * (system.baomi + system.wanzheng + system.keyong) / (3 * system.max)
        system_sum += sys_data_com
        console.log(sys_data_com)
      }
      system_avg = system_sum / system_count
      console.log(system_avg)
      this.system_value = system_avg.toFixed(2)
      //计算业务评分（量纲：1-5）
      var business_count = 0
      var business_sum = 0
      var business_avg = 0
      var businessInfo = JSON.parse(localStorage.getItem("businessEvaInfo"))
      console.log(businessInfo)
      for (var business of businessInfo) {
        business_count += 1
        var bus_data_com = 5 * (business.importance) / business.max
        business_sum += bus_data_com
      }
      business_avg = business_sum / business_count
      console.log(business_avg)
      this.business_value = business_avg.toFixed(2)
      //计算威胁评分
      this.threat_value = 4.57
      //计算脆弱性评分
      this.vul_value = 3.19
      //计算安全措施评分
      this.method_value = 1.68
      this.all_value = (0.2 * this.business_value + 0.2 * this.system_value + 0.2 * this.component_value + 0.2 * this.threat_value +
          0.1 * this.method_value + 0.1 * this.vul_value).toFixed(2)
      if (this.all_value <= 1.8) {
        this.label = "很低"
      } else if (this.all_value <= 2.6) {
        this.label = "低"
      } else if (this.all_value <= 3.4) {
        this.label = "中"
      } else if (this.all_value <= 4.2) {
        this.label = "高"
      } else {
        this.label = "很高"
      }
    }
  },
  mounted() {
    this.getRiskLevel()
  }
}
</script>


<style>
.my-label {
  background: whitesmoke;
}

.my-content {
  background: whitesmoke;
}
</style>
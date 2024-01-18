<template>
  <div>
    <h1>系统资产名称</h1>
    <el-form :model="system" ref="form" label-width="100px" class="demo-dynamic">
      <el-form-item prop="func" label="系统资产名称" class="demo">
        <el-input v-model="system.name" ></el-input>
      </el-form-item>
    </el-form>
    <h1>系统资产类型识别</h1>
    <el-form ref="form" :model="system" label-width="100px">
      <el-form-item label="系统资产类型">
        <el-select v-model="system.value" placeholder="请选择">
          <el-option
              v-for="item in system.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 2-2 业务承载性识别 -->
    <h1>业务承载性识别</h1>
    <el-form ref="form" :model="system" label-width="100px">
      <el-form-item label="承载类别" class="demo">
        <el-input v-model="system.kind" ></el-input>
      </el-form-item>
      <el-form-item prop="func" label="业务关联程度" class="demo">
        <el-select v-model="system.value1" placeholder="请选择">
          <el-option
              v-for="item in system.options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="func" label="资产关联程度" class="demo">
        <el-select v-model="system.value2" placeholder="请选择">
          <el-option
              v-for="item in system.options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit">提 交</el-button>
  </div>
</template>

<script>
export default {
  name: 'BusinessIdentity',
  data() {
    return {
      system: {
        //2-1
        options:[{
          value: '信息系统',
          label: '信息系统'
        }, {
          value: '数据资源',
          label: '数据资源'
        }, {
          value: '通信网络',
          label: '通信网络'
        }],
        values:'',
        //2-2
        kind:'',
        options1: [{
          value: '极高',
          label: '极高'
        }, {
          value: '高',
          label: '高'
        }, {
          value: '中',
          label: '中'
        }, {
          value: '低',
          label: '低'
        }, {
          value: '极低',
          label: '极低'
        }],
        value1: '',
        options2: [{
          value: '极高',
          label: '极高'
        }, {
          value: '高',
          label: '高'
        }, {
          value: '中',
          label: '中'
        }, {
          value: '低',
          label: '低'
        }, {
          value: '极低',
          label: '极低'
        }],
        value2: '',
      }
    }
  },
  methods:{
    pd() {
      var test = localStorage.getItem("systemIdentifyInfo")
      if (test == null)
        localStorage["systemIdentifyInfo"] = "[]"
    },
    onSubmit(){
      var test = localStorage.getItem("systemIdentifyInfo")
      var systemIdentityList = JSON.parse(test)
      var length = systemIdentityList.length
      var system_info = {
        system_num: length + 1,
        system_name:this.system.name,
        create_time: Date(),
        system_kind:this.system.kind,
        system_load:this.system.value,
        system_business:this.system.value1,
        system_property:this.system.value2,
      }
      systemIdentityList.push(system_info);
      localStorage["systemIdentifyInfo"] = JSON.stringify(systemIdentityList)
      console.log(system_info)
    }
  },
  mounted() {
    this.pd()
  }
}
</script>

<style scoped>
.demo{
  width: 50%;
}
</style>
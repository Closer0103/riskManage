
<template>
  <div>
    <h1>资产名称</h1>
    <el-form :model="component" ref="form" label-width="100px" class="demo-dynamic">
      <el-form-item prop="func" label="资产名称" class="demo">
        <el-input v-model="component.name" ></el-input>
      </el-form-item>
    </el-form>
    <h1>资产分类</h1>
    <el-form :model="component" ref="form" label-width="100px" class="demo-dynamic">
      <el-form-item prop="func" label="资产分类" class="demo">
        <el-select v-model="component.value" placeholder="请选择">
          <el-option
              v-for="item in component.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-select     filterable
                       allow-create v-if="component.value==='系统单元'" v-model="component.final" placeholder="请选择">
          <el-option
              v-for="item in component.options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-select     filterable
                       allow-create v-else-if="component.value==='系统组件'" v-model="component.final" placeholder="请选择">
          <el-option
              v-for="item in component.options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-select     filterable
                       allow-create v-else-if="component.value==='人力资源'" v-model="component.final" placeholder="请选择">
          <el-option
              v-for="item in component.options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-select     filterable
                       allow-create v-else-if="component.value==='其他资产'" v-model="component.final" placeholder="请选择">
          <el-option
              v-for="item in component.options4"
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
  name: 'ComponentIdentity',
  data() {
    return {
      component: {
        name:'',
        final:'',
        options: [{
          value: '系统单元',
          label: '系统单元'
        }, {
          value: '系统组件',
          label: '系统组件'
        }, {
          value: '人力资源',
          label: '人力资源'
        }, {
          value: '其他资产',
          label: '其他资产'
        }],
        value: '',
        options1: [{
          value: '计算机设备',
          label: '计算机设备'
        }, {
          value: '存储设备',
          label: '存储设备'
        }, {
          value: '智能终端设备',
          label: '智能终端设备'
        }, {
          value: '网络设备',
          label: '网络设备'
        }, {
          value: '传输线路',
          label: '传输线路'
        }, {
          value: '安全设备',
          label: '安全设备'
        }],
        options2: [{
          value: '应用系统',
          label: '应用系统'
        }, {
          value: '应用软件',
          label: '应用软件'
        }, {
          value: '系统软件',
          label: '系统软件'
        }, {
          value: '支撑平台',
          label: '支撑平台'
        }, {
          value: '服务接口',
          label: '服务接口'
        }],
        options3: [{
          value: '运维人员',
          label: '运维人员'
        }, {
          value: '业务操作人员',
          label: '业务操作人员'
        }, {
          value: '安全管理人员',
          label: '安全管理人员'
        }, {
          value: '外包服务人员',
          label: '外包服务人员'
        }],
        options4: [{
          value: '数据资料',
          label: '数据资料'
        }, {
          value: '办公设备',
          label: '办公设备'
        }, {
          value: '保障设备',
          label: '保障设备'
        }, {
          value: '服务',
          label: '服务'
        }, {
          value: '知识产权',
          label: '知识产权'
        }],
      }
    }
  },
  methods:{
    pd() {
      var test = localStorage.getItem("componentIdentifyInfo")
      if (test == null)
        localStorage["componentIdentifyInfo"] = "[]"
    },
    onSubmit(){
      var test = localStorage.getItem("componentIdentifyInfo")
      var componentIdentityList = JSON.parse(test)
      var length = componentIdentityList.length
      var component_info = {
        component_num: length + 1,
        component_name:this.component.name,
        create_time: Date(),
        component_kind1:this.component.value,
        component_kind2:this.component.final,
      }
      componentIdentityList.push(component_info);
      localStorage["componentIdentifyInfo"] = JSON.stringify(componentIdentityList)
      console.log(component_info)
    }
  },
  mounted() {
    this.pd()
  }
}
</script>


<style scoped>
.demo{
  width:50%
}
</style>
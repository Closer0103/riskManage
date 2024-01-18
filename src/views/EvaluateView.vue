<template>
  <div>
    <menu-frame top-index="2" :is-show-aside2="true" aside-index2="1">
      <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="业务重要性评估" name="1">
            <h1>
              业务重要性评估
              <el-button style="margin-left:30px" @click="dialogVisible_business = true">
                <i class="el-icon-setting">设置重要性分级</i>
              </el-button>
            </h1>

            <el-form label-width="130px">
              <el-form-item label="请选择业务：">
                <el-select v-model="name_business" placeholder="请选择">
                  <el-option
                      v-for="item in options_business"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="业务重要性价值：">
                <template>

                  <el-input-number v-model="num_business" :min="1" :max="max_business"
                                   label="描述文字"></el-input-number>

                </template>
              </el-form-item>
            </el-form>
            <el-button @click="onSubmit1" type="success">提 交</el-button>
            <!--------------------- 111 --------->

            <el-dialog
                title="业务重要性分级"
                :visible.sync="dialogVisible_business"
                width="30%">
              <span>请输入最大值</span>
              <el-input type="number" v-model="max_business"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible_business = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="系统资产评估" name="2">
            <h1>
              系统资产评估
              <el-button style="margin-left:30px" @click="dialogVisible_system = true">
                <i class="el-icon-setting">设置系统资产分级</i>
              </el-button>
            </h1>
            <el-form label-width="130px">
              <el-form-item label="请选择系统资产：">
                  <el-select v-model="name_system" placeholder="请选择">
                    <el-option
                        v-for="item in options_system"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="保密性赋值：">
                <template>
                  <el-input-number v-model="num_system_wanzheng" :min="1" :max="max_system"
                                   label="描述文字"></el-input-number>
                </template>
              </el-form-item>
              <el-form-item label="完整性赋值：">
                <template>
                  <el-input-number v-model="num_system_keyong" :min="1" :max="max_system"
                                   label="描述文字"></el-input-number>
                </template>
              </el-form-item>
              <el-form-item label="可用性赋值：">
                <template>
                  <el-input-number v-model="num_system_baomi" :min="1" :max="max_system"
                                   label="描述文字"></el-input-number>
                </template>
              </el-form-item>
            </el-form>
            <el-button type="success" @click="onSubmit2">提 交</el-button>
            <!--------------------- 111 --------->
            <el-dialog
                title="系统资产价值分级"
                :visible.sync="dialogVisible_system"
                width="30%">
              <span>请输入最大值</span>
              <el-input type="number" v-model="max_system"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible_system = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="系统组件和单元资产评估" name="3">

            <h1>
              系统组件和单元资产评估
              <el-button style="margin-left:30px" @click="dialogVisible_component = true">
                <i class="el-icon-setting">设置系统组件和单元资产价值分级</i>
              </el-button>
            </h1>

            <el-form label-width="130px">
              <el-form-item label="请选择资产：">

                <el-select v-model="name_component" placeholder="请选择">
                  <el-option
                      v-for="item in options_component"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="保密性赋值：">
                <template>
                  <el-input-number v-model="num_component_wanzheng" :min="1" :max="max_component"
                                   label="描述文字"></el-input-number>
                </template>
              </el-form-item>
              <el-form-item label="完整性赋值：">
                <template>
                  <el-input-number v-model="num_component_keyong" :min="1" :max="max_component"
                                   label="描述文字"></el-input-number>
                </template>
              </el-form-item>
              <el-form-item label="可用性赋值：">
                <template>
                  <el-input-number v-model="num_component_baomi" :min="1" :max="max_component"
                                   label="描述文字"></el-input-number>
                </template>
              </el-form-item>
            </el-form>
            <el-button @click="onSubmit3" type="success">提 交</el-button>
            <!--------------------- 111 --------->
            <el-dialog
                title="业务重要性分级"
                :visible.sync="dialogVisible_component"
                width="30%">
              <span>请输入最大值</span>
              <el-input type="number" v-model="max_component"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible_component = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </div>
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
      options_business:[],
      options_system:[],
      options_component:[],
      name_business: '',
      name_system: '',
      name_component: '',
      activeName: '1',
      num_business: 1,
      num_system_baomi: 1,
      num_system_wanzheng: 1,
      num_system_keyong: 1,
      num_component_baomi: 1,
      num_component_wanzheng: 1,
      num_component_keyong: 1,
      max_business: 5,
      max_system: 5,
      max_component: 5,
      dialogVisible_business: false,
      dialogVisible_system: false,
      dialogVisible_component: false,
    }
  },
  methods:{
    getOptions(){
      var test = JSON.parse(localStorage.getItem("businessIdentifyInfo"))
      var test2 = JSON.parse(localStorage.getItem("systemIdentifyInfo"))
      var test3 = JSON.parse(localStorage.getItem("componentIdentifyInfo"))

      for(var item of test){
        this.options_business.push(item.business_name)
      }
      console.log(this.options_business)
      for(var item2 of test2){
        this.options_system.push(item2.system_name)
      }
      for(var item3 of test3){
        this.options_component.push(item3.component_name)
      }
    },
    pd() {
      var test = localStorage.getItem("systemEvaInfo")
      if (test == null)
        localStorage["systemEvaInfo"] = "[]"
      var test2 = localStorage.getItem("businessEvaInfo")
      if (test2 == null)
        localStorage["businessEvaInfo"] = "[]"
      var test3 = localStorage.getItem("componentEvaInfo")
      if (test3 == null)
        localStorage["componentEvaInfo"] = "[]"
    },
    onSubmit1(){
      var test = localStorage.getItem("businessEvaInfo")
      var businessEvaList = JSON.parse(test)
      var businessEva = {
        name:this.name_business,
        create_time: Date(),
        importance:this.num_business,
        max:this.max_business
      }
      businessEvaList.push(businessEva);
      localStorage["businessEvaInfo"] = JSON.stringify(businessEvaList)
      console.log(businessEva)
    },
    onSubmit2(){
      var test = localStorage.getItem("systemEvaInfo")
      var systemEvaList = JSON.parse(test)
      var systemEva = {
        name:this.name_system,
        create_time: Date(),
        baomi:this.num_system_baomi,
        wanzheng:this.num_system_wanzheng,
        keyong:this.num_system_keyong,
        max:this.max_system
      }
      systemEvaList.push(systemEva);
      localStorage["systemEvaInfo"] = JSON.stringify(systemEvaList)
      console.log(systemEva)
    },
    onSubmit3(){
      var test = localStorage.getItem("componentEvaInfo")
      var componentEvaList = JSON.parse(test)
      var componentEva = {
        name:this.name_component,
        create_time: Date(),
        baomi:this.num_component_baomi,
        wanzheng:this.num_component_wanzheng,
        keyong:this.num_component_keyong,
        max:this.max_component
      }
      componentEvaList.push(componentEva);
      localStorage["componentEvaInfo"] = JSON.stringify(componentEvaList)
      console.log(componentEva)
    },
  },
  mounted() {
    this.getOptions()
    this.pd()
  }
})
</script>



<style scoped>
.demo{
  width:50%
}
</style>
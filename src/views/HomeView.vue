<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">风险识别</el-menu-item>
          <el-menu-item index="2">风险信息总览</el-menu-item>
          <el-menu-item index="3">风险评估记录</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="1"
              style="height: 800px">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">资产识别</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">威胁识别</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">脆弱性识别</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <!-- 1 业务识别 -->
            <el-tab-pane label="业务识别" name="first">
              <el-button type="primary" @click="addBusiness"><i class="el-icon-circle-plus-outline"></i>添加待识别业务</el-button>
              <div
                  v-for="(businessItem,index) in business"
                  :key="businessItem.key"
              >
                <el-card style="margin-top: 10px">
                  <h2>业务{{index + 1}} <el-button @click.prevent="removeBusiness(businessItem)">删除</el-button></h2>
                  <!-- 1-1 属性识别 -->
                  <h1>属性识别</h1>
                  <el-form :model="businessItem" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                    <el-form-item prop="func" label="业务功能" class="demo">
                      <el-input v-model="businessItem.func" ></el-input>
                    </el-form-item>
                    <el-form-item prop="func" label="业务范围" class="demo">
                      <el-input v-model="businessItem.range" ></el-input>
                    </el-form-item>
                    <el-form-item prop="func" label="覆盖地域" class="demo">
                      <el-input v-model="businessItem.region" ></el-input>
                    </el-form-item>
                    <el-form-item prop="func" label="业务对象" class="demo">
                      <el-input v-model="businessItem.object" ></el-input>
                    </el-form-item>
                    <el-form-item prop="func" label="业务流程" class="demo">
                      <el-input v-model="businessItem.flow" ></el-input>
                    </el-form-item>
                    <el-form-item
                        v-for="(attribute, index) in businessItem.attribute"
                        :label="'新属性'"
                        :key="attribute.key"
                        :prop="'attribute.' + index + '.value'"
                    >
                      <el-input v-model="attribute.name" style="width:15%" placeholder="请输入属性名"></el-input>
                      <el-input v-model="attribute.value" style="width:42%"></el-input><el-button @click.prevent="removeAttribute(attribute,index)"><i class="el-icon-delete"></i></el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="addAttribute(index)">新增属性</el-button>
                    </el-form-item>
                  </el-form>
                  <!-- 1-2 定位识别 -->
                  <h1>定位识别</h1>
                  <el-form :model="businessItem" ref="dynamicValidateForm" label-width="160px" class="demo-dynamic">
                    <el-form-item prop="func" label="业务属性与职能定位" class="demo">
                      <el-input v-model="businessItem.role" ></el-input>
                    </el-form-item>
                    <el-form-item prop="func" label="与发展规划目标契合度" class="demo">
                      <el-select v-model="businessItem.value_fitness" placeholder="请选择">
                        <el-option
                            v-for="item in businessItem.options_fitness"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="func" label="业务布局的位置和作用" class="demo">
                      <el-select v-model="businessItem.value_layout" placeholder="请选择">
                        <el-option
                            v-for="item in businessItem.options_layout"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="func" label="竞争关系中竞争力强弱" class="demo">
                      <el-select v-model="businessItem.value_competitiveness" placeholder="请选择">
                        <el-option
                            v-for="item in businessItem.options_competitiveness"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                        v-for="(position, index) in businessItem.positions"
                        :label="'新定位'"
                        :key="position.key"
                        :prop="'positions.' + index + '.value'"
                    >
                      <el-input v-model="position.name" style="width:15%" placeholder="请输入定位名"></el-input>
                      <el-input v-model="position.value" style="width:40%"></el-input><el-button @click.prevent="removePosition(position,index)"><i class="el-icon-delete"></i></el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="addPosition(index)">新增定位</el-button>
                    </el-form-item>
                  </el-form>
                  <!-- 1-3 完整性识别 -->
                  <h1>完整性识别</h1>
                  <el-form ref="form" label-width="100px">
                    <el-form-item label="完整性等级">
                      <el-select v-model="businessItem.value_integrity" placeholder="请选择">
                        <el-option
                            v-for="item in businessItem.options_integrity"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <!-- 1-4 关联性识别 -->
                  <h1>关联性识别</h1>
                  <el-form ref="form" :model="businessItem" label-width="100px">
                    <el-form-item label="关联类别">
                      <el-select v-model="businessItem.value_class" placeholder="请选择">
                        <el-option
                            v-for="item in businessItem.options_class"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="关联程度">
                      <el-select v-model="businessItem.value_relation" placeholder="请选择">
                        <el-option
                            v-for="item in businessItem.options_relation"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <!-- 1-5 业务评估 -->
                  <h2>业务评估</h2>
                  <el-form ref="form" :model="businessItem" label-width="100px">
                    <el-form-item label="业务重要性">
                      <el-select v-model="businessItem.value_evaluation" placeholder="请选择">
                        <el-option
                            v-for="item in businessItem.options_evaluation"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>

                </el-card>
              </div>
            </el-tab-pane>
            <!-- 2 系统资产识别 -->
            <el-tab-pane label="系统资产识别" name="second">
              <el-button type="primary" @click="addSystem"><i class="el-icon-circle-plus-outline"></i>添加待识别系统资产</el-button>
              <div
                  v-for="(systemItem,index) in system"
                  :key="systemItem.key"
              >
                <el-card style="margin-top: 10px">
                  <h2>系统资产{{index + 1}} <el-button @click.prevent="removeSystem(systemItem)">删除</el-button></h2>
                  <!-- 2-1 系统资产类型识别 -->
                  <h1>系统资产类型识别</h1>
                  <el-form ref="form" :model="systemItem" label-width="100px">
                    <el-form-item label="系统资产类型">
                      <el-select v-model="systemItem.value" placeholder="请选择">
                        <el-option
                            v-for="item in systemItem.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <!-- 2-2 业务承载性识别 -->
                  <h1>业务承载性识别</h1>
                  <el-form ref="form" :model="systemItem" label-width="100px">
                    <el-form-item label="承载类别" class="demo">
                      <el-input v-model="systemItem.kind" ></el-input>
                    </el-form-item>
                    <el-form-item prop="func" label="业务关联程度" class="demo">
                      <el-select v-model="systemItem.value1" placeholder="请选择">
                        <el-option
                            v-for="item in systemItem.options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="func" label="资产关联程度" class="demo">
                      <el-select v-model="systemItem.value2" placeholder="请选择">
                        <el-option
                            v-for="item in systemItem.options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <!-- 2-3 系统资产评估 -->
                  <h1>系统资产价值</h1>
                  <el-form ref="form" :model="systemItem" label-width="100px">
                    <el-form-item label="系统资产价值">
                      <el-select v-model="systemItem.value_evaluation" placeholder="请选择">
                        <el-option
                            v-for="item in systemItem.options_evaluation"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="系统组件和单元资产识别" name="third">
              <el-button type="primary" @click="addComponent"><i class="el-icon-circle-plus-outline"></i>添加待识别系统组件和单元资产</el-button>
              <div
                  v-for="(component,index) in components"
                  :key="component.key"
              >
                <el-card style="margin-top: 10px">
                  <h2>系统组件和单元资产{{index + 1}} <el-button @click.prevent="removeComponent(component)">删除</el-button></h2>
                  <h1>系统组件和单元资产识别</h1>
                  <el-form ref="form" :model="component" label-width="100px">
                    <el-form-item label="名称" style="width:40%">
                      <el-input v-model="component.name"></el-input>
                    </el-form-item>
                    <el-form-item label="系统单元">
                      <el-select
                          v-model="component.value"
                          filterable
                          allow-create
                          default-first-option
                          placeholder="请选择分类">
                        <el-option
                            v-for="item in component.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="系统组件">
                      <el-select
                          v-model="component.value2"
                          filterable
                          allow-create
                          default-first-option
                          placeholder="请选择分类">
                        <el-option
                            v-for="item in component.options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="人力资源">
                      <el-select
                          v-model="component.value3"
                          filterable
                          allow-create
                          default-first-option
                          placeholder="请选择分类">
                        <el-option
                            v-for="item in component.options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="其他资产">
                      <el-select
                          v-model="component.value4"
                          filterable
                          allow-create
                          default-first-option
                          placeholder="请选择分类">
                        <el-option
                            v-for="item in component.options4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>

                  <h1>系统组件和单元资产评估</h1>
                  <el-form ref="form" :model="component" label-width="150px">
                    <el-form-item label="组件与单元资产价值">
                      <el-select v-model="component.value_eva" placeholder="请选择">
                        <el-option
                            v-for="item in component.options_eva"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
              <el-button type="success" style="margin-top: 20px;width:20%">提交</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      activeName: 'first',
      activeIndex: '1',
      //1
      business: [{
        //1-1
        func: '',
        range:'',
        region:'',
        object:'',
        flow:'',
        attribute:[],
        //1-2
        role:'',
        options_fitness:[{
          value: '选项1',
          label: '很高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '很低'
        }],
        value_fitness:'',
        options_layout:[{
          value: '选项1',
          label: '很高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '很低'
        }],
        value_layout:'',
        options_competitiveness:[{
          value: '选项1',
          label: '很高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '很低'
        }],
        value_competitiveness:'',
        positions:[],
        //1-3
        options_integrity:[{
            value: '1',
            label: '独立业务'
        }, {
            value: '2',
            label: '非独立业务'
          }],
        value_integrity:'',
        options_class:[{
          value: '选项1',
          label: '并列关系'
        }, {
          value: '选项2',
          label: '父子关系'
        }, {
          value: '选项3',
          label: '间接关系'
        }],
        value_class:'',
        //1-4
        options_relation:[{
          value: '选项1',
          label: '紧密关联'
        }, {
          value: '选项2',
          label: '非紧密关联'
        }],
        value_relation:'',
        //1-5
        options_evaluation:[{
            value: '选项1',
            label: '很高'
          }, {
            value: '选项2',
            label: '高'
          }, {
            value: '选项3',
            label: '中'
          }, {
            value: '选项4',
            label: '低'
          }, {
            value: '选项5',
            label: '很低'
          }],
        value_evaluation:''
      }],
      //2
      system:[{
        //2-1
        options:[{
          value: '选项1',
          label: '信息系统'
        }, {
          value: '选项2',
          label: '数据资源'
        }, {
          value: '选项3',
          label: '通信网络'
        }],
        values:'',
        //2-2
        kind:'',
        options1: [{
          value: '选项1',
          label: '极高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '极低'
        }],
        value1: '',
        options2: [{
          value: '选项1',
          label: '极高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '极低'
        }],
        value2: '',
        //2-3
        options_evaluation: [{
          value: '选项1',
          label: '很高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '很低'
        }],
        value_evaluation: '',
      }],
      //3
      components:[{
        name:'',
        options: [{
          value: '1',
          label: '计算机设备'
        }, {
          value: '2',
          label: '存储设备'
        }, {
          value: '3',
          label: '智能终端设备'
        }, {
          value: '4',
          label: '网络设备'
        }, {
          value: '5',
          label: '传输设备'
        }, {
          value: '6',
          label: '安全设备'
        }],
        value: [],
        options2: [{
          value: '1',
          label: '应用系统'
        }, {
          value: '2',
          label: '应用软件'
        }, {
          value: '3',
          label: '系统软件'
        }, {
          value: '4',
          label: '支撑平台'
        }, {
          value: '5',
          label: '服务接口'
        }],
        value2: [],
        options3: [{
          value: '1',
          label: '运维人员'
        }, {
          value: '2',
          label: '业务操作人员'
        }, {
          value: '3',
          label: '安全管理人员'
        }, {
          value: '4',
          label: '外包服务人员'
        }],
        value3: [],
        options4: [{
          value: '1',
          label: '数据资料'
        }, {
          value: '2',
          label: '办公设备'
        }, {
          value: '3',
          label: '保障设备'
        }, {
          value: '4',
          label: '服务'
        }, {
          value: '5',
          label: '知识产权'
        }],
        value4: [],
        options_eva: [{
          value: '选项1',
          label: '极高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '极低'
        }],
        value_eva: '',
      }]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    removeBusiness(item) {
      var index = this.business.indexOf(item)
      if (index !== -1) {
        this.business.splice(index, 1)
      }
    },
    addBusiness() {
      this.business.push({
        func: '',
        range:'',
        region:'',
        object:'',
        flow:'',
        attribute:[],
        role:'',
        options_layout: [{
          value: '选项1',
          label: '很高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '很低'
        }],
        options_fitness: [{
          value: '选项1',
          label: '很高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '很低'
        }],
        options_competitiveness: [{
          value: '选项1',
          label: '很高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '很低'
        }],
        value_layout: '',
        value_fitness: '',
        value_competitiveness: '',
        positions:[],
        options_integrity:[{
          value: '1',
          label: '独立业务'
        }, {
          value: '2',
          label: '非独立业务'
        }],
        value_integrity:'',
        options_class:[{
          value: '选项1',
          label: '并列关系'
        }, {
          value: '选项2',
          label: '父子关系'
        }, {
          value: '选项3',
          label: '间接关系'
        }],
        value_class:'',
        options_relation:[{
          value: '选项1',
          label: '紧密关联'
        }, {
          value: '选项2',
          label: '非紧密关联'
        }],
        value_relation:'',
        options_evaluation:[{
          value: '选项1',
          label: '很高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '很低'
        }],
        value_evaluation:'',
        key: Date.now()
      });
    },
    removeSystem(item) {
      var index = this.system.indexOf(item)
      if (index !== -1) {
        this.system.splice(index, 1)
      }
    },
    addSystem() {
      this.system.push({
            options:[{
              value: '选项1',
              label: '信息系统'
            }, {
              value: '选项2',
              label: '数据资源'
            }, {
              value: '选项3',
              label: '通信网络'
            }],
            values:'',
        kind:'',
        options1: [{
          value: '选项1',
          label: '极高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '极低'
        }],
        value1: '',
        options2: [{
          value: '选项1',
          label: '极高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '极低'
        }],
        value2: '',
        options_evaluation: [{
          value: '选项1',
          label: '很高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '很低'
        }],
        value_evaluation: ''
          })
    },
    removeComponent(item){
      var index = this.components.indexOf(item)
      if (index !== -1) {
        this.components.splice(index, 1)
      }
    },
    addComponent(){
      this.components.push({
        name:'',
        options: [{
          value: '1',
          label: '计算机设备'
        }, {
          value: '2',
          label: '存储设备'
        }, {
          value: '3',
          label: '智能终端设备'
        }, {
          value: '4',
          label: '网络设备'
        }, {
          value: '5',
          label: '传输设备'
        }, {
          value: '6',
          label: '安全设备'
        }],
        value: [],
        options2: [{
          value: '1',
          label: '应用系统'
        }, {
          value: '2',
          label: '应用软件'
        }, {
          value: '3',
          label: '系统软件'
        }, {
          value: '4',
          label: '支撑平台'
        }, {
          value: '5',
          label: '服务接口'
        }],
        value2: [],
        options3: [{
          value: '1',
          label: '运维人员'
        }, {
          value: '2',
          label: '业务操作人员'
        }, {
          value: '3',
          label: '安全管理人员'
        }, {
          value: '4',
          label: '外包服务人员'
        }],
        value3: [],
        options4: [{
          value: '1',
          label: '数据资料'
        }, {
          value: '2',
          label: '办公设备'
        }, {
          value: '3',
          label: '保障设备'
        }, {
          value: '4',
          label: '服务'
        }, {
          value: '5',
          label: '知识产权'
        }],
        value4: [],
        options_eva: [{
          value: '选项1',
          label: '极高'
        }, {
          value: '选项2',
          label: '高'
        }, {
          value: '选项3',
          label: '中'
        }, {
          value: '选项4',
          label: '低'
        }, {
          value: '选项5',
          label: '极低'
        }],
        value_eva: '',
      })
    },
    removeAttribute(item,num) {
      var index = this.business[num].attribute.indexOf(item)
      if (index !== -1) {
        this.business[num].attribute.splice(index, 1)
      }
    },
    addAttribute(num) {
      this.business[num].attribute.push({
        value: '',
        key: Date.now()
      });
    },
    removePosition(item,num) {
      var index = this.business[num].positions.indexOf(item)
      if (index !== -1) {
        this.business[num].positions.splice(index, 1)
      }
    },
    addPosition(num) {
      this.business[num].positions.push({
        value: '',
        key: Date.now()
      });
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
<style>
.demo{
  width:60%
}
</style>
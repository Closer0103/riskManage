<template>
  <div>
    <menu-frame>
      <el-card>
        <span style="font-weight: bold">当前评估资产：</span>
        <span style="color: red">资产1</span>
      </el-card>
      <el-card style="margin-top: 30px">
        <el-tabs v-model="activeName"  type="card" @tab-click="handleClick">
          <el-tab-pane label="资产评估" name="first">
            <el-button @click="dialogVisible_system = true">
              <i class="el-icon-setting">设置系统资产分级</i>
            </el-button>
            <el-form style="margin-top: 20px">
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
          </el-tab-pane>
          <el-tab-pane label="脆弱性、威胁、安全措施评估" name="second">
            <el-card shadow="always">
              <!--卡片标题-->
              <el-container>
                <h1 style="width:15vw">添加一条记录</h1>
                <el-tooltip class="item" effect="dark" content="添加属性" placement="bottom">
                  <i class="el-icon-plus" @click="manOrgDialogVisible = true"
                     style="margin-left: 4vw;margin-top: 3.8vh;font-weight: bolder;cursor: pointer;"></i>
                </el-tooltip>
              </el-container>
              <!--自定义属性对话框-->
              <el-dialog title="添加属性" :visible.sync="manOrgDialogVisible">
                <el-form>
                <el-form-item label="脆弱性名称">
                  <el-select v-model="AttributeName" placeholder="请选择"
                             filterable allow-create default-first-option>
                    <el-option v-for="item in manOrgOptions" :key="item"
                               :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="脆弱性赋值">
                <el-select v-model="RK1" placeholder="请选择"
                           filterable allow-create default-first-option>
                  <el-option v-for="item in rankSetting" :key="item"
                             :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                </el-form-item>
                  <el-divider></el-divider>
                <el-form-item label="威胁名称">
                  <el-select v-model="AttributeName2" placeholder="请选择"
                             filterable allow-create default-first-option>
                    <el-option v-for="item in manOrgOptions" :key="item"
                               :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="威胁赋值">
                  <el-select v-model="RK2" placeholder="请选择"
                             filterable allow-create default-first-option>
                    <el-option v-for="item in rankSetting" :key="item"
                               :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <el-divider></el-divider>
                </el-form-item>
                <el-form-item label="安全措施名称">
                  <el-select v-model="AttributeName3" placeholder="请选择"
                             filterable allow-create default-first-option>
                    <el-option v-for="item in manOrgOptions" :key="item"
                               :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="安全措施赋值">
                  <el-select v-model="RK3" placeholder="请选择"
                             filterable allow-create default-first-option>
                    <el-option v-for="item in rankSetting" :key="item"
                               :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="manOrgDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addManAttribute(1)">确 定</el-button>
                </div>
              </el-dialog>
              <!--已添加的属性列表-->
              <el-container v-for="(item, index) in manOrgAttribute" :key="index" class="single-attribute">
                <el-container style="margin-left: 4vw;display: flex;align-items: center;width: 15vw;">
                  <el-tooltip class="item" effect="dark" content="移除属性" placement="bottom">
                    <i class="el-icon-remove-outline" @click="delManAttribute(index,1)"
                       style="margin-right: 1vw;size: 2rem;cursor: pointer;"></i>
                  </el-tooltip>
                  <h4>记录</h4>
                </el-container>
                <el-container style="margin-top: 3vh;position: relative;">{{
                    item.RK1
                  }}
                </el-container>
                  <el-container style="margin-top: 3vh;position: relative;">{{
                      item.RK2
                    }}
                  </el-container>
                <el-container style="margin-top: 3vh;position: relative;">{{
                    item.RK3
                  }}
                </el-container>
              </el-container>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-card>
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
      activeName: 'first',
      num_system_baomi: 1,
      num_system_wanzheng: 1,
      num_system_keyong: 1,
      max_system:5,

      //识别对象，需要读取资产识别中的对象，现在暂时使用固定对象进行测试
      IdentifiedOptions: [],
      IdentifiedObject: '',

      // 设置等级相关变量
      settingsDialogVisible: false,
      min_rank: 1,
      max_rank: 5,
      //默认等级划分
      rankSetting: [
        {
          value: 1,
          label: '等级1',
        },
        {
          value: 2,
          label: '等级2',
        },
        {
          value: 3,
          label: '等级3',
        },
        {
          value: 4,
          label: '等级4',
        },
        {
          value: 5,
          label: '等级5',
        }
      ],

      //单纯作为承载输入内容的中间变量
      AttributeName: '',
      AttributeName2: '',
      AttributeName3: '',
      RK1:'',
      RK2:'',
      RK3:'',
      AttributeRank1: '',
      AttributeRank2: '',

      //管理脆弱性相关变量
      //组织管理脆弱性相关变量
      //GBT_20984推荐属性
      manOrgOptions: [
        '安全策略',
        '组织安全',
        '资产分类与控制',
        '人员安全',
        '符合性',
      ],
      manOrgDialogVisible: false,
      //组织管理脆弱性属性集
      manOrgAttribute: [],

      //技术管理脆弱性相关变量
      manTecOptions: [
        '物理和环境安全',
        '通信与操作管理',
        '访问控制',
        '系统开发与维护',
        '业务连续性',
      ],
      manTecDialogVisible: false,
      manTecAttribute: [],

      //技术脆弱性相关变量
      //应用系统脆弱性
      tecAppOptions: [
        '审计机制',
        '审计存储',
        '访问控制策略',
        '数据完整性',
        '通信',
        '鉴别机制',
        '密码保护',
      ],
      tecAppDialogVisible: false,
      tecAppAttribute: [],
      //应用中间件脆弱性
      tecMidOptions: [
        '协议安全',
        '交易完整性',
        '数据完整性',
      ],
      tecMidDialogVisible: false,
      tecMidAttribute: [],
      //系统软件脆弱性
      tecSysOptions: [
        '补丁安装',
        '物理保护',
        '用户账号',
        '口令策略',
        '资源共享',
        '事件审计',
        '访问控制',
        '新系统配置',
        '注册表加固',
        '网络安全',
        '系统管理',
      ],
      tecSysDialogVisible: false,
      tecSysAttribute: [],
      //网络结构脆弱性
      tecWebOptions: [
        '网络结构设计',
        '边界保护',
        '外部访问控制策略',
        '内部访问控制策略',
        '网络设备安全配置',
      ],
      tecWebDialogVisible: false,
      tecWebAttribute: [],
      //物理环境脆弱性
      tecEnvOptions: [
        '机房场地',
        '机房防火',
        '机房供配电',
        '机房防静电',
        '机房接地与防雷',
        '电磁防护',
        '通信线路的保护',
        '机房区域防护',
        '机房设备管理',
      ],
      tecEnvDialogVisible: false,
      tecEnvAttribute: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addManAttribute(mode) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');

      const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      if (mode == 1) {
        this.manOrgDialogVisible = false;
        this.manOrgAttribute.push(
            {
              name: this.AttributeName,
              rank1: this.AttributeRank1,
              rank2: this.AttributeRank2,
              createDate: date,
            }
        )
      } else if (mode == 2) {
        this.manTecDialogVisible = false;
        this.manTecAttribute.push(
            {
              name: this.AttributeName,
              rank1: this.AttributeRank1,
              rank2: this.AttributeRank2,
              createDate: date,
            }
        )
      }
      this.AttributeName = '';
      this.AttributeRank1 = '';
      this.AttributeRank2 = '';
      return;
    },
    delManAttribute(index, mode) {
      if (mode == 1) {
        this.manOrgAttribute.splice(index, 1);
      } else if (mode == 2) {
        this.manTecAttribute.splice(index, 1);
      }
      return;
    },
  }
})
</script>



<style scoped>

</style>
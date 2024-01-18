<template>
  <div class="home">

    <el-main>
      <template>
        <el-table
            :data="listTable"
            style="width: 100%">
          <el-table-column
              prop="IdentifiedObject"
              label="资产名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="create_time"
              label="识别时间"
              width="360">
          </el-table-column>
          <el-table-column
              label="查看详情"
              width="180">
            <template slot-scope="scope">
            <el-link @click="hclick(scope.row.create_time)">查看详情</el-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="详情"
        :visible.sync="dialogVisible"
        width="50%">
        <el-tabs v-model="activeName" type="card" style="margin-top: 2vh;">

        <!-- 1 管理脆弱性 -->
        <el-tab-pane label="管理脆弱性" name="manage">

          <!--表格形式展示组织管理脆弱性-->
          <el-container style="display: flex;flex-direction: column;">
            <h1 style="margin-left: 1vw;">组织管理脆弱性识别记录</h1>
            <el-table
                :data="manOrgAttribute"
                style="width: 100%">
              <el-table-column
                  prop="name"
                  label="属性名称"
                  width="300">
              </el-table-column>
              <el-table-column
                  prop="identifyTime"
                  label="识别时间"
                  width="300">
              </el-table-column>
              <el-table-column
                  label="操作"
                  width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="delAttribute(scope.$index,1)">删除属性</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--表格形式展示技术管理脆弱性-->
            <h1 style="margin-left: 1vw;">技术管理脆弱性识别记录</h1>
            <el-table
                :data="manTecAttribute"
                style="width: 100%">
              <el-table-column
                  prop="name"
                  label="属性名称"
                  width="300">
              </el-table-column>
              <el-table-column
                  prop="identifyTime"
                  label="识别时间"
                  width="300">
              </el-table-column>
              <el-table-column
                  label="操作"
                  width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="delAttribute(scope.$index, 2)">删除属性</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </el-tab-pane>

        <!-- 2 技术脆弱性 -->
        <el-tab-pane label="技术脆弱性" name="technique">
          <el-container style="display: flex;flex-direction: column;">
            <!--表格形式展示应用系统脆弱性-->
            <h1 style="margin-left: 1vw;">应用系统脆弱性识别记录</h1>
            <el-table
                :data="tecAppAttribute"
                style="width: 100%">
              <el-table-column
                  prop="name"
                  label="属性名称"
                  width="300">
              </el-table-column>
              <el-table-column
                  prop="identifyTime"
                  label="识别时间"
                  width="300">
              </el-table-column>
              <el-table-column
                  label="操作"
                  width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="delAttribute(scope.$index, 3)">删除属性</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--表格形式展示应用中间件脆弱性-->
            <h1 style="margin-left: 1vw;">应用中间件脆弱性识别记录</h1>
            <el-table
                :data="tecMidAttribute"
                style="width: 100%">
              <el-table-column
                  prop="name"
                  label="属性名称"
                  width="300">
              </el-table-column>
              <el-table-column
                  prop="identifyTime"
                  label="识别时间"
                  width="300">
              </el-table-column>
              <el-table-column
                  label="操作"
                  width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="delAttribute(scope.$index, 4)">删除属性</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--表格形式展示系统软件脆弱性-->
            <h1 style="margin-left: 1vw;">系统软件脆弱性识别记录</h1>
            <el-table
                :data="tecSysAttribute"
                style="width: 100%">
              <el-table-column
                  prop="name"
                  label="属性名称"
                  width="300">
              </el-table-column>
              <el-table-column
                  prop="identifyTime"
                  label="识别时间"
                  width="300">
              </el-table-column>
              <el-table-column
                  label="操作"
                  width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="delAttribute(scope.$index, 5)">删除属性</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--表格形式展示网络结构脆弱性-->
            <h1 style="margin-left: 1vw;">网络结构脆弱性识别记录</h1>
            <el-table
                :data="tecWebAttribute"
                style="width: 100%">
              <el-table-column
                  prop="name"
                  label="属性名称"
                  width="300">
              </el-table-column>
              <el-table-column
                  prop="identifyTime"
                  label="识别时间"
                  width="300">
              </el-table-column>
              <el-table-column
                  label="操作"
                  width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="delAttribute(scope.$index, 6)">删除属性</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--表格形式展示物理环境脆弱性-->
            <h1 style="margin-left: 1vw;">物理环境脆弱性识别记录</h1>
            <el-table
                :data="tecEnvAttribute"
                style="width: 100%">
              <el-table-column
                  prop="name"
                  label="属性名称"
                  width="300">
              </el-table-column>
              <el-table-column
                  prop="identifyTime"
                  label="识别时间"
                  width="300">
              </el-table-column>
              <el-table-column
                  label="操作"
                  width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="delAttribute(scope.$index, 7)">删除属性</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </el-tab-pane>

      </el-tabs>
      </el-dialog>
    </el-main>
  </div>
</template>

<!--这是风险信息总览模块下脆弱性识别的信息总览页面-->
<script>
import axios from "axios";
export default {
  name: 'VulInfo',
  data() {
    return {
      dialogVisible:false,
      listTable:[],
      current_i:999,
      //顶部导航栏
      activeIndex: '2',
      //el-tab
      activeName: 'manage',

      //测试时规定为2
      projectId:2,

      //识别对象
      IdentifiedObject: '',

      //管理脆弱性相关变量
      //组织管理脆弱性相关变量
      manOrgAttribute: [],
      //技术管理脆弱性相关变量
      manTecAttribute: [],

      //技术脆弱性相关变量
      //应用系统脆弱性
      tecAppAttribute: [],
      //应用中间件脆弱性
      tecMidAttribute: [],
      //系统软件脆弱性
      tecSysAttribute: [],
      //网络结构脆弱性
      tecWebAttribute: [],
      //物理环境脆弱性
      tecEnvAttribute: [],
    };
  },
  mounted() {
    this.init();

  },
  watch: {
    current_i: {
      immediate: true, // 立即执行一次
      handler(newValue) {
        if (newValue === false) {
          this.getData(this.current_i)
        }
      },
    },
  },
  methods: {
    init() {
      this.getVulnerabilityList();
    },
    hclick(i){
      console.log(i)
      for(var k in this.listTable)
      {
        if (this.listTable[k].create_time === i)
          this.current_i = k
      }
      console.log(k)
      this.dialogVisible = true
      this.getData(this.current_i)
    },
    async getVulnerabilityList() {
      console.log("获取项目脆弱性表")
      let response;
      try {
        response = await axios.get('api/vul/getVulnerabilityList', {
          params: {
            "projectId": this.projectId,
          }
        });
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      if (response.data.msg == 'success') {
        console.log(response.data.data)
        response.data.data.forEach(element => {
          if (element.type == 1) {
            this.tecEnvAttribute.push(element)
          }
          else if (element.type == 2) {
            this.tecWebAttribute.push(element)
          }
          else if (element.type == 3) {
            this.tecSysAttribute.push(element)
          }
          else if (element.type == 4) {
            this.tecMidAttribute.push(element)
          }
          else if (element.type == 5) {
            this.tecAppAttribute.push(element)
          }
          else if (element.type == 6) {
            this.manTecAttribute.push(element)
          }
          else if (element.type == 7) {
            this.manOrgAttribute.push(element)
          }
        });
      }
      return;
    },
    handlePush(index) {
      if (index == '1') {
        this.$router.push('/vulRec');
      } else if (index == '2') {
        //this.$router.push('/VulInfo');
      } else if (index == '3') {
        this.$router.push('/vulEva');
      }
    },
    async delAttribute(index, mode) {
      console.log("删除脆弱性")
      let id =0;
      if (mode == 1) {
        id = this.manOrgAttribute[index].id;
        this.manOrgAttribute.splice(index, 1);
      } else if (mode == 2) {
        id = this.manTecAttribute[index].id;
        this.manTecAttribute.splice(index, 1);
      } else if (mode == 3) {
        id = this.tecAppAttribute[index].id;
        this.tecAppAttribute.splice(index, 1);
      } else if (mode == 4) {
        id = this.tecMidAttribute[index].id;
        this.tecMidAttribute.splice(index, 1);
      } else if (mode == 5) {
        id = this.tecSysAttribute[index].id;
        this.tecSysAttribute.splice(index, 1);
      } else if (mode == 6) {
        id = this.tecWebAttribute[index].id;
        this.tecWebAttribute.splice(index, 1);
      } else if (mode == 7) {
        id = this.tecEnvAttribute[index].id;
        this.tecEnvAttribute.splice(index, 1);
      }
      let response;
      try {
        response = await axios.delete('api/vul/deleteAttribute', {
          params: {
            "id": id,
          }
        });
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
        throw error;
      }
      console.log(response.data.msg)
    },
  },
}
</script>


<style>
.website-title {
  font-family: Microsoft Yahei;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.icon-set {
  margin-right: 0.5vw;
  margin-top: 0.5vh;
}
</style>
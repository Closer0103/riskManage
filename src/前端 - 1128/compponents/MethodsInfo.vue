<!--这是风险信息总览模块下脆弱性识别的信息总览页面-->
<script>
import axios from "axios";
export default {
  name: 'MethodsInfo',
  data() {
    return {
      //顶部导航栏
      dialogVisible:false,
      activeIndex: '2',
      current_i: 999,
      listTable: [],
      //展示table还是展示charts
      tableMode: true,

      projectId:2,

      //识别对象
      IdentifiedObject: '',

      //已有安全措施相关变量
      //预防性安全措施相关变量
      preventiveAttribute: [],

      //保护性安全措施相关变量
      protectiveAttribute: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getMethodList();
    },
    async getMethodList() {
      console.log("获取项目安全措施表")
      let response;
      try {
        response = await axios.get('api/met/getMethodList', {
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
        response.data.data.forEach(element => {
          if (element.type == 1) {
            this.preventiveAttribute.push(element)
          }
          else if (element.type == 2) {
            this.protectiveAttribute.push(element)
          }
        });
      }
      return;
    },
    hclick(i) {
      console.log(i)
      for (var k in this.listTable) {
        if (this.listTable[k].create_time === i)
          this.current_i = k
      }
      console.log(k)
      this.dialogVisible = true
      this.getData(this.current_i)
    },
    handlePush(index) {
      if (index == '1') {
        this.$router.push('/methodsRec');
      } else if (index == '2') {
        //this.$router.push('/methodsInfo');
      } else if (index == '3') {
        this.$router.push('/methodsEva');
      }
    },
    async delAttribute(index, type) {
      console.log("删除安全措施")
      let id;
      if (type == 1) {
        id = this.preventiveAttribute[index].id;
        this.preventiveAttribute.splice(index, 1);
      } else if (type == 2) {
        id = this.protectiveAttribute[index].id;
        this.protectiveAttribute.splice(index, 1);
      }
      let response;
      try {
        response = await axios.delete('api/met/deleteAttribute', {
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
      return;
    },
  },
}
</script>

<template>
  <div class="home">
    <el-main>
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
      <el-dialog title="详情"
                 :visible.sync="dialogVisible"
                 width="50%">
      <!--表格形式展示预防性安全措施-->
      <el-container style="display: flex;flex-direction: column;">
        <h1 style="margin-left: 1vw;">预防性安全措施识别记录</h1>
        <el-table :data="preventiveAttribute" style="width: 100%">
          <el-table-column prop="name" label="属性名称" width="300">
          </el-table-column>
          <el-table-column prop="identifyTime" label="识别时间" width="300">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="delAttribute(scope.$index, 1)">删除安全措施</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--表格形式展示技术管理脆弱性-->
        <h1 style="margin-left: 1vw;">保护性安全措施识别记录</h1>
        <el-table :data="protectiveAttribute" style="width: 100%">
          <el-table-column prop="name" label="安全措施名称" width="300">
          </el-table-column>
          <el-table-column prop="identifyTime" label="识别时间" width="300">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="delAttribute(scope.$index, 2)">删除安全措施</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      </el-dialog>
    </el-main>
  </div>
</template>

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
<!--这是风险评估记录模块下脆弱性识别的评估记录页面-->
<script>
export default {
  name: 'MethodsEva',
  data() {
    return {
      //顶部导航栏
      activeIndex: '3',
      dialogVisible: false,
      current_i: 999,
      listTable: [],
      //识别对象
      IdentifiedObject: '',

      //等级相关变量
      min_rank: 1,
      max_rank: 5,

      //已有安全措施相关变量
      methodsAvg: [],
      //预防性安全措施相关变量
      preventiveAvg: [],
      preventiveAttribute: [],

      //保护性安全措施相关变量
      protectiveAvg: [],
      protectiveAttribute: [],

      //控制两个显示窗口
      detailDialogVisible1: false,
      detailDialogVisible2: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {

    init() {
      //this.getData();
      this.getList()
    },
    getList() {
      this.listTable = JSON.parse(localStorage.getItem("MethodsData"))
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
    //从session中读出安全措施相关数据
    getData(i) {
      // 从会话存储中检索 JSON 字符串
      const jsonData = localStorage.getItem('MethodsData');
      // 检查是否有存储的数据
      if (jsonData) {
        // 解析 JSON 字符串为 JavaScript 对象
        const MethodsData = JSON.parse(jsonData)[i];
        this.IdentifiedObject = MethodsData.IdentifiedObject;
        this.min_rank = MethodsData.min_rank;
        this.max_rank = MethodsData.max_rank;
        this.preventiveAttribute = MethodsData.preventiveAttribute;
        this.protectiveAttribute = MethodsData.protectiveAttribute;
      }
      this.preventiveAvg = [{
        'name': '预防性安全措施',
        'avgRank': this.calAvgRank(this.preventiveAttribute),
        'evaRank': this.evaRank(this.calAvgRank(this.preventiveAttribute)),
      }];
      this.protectiveAvg = [{
        'name': '保护性安全措施',
        'avgRank': this.calAvgRank(this.protectiveAttribute),
        'evaRank': this.evaRank(this.calAvgRank(this.protectiveAttribute)),
      }];

      this.methodsAvg = [{
        name: '已有安全措施',
        'avgRank': Math.floor((this.calAvgRank(this.preventiveAttribute) + this.calAvgRank(this.protectiveAttribute)) / 2),
        'evaRank': this.evaRank(Math.floor((this.calAvgRank(this.preventiveAttribute) + this.calAvgRank(this.protectiveAttribute)) / 2)),
      }];
    },
    calAvgRank(attributeArray) {
      if (!attributeArray || attributeArray.length === 0) {
        return 0; // 如果数组为空或未定义，返回0
      }

      const totalRank = attributeArray.reduce((total, attribute) => total + attribute.rank, 0);
      const averageRank = Math.floor(totalRank / attributeArray.length);
      return averageRank;
    },
    evaRank(rank) {
      if (rank == 0) {
        return '暂未评估';
      } else if (rank == 1) {
        return '很低';
      } else if (rank == 2) {
        return '低';
      } else if (rank == 3) {
        return '中等';
      } else if (rank == 4) {
        return '高';
      } else if (rank == 5) {
        return '很高'
      }
    },
    handlePush(index) {
      if (index == '1') {
        this.$router.push('/methodsRec');
      } else if (index == '2') {
        this.$router.push('/methodsInfo');
      } else if (index == '3') {
        //this.$router.push('/methodsEva');
      }
    },
  }
}
</script>

<template>
  <div class="home">
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
               width="80%">
      <el-main>

        <el-card>
          <el-container>
            <span>当前评估对象为：</span>
            <span style="color: rgb(230, 100, 100);">{{ this.IdentifiedObject }}</span>
            <span style="margin-left: 4vw;">当前风险等级划分为：</span>
            <span style="color: rgb(230, 100, 100);margin-top: 0.4vh;">{{ this.min_rank }} - {{
                this.max_rank
              }}</span>
          </el-container>
        </el-card>

        <el-container style="display: flex;flex-direction: column;">
          <h1 style="margin-left: 1vw;">已有安全措施评估记录</h1>
          <el-table :data="methodsAvg" style="width: 100%">
            <el-table-column prop="name" label="安全措施名称" width="280">
            </el-table-column>
            <el-table-column prop="avgRank" label="安全措施有效性等级" width="300">
            </el-table-column>
            <el-table-column prop="evaRank" label="安全措施有效性" width="300">
            </el-table-column>
          </el-table>

          <h1 style="margin-left: 1vw;">预防性安全措施评估记录</h1>
          <el-table :data="preventiveAvg" style="width: 100%">
            <el-table-column prop="name" label="安全措施名称" width="280">
            </el-table-column>
            <el-table-column prop="avgRank" label="安全措施有效性等级" width="300">
            </el-table-column>
            <el-table-column prop="evaRank" label="安全措施有效性" width="300">
            </el-table-column>
          </el-table>

          <h1 style="margin-left: 1vw;">保护性安全措施评估记录</h1>
          <el-table :data="protectiveAvg" style="width: 100%">
            <el-table-column prop="name" label="安全措施名称" width="280">
            </el-table-column>
            <el-table-column prop="avgRank" label="安全措施有效性等级" width="300">
            </el-table-column>
            <el-table-column prop="evaRank" label="安全措施有效性" width="300">
            </el-table-column>
          </el-table>
        </el-container>

      </el-main>
    </el-dialog>
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
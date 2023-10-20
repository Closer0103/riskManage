<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"><a href="/" style="text-decoration: none;">风险识别</a></el-menu-item>
          <el-menu-item index="2">风险信息总览</el-menu-item>
          <el-menu-item index="3"><a href="/record" style="text-decoration: none;">风险评估记录</a></el-menu-item>
          <el-menu-item index="4" style="margin-left: 60%">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            个人中心
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-main>
          <template>
            <el-table
                :data="tableData"
                style="width: 100%">
              <el-table-column
                  prop="id"
                  label="资产编号"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="资产名称"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="time"
                  label="评估时间">
              </el-table-column>
              <el-table-column
                  prop=""
                  label="查看详情">
                <el-link @click="dialogVisible = true">查看详情</el-link>

              </el-table-column>
            </el-table>
            <el-dialog
                title="评估记录详情"
                :visible.sync="dialogVisible"
                width="50%">
              <span>
                <el-table
                    :data="tableData">
                  <el-table-column
                      prop=""
                      label="业务重要性评分">
                    <p>1(满分：5)</p>
                  </el-table-column>
                  <el-table-column
                      prop=""
                      label="系统资产价值评分">
                    <p>1(满分：10)</p>
                  </el-table-column>
                  <el-table-column
                      prop=""
                      label="系统组件与单元资产评分">
                    <p>1(满分：5)</p>
                  </el-table-column>
                </el-table>
              </span>
              <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                  </span>
            </el-dialog>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1:{},
      dialogVisible:false,
      num: '',
      name:'',
      tableData:[]
    };
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    getRecord(){
      var info = JSON.parse(localStorage.getItem('propertyInfo'))
      console.log(info)
      this.tableData = info
    }
  },
  mounted() {
    this.getRecord()
  }
};
</script>
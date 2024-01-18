<template>
  <div>
  <div style="display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid;padding-bottom: 1vh;">
    <i class="el-icon-key icon-set" size="1.2rem"></i>
    <p style="font-weight: bold">安全风险评估系统</p>
    <p style="margin-left: 30px;color:darkblue;font-weight: bold">项目管理</p>
  </div>
  <el-table
      :data="project"
      border
      style="width: 100%">
    <el-table-column
        fixed
        prop="id"
        label="项目编号"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="项目名称"
        width="180">
    </el-table-column>
    <el-table-column
        prop="detail"
        label="项目说明">
    </el-table-column>
    <el-table-column
        label="管理项目"
        fixed="right">
      <el-button type="primary" @click="goto">管理项目</el-button>
    </el-table-column>
  </el-table>
    <el-button type="success" style="margin-top: 1%;margin-left: 2%" @click="dialogVisible = true">添加项目</el-button>
    <el-dialog
        title="添加项目"
        :visible.sync="dialogVisible"
        width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目说明">
          <el-input v-model="form.detail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addProject">提 交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data(){
    return{
      form:{
        name:'',
        detail:''
      },
      dialogVisible: false,
      project:[
        {
          id:'P0001',
          name:'项目1',
          detail:'本项目致力于开发信息管理相关业务'
        },
        {
          id:'P0002',
          name:'项目2',
          detail:'本项目致力于开发企业其他业务'
        }
      ]
    }
  },
  methods:{
    addProject(){
      this.dialogVisible = false
      var test = localStorage.getItem("ProjectData")
      var ProjectList = JSON.parse(test)
      // 检查 VulList 是否为数组，如果不是，初始化为空数组
      if (!Array.isArray(ProjectList)) {
        ProjectList = [];
      }
      ProjectList.push(
          {
            id:'P000'+String(ProjectList.length + 1),
            name:this.form.name,
            detail:this.form.detail
          }
      )
      localStorage["ProjectData"] = JSON.stringify(ProjectList)
      location.reload()
    },
    getProject(){
      this.project=JSON.parse(localStorage.getItem("ProjectData"))
    },
    goto(){
      this.$router.push('/')
    }
  },
  mounted() {
    this.getProject()
  },
  watch:{
    project: {
      immediate: true, // 立即执行一次
          handler(newValue) {
        if (newValue === false) {
          this.getProject()
        }
      },
    }
  }
}
</script>



<style scoped>

</style>
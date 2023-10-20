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
        <el-aside width="200px">
          <el-menu
              default-active="5"
              style="height: 800px">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title"><a href="/" style="text-decoration: none;">资产识别</a></span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">威胁识别</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">脆弱性识别</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">安全措施识别</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-menu"></i>
              <span slot="title"><a href="/about" style="text-decoration: none;">资产评估</a></span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>

          <div>
            <h2>资产评估</h2>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="业务重要性评估" name="1">
                <h1>
                  业务重要性评估
                  <el-button style="margin-left:30px" @click="dialogVisible_business = true">
                    <i class="el-icon-setting">设置重要性分级</i>
                  </el-button>
                </h1>
                <el-form label-width="130px">
                  <el-form-item label="请输入业务：">

                    <el-input class="demo" v-model="name_business"></el-input>
                  </el-form-item>
                  <el-form-item label="业务重要性价值：">
                    <template>

                      <el-input-number v-model="num_business" :min="1" :max="max_business"
                                       label="描述文字"></el-input-number>

                    </template>
                  </el-form-item>
                </el-form>
                <el-button type="success">提 交</el-button>
                <!--------------------- 111 --------->

                <el-dialog
                    title="业务重要性分级"
                    :visible.sync="dialogVisible_business"
                    width="30%">
                  <span>请输入最大值</span>
                  <el-input v-model="max_business"></el-input>
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
                  <el-form-item label="请输入系统资产：">

                    <el-input class="demo" v-model="name_system"></el-input>
                    <br>
                  </el-form-item>
                  <el-form-item label="系统资产价值：">
                    <template>
                      <el-input-number v-model="num_system" :min="1" :max="max_system"
                                       label="描述文字"></el-input-number>
                    </template>
                  </el-form-item>
                </el-form>
                <el-button type="success">提 交</el-button>
                <!--------------------- 111 --------->
                <el-dialog
                    title="系统资产价值分级"
                    :visible.sync="dialogVisible_system"
                    width="30%">
                  <span>请输入最大值</span>
                  <el-input v-model="max_system"></el-input>
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

                <el-form label-width="200px">
                  <el-form-item label="请输入系统组件和单元资产：">

                    <el-input class="demo" v-model="name_component"></el-input>
                  </el-form-item>
                  <el-form-item label="系统组件和单元资产价值：">
                    <template>

                      <el-input-number v-model="num_component" :min="1" :max="max_component"
                                       label="描述文字"></el-input-number>
                    </template>
                  </el-form-item>
                </el-form>
                <el-button type="success">提 交</el-button>
                <!--------------------- 111 --------->
                <el-dialog
                    title="业务重要性分级"
                    :visible.sync="dialogVisible_component"
                    width="30%">
                  <span>请输入最大值</span>
                  <el-input v-model="max_component"></el-input>
                  <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible_component = false">确 定</el-button>
              </span>
                </el-dialog>
              </el-tab-pane>
            </el-tabs>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

export default {
  data() {
    return {
      name_business: '',
      name_system: '',
      name_component: '',
      activeName: '1',
      num_business: 1,
      num_system: 1,
      num_component: 1,
      max_business: 5,
      max_system: 5,
      max_component: 5,
      dialogVisible_business: false,
      dialogVisible_system: false,
      dialogVisible_component: false,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(value) {
      console.log(value);
    },
  }
}
</script>
<style>
.demo {
  width: 60%
}
</style>
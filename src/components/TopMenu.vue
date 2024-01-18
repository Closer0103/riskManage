<template>
  <div style="display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid;padding-bottom: 1vh;">

    <i class="el-icon-key icon-set" size="1.2rem"></i>
    <p style="font-weight: bold">安全风险评估系统</p>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="border: 0 !important;margin-left: 20px">
      <el-menu-item index="0"><a href="/" style="text-decoration: none;">数据展示</a></el-menu-item>
      <el-menu-item index="1"><a href="/identify/property" style="text-decoration: none;">风险识别</a></el-menu-item>
      <el-menu-item index="3"><a href="/record" style="text-decoration: none;">风险识别记录</a></el-menu-item>
      <el-menu-item index="4"><a href="/evarecord" style="text-decoration: none;">风险评估记录</a></el-menu-item>
      <el-menu-item index="5"><a href="/cal" style="text-decoration: none;">风险计算</a></el-menu-item>

    </el-menu>
    <div style="margin-left: 20%">
      <el-container style="margin-left: 28vw;cursor: pointer;">| 登录 / 注册</el-container>
    </div>
  </div>
</template>
<script>

export default {
  name: 'TopMenu',
  props: {
    active: String
  },
  data() {
    return {
      activeIndex: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    this.activeIndex = this.active
  }
}
</script>
<style>
.website-title {
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
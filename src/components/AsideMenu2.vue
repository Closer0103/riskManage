<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        style="height: 800px">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title"><a href="/" style="text-decoration: none;">资产评估</a></span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">威胁评估</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">脆弱性评估</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-umbrella"></i>
        <span slot="title">安全措施评估</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>

export default {
  name: 'AsideMenu',
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
<style scoped>

</style>
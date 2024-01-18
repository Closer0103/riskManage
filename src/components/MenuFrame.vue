

<template>
  <div>
    <el-container>
      <el-header>
        <TopMenu :active="topIndex"></TopMenu>
        <el-container>
          <el-aside v-if="this.isShowAside" width="200px">
            <AsideMenu :active="asideIndex"></AsideMenu>
          </el-aside>
          <el-aside v-if="this.isShowAside2" width="200px">
            <AsideMenu2 :active="asideIndex2"></AsideMenu2>
          </el-aside>
          <el-main>
            <div>
              <slot>
              </slot>
            </div>
          </el-main>
        </el-container>
      </el-header>
    </el-container>
  </div>

</template>
<script>
import AsideMenu from "@/components/AsideMenu.vue";
import TopMenu from "@/components/TopMenu.vue";
import AsideMenu2 from "@/components/AsideMenu2.vue";

export default {
  name: 'MenuFrame',
  props: {
    topIndex: String,
    asideIndex: String,
    isShowAside: Boolean,
    asideIndex2: String,
    isShowAside2: Boolean
  },
  components: {
    TopMenu,
    AsideMenu,
    AsideMenu2
  }
}
</script>
<style scoped>

</style>
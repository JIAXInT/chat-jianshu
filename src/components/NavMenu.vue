
<template>
  <div>
    <el-menu
      class="menu"
      mode="horizontal"
      background-color="#f5f7fa"
      text-color="#333"
      active-text-color="#ffd04b"
      :default-active="activeMenu"
      @select="handleMenuSelect"
      theme="light"
    >
      <el-menu-item index="frontend">前端</el-menu-item>
      <el-menu-item index="java">Java</el-menu-item>
      <el-menu-item index="python">Python</el-menu-item>
      <el-menu-item index="miniProgram">小程序</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { watch,ref } from "vue"
import { useRouter, useRoute } from 'vue-router';
import { ElMenu, ElMenuItem } from 'element-plus';

const router = useRouter();
const route = useRoute();
// const activeMenu = route.query.category || '';

//  监听 router.query.category 实时更新 activeMenu
const activeMenu = ref('');
watch(
  () => route.query.category,
  (val) => {
    activeMenu.value = val;
  }
);

const handleMenuSelect = (index) => {
  router.push({ path: '/', query: { category: index } });
};
</script>

<style scoped>
.menu {
  height: 50px;
  margin:  0 20px;
}
</style>
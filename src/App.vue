<script setup>
import { RouterLink, RouterView } from 'vue-router'
import  NavMenu  from "./components/NavMenu.vue"
import SearchInput from './components/SearchInput.vue';
import UserInfo from './components/UserInfo.vue';

</script>

<template>
  <div>
    <div class="navbar">
      <div class="navbar-left">
      <div class="logo">
        <RouterLink to="/home"><h1>Logo</h1></RouterLink>
      </div>
        <NavMenu class="nav-menu"/>
        <SearchInput></SearchInput>
        
      </div>
      <div class="navbar-right">
        <UserInfo></UserInfo>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f7fa;
  padding: 10px;
  border-bottom: solid 1px var(--el-menu-border-color);
}

.navbar-left {
  display: flex;
  align-items: center;
  width: 1090px;
}

.logo {
  font-weight: bold;
}

.logo a {
  text-decoration: none;
}
.nav-menu {
  display: flex;
  align-items: center;
}

.navbar-right {
  margin-right: 20px;
}

.login {
  color: #333;
  text-decoration: none;
}

.main {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 20px;
}

.container {
  width: 1000px;
}
</style>

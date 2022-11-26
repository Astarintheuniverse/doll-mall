
<template>
  <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="/Home"
      style="height: 100%;"
      :collapse="isCollapse"
      :collapse-transition="false"
      router

  >

    <el-menu-item index="/Home">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
<!--
    <el-menu-item :index="'/'+item.menuclick" v-for="(item,i) in menu" :key="i">
      <i :class="item.menuicon"></i>
      <span slot="title">{{item.menuname}}</span>
    </el-menu-item>-->
    <el-menu-item :index="'/'+item.menuclick" v-for="(item,i) in menu" :key="i">
      <i :class="item.menuicon"></i>
      <span slot="title">{{ item.menuname }}</span>
    </el-menu-item>
<!--    <el-menu-item index="/User">
      <i class="el-icon-user-solid"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>

    <el-menu-item index="/Goods">
      <i class="el-icon-office-building"></i>
      <span slot="title">商品仓库管理</span>
    </el-menu-item>

    <el-menu-item index="/4">
      <i class="el-icon-menu"></i>
      <span slot="title">商品分类管理</span>
    </el-menu-item>

    <el-menu-item index="/5">
      <i class="el-icon-setting"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>-->
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data(){
    return {
      //isCollapse:false
/*      menu:[
        {
          menuClick:'Admin',
          menuName:'管理员管理',
          menuIcon:'el-icon-s-custom'
        },{
          menuClick:'User',
          menuName:'用户管理',
          menuIcon:'el-icon-user-solid'
        }
      ]*/
    }
  },
  computed:{
    "menu":{
      get(){
        return this.$store.state.menu
      }
    }
  },
  props:{
    // eslint-disable-next-line vue/no-dupe-keys
    isCollapse:Boolean
  }
}
</script>

<style scoped>

</style>

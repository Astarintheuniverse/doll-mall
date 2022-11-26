<template>
<!--  导航侧栏-->
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside :width="aside_width" style="background-color: rgb(238, 241, 246);margin-left: -1px;margin-top: -1px;">
        <Aside :isCollapse="isCollapse"></Aside>
<!--      副主键里定义isCollapse-->
<!--      通过isCollapse传到aside接收子主键里-->
    </el-aside>


<!--导航首栏-->
    <el-container style="height: 100vh">
      <el-header style="text-align: right; font-size: 12px; border-bottom: #938383 1px solid;">
        <Header @doCollapse="doCollapse" :icon="icon"></Header>
<!--        通过Collapse-->
      </el-header>
<!--数据目-->
      <el-main style="height: 100vh">
<!--        <Main></Main>-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";
// import Main from "@/components/Main";

export default {
  name:"Index",
  components:{Header, Aside},
  data(){
    return{
      isCollapse:false,
      aside_width: '200px',
      icon:'el-icon-s-fold'
    }
  },
  methods:{
    //调用doCollapse
    doCollapse(){
      console.log(111)
      this.isCollapse =!this.isCollapse


      if(!this.isCollapse){//展开
        this.aside_width= '200px'
        this.icon='el-icon-s-fold'
      }else {//收齐
        this.aside_width= '64px'
        this.icon='el-icon-s-unfold'
      }
    }
  }

};

</script>

<style scoped>
.el-header {
  /*background-color: #B3C0D1;*/

  color: #333;
  line-height: 60px;
}
.el-main{
  padding: 5px;
}

.el-aside {
  color: #333;
}
</style>
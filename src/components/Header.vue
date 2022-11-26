<template>
  <div style="display: flex;line-height: 60px;">
    <div style="margin-top: 7px;">
      <i :class="icon" style="font-size: 23px; cursor: pointer" @click="collapse"></i>
    </div>
    <div style="flex: 1;text-align: center;font-size: 34px;">
      <span>欢迎来到刘杰购物商城仓库</span>
    </div>

  <el-dropdown>
    <span>{{ user.username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
      <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>

  </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return {
      user : JSON.parse(sessionStorage.getItem('CurUser'))
    }
  },
  props:{
    icon:String
  },
  methods:{
    toUser(){
      console.log('to_user')
    //  个人中心
     this.$router.push("/Home")
    },
    logout(){
      console.log('logout')
      this.$confirm('您确定要退出登录吗','提示',{
        confirmButtonText:'确定',
        type:'warning',
        center:true,//
      })
          .then(() => {
            this.$message({
              type:'success',
              message:'退出登录成功'
            })

            //配置退出登录的路由
           this.$router.push("/")
            //  清空sessionStorage的data数据
            sessionStorage.clear()
          })
          .catch(()=>{
            this.$message({
              type:'info',
              message:'已取消登录成功'
            })

      })

    },
    collapse(){
      this.$emit('doCollapse')
    }
  }
}
</script>

<style scoped>

</style>
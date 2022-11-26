<template>
    <div style="text-align: center;background-color: #f1f1f3;height: 100%;padding: 0px;margin: 0px;">
        <h1 style="font-size: 50px;">{{'欢迎你！'+user.username}}</h1>
        <el-descriptions  title="个人中心" :column="2" size="40" border>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-custom"></i>
                    账号
                </template>
                {{user.username}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    邮箱
                </template>
                {{user.useremail}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    性别
                </template>
                <el-tag
                        :type="user.usergender === '男' ? 'primary' : 'danger'"
                        disable-transitions><i :class="user.usergender== '男' ?'el-icon-male':'el-icon-female'">
                </i>{{user.usergender== '男' ?"男":"女"}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    角色
                </template>

                <el-tag
                        type="success"
                        disable-transitions>{{user.roles=='root'?"超级管理员":(user.roles=='merchant'?"商家":"用户")}}</el-tag>

            </el-descriptions-item>
        </el-descriptions>

        <DateUtils></DateUtils>
    </div>
</template>

<script>
    import DateUtils from "./DateUtils";
    export default {
        name: "Home",
        components: {DateUtils},
        data() {

            return {
                user:{}
            }
        },
        computed:{

        },
        methods:{
            init(){
                this.user = JSON.parse(sessionStorage.getItem('CurUser'))
            }
        },
        created(){
            this.init()
        }
    }
</script>

<style scoped>
    .el-descriptions{
        width:90%;

        margin: 0 auto;
        text-align: center;
    }
</style>
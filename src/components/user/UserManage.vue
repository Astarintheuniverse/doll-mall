<template>
  <div>
    <div style="margin-bottom: 5px;" align="center">
      <el-input v-model="username" placeholder="请输入账号" suffix-icon="el-icon-search" style="width: 200px;"
                @keyup.enter.native="loadPost"></el-input>
      <!--    搜所下拉框-->
      <el-select style="margin-left: 5px;" v-model="usergender" filterable placeholder="请选择性别">
        <el-option
            v-for="item in usergenders"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" style="margin-left: 5px;" @click="resetParam">重置</el-button>

      <el-button type="primary" style="margin-left: 5px; margin-right: 5px;" @click="add">新增</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{background:'#f3f6fd',color:'#555'}"
              border
    >
      <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
      <el-table-column prop="userid" label="userid" width="60">
      </el-table-column>
      <el-table-column prop="username" label="账号" width="120" align="center">
      </el-table-column>
      <el-table-column prop="headphoto"  label="头像" width="180" align="center">
        <template slot-scope="{row}">
          <img :src="row.headphoto" style="width: 180px;height: 130px" align="center">
        </template>
      </el-table-column>
      <el-table-column prop="userage" label="年龄" width="120" align="center">
      </el-table-column>
      <el-table-column prop="usergender" label="性别" width="150" align="center">
        <template #default="scope">
          <el-tag
              :type="scope.row.usergender === '男' ?'danger' :(scope.row.usergender === '男' ?'primary' :'success')"
              disable-transitions>{{scope.row.usergender === '男' ?'男'
              :(scope.row.usergender === '女' ?'女' :'不愿透露')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="角色" width="150" align="center">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.roles === 'root' ?'danger' :(scope.row.roles === 'root' ?'primary' :'success')"
              disable-transitions>{{scope.row.roles === 'root' ?'超级管理员'
              :(scope.row.roles === 'merchant' ?'管理员' :'用户')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="useremail" label="邮箱" width="180" align="center">
      </el-table-column>
      <el-table-column prop="operate" label="操作" align="center">
        <template  #default="scope">
          <!--      modify修改-->
          <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
          <!--      delete-->
          <el-popconfirm
              title="确定删除吗？"
              @confirm="del(scope.row.userid)"
              style="margin-left: 5px; "
          >
            <el-button slot="reference"  size="small" type="danger" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--    pagination分页-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 10, 20,30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <!--    Dialog对话框，新增的弹框-->
    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <!--      弹框的输入表单ref="form"映射form-->
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-col :span="20">
            <el-input v-model="form.username"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="userpassword">
          <el-col :span="20">
            <el-input v-model="form.userpassword"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" prop="userage">
          <el-date-picker
              v-model="userage"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
          <el-col :span="20">
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.usergender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="useremail">
          <el-col :span="20">
            <el-input v-model="form.useremail"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "UserManage",
  data() {
    //效验账号是否已存在
    let checkDuplicate =(rule,value,callback)=>{
      if(this.form.userid){
        return callback();
      }
      this.$axios.get(this.$httpUrl+"/user/findByUsername?username="+this.form.username).then(res=>res.data).then(res=>{
        if(res.code!=200){

          callback()
        }else{
          callback(new Error('账号已经存在'));
        }
      })
    };

    return {
      tableData: [],
      pageSize:10,//没页显示多少
      pageNum:1,//当前页
      total:0,     //有多少条数据
      username:'',
      userage:'',
      usergender: '',
      usergenders:[
        {
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }
      ],
      centerDialogVisible: false,
      form:{
        userid:'',
        username:'',
        userpassword:'',
        userage:'',
        useremail:'',
        usergender:'',
        roles:'user'
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {pattern:/^[a-zA-Z]\w{3,15}$/ , message:'你的账号不符合规则' , trigger: 'blur'},
          {validator:checkDuplicate,trigger: 'blur'}
        ],
        userpassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 7, max: 16, message: '长度在 7 到 16个字符', trigger: 'blur'}
        ],
        userage: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
          {min: 1, max: 13, message: '年龄必须为整数', trigger: 'blur'},
        ],
        useremail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 7, max: 25, message:'请输入正确的邮箱' , trigger: 'blur'},
          {pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message:'你的邮箱不符合规则' , trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    //表单的检查
    resetForm(){
      this.$refs.form.resetFields();
    },
    //删除
    del(userid){
      console.log(userid)

      this.$axios.get(this.$httpUrl+'/user/del?userid='+userid).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){

          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.loadPost()
        }else{
          this.$message({
            message: '删除失败！',
            type: 'error'
          });
        }

      })
    },
    mod(row){
      //异步处理表单
      this.centerDialogVisible = true
      this.$nextTick(()=> {
        console.log(row)
        //  赋值到表单
        this.form.userid = row.userid
        this.form.username = row.username
        this.form.userpassword = ''
        this.form.userage = row.userage + ''
        this.form.usergender = row.usergender + ''
        this.form.useremail = row.useremail
        this.form.roles = row.roles + ''

      })
    },
    add(){
      this.centerDialogVisible=true
      //异步处理先处理form标单
      // 验证表单信息是否符合规则
      this.$nextTick(()=>{
        this.resetForm();
      })
    },

    doSave(){
      this.$axios.post(this.$httpUrl+'/user/save',this.form).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.centerDialogVisible=false
          this.loadPost()
          this.resetForm()
        }else {
          this.$message({
            message: '添加失败',
            type: 'error'
          });
        }
      })
    },
    //doMod(save)在(this.$httpUrl+'/user/update'+‘user/save’,this.form)
    doMod(){
      this.$axios.post(this.$httpUrl+'/user/update',this.form).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.centerDialogVisible=false
          this.loadPost()
          this.resetForm()
        }else {
          this.$message({
            message: '编辑失败',
            type: 'error'
          });
        }
      })
    },
    save(){
      //点击确认验证表单是否符合规则
      this.$refs.form.validate((valid) => {
        if (valid) {//通过执行
          if(this.form.userid){
            this.doMod();
          }else{
            this.doSave();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum=1         //默认页面
      this.pageSize=val
      this.loadPost()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum=val
      this.loadPost()
    },
    loadGet(){
      //then(res=>res.data)限制data李的其他数据
      this.$axios.get(this.$httpUrl+'/user/list').then(res=>res.data).then(res=>{
        console.log(res)
      })
    },
    resetParam(){
      this.username=''
      this.usergender=''
    },
    //then(res=>res.data)限制data李的其他数据
    loadPost(){
      //配置分页的数据量，大小。将分页的数据传到各个页面
      this.$axios.post(this.$httpUrl+'/user/listPageC1',{
        pageSize:this.pageSize,
        pageNum:this.pageNum,
        param:{
          username:this.username,
          usergender:this.usergender,
          roles: 'user'
        }
      }).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.tableData=res.data
          this.total=res.total
        }else{
          alert('获取数据失败')
        }
      })
    }
  },
  beforeMount() {
    this.loadPost()
  }
}
</script>

<style scoped>

</style>
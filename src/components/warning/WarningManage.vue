<template>
  <div>
    <div style="margin-bottom: 5px;" align="center">
      <el-input v-model="warningid" placeholder="警告Id" suffix-icon="el-icon-search" style="width: 200px;"
                @keyup.enter.native="loadPost"></el-input>
      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>

      <el-button type="primary" style="margin-left: 5px;" @click="add">新增</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
              border
    >
      <el-table-column prop="warningid" label="警告id" width="160" align="center">
      </el-table-column>
      <el-table-column prop="warningname"  label="警告名字" width="160" align="center">
      </el-table-column>
      <el-table-column prop="warningdescribe"  label="警告描述" width="360" align="center">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
          <el-popconfirm
              title="确定删除吗？"
              @confirm="del(scope.row.warningid)"
              style="margin-left: 5px;"
          >
            <el-button slot="reference" size="small" type="danger" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <!--      弹框的输入表单ref="form"映射form-->
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="警告名称" prop="warningname">
          <el-col :span="20">
            <el-input v-model="form.warningname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="警告描述" prop="warningdescribe">
          <el-col :span="20">
            <el-input type="textarea" v-model="form.warningdescribe"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
    </el-dialog>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20,30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "WarningManage",
  data() {
    //效验id
    let checkDuplicate =(rule,value,callback)=>{
      if(this.form.warningid){
        return callback();
      }
      this.$axios.get(this.$httpUrl+"/warning/findByWarningid?warningid="+this.form.warningid).then(res=>res.data).then(res=>{
        if(res.code!=200){

          callback()
        }else{
          callback(new Error('账号已经存在'));
        }
      })
    };
    return {
      tableData: [],
      pageSize:10,
      pageNum:1,
      total:0,
      warningid:'',
      warningname:'',
      warningdescribe: '',
      centerDialogVisible:false,
      form:{
        warningid:'',
        warningname:'',
        warningdescribe: '',
      },
      rules: {
        warningname: [
          {required: true, message: '请输警告名称', trigger: 'blur'},
          {validator:checkDuplicate,trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    resetForm() {
      this.$refs.form.resetFields();
    },
    del(warningid){
      console.log(warningid)
      this.$axios.get(this.$httpUrl+'/warning/del?warningid='+warningid).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.loadPost()
        }else{
          this.$message({
            message: '操作失败！',
            type: 'error'
          });
        }

      })
    },
    mod(row){
      this.centerDialogVisible = true
      this.$nextTick(()=>{
        //赋值到表单
        this.form.warningid = row.warningid
        this.form.warningname = row.warningname
        this.form.warningdescribe = row.warningdescribe
      })
    },
    add(){
      this.centerDialogVisible = true
      this.$nextTick(()=>{
        this.resetForm()
        this.form.warningid = ''
        this.form.warningname = ''
        this.form.warningdescribe = ''
      })
    },
    doSave(){
      this.$axios.post(this.$httpUrl+'/warning/save',this.form).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.centerDialogVisible = false
          this.loadPost()
          this. resetForm()
        }else{
          this.$message({
            message: '操作失败！',
            type: 'error'
          });
        }

      })
    },
    doMod(){
      this.$axios.post(this.$httpUrl+'/warning/update',this.form).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){

          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.centerDialogVisible = false
          this.loadPost()
          this. resetForm()
        }else{
          this.$message({
            message: '操作失败！',
            type: 'error'
          });
        }

      })
    },
    save(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.form.warningid){
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
      this.pageNum=1
      this.pageSize=val
      this.loadPost()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum=val
      this.loadPost()
    },
    resetParam(){
      this.warningid=''
    },
    loadPost(){
      this.$axios.post(this.$httpUrl+'/warning/listPage',{
        pageSize:this.pageSize,
        pageNum:this.pageNum,
        param:{
          warningid:this.warningid,
          warningname:this.warningname,
          warningdescribe: this.warningdescribe
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
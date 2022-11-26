<template>
  <div>
    <div style="margin-bottom: 5px;" align="center">
      <el-input v-model="shopname" placeholder="请输商店名称" suffix-icon="el-icon-search" style="width: 200px;"
                @keyup.enter.native="loadPost"></el-input>
      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>

      <el-button type="primary" style="margin-left: 5px;" @click="add">新增</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
              border
    >
      <el-table-column prop="shopid" label="商品id" width="60" align="center">
      </el-table-column>
      <el-table-column prop="shopname" label="商店名称" width="180" align="center">
      </el-table-column>
      <el-table-column prop="shopphoto"  label="商店头像" width="180" align="center">
        <template slot-scope="{row}">
          <img :src="row.shopphoto" style="width: 180px;height: 130px" align="center">
        </template>
      </el-table-column>
      <el-table-column prop="shopdescribe"  label="商店描述" width="180" align="center">
      </el-table-column>
      <el-table-column prop="state"  label="商店状态" width="80" align="center">
      </el-table-column>
      <el-table-column prop="collectcontent"  label="商店收藏的人数" width="120" align="center">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
          <el-popconfirm
              title="确定删除吗？"
              @confirm="del(scope.row.shopid)"
              style="margin-left: 5px;"
          >
            <el-button slot="reference" size="small" type="danger" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20,30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>

      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="商店名称" prop="name">
          <el-col :span="20">
            <el-input v-model="form.shopname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商店描述" prop="shopdescribe">
          <el-col :span="20">
            <el-input type="textarea" v-model="form.shopdescribe"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.state">
            <el-radio label="wait">wait</el-radio>
            <el-radio label="gg">gg</el-radio>
          </el-radio-group>
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
  name: "ShopManage",
  data() {
    return {
      tableData: [],
      pageSize:10,
      pageNum:1,
      total:0,
      shopname:'',
      shopphoto:'',
      shopdescribe: '',
      collectcontent:'',
      state:'',
      centerDialogVisible:false,
      form:{
        shopname:'',
        shopdescribe: '',
        state:'',
      },
      rules: {
        shopname: [
          {required: true, message: '请输商店名', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    resetForm() {
      this.$refs.form.resetFields();
    },
    del(shopid){
      console.log(shopid)
      this.$axios.get(this.$httpUrl+'/shop/del?shopid='+shopid).then(res=>res.data).then(res=>{
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
        this.form.shopid = row.shopid
        this.form.shopname = row.shopname
        this.form.shopdescribe = row.shopdescribe
        this.form.state = row.state
      })
    },
    add(){

      this.centerDialogVisible = true
      this.$nextTick(()=>{
        this.resetForm()
      })

    },
    doSave(){
      this.$axios.post(this.$httpUrl+'/shop/save',this.form).then(res=>res.data).then(res=>{
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
      this.$axios.post(this.$httpUrl+'/shop/update',this.form).then(res=>res.data).then(res=>{
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
          if(this.form.shopid){
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
      this.shopname=''
    },
    loadPost(){
      this.$axios.post(this.$httpUrl+'/shop/listPage',{
        pageSize:this.pageSize,
        pageNum:this.pageNum,
        param:{
          shopname:this.shopname
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
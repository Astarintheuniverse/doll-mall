<template>
  <div>
    <div style="margin-bottom: 5px;">
      <el-input v-model="goodsid" placeholder="请输入商品id" suffix-icon="el-icon-search" style="width: 200px;"
                @keyup.enter.native="loadPost"></el-input>
      <el-select v-model="shop" placeholder="请选择仓库" style="margin-left: 5px;">
        <el-option
            v-for="item in shopData"
            :key="item.shopid"
            :label="item.shopname"
            :value="item.shopid">
        </el-option>
      </el-select>
      <el-select v-model="goodstype" placeholder="请选择分类" style="margin-left: 5px;">
        <el-option
            v-for="item in goodstypeData"
            :key="item.typeid"
            :label="item.typename"
            :value="item.typeid">
        </el-option>
      </el-select>

      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>

<!--
<el-button type="primary" style="margin-left: 5px;" @click="add" v-if="user.roles!='user'">新增</el-button>
-->
    </div>
    <el-table :data="tableData"
              :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
              border
              highlight-current-row
              @current-change="selectCurrentChange"
    >
      <el-table-column prop="goodsid" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120"
                       :formatter="formatDate"
      >
      </el-table-column>
      <el-table-column prop="goodsdescribe1" label="描述1" width="100">
      </el-table-column>
      <el-table-column prop="goodsdescribe2" label="描述2" width="100">
      </el-table-column>
      <el-table-column prop="goodsdescribe3" label="描述3" width="100">
      </el-table-column>
      <el-table-column prop="goodsdescribe4" label="描述4" width="100">
      </el-table-column>
      <el-table-column prop="goodsdescribe5" label="描述5" width="100">
      </el-table-column>
      <el-table-column prop="goodsprice"  label="价格" width="60" align="center">
      </el-table-column>
      <el-table-column prop="goodsphoto1"  label="商品图片" width="80" align="center">
        <template slot-scope="{row}">
          <img :src="row.goodsphoto1" style="width: 80px;height: 60px" align="center">
        </template>
      </el-table-column>
      <el-table-column prop="goodsphoto2"  label="商品图片" width="80" align="center">
        <template slot-scope="{row}">
          <img :src="row.goodsphoto2" style="width: 80px;height: 60px" align="center">
        </template>
      </el-table-column>
      <el-table-column prop="goodsPhoto3"  label="商品图片" width="80" align="center">
        <template slot-scope="{row}">
          <img :src="row.goodsphoto3" style="width: 80px;height: 60px" align="center">
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
<!--          <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>-->
          <el-popconfirm
              title="确定删除吗？"
              @confirm="del(scope.row.goodsid)"
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
        title="商品维护"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="商品名" prop="name">
          <el-col :span="20">
            <el-input v-model="form.shopname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品类型" prop="shop">
          <el-col :span="20">
            <el-select v-model="form.shop" placeholder="请选择仓库" style="margin-left: 5px;">
              <el-option
                  v-for="item in shopData"
                  :key="item.shopid"
                  :label="item.shopname"
                  :value="item.shopid">
              </el-option>
            </el-select>

          </el-col>
        </el-form-item>
        <el-form-item label="分类" prop="goodstype">
          <el-col :span="20">
            <el-select v-model="form.goodstype" placeholder="请选择分类" style="margin-left: 5px;">
              <el-option
                  v-for="item in goodstypeData"
                  :key="item.typeid"
                  :label="item.typename"
                  :value="item.typeid">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="描述1" prop="goodsdescribe1">
          <el-col :span="20">
            <el-input type="textarea" v-model="form.goodsdescribe1"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="描述2" prop="goodsdescribe2">
          <el-col :span="20">
            <el-input type="textarea" v-model="form.goodsdescribe2"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="描述3" prop="goodsdescribe3">
          <el-col :span="20">
            <el-input type="textarea" v-model="form.goodsdescribe3"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="描述4" prop="goodsdescribe4">
          <el-col :span="20">
            <el-input type="textarea" v-model="form.goodsdescribe4"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="描述5" prop="goodsdescribe5">
          <el-col :span="20">
            <el-input type="textarea" v-model="form.goodsdescribe5"></el-input>
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
  name: "GoodsManage",
  data() {
    return {
      user : JSON.parse(sessionStorage.getItem('CurUser')),
      shopData:[],
      goodstypeData:[],
      tableData: [],
      pageSize:10,
      pageNum:1,
      total:0,
      goodsid:'',
      shop:'',
      goodstype:'',
      centerDialogVisible:false,
      inDialogVisible:false,
      innerVisible:false,
      currentRow:{},
      tempUser:{},
      form:{
        id:'',
        name:'',
        goodstype:'',
        goodsdescribe1:'',
        goodsdescribe2:'',
        ggoodsdescribe3:'',
        goodsdescribe4:'',
        goodsdescribe5:''
      },
      rules: {
        goodstype:[
          {required: true, message: '请选择分类', trigger: 'blur'}
        ],
      }
    }
  },
  methods:{

    //时间戳转时间
    formatDate(row) {
      let date = new Date(parseInt(row.goodsname) * 1000);
      let Y = date.getFullYear() + '-';
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    selectCurrentChange(val) {
      this.currentRow = val;
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    del(goodsid){
      console.log(goodsid)
      this.$axios.get(this.$httpUrl+'/goods/del?goodsid='+goodsid).then(res=>res.data).then(res=>{
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
        this.form.id = row.id
        this.form.name = row.name
        this.form.goodstype = row.goodstype
        this.from.goodsdescribe1=row.goodsdescribe1
        this.from.goodsdescribe2=row.goodsdescribe2
        this.from.goodsdescribe3=row.goodsdescribe3
        this.from.goodsdescribe4=row.goodsdescribe4
        this.from.goodsdescribe5=row.goodsdescribe5
      })
    },
    add(){

      this.centerDialogVisible = true
      this.$nextTick(()=>{
        this.resetForm()
        this.form.goodsid = ''
      })

    },
    doSave(){
      this.$axios.post(this.$httpUrl+'/goods/save',this.form).then(res=>res.data).then(res=>{
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
      this.$axios.post(this.$httpUrl+'/goods/update',this.form).then(res=>res.data).then(res=>{
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
          if(this.form.goodsid){
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
      this.goodsid=''
      this.shop=''
      this.goodstype=''
    },
    loadPost(){
      this.$axios.post(this.$httpUrl+'/goods/listPage',{
        pageSize:this.pageSize,
        pageNum:this.pageNum,
        param:{
          goodsid:this.goodsid,
          goodstype:this.goodstype+'',
          shop:this.shop+''
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
    },
    loadShop(){
      this.$axios.get(this.$httpUrl+'/shop/list').then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.shopData=res.data
        }else{
          alert('获取数据失败')
        }

      })
    },
    loadGoodstype(){
      this.$axios.get(this.$httpUrl+'/goodstype/list').then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.goodstypeData=res.data
        }else{
          alert('获取数据失败')
        }

      })
    }
  },
  beforeMount() {
    this.loadShop()
    this.loadGoodstype()
    this.loadPost()

  }
}
</script>

<style scoped>

</style>
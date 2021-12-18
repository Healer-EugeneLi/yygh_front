<template>
  <div class="app-container">
    医院设置列表

    <!-- 查询 -->
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">
      <el-form-item label="医院名称">
        <el-input v-model="searchObj.hosname" placeholder="医院名称"></el-input>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 工具条 -->
    <div>
         <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>

    <el-table :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" width="50" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>

      <!-- 设置删除列 -->
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete"
                 @click="removeDataById(scope.row.id)"> 删除</el-button>

            <el-button v-if="scope.row.status==1" type="primary" size="mini" icon="el-icon-delete" 
                @click="lockHospSet(scope.row.id,0)">锁定 </el-button>

            <el-button v-if="scope.row.status==0" type="danger" size="mini" icon="el-icon-delete" 
                @click="lockHospSet(scope.row.id,1)">取消锁定 </el-button>
            <router-link :to="'/hospSet/edit/'+scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            </router-link>


        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0;  text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
//引入接口定义的js文件
import hospset from "@/api/hospSet";
export default {
  //定义变量和初始值
  data() {
    return {
      current: 1, //当前页
      limit: 3, //每页显示记录数
      searchObj: {}, //条件封装对象
      list: [], //每页数据集合
      total: 0, //总记录数
      multipleSelection:[]
    };
  },

  created() {
    //在页面渲染之前执行 一般调用methods定义的方法 得到数据
  
    this.getList();
  },

  methods: {
    //定义方法 请求接口调用

    //医院设置列表
    getList(page = 1) {
      this.current = page;
      //调api中的引入的文件的方法 传入参数
      hospset
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then((response) => {
          //请求成功response是接口返回数据 ,可以其他命名 ,一般写response

          this.list = response.data.records;
          this.total = response.data.total;
          console.log(response);
        }) //请求成功
        .catch((error) => {
          console.log(error);
        }); //请求失败
    },

    //删除医院设置的方法
    removeDataById(id) {
      //消息提示
      this.$confirm("此操作将永久删除该医院设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定执行
          hospset.deleteHospSet(id).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新页面
            this.getList(1);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //获取复选框的id值
    handleSelectionChange(selection){
        console.log(selection)
        this.multipleSelection=selection

    },

    //批量删除
    removeRows(){

        //消息提示
      this.$confirm("此操作将永久删除该医院设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          //确定执行
          var idList=[]
          //遍历数组得到每个id值 设置到idList里面去
          for(var i=0;i<this.multipleSelection.length;i++){
              var obj=this.multipleSelection[i]
              var id=obj.id
              idList.push(id)
          }

          hospset.batchHospSet(idList).then(response=>{
              this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新页面
            this.getList(1);

          })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });


    },
    //锁定和取消锁定
    lockHospSet(id,status){

        hospset.lockHospitalSet(id,status).then(response=>{
            this.getList()
        })
    },

    



  },
};
</script>
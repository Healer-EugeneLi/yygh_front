<template>
  <div class="app-container">
      <el-form label-width="120px">
         <el-form-item label="医院名称">
            <el-input v-model="hospitalSet.hosname"/>
          </el-form-item>
         <el-form-item label="医院编号">
            <el-input v-model="hospitalSet.hoscode"/>
         </el-form-item>
         <el-form-item label="api基础路径">
            <el-input v-model="hospitalSet.apiUrl"/>
         </el-form-item>
         <el-form-item label="联系人姓名">
            <el-input v-model="hospitalSet.contactsName"/>
         </el-form-item>
         <el-form-item label="联系人手机">
            <el-input v-model="hospitalSet.contactsPhone"/>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">保存</el-button>
         </el-form-item>
      </el-form>
   </div>

</template>

<script>

import hospset from '@/api/hospset'
export default {


    data(){

        return{
            hospitalSet:{}
        }
    },

    created(){
        //获取路由的id值
        //判断 如果路由中有参数 并且有id参数 也就是如果是修改的话 先进行数据的回显
         if(this.$route.params&&this.$route.params.id){
            const id=this.$route.params.id

            this.getHostSet(id)
        }

        
    },

    methods:{
        //添加
        save(){
            hospset.saveHospitalSet(this.hospitalSet).then(Response=>{
                //提示
                this.$message({
                    type: "success",
                    message: "添加成功!",
                })
                //跳转页面
                this.$router.push({path:'/hospSet/list'})
            })

        },
        //修改
        update(){
            hospset.updateHospSet(this.hospitalSet).then(Response=>{
                //提示
                this.$message({
                    type: "success",
                    message: "修改成功!",
                })
                //跳转页面
                this.$router.push({path:'/hospSet/list'})
            })

        },

        saveOrUpdate(){
            //判断添加还是修改
            if(!this.hospitalSet.id){
                //没有id说明是添加
                this.save()
            }else{
                this.update()
            }
            
        },

        
        //根据id获取
        getHostSet(id){

            hospset.getHospSet(id).then(response=>{
                this.hospitalSet=response.data
                //后端中直接在返回的包装类 将整个hospitalSet放进去  所以这边得到的话直接从data中进行获取
            })
        }
    
        
    },

   
}
</script>

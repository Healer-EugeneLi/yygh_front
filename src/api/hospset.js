import request from '@/utils/request'


export default{

    //医院设置列表
    getHospSetList(current,limit,searchObj){

        return  request({

            url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
            method: 'post',
            data: searchObj// 使用json

        })
    },

    //删除医院设置
    deleteHospSet(id){
        return  request({

            url: `/admin/hosp/hospitalSet/${id}`,
            method: 'delete',
        

        })
        
    },

    //批量删除
    batchHospSet(idList){
        return  request({

            url: `/admin/hosp/hospitalSet/batchRmove`,
            method: 'delete',
            data: idList// 使用json

        })

    },

    //锁定和取消锁定
    lockHospitalSet(id,status){

        return request({

            url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
            method: 'put',


        })

    },

    //添加医院设置
    saveHospitalSet(hospitalSet){
        return request({

            url: `/admin/hosp/hospitalSet/saveHospitalSet`,
            method: 'post',
            data:hospitalSet
        })

    },

    //根据id获取
    getHospSet(id){
        return request({

            url: `/admin/hosp/hospitalSet/getHospitalSet/${id}`,
            method: 'get',
        })

    },
    //修改
    updateHospSet(hospitalSet){
        return request({

            url: `/admin/hosp/hospitalSet/updateHospitalSet`,
            method: 'post',
            data:hospitalSet
        })

    }
}
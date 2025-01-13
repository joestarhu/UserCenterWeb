<template>
<q-card flat>
    <dmTbl flat :bordered="false" v-bind="tbl" @query="getList"></dmTbl>
</q-card>

</template>


<script setup lang="js">
import { useQuasar } from "quasar";
import { reactive, computed, onMounted} from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,showOptLabel,showOptColor } from "src/base/settings";
import { getTblList,apiGet} from "src/base/request";
import dmTbl from "src/components/dmTbl.vue";


const props = defineProps({
    id:{type:Number, Required:true},
})

const roleList = reactive({
    selectd:1,
    data:[]
})

const tbl = reactive({
    dmHeaderInput:{},
    dmHeaderBtn:[],
    dmRowBtn:[],
    columns:[
        DMTBL.col("role_name","权限标识"),
        DMTBL.col("role_id","权限名称"),
    ],
    rows:[],
})

function getList(pagination){
    let data = {
        app_id:props.id
    }
    
    // getTblList(pagination,tbl,"/app/role_list",data,
    //     null,
    //     (err)=>{
    //         msgNG({message:err.data.detail})
    //     }
    // )
}


function getRoleList(){
    let data = {
        app_id:props.id
    }

    apiGet("/app/role_list",data,
        (rsp)=>{
            if(rsp.data.code == 0){
                roleList.data = rsp.data.data
                roleList.selectd = rsp.data.data[0]["role_id"]
            }
        }
    )


}




onMounted(()=>{
    getRoleList()
})


</script>
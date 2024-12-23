<template>
<dmTbl flat :bordered="false" v-bind="tbl" @query="getList"></dmTbl>
</template>


<script setup lang="js">
import { useQuasar } from "quasar";
import { reactive, computed} from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,showOptLabel,showOptColor } from "src/base/settings";
import { getTblList} from "src/base/request";
import dmTbl from "src/components/dmTbl.vue";

const $q = useQuasar()
const props = defineProps({
    id:{type:Number, Required:true},
})


const tbl = reactive({
    dmHeaderInput:{},
    dmHeaderBtn:[],
    dmRowBtn:[],
    columns:[
        DMTBL.col("service_identify","权限标识"),
        DMTBL.col("service_name","权限名称"),
    ],
    rows:[],
})

function getList(pagination){
    let data = {
        app_id:props.id
    }
    
    getTblList(pagination,tbl,"/app/permission",data,
        null,
        (err)=>{
            $q.notify(msgNG({message:err.data.detail}))
        }
    )
}





</script>
<template>
<q-card flat>
    <HiTbl v-bind="tbl" @query="getList">
        <template #body-cell-service_name="props">
          <q-td :props="props" class="items-center">
            <span>{{ props.row.service_name }}</span>
            <br/>
            <span class="text-grey text-caption">{{ props.row.service_identify }}</span>
          </q-td>
        </template>

        <!-- <template #body-cell-is_enable="props">
            <q-td :props="props">
                <q-toggle flat checked-icon="check" unchecked-icon="clear" color="positive" v-model="props.row.is_enable"/>
          </q-td>
        </template> -->
    </HiTbl>
</q-card>


</template>


<script setup lang="js">
import { ref,reactive, computed, onMounted} from "vue";
import { HiTblObj,HiBtnObj,HiInputObj, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle,detailShow,detailID } from "src/base/settings";
import { getTblList,apiGet} from "src/base/request";
import HiTbl from "src/components/HiTbl.vue";


const props = defineProps({
    app_uuid:{type:String, Required:true},
})

const roleList = reactive({
    selectd:1,
    data:[]
})

let visibleColumns = ref(["service_name","is_enable"])

const tbl = reactive({
    headerInputs:{},
    headerBtns:[],
    rowBtns:[],
    columns:[
        HiTblObj.col("service_name","应用服务"),
        // DMTBL.col("service_identify","权限标识"),
        HiTblObj.col("is_enable","Status"),
    ],
    rows:[],
    pagination:{page:1,rowsNumner:0,rowsPerPage:0},
    "rows-per-page-options":[0],
    "hide-pagination":false,
    dense:true,
    bordered:false,
    // visibleColumns:visibleColaumns
})

function getList(pagination){
    let data = {
        app_uuid:props.app_uuid
    }

    apiGet("/app/service",data,
        (rsp)=>{
            tbl.rows=rsp.data.data
        },
        (err)=>{},
        null,
    )
    
    // getTblList(pagination,tbl,"/app/service",data,
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
    // getRoleList()
})


</script>
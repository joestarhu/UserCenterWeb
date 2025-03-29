<template>
<HiTbl v-bind="tbl" @query="getList">
    <template #body-cell-account_status="props">
        <q-td :props="props">
            <q-badge :color="showOptColor(props.row.account_status,ModelAccount.account_status.options)">
              {{ $t(showOptLabel(props.row.account_status,ModelAccount.account_status.options))}}
            </q-badge>
          </q-td>
        </template>
</HiTbl>

</template>

<script setup lang="js">
import { reactive } from 'vue';
import { HiTblObj,showOptColor,showOptLabel } from 'src/base/settings';
import { getTblList } from 'src/base/request';
import { ModelAccount } from 'src/base/model';
import HiTbl from 'src/components/HiTbl.vue';


const props = defineProps({
    org_uuid:{type:String,Required:true}
})


const tbl = reactive({
    bordered:false,
    headerInputs:{},
    headerBtns:[],
    rowBtns:[],
    columns:[
        HiTblObj.col("account",ModelAccount.account.i18nLabel,),
        HiTblObj.col("account_status",ModelAccount.account_status.i18nLabel,),
        // HiTblObj.col("nickname",ModelAccount.nickname.i18nLabel,),
        // HiTblObj.col("phone",ModelAccount.phone.i18nLabel,),
        // HiTblObj.col("created_at",ModelBase.created_at.i18nLabel),
        // HiTblObj.col("updated_at",ModelBase.updated_at.i18nLabel),

        // HiTblObj.btn("user_uuid"),
    ],
    rows:[],
})

function getList(pagination){
  let data = {
    org_uuid:props.org_uuid
  }

  getTblList(
    pagination,tbl,"/org/user_list",data,
    null,
    (err)=>{
      msgNG({message:err.data.detail})
    }
  )
}


</script>
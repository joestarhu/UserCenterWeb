<template>
      <dmTbl v-bind="tbl" @query="getList" @btnClick="btnClick">
        <template #body-cell-role_status="props">
        <q-td :props="props">
          <q-badge :color="showOptColor(props.row.role_status,ModelRole.role_status.options)">
            {{ $t(showOptLabel(props.row.role_status,ModelRole.role_status.options))}}
          </q-badge>
        </q-td>
      </template>
    </dmTbl>


  <!-- <dmManager title="msgPnlRoleList" :showDetail="detailPnl.show" @click="btnClick">
    <template #list>
      <dmTbl v-bind="tbl" @query="getList" @btnClick="btnClick">
        <template #body-cell-role_status="props">
        <q-td :props="props">
          <q-badge :color="showOptColor(props.row.role_status,ModelRole.role_status.options)">
            {{ $t(showOptLabel(props.row.role_status,ModelRole.role_status.options))}}
          </q-badge>
        </q-td>
      </template>
    </dmTbl>
    </template>
    <template #detail>
        <RoleDetail :role_id="detailPnl.id" @btnClick="btnClick"></RoleDetail>
    </template>
  </dmManager> -->

  <!-- <q-dialog persistent v-model="formPnl.show">
    <dmForm class="q-pa-md" title="msgPnlRoleCreate" :btnLoading="formPnl.loading" :formData="formData" @submit="btnClick"></dmForm>
  </q-dialog> -->
</template>

<script setup lang="js">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { reactive,computed } from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle,detailShow,detailID } from "src/base/settings";
import { apiPost, getTblList} from "src/base/request";
import { ModelBase,ModelRole } from "src/base/model";
import dmForm from "src/components/dmForm.vue";
import dmTbl from "src/components/dmTbl.vue";
import dmManager from "src/components/dmManager.vue"
import RoleDetail from "./RoleDetail.vue";

const {t} = useI18n();
const router = useRouter();

const emit = defineEmits(["close","btnClick"])
const props = defineProps({
    app_id:{type:String,Required:true}
})

const detailPnl = reactive({
  show:computed(()=>{return detailShow(router)}),
  id:computed(()=>{return detailID(router)}),
})

const formPnl = reactive({
  show:false,
  loading:false
})

const formData = reactive({
  role_name:  DMINPUT.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]}, ModelRole.role_name.i18nLabel,""),
  role_desc:  DMINPUT.text({type:"textarea"}, ModelRole.role_desc.i18nLabel,""),
  role_status:DMINPUT.select({...ModelRole.role_status},ModelRole.role_status.i18nLabel,0),  
})

const tbl = reactive({
    dmHeaderInput:{
        role_name:DMINPUT.textQuery(null,ModelRole.role_name.i18nLabel),
        role_status:DMINPUT.selectQuery({...ModelRole.role_status}, ModelRole.role_status.i18nLabel),
    },
    dmHeaderBtn:[DMBTN.create],
    dmRowBtn:[DMBTN.detail],
    columns:[
        DMTBL.col("role_name",ModelRole.role_name.i18nLabel),
        DMTBL.col("role_desc",ModelRole.role_desc.i18nLabel),
        DMTBL.col("created_at",ModelBase.created_at.i18nLabel),
        DMTBL.col("updated_at",ModelBase.updated_at.i18nLabel),
        DMTBL.col("role_status",ModelRole.role_status.i18nLabel),
        DMTBL.btn()
    ],
    rows:[]
})


function getList(pagination){
    let tblQuery = tbl.dmHeaderInput;
    let data = {
        app_id:props.app_id,
        role_name:tblQuery.role_name.value,
        role_status:tblQuery.role_status.value,
    }

    getTblList(
    pagination,tbl,"/role/list",data,
    null,
    (err)=>{
      msgNG({message:err.data.detail})
    }
  )
}


function initFormData(){
  formData.role_name.value=""
  formData.role_desc.value=""
  formData.role_status.value=0
}

function createRole(){
  let data = {
    role_name:formData.role_name.value,
    role_desc:formData.role_desc.value,
    role_status:formData.role_status.value
  }

  apiPost("/role/create",data,
    (rsp)=>{
      if(rsp.data.code == 0){
        msgOK({message:t("msgSucceed")})
        formPnl.show=false;
        getList(tbl.pagination);
      }else{
        let errmsg = msgErrLabel(rsp.data.code)
        msgNG({message:t(errmsg)})        
      }
    },
    (err)=>{

    },
    formPnl
  )
}

function btnClick(btnID,data=null){
  switch(btnID){
    case DMBTN.back.id:
      detailHandle(router);
      getList(tbl.pagination);
      break;
    case DMBTN.detail.id:
      detailHandle(router,data.row.id)
      break;
    case DMBTN.create.id:
      initFormData()
      formPnl.show=true
      break;
    case DMBTN.submit.id:
      createRole()
      break;
    default:
      break;
  }
}
</script>
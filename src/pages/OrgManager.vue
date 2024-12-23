<template>
<q-page padding>
    <dmTbl v-bind="tbl" @query="getList" @btnClick="btnClick">
        <template #body-cell-org_status="props">
        <q-td :props="props">
          <q-badge :color="showOptColor(props.row.org_status,ModelOrg.org_status.options)">
            {{ $t(showOptLabel(props.row.org_status,ModelOrg.org_status.options))}}
          </q-badge>
        </q-td>
      </template>
    </dmTbl>
</q-page>

<q-dialog persistent v-model="formPnl.show">
  <dmForm :formData="formData"></dmForm>
</q-dialog>
</template>


<script setup lang="js">
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,showOptLabel,showOptColor} from "src/base/settings";
import { getTblList} from "src/base/request";
import { ModelBase,ModelAccount,ModelOrg } from "src/base/model";
import dmTbl from "src/components/dmTbl.vue";
import dmForm from "src/components/dmForm.vue";

const q = useQuasar();
const {t} = useI18n();

const tbl = reactive({
    dmHeaderInput:{
        org_name:DMINPUT.textQuery(null,ModelOrg.org_name.i18nLabel),
        org_status:DMINPUT.selectQuery({...ModelOrg.org_status}, ModelOrg.org_status.i18nLabel),
    },
    dmHeaderBtn:[DMBTN.create],
    dmRowBtn:[DMBTN.detail],
    columns:[
        DMTBL.col("org_name",ModelOrg.org_name.i18nLabel),
        DMTBL.col("nickname",ModelOrg.org_owner.i18nLabel,),
        DMTBL.col("created_at",ModelBase.created_at.i18nLabel),
        DMTBL.col("updated_at",ModelBase.updated_at.i18nLabel),
        DMTBL.col("org_status",ModelOrg.org_status.i18nLabel),
        DMTBL.btn("org_uuid")
    ],
    rows:[],
})

const formPnl = reactive({
  show:false,
  loading:false,
})

const formData = reactive({
  // 组织owner
  org_name:DMINPUT.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]},ModelOrg.org_name.i18nLabel),
  org_owner:DMINPUT.selectFilter({rules: [val => val && val.toString().length > 0 || t("msgRequired")]},filter,ModelOrg.org_owner.i18nLabel),
  org_status:DMINPUT.select({...ModelOrg.org_status},ModelOrg.org_status.i18nLabel)
})


function initForm(){
  formData.org_name.value=""
  formData.org_owner.value=""
  formData.org_status.value = 0
}

function filter(val,update,abort,tag){
    update(()=>{
      formData.org_owner.qProps.options = [
            { label: "用户名", value: 0, caption:"你好呀|世界"},
            { label: "msgStatusDisable", value: 1,caption:"Hello|World"},
        ]
    })
}


function getList(pagination){
  let tblQuery = tbl.dmHeaderInput;
  let data = {
    org_name:tblQuery.org_name.value,
    org_status:tblQuery.org_status.value,
  }

  getTblList(
    pagination,tbl,"/org/list",data,
    null,
    (err)=>{
      msgNG(q,{message:err.data.detail})
    }
  )
}



function btnClick(btnID,data=null){
  switch(btnID){
    case DMBTN.create.id:
      initForm()
      formPnl.show=true
      break;
    default:
      break;
  }
}


</script>
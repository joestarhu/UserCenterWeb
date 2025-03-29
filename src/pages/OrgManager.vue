<template>
  <HiManager title="msgPnlOrgList" :showDetail="detailPnl.show" @click="btnClick">
    <template #list>
      <HiTbl v-bind="tbl" @query="getList" @btnClick="btnClick">
        <template #body-cell-org_status="props">
        <q-td :props="props">
          <q-badge :color="showOptColor(props.row.org_status,ModelOrg.org_status.options)">
            {{ $t(showOptLabel(props.row.org_status,ModelOrg.org_status.options))}}
          </q-badge>
        </q-td>
      </template>
    </HiTbl>
    </template>

    <template #detail>
      <q-card flat style="border-radius: 10px;" bordered>
        <q-tabs active-color="primary" class="text-grey" align="left" v-model="tabs.value"  narrow-indicator dense>
            <q-tab no-caps v-for="obj in tabs.lists" :key="obj" :name="obj.name" :label="$t(obj.name)" :ripple="false"  />
        </q-tabs>

        <q-tab-panels v-model="tabs.value">
          <q-tab-panel name="msgPnlOrgDetail">
            <OrgDetail :org_uuid="detailPnl.id"></OrgDetail>
          </q-tab-panel>
        <q-tab-panel name="msgPnlOrgUser">
          <OrgUserList :org_uuid="detailPnl.id"></OrgUserList>
        </q-tab-panel>
        <q-tab-panel name="msgPnlOrgApplication">
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    </template>
  </HiManager>

<q-dialog persistent v-model="formPnl.show">
  <HiForm :formData="formData" @submit="btnClick"></HiForm>
</q-dialog>
</template>


<script setup lang="js">
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { reactive,computed } from "vue";
import { HiTblObj,HiBtnObj,HiInputObj, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle,detailShow,detailID } from "src/base/settings";
import { apiGet, apiPost,getTblList} from "src/base/request";
import { ModelBase,ModelAccount,ModelOrg } from "src/base/model";
import HiManager from "src/components/HiManager.vue";
import HiTbl from "src/components/HiTbl.vue";
import HiForm from "src/components/HiForm.vue";
import OrgDetail from "./OrgDetail.vue";
import OrgUserList from "./OrgUserList.vue";

const q = useQuasar();
const {t} = useI18n();
const router = useRouter();

const detailPnl = reactive({
  show:computed(()=>{return detailShow(router)}),
  id:computed(()=>{return detailID(router)}),
})

const tabs = reactive({
  value:"msgPnlOrgDetail",
  lists:[
    {name:"msgPnlOrgDetail"},
    {name:"msgPnlOrgUser"},
    {name:"msgPnlOrgApplication"},
  ]
})

const tbl = reactive({
    headerInputs:{
        org_name:HiInputObj.textQuery(null,ModelOrg.org_name.i18nLabel),
        org_status:HiInputObj.selectQuery({...ModelOrg.org_status}, ModelOrg.org_status.i18nLabel),
    },
    headerBtns:[HiBtnObj.create],
    rowBtns:[HiBtnObj.detail],
    columns:[
        HiTblObj.col("org_name",ModelOrg.org_name.i18nLabel),
        HiTblObj.col("nickname",ModelOrg.org_owner.i18nLabel,),
        HiTblObj.col("created_at",ModelBase.created_at.i18nLabel),
        HiTblObj.col("updated_at",ModelBase.updated_at.i18nLabel),
        HiTblObj.col("org_status",ModelOrg.org_status.i18nLabel),
        HiTblObj.btn("org_uuid")
    ],
    rows:[],
})

const formPnl = reactive({
  show:false,
  loading:false,
})

const formData = reactive({
  // 组织owner
  org_name:HiInputObj.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]},ModelOrg.org_name.i18nLabel),
  org_owner:HiInputObj.selectFilter({rules: [val => val && val.toString().length > 0 || t("msgRequired")]},filter,ModelOrg.org_owner.i18nLabel),
  org_status:HiInputObj.select({...ModelOrg.org_status},ModelOrg.org_status.i18nLabel)
})


function initForm(){
  formData.org_name.value=""
  formData.org_owner.value=""
  formData.org_status.value = 0
}

function filter(val,update,abort,tag){
    update(()=>{
      getOwnerList(val)
    })
}


function getList(pagination){
  let tblQuery = tbl.headerInputs;
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


function getOwnerList(account){
  // 获取可选的组织所有者
  apiGet(
    "/org/owner_list", 
    {account:account},
    (rsp)=>{
      let rspData = rsp.data
      if(rspData.data.records){
        formData.org_owner.qProps.options = rspData.data.records.map(item=>({
          value:item.user_uuid,
          label: `${item.account}(${item.nickname})`
        }))
      }else{
        formData.org_owner.qProps.options = []
      }
    },
    (err)=>{
    },
    formData.org_owner.loading,
  )
}



function createData(formData){
  let data = {
    org_name:formData.org_name.value,
    org_owner_uuid:formData.org_owner.value,
    org_status:formData.org_status.value
  }

  apiPost("/org/create",data,
    (rsp)=>{
      if(rsp.data.code==0){
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
    case HiBtnObj.back.id:
      detailHandle(router);
      getList(tbl.pagination);
      break;
    case HiBtnObj.detail.id:
      detailHandle(router,data.row.org_uuid)
      break;
    case HiBtnObj.create.id:
      initForm()
      formPnl.show=true
      break;
    case HiBtnObj.submit.id:
      createData(data)
      break;
    default:
      break;
  }
}


</script>
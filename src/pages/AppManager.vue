<template>
<q-page padding>
  <dmManager title="msgPnlAppList" :showDetail="detailPnl.show" @click="btnClick">
    <template #list>
      <dmTbl v-bind="tbl" @query="getList" @btnClick="btnClick">
      </dmTbl>
    </template>
    <template #detail>
      <q-card flat style="border-radius: 10px;" bordered>
        <q-tabs active-color="primary" class="text-grey" align="left" v-model="tabs.value">
            <q-tab no-caps v-for="obj in tabs.lists" :key="obj" :name="obj.name" :label="$t(obj.name)"  />
        </q-tabs>
        <q-separator></q-separator>

        <q-tab-panels v-model="tabs.value">
          <q-tab-panel name="msgPnlAppBasicInfo">
            {{detailPnl.id}}
          </q-tab-panel>
        <q-tab-panel name="msgPnlAppRole">
          未实现
        </q-tab-panel>
        <q-tab-panel name="msgPnlAppPermission">
          <AppPermission :id="detailPnl.id"></AppPermission>
        </q-tab-panel>
      </q-tab-panels>
  </q-card>
    </template>
  </dmManager>
</q-page>    
</template>


<script setup lang="js">
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { reactive, computed} from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,showOptLabel,showOptColor,detailShow,detailID} from "src/base/settings";
import { getTblList} from "src/base/request";
import { ModelBase,ModelApp } from "src/base/model";
import dmTbl from "src/components/dmTbl.vue";
import dmManager from "src/components/dmManager.vue"
import AppPermission from "./AppPermission.vue";

const q = useQuasar();
const router = useRouter()

const detailPnl = reactive({
  show:computed(()=>{return detailShow(router)}),
  id:computed(()=>{return detailID(router)}),
})

const tbl = reactive({
    dmHeaderInput:{
        app_name:DMINPUT.textQuery(null,ModelApp.app_name.i18nLabel),
    },
    dmHeaderBtn:[],
    dmRowBtn:[DMBTN.detail],
    columns:[
        DMTBL.col("app_name",ModelApp.app_name.i18nLabel),
        DMTBL.col("app_desc",ModelApp.app_desc.i18nLabel,),
        DMTBL.col("created_at",ModelBase.created_at.i18nLabel),
        DMTBL.col("updated_at",ModelBase.updated_at.i18nLabel),
        DMTBL.btn(),
    ],
    rows:[],
})


const tabs = reactive({
  value:"msgPnlAppBasicInfo",
  lists:[
    {name:"msgPnlAppBasicInfo"},
    {name:"msgPnlAppRole"},
    {name:"msgPnlAppPermission"},
  ]
})

function getList(pagination){
  let tblQuery = tbl.dmHeaderInput;
  let data = {
    app_name:tblQuery.app_name.value,
  }

  getTblList(
    pagination,tbl,"/app/list",data,
    null,
    (err)=>{
      msgNG(q,{message:err.data.detail})
    }
  )
}

function btnClick(btnID, props=null){
  switch(btnID){
    case DMBTN.back.id:
      const query = {...router.currentRoute.value.query}
      delete query.id
      router.replace({
        query:query
     })
      break;
    case DMBTN.detail.id:
      tabs.value = "msgPnlAppBasicInfo"
      router.replace({
        query:{
            ...router.currentRoute.value.query,
            "id":props.row.id
        }
     })
      break;
    default:
      break;
  }
}
</script>
<template>

<q-table 
    v-bind="props" 
    v-model:pagination="pagination"
    style="border-radius: 10px;"
    :pagination="pagination"
    :rows-per-page-label="$t('msgRecordPerPage')"
    :rows-per-page-options="ConfigDict.rowsPerPageOptions"
    flat
    bordered
    @request="onRequest"
    >
    <!-- 读取状态 -->
    <template v-slot:loading>
        <q-inner-loading showing color="primary" />
        <!-- <q-tr class="row q-ma-md">
            <q-th v-for="n in 5" :key="n" class="col">
                <q-skeleton animation="blink" type="rect" class="full-width"/>
            </q-th>
        </q-tr>
        <q-tr v-for="n in 10" :key="n" class="row q-ma-md">
            <q-td v-for="n in 5" :key="n" class="col">
                <q-skeleton animation="blink" type="rect" class="full-width"/>
            </q-td>
        </q-tr> -->
    </template>

    <!-- 无数据 -->
    <template v-slot:no-data>
        <div class="full-width row flex-center q-gutter-sm text-bold">
            <q-icon size="2rem" name="info" color="accent"/>
            <span>{{ $t(dmNoDataLabel) }}</span>
        </div>
    </template>

    <!-- 头部搜索和按钮栏位 -->
    <template v-if="showHeader" v-slot:top>
        <div class="col row q-col-gutter-xs">
            <dmInput v-for="obj in dmHeaderInput" :key="obj" 
                :qProps="obj.qProps" 
                :i18nLabel="obj.i18nLabel" 
                :dmType="obj.dmType" 
                :dmAppend="obj.dmAppend"  
                v-model="obj.value" @update:model-value="onRequest(null)">
            </dmInput>
        </div>
        <div class="col-inline reverse q-gutter-xs">
            <q-btn v-for="obj in dmHeaderBtn" :key="obj.id" :color="obj.color" :icon="obj.icon" dense @click="btnClick(obj.id, props)">
                <q-tooltip>
                    {{ $t(obj.label) }}
                </q-tooltip>
            </q-btn>
        </div>
    </template>


    <!-- header的中英文处理 -->
    <template #header="props">
        <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
                <span v-if="col.i18nLabel">{{ $t(col.i18nLabel) }}</span>
                <span v-else>{{ col.label }}</span>
            </q-th>
        </q-tr>
    </template>

    <!--特殊行操作栏:button -->
    <template #body-cell-btns="props">
        <q-td :props="props" class="q-gutter-xs">
            <q-btn flat v-for="obj in dmRowBtn" :key="obj" :icon="obj.icon" :color="obj.color" dense @click="btnClick(obj.id,props)">
                <q-tooltip>
                    {{ $t(obj.label) }}
                </q-tooltip>
            </q-btn>
        </q-td>
    </template>

    <!-- q-table控件的slot body-cell -->
     <template #body-cell="props">
        <slot :name="`body-cell-${props.col.name}`" v-bind="props">
            <q-td :props="props">
                <span>{{ props.value }}</span>
            </q-td>
        </slot>
     </template>
</q-table>
</template>

<script setup lang="js">
import { computed,reactive,onMounted } from "vue";
import { ConfigDict } from "src/base/settings";
import dmInput from "src/components/dmInput.vue";

const emit = defineEmits(["btnClick","query"])
const props = defineProps({
    dmRowBtn:{default:[]},
    dmHeaderBtn:{default:[]},
    dmHeaderInput:{default:[]},
    dmNoDataLabel:{default:"msgNoData"},
})
const pagination = reactive({page:1, rowsNumber:0, rowsPerPage:10});


const showHeader = computed(()=>{
    return Object.keys(props.dmHeaderBtn).length + Object.keys(props.dmHeaderInput).length
})


function btnClick(id,data){
    emit("btnClick", id, data)
}

function onRequest(data){
    if(data){
        pagination.page = data.pagination.page;
        if(pagination.rowsPerPage != data.pagination.rowsPerPage){
            // localStorage.setItem(DMSETTINGS.pageSize, data.pagination.rowsPerPage)
            pagination.rowsPerPage = data.pagination.rowsPerPage
        }
    }
    emit("query",pagination);
}


onMounted(()=>{
    emit("query",pagination);
})

</script>
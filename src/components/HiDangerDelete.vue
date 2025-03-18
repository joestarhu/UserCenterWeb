<template>
    <HiForm :title="title" :btnLoading="btnLoading" @submit="dangerDelete">
        <span>{{$t("msgPleaseInput")}}<span class="text-primary text-bold text-h6">{{ confirmMessage }}</span>{{ $t("msgContinueOperation") }}</span> 
        <HiInput :qProps="confrim.qProps" v-model="confrim.value"></HiInput>
    </HiForm>
</template>

<script setup lang="js">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { HiBtnObj } from 'src/base/settings';
import HiForm from './HiForm.vue';
import HiInput from './HiInput.vue';


const {t} = useI18n()
const emit = defineEmits(["submit"])
const props = defineProps({
    title:{type:String, default:"msgAction"},
    confirmMessage:{type:String, default:"delete"},
    btnLoading: {type: Boolean,default: false},
})

const confrim = reactive({
    qProps:{rules: [vaildCheck],dense:true},
    value:""
})

function vaildCheck(){
    if(confrim.value.toString() === props.confirmMessage){
        return true
    }else{
        return t("msgPleaseInput")+props.confirmMessage
    }
}

function dangerDelete(){
    emit("submit",HiBtnObj.submit.id,null)
}

</script>
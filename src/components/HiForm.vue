<template>
    <q-card class="card-pnl">
        <!-- 表单标题 -->
        <q-card-section class="row items-center q-px-md q-pt-md q-pb-none">
            <div class="col ellipsis">
                <span class="text-h6">{{ $t(title) }}</span>
            </div>
            <div class="col row reverse">
                <q-btn icon="close" flat dense v-close-popup></q-btn>
            </div>
        </q-card-section>
        
        <q-form @submit.prevent="submit"> 
            <!-- 表单正文 -->
            <q-card-section>
                <slot>
                    <HiInput v-for="obj in formData" :key="obj"
                    v-bind="obj"
                    @filter="(val,update,abort)=>obj.filterFn(val,update,abort,obj.qProps)"
                    v-model="obj.value">
                    </HiInput>
                </slot>
            </q-card-section>

            <!-- 表单按钮 -->
             <q-card-section class="row q-pt-none">
                <div class="col">
                    <slot name="left_btn"></slot>
                </div>
                <div class="col row reverse q-gutter-sm">
                    <slot name="right_btn">
                        <q-btn no-caps color="primary" type="submit" :loading="btnLoading">{{ $t(btnSubmiti18nLabel) }}</q-btn>
                        <q-btn no-caps flat v-close-popup>{{ $t(btnCanceli18nLabel) }}</q-btn>
                    </slot>
                </div>
             </q-card-section>
        </q-form>
    </q-card>
</template>

<script setup lang="js">
import { HiBtnObj } from 'src/base/settings';
import HiInput from './HiInput.vue';

const emit = defineEmits(["submit"])
const props = defineProps({
    title:{type:String, default:"msgAction"},
    btnSubmiti18nLabel:{type: String,default: "msgSubmit"},
    btnCanceli18nLabel:{type: String,default: "msgCancel"},
    btnLoading: {type: Boolean,default: false},
    formData:{type:Object,default:null},
})


function submit(){
    emit("submit",HiBtnObj.submit.id, props.formData)
}
</script>

<style>
.card-pnl {
    min-width: 500px;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 10px;
}
</style>
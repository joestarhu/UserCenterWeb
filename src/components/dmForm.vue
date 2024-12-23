<template>
<q-card class="card-pnl">
    <q-card-section class="row items-center q-px-md q-pt-md q-pb-none">
        <div class="col ellipsis">
            <span class="text-h6">{{ $t(title) }}</span>
        </div>
        <div class="col row reverse">
            <q-btn icon="close" flat dense v-close-popup />
        </div>
    </q-card-section>

    <q-form @submit.prevent="submit">
        <q-card-section>
            <slot>
                <dmInput v-for="obj in formData" :key="obj"
                    :qProps="obj.qProps"
                    :i18nLabel="obj.i18nLabel"
                    :dmType="obj.dmType"
                    :dmAppend="obj.dmAppend"
                    v-model="obj.value">
                </dmInput>
            </slot>
        </q-card-section>

        <q-card-section class="row q-pt-none">
            <div class="col">
                <slot name="left_btn"></slot>
            </div>
            <div class="col row reverse q-gutter-sm">
                <slot name="right_btn">
                    <q-btn no-caps color="primary" type="submit" :loading="btnLoading">{{ $t(btnSubmitLabel) }}</q-btn>
                    <q-btn no-caps flat v-close-popup>{{ $t(btnCancelLabel) }}</q-btn>
                </slot>
            </div>
        </q-card-section>
    </q-form>
</q-card>
</template>


<script setup lang="js">
import { DMBTN} from "src/base/settings";
import dmInput from './dmInput.vue';
const emit = defineEmits(["submit"]);
const props = defineProps({
    title:{type:String, default:"msgAction"},
    btnSubmitLabel:{type: String,default: "msgSubmit"},
    btnCancelLabel:{type: String,default: "msgCancel"},
    btnLoading: {type: Boolean,default: false},
    formData:{type:Object,default:null},
})

function submit(){
    emit("submit",DMBTN.submit.id,props.formData)
}
</script>

<style scoped>
.card-pnl {
    min-width: 500px;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 10px;
}
</style>
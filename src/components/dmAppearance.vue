<template>
<q-btn :icon="icon" flat dense>
    <q-menu transition-show="jump-down" transition-hide="jump-up">
        <q-list dense>
            <q-item clickable v-close-popup v-for="obj in options" :key="obj" @click="appearanceChange(obj)" :active="Dark.mode == obj.value">
                <q-item-section avatar>
                    <q-icon :name="obj.icon" />
                </q-item-section>
                <q-item-section>
                    <span>{{ $t(obj.label) }}</span>
                </q-item-section>
            </q-item>
        </q-list>
    </q-menu>
</q-btn>
</template>

<script setup lang="js">
import { Dark } from 'quasar';
import { ConfigDict } from 'src/base/settings';
import { ref } from 'vue';

const options = [
    { label: "msgModeLight", value: false, icon: "light_mode" },
    { label: "msgModeDark", value: true, icon: "dark_mode" },
    { label: "msgModeAuto", value: "auto", icon: "devices" },
];

const icon = ref(get_icon());

function get_icon(){
    let result = options[0].icon;

    for(let one of options){
        if(one.value === Dark.mode){
            result = one.icon
            break
        }
    }

    return result
}

function appearanceChange(obj){
    // 客户端持久化模式
    localStorage.setItem(ConfigDict.appearance, obj.value)
    // 模式切换
    Dark.set(obj.value)
    icon.value = obj.icon
}


</script>
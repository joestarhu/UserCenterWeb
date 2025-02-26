<template>
    <q-btn :icon="icon" flat dense>
        <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list dense>
                <q-item clickable v-close-popup v-for="obj in options" :key="obj" :active="Dark.mode === obj.value"
                    @click="appearanceChange(obj)" active-class="text-weight-bolder">
                    <q-item-section avatar>
                        <q-icon :name="obj.icon" />
                    </q-item-section>
                    <q-item-section>
                        <span>{{ $t(obj.i18nLabel) }}</span>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script setup lang="js">
import { Dark } from 'quasar'
import { ref } from 'vue'
import { ConfigDict } from 'src/base/settings'

const options = [
    { i18nLabel: "msgModeLight", value: false, icon: "light_mode" },
    { i18nLabel: "msgModeDark", value: true, icon: "dark_mode" },
    { i18nLabel: "msgModeAuto", value: "auto", icon: "devices" },
]

let icon = ref(get_icon())

function get_icon() {
    let icon_val = options[0].icon;

    for (let option of options) {
        if (option.value === Dark.mode) {
            icon_val = option.icon
            break
        }
    }
    return icon_val
}


function appearanceChange(obj) {
    // 客户端持久化模式    
    localStorage.setItem(ConfigDict.appearance, obj.value)
    // 模式切换
    Dark.set(obj.value)
    icon.value = obj.icon
}
</script>
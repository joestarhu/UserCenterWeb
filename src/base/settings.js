// 全局定义
import { reactive } from 'vue';
import i18n from "src/i18n";

const ConfigDict = {
    // jwt
    jwt: "jwt",
    // 本地化语言
    locale: "user-locale",
    // 外观颜色
    appearance: "auto",
    // 默认分页大小
    pageSize: 10,
    // 分页的选项
    rowsPerPageOptions: [10, 20, 30, 50],
    // 防抖默认时间,毫秒
    debounce: 500,

    // dmInput的Append相关参数
    dmInputAppendRequired: 0,
    dmInputAppendQuery: 1,
    dmInputStyle: { width: "15rem" }
}

// 控件:按钮定义
const DMBTN = {
    create: { id: 0, label: "msgCreate", color: "primary", icon: "add" },
    update: { id: 1, label: "msgUpdate", color: "primary", icon: "edit" },
    delete: { id: 2, label: "msgDelete", color: "primary", icon: "delete" },
}


function showOptLabel(value, opts) {
    for (let obj of opts) {
        if (obj.value === value) {
            return obj.i18nLabel || obj.label;
        }
    }
    return ""
}


function setTblCol(field, i18nLabel, options = null, name = null, align = "left") {
    let format = (val) => { return val };
    if (!name) {
        name = field;
    }
    return { field: field, name: name, i18nLabel: i18nLabel, align: align, format: format }

}

// 控件:表格定义
const DMTBL = {
    col: setTblCol,
    btn: (filed = "id", i18nLabel = "msgAction", align = "right") => {
        return setTblCol(filed, i18nLabel, null, "btns", align)
    },
}

// 控件:输入
const DMINPUT = {
    // 普通输入
    text: (qProps, i18nLabel = null, value = null) => {
        let params = { outlined: true, "lazy-rules": true, hint: "", dense: true, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "text" })
    },
    // 必需输入
    textRequired: (qProps, i18nLabel = null, value = null) => {
        let params = { outlined: true, "lazy-rules": true, hint: "", dense: true, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "text", dmAppend: ConfigDict.dmInputAppendRequired })
    },
    // 查询输入
    textQuery: (qProps, i18nLabel = null, value = null) => {
        let params = { debounce: ConfigDict.debounce, dense: true, outlined: true, clearable: true, style: ConfigDict.dmInputStyle, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "text", dmAppend: ConfigDict.dmInputAppendQuery })
    },

    // 选择查询
    selectQuery: (qProps, i18nLabel = null, value = null) => {
        let params = { dense: true, clearable: true, style: ConfigDict.dmInputStyle, outlined: true, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "select" })
    },

}

// 消息通知相关
const MSG_BASE_OPTS = { timeout: 3000, position: "top", progress: true };
const MSG_OK_OPTS = { ...MSG_BASE_OPTS, type: "positive" };
const MSG_NG_OPTS = { ...MSG_BASE_OPTS, type: "negative" };
const MSG_INFO_OPTS = { ...MSG_BASE_OPTS, type: "info" };

function msgOK(opts) {
    return { ...MSG_OK_OPTS, ...opts };
}

function msgNG(opts) {
    return { ...MSG_NG_OPTS, ...opts };
}

function msgInfo(opts) {
    return { ...MSG_INFO_OPTS, ...opts };
}










export { ConfigDict, DMBTN, DMTBL, DMINPUT, showOptLabel, msgOK, msgNG, msgInfo }
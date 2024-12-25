// 全局定义
import { reactive } from 'vue';
import { Notify } from "quasar";

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
    back: { id: 3, label: "msgBack", color: "primary", icon: "arrow_back" },
    detail: { id: 4, label: "msgDetail", color: "primary", icon: "feed" },
    submit: { id: 5, label: "msgSubmit", color: "primary", icon: "check" },
}


// 控件:dmManager的detail处理函数
function detailHandle(router, id = null) {
    const query = { ...router.currentRoute.value.query }
    if (id == null) {
        delete query.id
    } else {
        query.id = id
    }

    router.replace({
        query: query
    })
}

function detailShow(router) {
    return router.currentRoute.value.query.id ? true : false
}

function detailID(router) {
    return router.currentRoute.value.query.id ? router.currentRoute.value.query.id : ""
}


// 控件 options的取值
function getOpt(value, opts) {
    for (let obj of opts) {
        if (obj.value === value) {
            return obj
        }
    }
    return null
}

// 控件 options的取值,color
function showOptColor(value, opts) {
    let obj = getOpt(value, opts)
    if (obj) {
        return obj.color
    } else {
        return null
    }
}

// 控件 options的取值,label
function showOptLabel(value, opts) {
    let obj = getOpt(value, opts)

    if (obj) {
        return obj.i18nLabel || obj.label;
    } else {
        return ""
    }
}

// 控件:表格列函数
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
        let params = { outlined: true, "lazy-rules": true, hint: "", clearable: true, dense: true, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "text" })
    },
    // 必需输入
    textRequired: (qProps, i18nLabel = null, value = null) => {
        let params = { outlined: true, "lazy-rules": true, hint: "", dense: true, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "text", dmAppend: ConfigDict.dmInputAppendRequired })
    },
    // 查询输入
    textQuery: (qProps, i18nLabel = null, value = null) => {
        let params = { outlined: true, debounce: ConfigDict.debounce, clearable: true, style: ConfigDict.dmInputStyle, dense: true, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "text", dmAppend: ConfigDict.dmInputAppendQuery })
    },

    // 选择输入
    select: (qProps, i18nLabel = null, value = null) => {
        let params = { outlined: true, "lazy-rules": true, hint: '', dense: true, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "select" })
    },

    // 选择查询
    selectQuery: (qProps, i18nLabel = null, value = null) => {
        let params = { outlined: true, clearable: true, style: ConfigDict.dmInputStyle, dense: true, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "select" })
    },

    // 选择查询(有筛选)
    selectFilter: (qProps, filterFn, i18nLabel = null, value = null) => {
        let params = { outlined: true, "lazy-rules": true, hint: '', dense: true, ...qProps }
        // let params = { outlined: true, clearable: true, style: ConfigDict.dmInputStyle, dense: true, ...qProps }
        return reactive({ qProps: params, value: value, i18nLabel: i18nLabel, dmType: "selectFilter", filterFn: filterFn })
    },



}

// 消息通知相关
const MSG_BASE_OPTS = { timeout: 3000, position: "top", progress: true };
const MSG_OK_OPTS = { ...MSG_BASE_OPTS, type: "positive", timeout: 1000 };
const MSG_NG_OPTS = { ...MSG_BASE_OPTS, type: "negative" };
const MSG_INFO_OPTS = { ...MSG_BASE_OPTS, type: "info" };


function msgErrLabel(errcode) {
    return "msgErrCode_" + errcode
}

function msgOK(opts) {
    let obj = { ...MSG_OK_OPTS, ...opts }
    Notify.create(obj)
}

function msgNG(opts) {
    let obj = { ...MSG_NG_OPTS, ...opts };
    Notify.create(obj)
}

function msgInfo(opts) {
    let obj = { ...MSG_INFO_OPTS, ...opts };
    Notify.create(obj)
}


export {
    ConfigDict, DMBTN, DMTBL, DMINPUT,
    getOpt, showOptColor, showOptLabel,
    msgOK, msgNG, msgInfo, msgErrLabel,
    detailHandle, detailShow, detailID
}
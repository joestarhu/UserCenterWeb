
// 基础数据
const ModelBase = {
    created_at: { i18nLabel: "msgCreatedAt" },
    updated_at: { i18nLabel: "msgUpdatedAt" }
}

// 账号信息
const ModelAccount = {
    account: { i18nLabel: "msgAccount" },
    nickname: { i18nLabel: "msgNickname" },
    phone: { i18nLabel: "msgPhone" },
    user_status: { i18nLabel: "msgStatus", options: [{ i18nLabel: "msgStatusEnable", value: 0 }, { i18nLabel: "msgStatusDisable", value: 1 }] },
}


export {
    ModelBase,
    ModelAccount,
}
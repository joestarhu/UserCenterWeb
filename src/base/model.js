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
    user_status: {
        i18nLabel: "msgStatus",
        options: [
            { i18nLabel: "msgStatusEnable", value: 0, color: "positive" },
            { i18nLabel: "msgStatusDisable", value: 1, color: "negative" }
        ]
    },
}

// 组织信息
const ModelOrg = {
    org_name: { i18nLabel: "msgOrgName" },
    org_owner: { i18nLabel: "msgOrgOwner" },
    org_status: {
        i18nLabel: "msgStatus",
        options: [
            { i18nLabel: "msgStatusEnable", value: 0, color: "positive" },
            { i18nLabel: "msgStatusDisable", value: 1, color: "negative" },
        ]
    },
}

// 角色信息
const ModelRole = {
    role_name: { i18nLabel: "msgRoleName" },
    role_desc: { i18nLabel: "msgRoleDesc" },
    role_status: {
        i18nLabel: "msgStatus",
        options: [
            { i18nLabel: "msgStatusEnable", value: 0, color: "positive" },
            { i18nLabel: "msgStatusDisable", value: 1, color: "negative" },
        ]
    }
}

// 应用信息
const ModelApp = {
    app_name: { i18nLabel: "msgAppName" },
    app_desc: { i18nLabel: "msgAppDesc" },
}


// 组织用户信息
const ModelOrgUser = {
    org_user_status: {
        i18nLabel: "msgStatus",
        options: [
            { i18nLabel: "msgStatusEnable", value: 0, color: "positive" },
            { i18nLabel: "msgStatusDisable", value: 1, color: "negative" },
        ]
    }
}



export {
    ModelBase,
    ModelAccount,
    ModelOrg,
    ModelRole,
    ModelApp,
    ModelOrgUser,
}
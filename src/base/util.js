const MSG_BASE_OPTS = { timeout: 3000, position: "top", progress: true };
const MSG_OK_OPTS = { ...MSG_BASE_OPTS, type: "positive" };
const MSG_NG_OPTS = { ...MSG_BASE_OPTS, type: "negative" };
const MSG_INFO_OPTS = { ...MSG_BASE_OPTS, type: "secondary" };


function msg_ok(opts) {
    return { ...MSG_OK_OPTS, ...opts };
}

function msg_ng(opts) {
    return { ...MSG_NG_OPTS, ...opts };
}




export { msg_ok, msg_ng }
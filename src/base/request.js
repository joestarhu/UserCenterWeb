import { api } from "src/boot/axios";


async function http_req(url, data, callbackFn, callbackErrFn, ctrl, method) {
    let rsp = null;

    if (ctrl) {
        ctrl.loading = true;
    }

    try {
        if (method === "get") {
            rsp = await api.get(url, { params: data });
        } else {
            rsp = await api.post(url, data);
        }

        if (callbackFn) {
            callbackFn(rsp)
        }
    } catch (err) {
        // 异常内容待实现
        if (callbackErrFn) {
            callbackErrFn(rsp)
        }
    }

    if (ctrl) {
        ctrl.loading = false;
    }
}



async function api_post(url, data, callbackFn, callbackErrFn, ctrl) {
    await http_req(url, data, callbackFn, callbackErrFn, ctrl, "post")
}

async function api_get(url, data, callbackFn, callbackErrFn, ctrl) {
    await http_req(url, data, callbackFn, callbackErrFn, ctrl, "get")
}


export { api_post, api_get }
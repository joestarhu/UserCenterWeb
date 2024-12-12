import { api } from "src/boot/axios";


async function httpReq(url, data, callbackFn, callbackErrFn, ctrl, method) {
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
            callbackErrFn(err.response)
        }
    }

    if (ctrl) {
        ctrl.loading = false;
    }
}

async function apiPost(url, data, callbackFn, callbackErrFn, ctrl) {
    await httpReq(url, data, callbackFn, callbackErrFn, ctrl, "post")
}

async function apiGet(url, data, callbackFn, callbackErrFn, ctrl) {
    await httpReq(url, data, callbackFn, callbackErrFn, ctrl, "get")
}


function getTblList(pagination, tbl, url, data, callbackFn = null, callbackErrFn = null) {
    if (!tbl.pagination) {
        tbl.pagination = pagination
    }

    data = { ...data, page_idx: pagination.page, page_size: pagination.rowsPerPage }

    apiGet(url, data,
        (rsp) => {
            let rspData = rsp.data;
            if (rspData.code == 0) {
                // 空数据用"-"来代替
                rspData.data.records.map(obj => {
                    Object.keys(obj).forEach(key => {
                        if (obj[key] === "") {
                            obj[key] = "-";
                        }
                    })
                })
                tbl.rows = rspData.data.records;
                pagination.rowsNumber = rspData.data.pagination.total;
            }

            if (callbackFn) {
                callbackErrFn(rspData)
            }
        },
        (err) => {
            if (callbackErrFn) {
                callbackErrFn(err)
            }
        },
        tbl
    )
}




export { apiPost, apiGet, getTblList }
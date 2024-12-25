import { api } from "src/boot/axios";


async function httpReq(url, data, callbackFn, callbackErrFn, ctrl, method) {
    let rsp = null;

    if (ctrl) {
        ctrl.loading = true;
    }

    try {
        switch(method){
            case "get":
                rsp = await api.get(url, { params: data });
                break;
            case "post":
                rsp = await api.post(url, data);
                break;
            default:
                // 未实现Http请求的方法
                break;
        }

        if (callbackFn) {
            callbackFn(rsp)
        }
    } catch (err) {
        console.log(err)
        // 异常情况,发出请求,有返回
        if (err.response) {
            // 异常内容待实现
            if (callbackErrFn) {
                callbackErrFn(err.response)
            }
        } else if (err.request) {
            // 请求发出,无返回
            console.log(err.request)
            console.log(err.code)
        } else {
            // 请求未发出
            console.log("Request Not Success")
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
                tbl.dmNoDataLabel = "msgNoData"
            }

            if (callbackFn) {
                callbackErrFn(rspData)
            }
        },
        (err) => {
            switch (err.status) {
                case 403:
                    tbl.dmNoDataLabel = "msgPermissionDenied"
                    break;
                default:
                    if (callbackErrFn) {
                        callbackErrFn(err)
                    }
                    break;
            }
        },
        tbl
    )
}




export { apiPost, apiGet, getTblList }
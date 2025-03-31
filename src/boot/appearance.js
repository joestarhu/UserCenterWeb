import { Dark } from "quasar"
import { defineBoot } from '#q-app/wrappers'
import { ConfigDict } from "src/base/settings"

export default defineBoot(()=>{
    const appearance = localStorage.getItem(ConfigDict.appearance) || "auto"

    switch(appearance){
        case "auto":
        case "true":
        case "false":
            Dark.set(appearance);
            break;
        default:
            Dark.set("auto");
            break;
    }

})
import { Dark } from "quasar"
import { boot } from "quasar/wrappers"
import { ConfigDict } from "src/base/settings"


export default boot(({ app }) => {
    const appearance = localStorage.getItem(
        ConfigDict.appearance
    ) || "auto";

    switch (appearance) {
        case "auto":
            Dark.set(appearance);
            break;
        case "true":
            Dark.set(true);
            break;
        case "false":
            Dark.set(false);
            break;
        default:
            // should not be here
            Dark.set("auto");
            break;

    }

})
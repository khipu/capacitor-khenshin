import {registerPlugin} from "@capacitor/core";
import type {CapacitorKhenshinPlugin} from "./definitions";

const CapacitorKhenshin = registerPlugin<CapacitorKhenshinPlugin>(
    "CapacitorKhenshin",
    {
        web: () => import("./web").then((m) => new m.CapacitorKhenshinWeb()),
    }
);

export * from "./definitions";
export {CapacitorKhenshin};

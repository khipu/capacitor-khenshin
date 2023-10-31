import { registerPlugin } from "@capacitor/core";
const CapacitorKhenshin = registerPlugin("CapacitorKhenshin", {
    web: () => import("./web").then((m) => new m.CapacitorKhenshinWeb()),
});
export * from "./definitions";
export { CapacitorKhenshin };
//# sourceMappingURL=index.js.map
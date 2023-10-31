import { WebPlugin } from "@capacitor/core";
import type { CapacitorKhenshinPlugin } from "./definitions";
import { PaymentOptions } from "./definitions";
export declare class CapacitorKhenshinWeb extends WebPlugin implements CapacitorKhenshinPlugin {
    private static KWS_SCRIPT_ID;
    private static KHIPU_WEB_ROOT;
    private static KWS_TIMEOUT;
    private khipu;
    constructor();
    startPaymentById(paymentOptions: PaymentOptions): Promise<any>;
    addKws(): void;
    addKhipuWebRoot(): void;
    ensureKhipuIsSet(): Promise<any>;
    startKhipu(paymentId: string): Promise<any>;
}

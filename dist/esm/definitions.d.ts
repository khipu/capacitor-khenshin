export interface CapacitorKhenshinPlugin {
    startPaymentById(options: PaymentOptions): Promise<any>;
}
export interface PaymentOptions {
    paymentId: string;
}
export declare type StartPaymentIdOptions = PaymentOptions;

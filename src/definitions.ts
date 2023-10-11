export interface CapacitorKhenshinPlugin {
    startPaymentById(options: PaymentOptions): Promise<any>;
}

export interface PaymentOptions {
    paymentId: string;
}

export type StartPaymentIdOptions = PaymentOptions;

import {WebPlugin} from "@capacitor/core";
import type {CapacitorKhenshinPlugin} from "./definitions";
import {PaymentOptions} from "./definitions";

export class CapacitorKhenshinWeb
    extends WebPlugin
    implements CapacitorKhenshinPlugin {

    private static KWS_SCRIPT_ID = 'kws_script_id';
    private static KHIPU_WEB_ROOT: 'khipu-web-root';
    private static KWS_TIMEOUT: 10_000


    private khipu: any;

    constructor() {
        super();
        this.addKws();
        this.addKhipuWebRoot();
    }

    async startPaymentById(paymentOptions: PaymentOptions): Promise<any> {
        this.addKws();
        this.addKhipuWebRoot();
        await this.ensureKhipuIsSet();
        return this.startKhipu(paymentOptions.paymentId);
    }

    addKws(): void {
        if (!document.getElementById(CapacitorKhenshinWeb.KWS_SCRIPT_ID)) {
            let script = document.createElement('script');
            script.id = CapacitorKhenshinWeb.KWS_SCRIPT_ID;
            script.type = 'text/javascript';
            script.src = 'https://js.khipu.com/v1/kws.js';
            document.head.appendChild(script);
        }
    }

    addKhipuWebRoot(): void {
        if (!document.getElementById(CapacitorKhenshinWeb.KHIPU_WEB_ROOT)) {
            let div = document.createElement('div');
            div.id = CapacitorKhenshinWeb.KHIPU_WEB_ROOT;
            document.body.appendChild(div);
        }
    }

    ensureKhipuIsSet() {
        var start = Date.now();
        return new Promise(waitForKhipu); // set the promise object within the ensureFooIsSet object
        function waitForKhipu(resolve: (arg0: any) => void, reject: (arg0: Error) => void) {
            // @ts-ignore
            if (typeof Khipu !== 'undefined') {
                // @ts-ignore
                resolve(Khipu);
            } else if (CapacitorKhenshinWeb.KWS_TIMEOUT && (Date.now() - start) >= CapacitorKhenshinWeb.KWS_TIMEOUT)
                reject(new Error("timeout waiting for kws to inject Khipu"));
            else {
                setTimeout(() => {
                    waitForKhipu(resolve, reject)
                }, 50);
            }
        }
    }

    async startKhipu(paymentId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            this.khipu = new Khipu();
            const options = {
                mountElement: document.getElementById(CapacitorKhenshinWeb.KHIPU_WEB_ROOT), //Elemento ancla
                modal: true, //false si se quiere embebido
                modalOptions: {
                    maxWidth: 450,
                    maxHeight: 750,
                },
                options: {
                    style: {
                        primaryColor: '#8347AD',
                        fontFamily: 'Roboto',
                    },
                    skipExitPage: true, //true si se quiere que Khipu no pinte las páginas finales
                },
            }
            this.khipu.init(options, (successResult: any) => {
                resolve({result: 'OK', extra: successResult});
            }, (warningResult: any) => {
                resolve({result: 'OK', extra: warningResult});
            }, (failureResult: any) => {
                resolve({result: 'FAIL', extra: failureResult});
            });
            this.khipu.start(paymentId);
        })
    }
}

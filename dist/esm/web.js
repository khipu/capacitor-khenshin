import { WebPlugin } from "@capacitor/core";
export class CapacitorKhenshinWeb extends WebPlugin {
    constructor() {
        super();
        this.addKws();
        this.addKhipuWebRoot();
    }
    async startPaymentById(paymentOptions) {
        this.addKws();
        this.addKhipuWebRoot();
        await this.ensureKhipuIsSet();
        return this.startKhipu(paymentOptions.paymentId);
    }
    addKws() {
        if (!document.getElementById(CapacitorKhenshinWeb.KWS_SCRIPT_ID)) {
            let script = document.createElement('script');
            script.id = CapacitorKhenshinWeb.KWS_SCRIPT_ID;
            script.type = 'text/javascript';
            script.src = 'https://js.khipu.com/v1/kws.js';
            document.head.appendChild(script);
        }
    }
    addKhipuWebRoot() {
        if (!document.getElementById(CapacitorKhenshinWeb.KHIPU_WEB_ROOT)) {
            let div = document.createElement('div');
            div.id = CapacitorKhenshinWeb.KHIPU_WEB_ROOT;
            document.body.appendChild(div);
        }
    }
    ensureKhipuIsSet() {
        var start = Date.now();
        return new Promise(waitForKhipu); // set the promise object within the ensureFooIsSet object
        function waitForKhipu(resolve, reject) {
            // @ts-ignore
            if (typeof Khipu !== 'undefined') {
                // @ts-ignore
                resolve(Khipu);
            }
            else if (CapacitorKhenshinWeb.KWS_TIMEOUT && (Date.now() - start) >= CapacitorKhenshinWeb.KWS_TIMEOUT)
                reject(new Error("timeout waiting for kws to inject Khipu"));
            else {
                setTimeout(() => {
                    waitForKhipu(resolve, reject);
                }, 50);
            }
        }
    }
    async startKhipu(paymentId) {
        return new Promise((resolve) => {
            // @ts-ignore
            this.khipu = new Khipu();
            const options = {
                mountElement: document.getElementById(CapacitorKhenshinWeb.KHIPU_WEB_ROOT),
                modal: true,
                modalOptions: {
                    maxWidth: 450,
                    maxHeight: 750,
                },
                options: {
                    style: {
                        primaryColor: '#8347AD',
                        fontFamily: 'Roboto',
                    },
                    skipExitPage: true,
                },
            };
            this.khipu.init(options, (successResult) => {
                resolve({ result: 'OK', extra: successResult });
            }, (warningResult) => {
                resolve({ result: 'OK', extra: warningResult });
            }, (failureResult) => {
                resolve({ result: 'FAIL', extra: failureResult });
            });
            this.khipu.start(paymentId);
        });
    }
}
CapacitorKhenshinWeb.KWS_SCRIPT_ID = 'kws_script_id';
//# sourceMappingURL=web.js.map
import Foundation
import Capacitor
import khenshin

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorKhenshinPlugin)
public class CapacitorKhenshinPlugin: CAPPlugin {


    override public func load() {
        KhenshinInterface.initWithBuilderBlock {(builder: KhenshinBuilder?) -> Void in
            builder?.apiUrl = "https://khipu.com/app/enc/"
            builder?.keepCookies = false
            builder?.allowCredentialsSaving = true
            builder?.mainButtonStyle = Int(KHMainButtonFatOnForm.rawValue)
            builder?.hideWebAddressInformationInForm = true
            builder?.principalColor = UIColor(red: 121/255.0, green: 134/255.0, blue: 203/255.0, alpha: 1)
            builder?.darkerPrincipalColor = UIColor(red: 121/255.0, green: 134/255.0, blue: 203/255.0, alpha: 1)
            builder?.secondaryColor = UIColor(red: 183/255.0, green: 36/255.0, blue: 51/255.0, alpha: 1)
            builder?.continueButtonTextTintColor = UIColor.white
            builder?.navigationBarTextTint = UIColor.black
            builder?.barTintColor = UIColor(red: 249/255.0, green: 249/255.0, blue: 249/255.0, alpha: 1)

            var processHeader = Bundle.main.loadNibNamed("CustomPaymentProcessHeader", owner: nil, options: nil)?.first
            if (processHeader != nil) {
                builder?.processHeader = processHeader as! (any UIView & ProcessHeader)
            }
        }
    }

    /**
     * Read a file from the filesystem.
     */
    @objc func startPaymentById(_ call: CAPPluginCall) {
        guard let paymentId = call.getString("paymentId") else {
            handleError(call, "paymentId must be provided and must be a string.")
            return
        }


        KhenshinInterface.startEngine(withPaymentExternalId: paymentId, userIdentifier: "", isExternalPayment: true, success: { (exitURL: URL?) in
            NSLog("SUCCESS")
            call.resolve([
                        "result": "OK",
                        "extra": ["exitURL": exitURL?.absoluteString]
                    ])
        }, failure: { (exitURL: URL?) in
            NSLog("FAILURE")
            call.resolve([
                        "result": "FAIL",
                        "extra": ["exitURL": exitURL?.absoluteString]
                    ])
        }, animated: false)

    }

    private func handleError(_ call: CAPPluginCall, _ message: String, _ error: Error? = nil) {
        call.reject(message, nil, error)
    }

}

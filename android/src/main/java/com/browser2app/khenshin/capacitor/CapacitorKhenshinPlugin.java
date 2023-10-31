package com.browser2app.khenshin.capacitor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.browser2app.khenshin.Khenshin;
import com.browser2app.khenshin.KhenshinConstants;

import android.content.Intent;
import android.util.Log;

import static android.app.Activity.RESULT_OK;

import androidx.activity.result.ActivityResult;

@CapacitorPlugin(name = "CapacitorKhenshin")
public class CapacitorKhenshinPlugin extends Plugin {

    private static String TAG = CapacitorKhenshinPlugin.class.getName();

    @Override
    public void load() {
        Khenshin.KhenshinBuilder builder = new Khenshin.KhenshinBuilder();
        builder.setAllowCredentialsSaving(true);
        builder.setAPIUrl("https://khipu.com/app/enc/");
        builder.setAutomatonTimeout(90);
        builder.setClearCookiesBeforeStart(true);
        builder.setDecimalSeparator('.');
        builder.setGroupingSeparator(',');
        builder.setSkipExitPage(false);
        builder.setApplication(getActivity().getApplication());
        builder.setDebug(false);
        builder.setFontResourceId(R.font.nunitosans);
        builder.setMainButtonStyle(Khenshin.CONTINUE_BUTTON_IN_FORM);
        builder.setHideWebAddressInformationInForm(true);
        builder.build();
    }

    @PluginMethod
    public void startPaymentById(PluginCall call) {
        String paymentId = call.getString("paymentId");
        if (paymentId == null) {
            call.reject("Must provide paymentId");
            return;
        }
        Intent intent = Khenshin.getInstance().getStartTaskIntent();
        intent.putExtra(KhenshinConstants.EXTRA_PAYMENT_ID, paymentId);
        intent.putExtra(KhenshinConstants.EXTRA_FORCE_UPDATE_PAYMENT, true);
        intent.putExtra("EXTRA_EXTERNAL_PAYMENT", false);
        intent.putExtra("EXTRA_IGNORE_RETURN_URL", true);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivityForResult(call, intent, "paymentResult");
    }

    @ActivityCallback
    private void paymentResult(PluginCall call, ActivityResult result) {
        if (call == null) {
            return;
        }
        Log.d(TAG, "resultCode: " + result.getResultCode());
        Log.d(TAG, "data: " + result.getData());
        JSObject ret = new JSObject();
        ret.put("result", result.getResultCode() == -1 ? "OK" : "FAIL");
        ret.put("extra", result.getData().toString());
        call.resolve(ret);
    }
}

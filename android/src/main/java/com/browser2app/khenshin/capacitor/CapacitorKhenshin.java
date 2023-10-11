package com.browser2app.khenshin.capacitor;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.view.Gravity;

public class CapacitorKhenshin {

    private static final int GRAVITY_TOP = Gravity.TOP | Gravity.CENTER_HORIZONTAL;
    private static final int GRAVITY_CENTER = Gravity.CENTER_VERTICAL | Gravity.CENTER_HORIZONTAL;


    public static void startPaymentById(Context c, String paymentId) {
        new Handler(Looper.getMainLooper())
            .post(
                () -> {
                    android.widget.Toast toast = android.widget.Toast.makeText(c, paymentId, android.widget.Toast.LENGTH_LONG);
                    toast.show();
                }
            );
    }

}

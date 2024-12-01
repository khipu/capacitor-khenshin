# Capacitor plugin for Khenshin

:warning: **Deprecated**: please use the new and improved [capacitor-khipu plugin](https://www.npmjs.com/package/capacitor-khipu)! :warning:


> To better customize the integration we encourage you to clone this repo and use the documentation for [Java](https://github.com/khipu/khipu-inside-demo/blob/master/authorize-payment-java.md), [Kotlin](https://github.com/khipu/khipu-inside-demo/blob/master/authorize-payment-kotlin.md), [ObjC](https://github.com/khipu/khipu-inside-demo/blob/master/authorize-payment-objc.md) and [Swift](https://github.com/khipu/khipu-inside-demo/blob/master/authorize-payment-swift.md)

In particular, we encourage you to customize the files `android/src/main/res/values/colors.xml` and `android/src/main/res/layouts/*.xml` for android and `ios/Plugin/CapacitorKhenshinPlugin.swift` and `ios/Plugin/views/*` for iOS.


## Create an ionic app (in this sample we will use a react app, but the similar can be accomplished using angular or vue)

    ionic start

## Add iOS and Android support

    ionic capacitor add ios
    ionic capacitor add android

## Add the library to your project

    yarn add https://github.com/khipu/capacitor-khenshin

or

    npm add https://github.com/khipu/capacitor-khenshin


## iOS development in arm machines (m1 or m2)

Khenshin uses some dependencies that are not compiled for the arm architecture so to run it in an Apple Silicon machine please exclude the arm64 for the simulator.

You can do that by editing the ios/App/Podfile file and make sure the post_install trigger has the following actions.


```
post_install do |installer|
  assertDeploymentTarget(installer)
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = "arm64"
    end
  end
end
```

## Android

For Android to be able to locate the khenshin aar you need to add the maven repository of khenshin to the allproyects section of the android/build.gradle file.

Something like:

```
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://dev.khipu.com/nexus/content/repositories/khenshin' }
    }
}
```

Note that google() and mavenCentral() repos are usually already added.


## Usage

Inside a view import the capacitor-khenshin module

```typescript
import {CapacitorKhenshin} from 'capacitor-khenshin';
```
    

Then you can call khenshin using a [paymentId generated with the Khipu API](https://github.com/khipu/khipu-inside-demo#creaci%C3%B3n-de-la-solicitud-de-pago-en-el-servidor-del-cobrador) 

```typescript
const paymentResult = await CapacitorKhenshin.startPaymentById({paymentId: '<paymentId>'});
console.log(paymentResult);
```

The `startPaymentById` promise will return after the payment is completed

The `paymentResult` object will contain a `result` field with values `OK` or `FAIL`. If the result is `FAIL` then the payment failed for sure. If the result is `OK` then you have to wait for the [instant notification](https://github.com/khipu/khipu-inside-demo#recepci%C3%B3n-de-la-notificaci%C3%B3n-de-conciliaci%C3%B3n-en-el-servidor-del-cobrador) to finish the process.

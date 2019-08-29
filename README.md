# BLE Crowd Monitor

Bluetooth and Bluetooth Low Energy (BLE) are wireless standards for connected devices that enable quick and convenient communication over short distances. BLE is optimized for reduced energy usage and BLE an effective tool for internet of things development where power consumption can be a major limiting factor. The ESP32 module, available in lots of different development boards, supports WiFi, Bluetooth Low Energy, and Bluetooth Classic.

This project uses the ESP32’s BLE to scan for advertising BLE devices and the ESP32’s WiFi to publish the mac address of the advertising devices to PubNub. Then it uses serverless PubNub Functions to keep a realtime count of the number of advertising devices and displays the count in a React Native app.

<a href="https://www.pubnub.com/blog/build-bluetooth-low-energy-arduino-crowd-monitor-scanner-esp32-p1" target="_blank" rel="noopener"><img class="alignright" src="https://www.pubnub.com/blog/wp-content/uploads/2019/08/7-2-9.gif" alt="Realtime Stream App" width="416" height="699" /></a>

## What is PubNub?

PubNub’s primary product is a [realtime publish/subscribe messaging API](https://www.pubnub.com/products/realtime-messaging/) built on a [global Data Stream Network](https://www.pubnub.com/products/global-data-stream-network/). Messages sent with PubNub are delivered in under 0.25 seconds and PubNub supports over [70 SDKs](https://www.pubnub.com/docs). PubNub provides the secure, scalable, and reliable infrastructure to power any realtime application.

<a href="https://www.pubnub.com/blog/build-bluetooth-low-energy-arduino-crowd-monitor-scanner-esp32-p1" target="_blank" rel="noopener noreferrer"><img class="alignright" src="https://www.pubnub.com/blog/wp-content/uploads/2019/08/di.png" alt="ESP32 BLE Scanner" width="510" height="340" /></a>

## Build Your Own BLE Crowd Monitor

Want to learn more about this project or build a clone from scratch? [Check out the tutorial](https://www.pubnub.com/blog/build-bluetooth-low-energy-arduino-crowd-monitor-scanner-esp32-p1).

<a href="https://www.pubnub.com/blog/build-bluetooth-low-energy-arduino-crowd-monitor-scanner-esp32-p1">
    <img alt="PubNub Blog" src="https://i.imgur.com/aJ927CO.png" width=260 height=98/>
</a>

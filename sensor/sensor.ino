// PubNub Crowd Monitor example using ESP32.

// WiFi.
#include <WiFi.h>
unsigned long checkWiFi = 0;
// WiFi Config.
const char* ssid = "YOUR_SSID";
const char* password =  "YOUR_PASSWORD";

// MQTT.
#include <PubSubClient.h>
WiFiClient Client;
PubSubClient client(Client);
unsigned long checkMQTT = 0;
// MQTT Config.
const char* mqttServer = "mqtt.pndsn.com";
const int mqttPort = 1883;
const char* clientID = "YOUR_PUB_KEY_HERE/YOUR_SUB_KEY_HERE/CLIENT_ID";
const char* channelName = "advertised_devices";

// Bluetooth.
#include <BLEDevice.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
int scanTime = 10;
BLEScan* pBLEScan;

// Send advertised devices to PubNub.
class AdvertisedDevices: public BLEAdvertisedDeviceCallbacks {
  void onResult(BLEAdvertisedDevice advertisedDevice) {
    // Check the current connection status.
    if (WiFi.status() == WL_CONNECTED) {
      if (client.connected()) {
        // Publish mac address to PubNub.
        client.publish(channelName,advertisedDevice.getAddress().toString().c_str());
      }
    }
  }
};

void setup() {
  // Configure BLE scan.
  BLEDevice::init("");
  pBLEScan = BLEDevice::getScan();
  pBLEScan->setAdvertisedDeviceCallbacks(new AdvertisedDevices());
  pBLEScan->setActiveScan(true);
  pBLEScan->setInterval(100);
  pBLEScan->setWindow(99);
  // Connect to WiFi.
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
  // Set PubNub MQTT server.
  client.setServer(mqttServer, mqttPort); 
}

void loop() {
  // Check WiFi and reconnect.
  if ((WiFi.status() != WL_CONNECTED) && (millis() > checkWiFi)) {
    WiFi.disconnect();
    WiFi.begin(ssid, password);
    // Recheck every 30 seconds.
    checkWiFi = millis() + 30000;
  } else {
    // Check MQTT and reconnect.
    if ((!client.connected()) && (millis() > checkMQTT)) {
      client.connect(clientID);
      // Recheck every 5 seconds.
      checkMQTT = millis() + 5000;
    } else {
      // Scan for advertising devices.
      BLEScanResults foundDevices = pBLEScan->start(scanTime, false);
      // Free memory.
      pBLEScan->clearResults();
      // Publish that the scan is over.
      client.publish(channelName,"Scan Ended");
      client.loop();
    }
  }
  delay(1000);
}

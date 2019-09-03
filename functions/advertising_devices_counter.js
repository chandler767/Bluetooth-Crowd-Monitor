// Counts the number of advertising BLE devices.
const store = require('kvstore');
const pubnub = require('pubnub');

export default (request) => {
    // Get current count.
    return store.get('advertising_devices').then((value) => {
        if (request.message == "Scan Ended") {
            // Publish new count.
            pubnub.publish({
                "channel": "advertised_devices_count",
                "message": value.count
            }).then((publishResponse) => {
                console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
            });
            // Reset count.
            store.set('advertising_devices', {
                count: 0
            });
        } else {
            // Add device to count.
            store.set('advertising_devices', {
                count: value.count+1
            });
        }
        return request.ok();
    })
    .catch((e) => {
        console.error(e);
        // Reset count.
        store.set('advertising_devices', {
            count: 0
        });
        return request.ok();
    });
    return request.ok();
}

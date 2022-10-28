const ziotc = require('./../platform/lib/ziotc.node');

const onErrorCallback = (msg) => {
    console.log(msg);
};

const onOkCallback = () => {
    console.log("done");
};

var prefix = "e2";
const onNewMessageCallback = (msg) => {
    tag_id_hex = JSON.parse(msg["msg"])["data"]["idHex"]
    // Filter tags
    if (!tag_id_hex.startsWith(prefix)) {
        msg["type"] = 3;
        
        /*
        var newMessage = JSON.parse(msg["msg"])
        newMessage["data"]["idHex"] = newMessage["data"]["idHex"] + "_suffix"  // Add suffix
        newMessage["newProp"] = "Hello Simone" // Add new prop
        msg["msg"] = JSON.stringify(newMessage)
        */
        
        ziotc.SendNextMsg(msg);
    }
}

const onPassthruCallback = (msg) => {
    try {
        if (msg.startsWith("prefix")) {
            parts = msg.split(" ")
            if (parts.length >= 2) {
                prefix = parts[1]
            }
            ziotc.SendResponse("prefix set to " + prefix);
        }
        else
            ziotc.SendResponse("unrecognized command");
    }
    catch (err) {
        console.log(err.message);
    }
};

ziotc.Run(onErrorCallback, onOkCallback, onNewMessageCallback, onPassthruCallback);
console.log("started DA simple application")

function stopZIOTC() {
    console.log(`stopping...`);
    ziotc.Stop();
}

setTimeout(stopZIOTC, 60000); // run for 1 minute
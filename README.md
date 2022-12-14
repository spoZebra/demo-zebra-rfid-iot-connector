# demo-zebra-rfid-iot-connector
Simple demo I have presented during RFID events in Italy.

See the following webinar hosted by me as reference: https://www.youtube.com/watch?v=QSalDtjBkMM

The following setup might be a bit different than the one I have presented in the webinar (e.g. the filtering part is applied to the HTTP Post endpoint).
However, source code and concepts are the same.

## Contents
### HTTP Post
![image](https://user-images.githubusercontent.com/101400857/207549985-f9ad1fca-e727-4460-a8f3-b3b4361852a1.png)

### MQTT + Custom Node.js filtering
![image](https://user-images.githubusercontent.com/101400857/207550171-d1a5b6ac-e5f0-4cbe-bb59-5727d9426940.png)


## Setup

### General Prerequisites
- Supported Readers FX7500, FX9600, ATR7000
- Firmware version 3.10.30 or above
- Reader connected to the same network of your local machine

### HTTP Post
#### Reader
- Create a new HTTP Post endpoint using FX Reader web console (ref: https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/web.html)
- Use the following address: Your local machine IP (where you will run the web server) + ":3000/fx". E.g. "http://192.168.1.10:3000/fx"
##### HTTP Server
- Install Node.js in your local machine (ref: https://nodejs.org/en/#home-downloadhead)
- Open the terminal and move to the following path: ```cd your_root_folder\demo-zebra-rfid-iot-connector\endpoint-http-post\```
- Run the command ```node http-server-app.js```
##### Start Demo
- Using any HTTP Client (e.g. POSTMAN): Issue a PUT request to *https://{reader-ip}/cloud/start* and the reader will start sending events to your HTTP Server app.

### MQTT
#### Reader
- Create a new MQTT endpoint using FX Reader web console (ref: https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/web.html)
- Use your local machine IP as Server Address. E.g. "192.168.1.10"
- Default port is 1883.
- Setup topics as you prefer, I have used the following:

| Endpoint          | Topic			|
| -------------     |   :---:   |
|Management Events  | events	  |
|Tag Data Events    | data		  |
|Management Command	| mgmt/cmd	|
|ManagementResponse	| mgmt/res	|
|Control Command	  | ctrl/cmd	|
|Control Response	  | ctrl/res	|

#### MQTT Server
- Install docker (installation guide: https://docs.docker.com/desktop/install/windows-install/)
- Open the terminal and move to the following path: ```cd your_root_folder\demo-zebra-rfid-iot-connector\endpoint-mqtt\```
- Run the command ```docker compose up```
##### Start Demo
- Using any MQTT Client (e.g. MQTTX): Send a command to your *control command* endpoint (e.g. ctrl/cmd) with the following payload:
```
{
  "command": "start",
  "command_id": "16266718797272556",
  "payload": { }
}
```
- Reader will start sending events to your MQTT Server

### Custom Filters
#### Installation
- Using any FTP Client (e.g. FileZilla) connect to your reader (username: "rfidadm" and leave the password blank)
- Copy the file located in "your_root_folder\demo-zebra-rfid-iot-connector\embedded-filter-app\" to reader's *apps* directory (formerly mnt/data)
#### Start Demo
- Open the terminal and connect to your reader via SSH as follow: ```ssh rfidadm@YouReaderHostName```
- Accept the certificate (if needed).
- Move to *apps* directory using linux commands and then run the following command: ```node my-custom-filter.js```
- From now, reader will send just tags matching the rule defined inside the scritp.


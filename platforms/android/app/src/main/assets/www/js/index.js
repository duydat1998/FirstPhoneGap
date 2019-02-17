/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        alert("PhoneGap Loaded");
        checkConnection();
        showDeviceInformation();
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var pictureSource,   destinationType;

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#linkShowAlert').addEventListener('click', showAlert);
  document.querySelector('#linkShowConfirm').addEventListener('click', showConfirm);
  document.querySelector('#linkPlayBeep').addEventListener('click', playBeep);
  document.querySelector('#linkVibrate').addEventListener('click', vibrate);
  document.querySelector('#btnCapturePhoto').addEventListener('click', capturePhoto);
  document.querySelector('#btnCaptureEditPhoto').addEventListener('click', captureEditablePhoto);
  document.querySelector('#btnFromLibrary').addEventListener('click', getPhoto(pictureSource.PHOTOLIBRARY));
  document.querySelector('#btnFromAlbum').addEventListener('click', getPhoto(pictureSource.SAVEDPHOTOALBUM));
});

    function checkConnection(){
         var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            alert('Connection type: ' + states[networkState]);
    }

    function showDeviceInformation(){
        var element = document.getElementById("deviceProperties");
        element.innerHTML = "Device Name: "+device.name +"<br/>" +
                            "Device Cordova: "+device.cordova +"<br/>" +
                            "Device Platform: "+device.platform +"<br/>" +
                            "Device UUID: "+device.uuid +"<br/>" +
                            "Device Version: "+device.version +"<br/>";
    }
    function showAlert(){
            alert("Alert sample");
            navigator.notification.alert("Testing notification.alert", afterAlert, "Alert Title", "Button");
        }

        function afterAlert(){
        //    do something
            alert("After alert");
            return false;
        }

        function showConfirm(){
            navigator.notification.confirm("Do you like PhoneGap?", onConfirm, "About PhoneGap", "Yes,No");
        }

        function onConfirm(buttonIndex){
            alert("You selected button: "+ buttonIndex);
            return false;
        }

        function playBeep(){
            navigator.notification.beep(1);
            return false;
        }

        function vibrate(){
            navigator.notification.vibrate(1000);
            return false;
        }

        function onPhotoDataSuccess(imageData){
            var smallImage = document.getElementById("smallImage");
            smallImage.style.display ="block";
            smallImage.src ="data:image/jpeg;base64,"+imageData;
        }

        function onPhotoURISuccess(imageURI){
            var largeImage = document.getElementById("largeImage");
            largeImage.style.display ="block";
            largeImage.src = imageURI;
            alert("Success: " + imageURI);
        }

        function capturePhoto(){
            navigator.camera.getPicture(onPhotoDataSuccess, onPhotoFail,
            {
                quality: 50,
                destinationType : destinationType.DATA_URL
            });
        }

        function captureEditablePhoto(){
            navigator.camera.getPicture(onPhotoURISuccess, onPhotoFail,
            {
                quality: 50, allowEdit: true,
                destinationType : destinationType.DATA_URL,
            });
        }

        function getPhoto(source){
            navigator.camera.getPicture(onPhotoURISuccess, onPhotoFail,
            {
                quality: 50,
                destinationType: destinationType.FILE_URI,
                sourceType: source
            });
        }
        function onPhotoFail(message){
            alert("Photo Failed because: "+message);
        }

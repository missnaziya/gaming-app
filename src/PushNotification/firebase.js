// app push notifications
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { isSupported } from "firebase/messaging";
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { navigate } from 'gatsby';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let messaging;
let onMessageListener;
if(process.env.GATSBY_IS_MOBILE == "0"){
const firebaseConfig = {
  apiKey: "AIzaSyCNspcX2u5bQyHXKOiD1u-AruVaN1H_-VQ",
  authDomain: "konfehti-87a96.firebaseapp.com",
  projectId: "konfehti-87a96",
  storageBucket: "konfehti-87a96.appspot.com",
  messagingSenderId: "149315893779",
  appId: "1:149315893779:web:250c859431af6bfc365de6",
  measurementId: "G-VPMKFKN92S"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
messaging = (async () => {
  try {
      const isSupportedBrowser = await isSupported();
      if (isSupportedBrowser) {
          return getMessaging(app);
      }
      console.log('Firebase not supported this browser');
      return null;
  } catch (err) {
      console.log(err);
      return null;
  }
  })();

onMessageListener = () =>{
  if(process.env.GATSBY_IS_MOBILE == "0"){
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });
  }
}
}

export { messaging, onMessageListener };



// APP Push Notification

export const AppPushNotification = () =>{
  console.log(Capacitor.getPlatform());
  if(process.env.GATSBY_IS_MOBILE == "1"){
    registerNotifications();
    addListeners();
  }
} 

const addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
      localStorage.setItem("app_device_token",token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      console.log('type', notification.data.aps.type);
      if (typeof window !== 'undefined') {
        navigate(`/match?rmc=${  notification.data.aps.rmc}`)
    }
      
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('type', notification.notification.data.aps.type);
      if (notification.notification.data.aps.type === 'pa'){

      }else{

      }
      console.log('Push notification action performed',notification, notification.actionId, notification.inputValue);
    });
  }
  const registerNotifications = async () => {
    console.log('registerNotifications');
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  }
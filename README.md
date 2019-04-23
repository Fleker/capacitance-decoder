# Capacitance Decoder

![Capacitance Decoder logo](https://lh3.googleusercontent.com/ict2EQ0tU9Nz5K5ivKGm8o5hN0AJ3NqUYUgXwviHGsoRib9rJWOVjl9CETOHVm3VPvT2p0eTm0BThA=s72)

**[Try it out](https://assistant.google.com/services/a/uid/00000079337cf255)**

Capacitance Decoder is an Action for the Google Assistant which gives you
hands-free access to identifying ceramic capacitors by their code, or giving
you the code you'd need for a given capacitance.

## Sample phrases
* > *Talk to Capacitance Decoder*
* > *Ask Capacitance Decoder about a 100 picofarad capacitor*
* > *Ask Capacitance Decoder about the code 473 J*

## Setup
This is a Node.js project that works with Cloud Functions for Firebase and Dialogflow.

* Create a [new Dialogflow project](https://console.dialogflow.com)
* Go to *Export and Import*
* Click **Restore from Zip** and upload `capacitor-decoder.zip`

### Prepare the project
* `cd functions`
* `yarn` - Install dependencies
* `firebase deploy --only functions` - Deploy cloud function *https://us-central1-{project-id}.cloudfunctions.net/api_v1*
* In Dialogflow, select *Fulfillment*
* Enter the cloud function above as the fulfillment URL for a webhook

## License
View `LICENSE`

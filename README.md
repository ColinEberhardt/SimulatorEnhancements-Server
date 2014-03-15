# iOS Simulator Enhancements - Server

This project is a proof-of-concept, which I am using to try out a few ideas around extending the capabilities of the iOS Simulator. This project provides a mechanism for 'injecting' sensor data into an application in order to test code that depends on the accelerometer or GPS data without the need for a real device.

<img src="SimulatorEnhancements.jpg"/>

This project is the server component, that provides a source of simulator data. For more details on the iOS component see the  [SimulatorEnhancements](https://github.com/ColinEberhardt/SimulatorEnhancements) project.

This project uses npm and bower to manage dependencies. Before running, execute the following commands:

    $ npm install
    $ bower install
    
Following this, you should be able to run the server:

    $ node app.js
    
Navigate to `localhost:8080` to see the result!


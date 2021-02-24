<!-- PROJECT SHIELDS -->
<!--
*** Using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
![GitHub repo size](https://img.shields.io/github/repo-size/automationdirect/do-more-brx-web-simulator)
![GitHub contributors](https://img.shields.io/github/contributors/automationdirect/do-more-brx-web-simulator)
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/automationdirect/do-more-brx-web-simulator">
    <img src="images/do-more-logo.png" alt="Logo" ">
  <h3 align="center">AutomationDirect Do-more/BRX Web Simulator</h3>
  </a>


  <p align="center">
    A simple, fast Web page development Simulator for the Do-more/BRX PLC
    <br />
    <br />
    ·
    <a href="https://github.com/automationdirect/do-more-brx-web-simulator/issues">Report Bug</a>
    ·
    <a href="https://github.com/automationdirect/do-more-brx-web-simulator/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-do-morebrx-web-simulator">About the Do-more/BRX Web Simulator</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running">Running</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
# About the Do-more/BRX Web Simulator
The AutomationDirect Do-more/BRX Web Simulator is a web page development environment that allows web developers to more easily and quickly build pages targeted to be served from a Do-more/BRX PLC. The Web Simulator supports adding custom data Tags to match your BRX PLC project to facilitate rapid web page develop accessing your project's unique data.


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, make a clone or copy this project to your local machine and follow these simple steps.

### Prerequisites

The Web Simulator is built as an npm package so you will need recent version of <a href="https://nodejs.org/en/download/">Node.js</a> with npm installed. Initial development was done using Node version 14.15.4.


### Installation

1. From your project's home directory run npm install to load the needed npm packages
   ```sh
   npm install
   ```

### Running

1. To start the simulated web development environment run npm start
   ```sh
   npm start
   ```
   This starts an Express web server listening on port 3000. You should see output to your command line terminal with the last line of: 
   ```sh
   Do-more BRX Web Simulator listening on port 3000!
   ```

   In your web browser you should now be able to access a Welcome message page at <a href="http://localhost:3000">http://localhost:3000</a>
   
   You are now set to start developing web pages for the Do-more/BRX PLC.
   
   <b>Note:</b> You will likely need a good web development editor. If you don't already have a favorite, we used <a href="https://code.visualstudio.com/">Visual Studio Code</a> in developing this project. Its free and open source.


<!-- USAGE EXAMPLES -->
## Usage
### Web Folder Layout
The BRX PLC can serve custom web content from 2 top level folders. The /up or "user pages" folder, and the /sd or "sd card" folder. The Web Simulator mimics this same layout under the /public folder. So any web content or files that you want the BRX PLC (or the Web Simulator) to serve need to be placed inside these folders.

<b>NOTE:</b> To conserve memory space on the BRX PLC and for better organization, we recommend placing most web content inside the /sd/web folder. 
### Example Pages
Included with the simulator are a few example pages to help jump start your project and demostrate usage of the BRX REST API. See the html files in the /public/up folder, and the related javascript files in the /public/sd/web/js folder to get started.

### Interactive Web Development
Any good web development environment needs to provide immediate feedback and thats just what the Web Simulator provides. Once you start the Simulator running, to see changes to any page you are working on, simply save the changes and refresh your browser. Any updates are immediately reflected in the browser.
### Simulated Custom Data Tags
The Web Simulator can easily be customized to serve simulated data unique to your BRX PLC project. Examples of custom tags are found in the file brx-sim-data.js. This file is meant to be the place where you can add the unique tag names and matching JSON data to simulate how your BRX PLC project actually responses to REST API requests. 

The Web Simulator supports arrays of values just like the BRX REST API. And the Simulator can also generate random values between 0 and 100 using the special data value of "variabledatastream" to provide a live feel to gauges or other auto refreshed displays. See brx-sim-data.js for example JSON.

### Deploying Web Content to your Do-More/BRX PLC
For more information on deploying web content to your BRX PLC, please see our <a href="https://community.automationdirect.com/s/article/APPLICATION-NOTE-Do-more-BRX-How-to-create-a-custom-web-page">APPLICATION NOTE: Do-more/BRX: How to create a custom web page</a>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact
Project Link: [https://github.com/AutomationDirect/do-more-brx-web-simulator](https://github.com/AutomationDirect/do-more-brx-web-simulator)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Chartist.JS](https://gionkunz.github.io/chartist-js/)
* [Canvas gauges](https://canvas-gauges.com/)
* [Express JS](https://expressjs.com/)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

[license-shield]: https://img.shields.io/github/license/automationdirect/do-more-brx-web-simulator
[license-url]: https://github.com/AutomationDirect/do-more-brx-web-simulator/blob/main/LICENSE

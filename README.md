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
  <h3 align="center">AutomationDirect Do-more BRX Web Simulator</h3>
  </a>


  <p align="center">
    A simple, fast Web page development Simulator for the Do-more BRX PLC
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
      <a href="#about-the-project">About the Do-more BRX Web Simulator</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
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
## About the Web Simulator
The AutomationDirect Do-more BRX Web Simulator is a web page development environment that allows web developers to more easily and quickly build pages targeted to be served from a Do-more BRX PLC. The simulator supports adding custom data Tags to match your BRX PLC project to facilitate rapid web page develop accessing your project's unique data.

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

1. To start the mini web development enironment
   ```sh
   npm start
   ```
   This starts an Express server listening on port 3000. You should see output to your terminal: Do-more BRX Web Simulator listening on port 3000! <br/>
   And in your web browser you should be able to see a Welcome message at <a href="http//localhost:3000">localhost:3000</a>
   <br/>
   You are now set to start developing web pages for the Do-more BRX PLC.
   <p>
   <b>Note:</b> You will likely need a good web development editor. If you don't already have a favorite, we used <a href="https://code.visualstudio.com/">Visual Studio Code</a> in developing this project. Its free and open source.


<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<!-- # brx-web-sim
Web page development simulator for BRX -->

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


[license-shield]: https://img.shields.io/github/license/automationdirect/do-more-brx-web-simulator
[license-url]: https://github.com/AutomationDirect/do-more-brx-web-simulator/blob/main/LICENSE

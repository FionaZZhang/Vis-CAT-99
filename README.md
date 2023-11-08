# Vis-CAT-99 Project Documentation

Welcome to the Vis-CAT-99 project documentation. This document serves as a handover guide for developers and users, providing all necessary details for system configuration, installation, project structure, as well as additional information on changelog, detected bugs, and testing.

## Table of Contents

- [System Configuration and Installation](#system-configuration-and-installation)
- [Project Structure](#project-structure)
- [Change log](#change-log)
- [Detected Bugs](#detected-bugs)
- [Other Documentation](#documentation)


## System Configuration and Installation

Below you will find the guidelines to set up and install the necessary components to run the Vis-CAT-99 application.

### Prerequisites

Ensure you have the following tools installed:
1. Python and pip (Python's package installer)
2. Node.js and npm (Node.js's package manager)

### Installation Steps

#### Frontend Setup

Ensure you have Node.js (which includes npm) installed on your system. If you need to update npm to the latest version, you can do so with the following command:

```bash
npm install -g @vue/cli
```
Then, install relevant tools:
```bash
npm install
```
### How to Run the Application
To run the frontend application:
```bash
cd vue-app
npm run serve
# Access the application at localhost:3030
```

### HTTPS Configuration for Mobile Access
1. `npm install -g ngrok`
2. Sign up free for grok and get the authtoken
3. `ngrok config add-authtoken 'authtoken'`
4. run Vue-app in one terminal
5. run in another terminal and get the URL: `ngrok http 'portNumber' --host-header=rewrite`
6. use the URL to visit our website on mobile device

### Project Structure
The project is structured as follows:
- UI assets: `vue-app/src/assets`
- Pages: `vue-app/src/pages`
- Public assets (e.g., web icon): `vue-app/public`
- Routers configuration: `main.js`
- Backend testing script: `app.py`
- Node modules: `vue-app/node_modules`

### Change Log

#### New Features and Enhancements

UI/UX Enhancements:
- Added animations and UI changes for a more dynamic user experience. (`b20676c`)
- Adjusted line thickness based on screen size for better visual consistency across devices. (`65ed753`)
- Updated favicon for better brand representation. (`473485c`)
- Added challenge reminder voice message to enhance user engagement. (`bb0edf0`)
- Changed challenge icon for clearer visual cues. (`e6e752e`)

Accessibility:
- Added acknowledgement section for contributors. (`23229cb`)
- Implemented voice messages and instructions across various pages for better accessibility. (`f53c292`, `d88faad`, `5e70a9c`, `5cf4a52`, `de554f9`, `7909953`)
- Updated instructional GIFs for clarity in challenge pages. (`96f4ea3`, `2929938`)

Account Management:
- Improved error handling for QR code scanner to prevent crashes. (`1997c5f`)
- Debugged accounts page for smoother user experience. (`e211002`)

Functional Enhancements:
- Added timer and store time used feature for tracking activity duration. (`b291d16`, `edfa02b`)
- Enabled rear camera for mobile devices to increase functionality. (`420c73d`)

Code Maintenance:
- Cleaned up code by removing comments, extra spaces, and duplicate functions. (`191027e`, `1df232c`)
- Renamed test pages and refactored code for maintainability. (`2929938`)

Settings and Customization:
- Enhanced settings functionalities, including volume and voice toggles across pages. (`904d851`, `b9ce053`, `cc5db96`)
- Remembered user settings and enabled partial mode for convenience. (`4488099`)

Miscellaneous:
- Updated data sending protocols for improved performance. (`8156363`)
- Added error handling and retry mechanisms for robustness. (`bffdf40`, `4235b6e`)

### Detected Bugs

Render and Page Errors:
- Fixed render error that was causing display issues. (`5b47198`)
- Debugged various bugs on account and test pages for smoother operations. (`705895d`, `e211002`)
- Adjusted time format and debugged playground for a better user experience. (`381dff4`)

Sound and Audio Fixes:
- Resolved volume issues, particularly for tablet devices. (`73821d6`)
- Fixed sound button appearance and functionality across pages. (`c191672`)
- Debugged mute button to ensure proper audio control. (`7fb8b20`)

QR and Camera Fixes:
- Corrected QR code scanning error to enhance the feature's reliability. (`2a0bf50`)

Instructional Content:
- Addressed pattern display for instructional pages to prevent confusion. (`a07209a`)
- Fixed an issue with the instruction GIF ratio for better visuals. (`ddb6c43`)

General Debugging:
- Addressed miscellaneous bugs and performed general debugging to ensure stability and reliability. (`d2281b8`, `06fe794`, `53482f3`, `d50313a`)

### Documentation
For other documentation (e.g. user stories, testing, traceability, deployment, etc.) please refer to the documentation directory `docs`. For enhanced visualization (e.g., GIFs, videos, which may not be retained in PDF format), please visit the Confluence workspace.
- `docs/`
  - [Confluence workspace](https://fionazhang.atlassian.net/wiki/spaces/99Problems/overview?homepageId=164743)
  - `Adherence to agile ceremonies`
    - Team structure
    - Team decision making
    - All sprints retrospectives
  - `Process/`
    - Team internal communication
    - Group meetings
    - Communication with client
    - Requirements
  - `Artefacts/`
    - Tool used
    - Frontend design
    - Architecture design
    - Coding standard
    - Testing
    - UX report
  - `Handover/`
    - User manual
    - Maintenance
    - Product Trailer
    - Deployment
    - Other Marketing materials

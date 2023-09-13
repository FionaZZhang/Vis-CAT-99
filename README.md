# Vis-CAT-99

# Please install:
1. `pip install npm` \
Maybe also install these if needed:
2. `npm install -g @vue/cli`
3. `npm install vue-router@4.1.6` (DO NOT SELECT 'history' if ask)
4. `pip install flask`

# How to run front-end:
1.  `cd vue-app`
2.  `npm install vuex -save`
3. `npm run serve`
4. Go to `locolhost:8080`

# Developer quick starts: how to add a page
1. add a .vue page in vue-app/src/pages
2. add corresponding router in `routes` in main.js
3. change corresponding buttons to navigate to the page

# Configuration explained
1. UI assets: vue-app/src/assets
2. Pages: vue-app/src/pages
3. Public assets (eg web icon): vue-app/public
4. Routers: main.js
5. Backend (for testing): app.py
5. DO NOT PUSH: `vue-app/node_modules`

# How to run front-end and back-end (with pre-build):
2. `cd vue-app`
3. `npm run build`
4. `cd ..`
5. `python app.py`
6. Go to `127.0.0.1:5000`

# How to convert HTTP link to HTTPS to enable scan functionality on iPad or phone:
1. npm install -g ngrok
2. Sign up free for grok and get the authtoken
3. ngrok config add-authtoken 'authtoken'
4. run Vue-app in one terminal
5. run in another terminal and get the URL: ngrok http 'portNumber' --host-header=rewrite
6. use the URL to visit our website on mobile device

# How to re-deploy (may work or may not work...):
1. update the 'dist' by `npm run build`
2. push to the 'deploy' branch

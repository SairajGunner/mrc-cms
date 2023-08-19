Hosting the API on Windows server (IIS)

1. Install Node.js from https://nodejs.org/en/download (if not already installed)
2. Clone repository from https://github.com/SairajGunner/mrc-cms.git
3. Open terminal in folder 'mrc-cms-server' inside local repository location
4. Execute command - npm install
5. Enable IIS on the computer by going to 'Turn Windows Features On or Off' and enabling IIS (if not already enabled)
6. Install IIS module 'iisnode' from https://github.com/tjanczuk/iisnode/releases
7. Install IIS module 'Rewrite' from https://www.iis.net/downloads/microsoft/url-rewrite
8. Open IIS and add website
9. Set physical path to the folder 'mrc-cms-server' inside the local repository
10. Recommended port - 3010 but can be changed to anything in case 3010 is unavailable
11. Go to the application pool and change the Identity from Advanced Settings to LocalSystem
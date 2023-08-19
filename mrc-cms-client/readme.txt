Hosting the APP on Windows server (IIS)

1. Install Node.js from https://nodejs.org/en/download (if not already installed)
2. Clone repository from https://github.com/SairajGunner/mrc-cms.git
3. Open terminal in folder 'mrc-cms-client' inside local repository location
4. Execute command - npm install
4. Execute command - npm run build
5. Enable IIS on the computer by going to 'Turn Windows Features On or Off' and enabling IIS (if not already enabled)
6. Install IIS module 'iisnode' from https://github.com/tjanczuk/iisnode/releases
7. Install IIS module 'Rewrite' from https://www.iis.net/downloads/microsoft/url-rewrite
8. Open IIS and add website
9. Set physical path to the folder 'mrc-cms-client/build' inside the local repository
10. Copy file named 'web.config' from folder mrc-cms-client to the build folder
11. Recommended port - 8000 but can be changed to anything in case 8000 is unavailable
12. Go to the application pool and change the Identity from Advanced Settings to LocalSystem
13. Navigate to the website in IIS from the left pane and choose tile 'Authentication'
14. Right-click 'Anonymous Authentication' and select 'Edit'
15. Choose option 'Application pool identity' and say Ok
16. Go to the browser and navigate to the URL localhost:8000 (change port if another one is used)
17. From the URL bar choose the download option which will locally install a copy of the website and provide a native experience
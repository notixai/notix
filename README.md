# notix
## Temporary Notes
- Recommended to use Docker while running the environments (some IP addresses use the docker container names). Otherwise, you may have to switch these names to your localhost ports
### Setting Up Docker Dev Environment
To set up the Docker environment to respond to changes in your code, do the following
1. Connect the remote GitHub to your local environment
2. Switch to the development branch on your local server
3. Open Docker and go to Dev Environments
4. Click the create button, give the environment a name, and click "Local directory" as your source
5. In the path to directory, locate the notix folder and select the **frontend** folder
6. From here press continue and wait for the dev environment to be created
7. When it is done, you should see an environment with 4 containers: react, express, mongob, flask_api, all should be running
8. If there is a container that is not running, you can hover over the container and press the restart/start button
### Docker using more RAM than usual?
If Docker is using more RAM than normal:
1. Open command prompt
2. Type wsl --shutdown
3. The docker server if open will ask you to restart, say yes
### Adding additional dependencies to your Dev Environment
If you add additional dependencies to your project, you will need to add them to the docker as well (volumes do not automatically update with new dependencies)
1. Go to the container that you added dependencies for
2. Go to the exec tab
3. Type "npm install" (or any equivalent) for dependencies to install based on the package.json file (which is tied to your local environment)
### Running React Server
**Ensure Container is Running**
To run the react server:
1. Go to the react container
2. Go to exec tab
3. Type "npm start" to start the server
4. If there are no issues, you can now access the react frontend on localhost:3000
### Transcribing videos
**Ensure Container is Running**
Currently, videos are not automatically transcribed. To transcribe, do the following:
1. Go to the express container
2. Go to exec tab
3. Type "node transcribe_worker.js" to start the transcription process
### Checking errors/logs
Containers have their own logs section to check errors, output, etc. To utilize this:
1. Click the container
2. Go to logs
NOTE: There are other tabs like Files and bind mounds that can be examined

# Contributors
- tg1702
- aquonbovell
- PeripheralSheep
- JonathanKing78
- BrandenSpooner
- IsaiahSama
- TaigaTi

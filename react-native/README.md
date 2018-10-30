== Setup environment
- create project with create-react-native
- run from simulator ios
 - from web Expo Developer Tool page (localhost:1900x)
   - click Run on iOS simulator
   (if the app crash in simulator, just go back here in the browser and click run on iOS simular again)
- run from device

2. Basic code


3. FlatList, Listview

4. Read to data from http

5. Code style and debug env

6.

Other notes:
- After npm install new packages react-native-elements, Expo went haywired, in emulator got Can't find variable: self
 - Tried: uninstall react-native-elements (still got Can't find variable: self)
 - Reboot, still didn't work 
 - WORKED!!! Try force version as https://stackoverflow.com/questions/52269560/react-native-expo-cant-find-variable-self
 But get: 
  Error running `xcrun simctl openurl booted exp://localhost:19000`: An error was encountered processing the command (domain=NSPOSIXErrorDomain, code=60):
  The operation couldn’t be completed. Operation timed out
  Operation timed out
  ERROR
  08:46
  Error installing or running app. Error: Process exited with non-zero code: 60

- If iOS simulator keept syaing 100% download but still got white screen, press Cmd-D twice, or Cmd-D then Live Reload
# LetsCode Santa Clarita Valley

## Tasks/Features

- [x] Fix back button exception when navigate from Chat back to login (Ryan)
- [ ] Test commits to GitHub (Everyone)
- [x] Fix the avatar upload to encode correctly. See https://github.com/expo/firebase-storage-upload-example replace the fetch(uri).blob() with xmlHttpRequest. (PT)
- [x] Add bottom tab navigation (Ryan)
- [x] Refactor navigation Login/Register (Stack Nav), Home, Room, Message, Profile (Bottom Tab Nav) (Ryan)
- [ ] Add logo and splash screen
- [ ] Add busy indicator during login
- [ ] Add busy indicator loading messages in chat screen
- [ ] add redux to login/signout
- [ ] save state to async storage so don't have to login every time the app start
- [x] added ability to display map in chat and test image
- [ ] add profile/option page
- [ ] add update profile to save user info
- [ ] fix upload avatar in profile page - remove avatar from signup screen
- [ ] save avatar info to auth and UserProfile
- [ ] update login screen with logo and obscure password
- [ ] add ability to send image through chat
- [ ] add ability to send location (need a way to input coordinate) 
- [ ] fix chat refresh problem between tab after send a message
- [ ] create new rooms
- [ ] add accesss to room like invite only or admin of room

## Navigation

- AuthNav (Stack Nav)
  - Login
  - Signup
- AppNav (Bottom Tab Nav)
  - Home (Chat)
  - Rooms (Stack Nav)
    - List Rooms
    - Message (Chat)
  - Messages (Stack Nav)
    - List Users
    - Message (Chat)
  - Settings (Stack Nav)
    - General
    - Avatar

## Datastore Objects

- DirectMessages
  - from_user_email (replace . with ,)
    - to_user_email
      - message1 {createdAt, text, user}
      - message2 {createdAt, text, user}
  - to_user_email
    - from_user_email
      - message1 {createdAt, text, user}
      - message2 {createdAt, text, user}
- RoomMessages
  - Lobby
    - [messages]
  - RoomA
    - [messages]
- RoomList
  - Lobby
  - RoomA
- UserProfiles
  - user_email (replace . with ,)
    - {email, key, name, avatar}

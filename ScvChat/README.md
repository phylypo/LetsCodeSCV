# LetsCode Santa Clarita Valley

## TODO
- merge chat with main - added map and image
- add profile/option page

## Navigation

- AuthStack (Stack Nav)
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
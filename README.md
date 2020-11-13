# Socket.io Chat APP Example
Example Node.js Chat APP based on Socket.io! The UI is currently not responsive and poorly designed because this project should only show the Socket.io relevant parts.


<br>
<br>


Database: **MongoDB**
<br>Websocket: **Socket.io**
<br>TDD: **Mocha.js**

<br>
<br>


![alt tag](https://i.imgur.com/KWylyt0.jpg)


<br>
<br>
<br>
<br>

# Features
- Friendlist for multiple Chats (Left Sidebar)
- Socket.io Rooms
- Storage of messages (MongoDB)
- Realtime Chat



<br>
<br>


 _____________________________________________________
 _____________________________________________________


<br>
<br>


# Install
In order to use this Chat APP you must create a MongoDB Database and insert the name at your **./admin/config.json** file. Then create 2 collections called:
- rooms
- user

<br>
<br>

In order to use Unit Test the **config.json** file already contains the two testing user and the testing room. Make sure that the room and both user exist aswell in your database as explained in the next section.

```javascript
"test": {
    "host": "http://localhost:1337",
    "room": "mocha",
    "user": [{
      "token": "mocha",
      "name": "mocha"
    },{
      "token": "mocha2",
      "name": "mocha2"
    }]
  }
```


<br>
<br>


 _____________________________________________________
 _____________________________________________________


<br>
<br>


The **rooms** collection contains the **room ID** and the **user array** which will store the users who are currently inside of this chat room.
<br><br>
All sended messages from this room will be later also imported to this object.
```javascript
[{
    "id": "4321",
    "user": [{
        "usertoken": "c"
    }, {
        "usertoken": "b"
    }]
},
{
    "id": "mocha",
    "user": [{
        "usertoken": "mocha"
    }, {
        "usertoken": "mocha2"
    }]
}]
// In order to use Unit Test we aswell a testing room.
```



<br>
<br>


 _____________________________________________________
 _____________________________________________________


<br>
<br>



The **user** collection contains the **user token**, **user name** and the **friends array** which will store the friendlist from this user.

<br><br>The friendlist currently must also contain the room ID because of the left sidebar of the Chat APP which will fetch the room ID when we switch the friend chats.

```javascript
[{
    "token": "b",
    "name": "Lena Groß",
    "friends": [{
        "token": "a",
        "room": 1234
    }, {
        "token": "c",
        "room": 4321
    }]
},
{
    "token": "mocha",
    "name": "mocha",
    "friends": [{
        "token": "mocha2",
        "room": "mocha"
    }]
},
{
    "token": "mocha2",
    "name": "mocha2",
    "friends": [{
        "token": "mocha",
        "room": "mocha"
    }]
}]
// In order to use Unit Test create aswell two testing user.
```


<br>
<br>


 _____________________________________________________
 _____________________________________________________


<br>
<br>

# Run


## How to start Chat APP
Currently you can open each user chat window by using the **User Token** inside of your URL Parameter (For further productions you should replace this with a cookie instead):
<br>- http://localhost:1337/?usertoken=a


<br><br>


## How to start Unit Test
First start your express server (**app.js**) and after this run:
```bash
# method #1
test.bat # <-- Windows
test.sh # <--MAC/Linux

# method #2
npm run test-watch
```


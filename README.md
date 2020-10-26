# Socket.io Chat APP Example
Example Node.js Chat APP based on Socket.io!


<br />
<br />


Database: **MongoDB**<br />
Websocket: **Socket.io**<br />

<br />
<br />


![alt tag](https://i.imgur.com/KWylyt0.jpg)


<br />
<br />

____________________________________________________________
____________________________________________________________


<br />
<br />

# Features
- Friendlist for multiple Chats
- Room Chats
- Storage of messages (MongoDB)
- Realtime Chat


<br />
<br />


# Install
In order to use this Chat APP you must create a MongoDB Database and insert the name at your **./admin/config.json** file. Then create 2 collections called:
- rooms
- user

<br />
<br />


The **rooms** collection contains the **room ID** and the **user array** which will store the users who are currently inside of this chat room:
```javascript
{
    "id": "4321",
    "user": [{
        "usertoken": "c",
        "name": "Julia Lückertz"
    }, {
        "usertoken": "b",
        "name": "Lena Groß"
    }]
}
```
All sended messages from this room will be later also imported to this object.


<br />
<br />
<br />
<br />


The **user** collection contains the **user token**, **user name** and the **friends array** which will store the friendlist from this user.
```javascript
{
    "token": "b",
    "name": "Lena Groß",
    "friends": [{
        "token": "a",
        "name": "Lisa Wolscht",
        "room": 1234
    }, {
        "token": "c",
        "name": "Julia Lückertz",
        "room": 4321
    }]
}
```
The friendlist currently must also contain the room ID because of the left sidebar of the Chat APP which will fetch the room ID when we switch the friend chats.


<br />
<br />
Currently you can open each person Chat Window by using the User Token inside of your URL Parameter like as example:
<br />http://localhost:1337/?usertoken=a
<br />
<br />
For further productions you should replace this with a cookie instead.

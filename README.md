# Socket.io Chat APP Example
Example Node.js Chat APP based on Socket.io!


<br />
<br />


Database: **MongoDB**<br />
Websocket: **Socket.io**<br />

<br />
<br />


![alt tag](https://i.imgur.com/nqaQ9aV)


<br />
<br />

____________________________________________________________
____________________________________________________________


<br />
<br />

# Features
- Friendlist for multiple Chats
- Room Chats
- Storage of Messages
- Realtime


<br />
<br />


# Install
In order to use this Chat APP you must create a MongoDB Database and insert the name at your **./admin/config.json** file. Then create 2 collections called:
- rooms
- user

<br />
<br />


The **rooms** collection contains the **room ID** and the **user array** which will store the user who are currently inside of this room:
```javascript
{
    "_id": {
        "$oid": "5f96ff15f7506c3864a7de63"
    },
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
<br />
<br />
All sended messages from this room will be later also imported to this room object.

<br />
<br />


The **user** collection contains the **user token**, **user name** and the **friends array** which will store the friendlist from this user.
```javascript
{
    "_id": {
        "$oid": "5f9568f01a98c630e08ddc82"
    },
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
<br />
<br />
The friendlist must also contain the room ID because of the left sidebar of the Chat APP which will later fetch the room details when we switch the friend chats.

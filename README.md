# alt-blog

A REST API to serve as the backend of a blog app


## Objectives
 1. Users should have a first name, last name, email and password.
 2. A user should be able to signup and sign in into the blog.
 3. App should use JWT as authentication strategy and expire token after an 
 hour.
 4. Blog should have two states, draft and published.
 5. logged in and logged out users should be able to get the list of published 
 blogs.
 6. logged in and logged out users should be able to get a published 
 blog.
 7. logged in users should be able to create a blog.
 8. When a blog is created, it is in draft state. 
 9. The owner of the blog should be able to update the state to published.
 10. The owner of the blog should be able to update the blog in draft or published state.
 11.  The owner of the blog should be able to delete the blog in draft or published state.
 12. The owner of the blog should be able to get a list of their blogs.
  (a)The endpoint should be paginated, (b)it should be filterable by state.
 13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading time, and body.
 14. The list of blogs endpoint that can be accessed by logged in and non logged in users should be paginated, with a default of 20 results per response.




## Set up
* Install Nodejs, Mongodb.

* Pull this repo.

* Update env with example.env.

* Run npm start

## Base URL

*https://alt-blog-node.herokuapp.com/


## Models

### User 
  | **field** | **data type** | **constraint** |
  |------------|---------------|----------------|
  | id         | objectid      |                |
  | first_name | string        | required       |
  | last_name  | string        | required       |
  | email      | string        | required       |
  | password   | string        | required       |
  | created_at | date          |                |   
  
### Blog

   | **field**    | **data type** | **constraint** |
|--------------|---------------|----------------|
| id           | string        | required       |
| created_at   | date          | required       |
| creator_id   | objectid      | required       |
| title        | string        | required       |
| description  | string        | required       |
| tags         | string        |                |
| author       | string        | required       |
| state        | string        | required       |
| read_count   | number        |                |
| reading_time | number        |                |
| body         | string        | required       |
| last_update  | date          |                |

## APIs
---

### Sign up User

* Route: /signup
* METHOD:POST
* body:

```
  {
     "email": "doe@example.com",
     "password": "Password1",
      "first_name": "jon",
      "last_name": "doe",
      "username": "jon_doe"
}
```

* Response
```
{
      "success": true,
      "message": "user created successfuly",
      "user": {
      "id": "63685dabe4a8d716b8814570",
        "email": "doe@example.com"
       }
}
```

### Login User

* Route: /login
* METHOD:POST
* body:

```
  {
     "email": "doe@example.com",
     "password": "Password1",
}
```

* Response
```
{
    "success": true,
    "message": "logged in successfuly",
    "u_id": "63685dabe4a8d716b8814570",
    "name": "jon doe",
    "token": "Bearer ciiI2MzY4NWRhYmU0YThkNzE2YZjUEyS6v7qwvzzqNR6_bLJ0Ns6SdGW7U"
}
```
##NOTE: Token is expected in authorization header, the body of a blog only shows when you request for a published blog, it won't show in the list of published blogs request. Read count increases for only the published blog route.

### Create a blog

* Route: /blogs/create
* METHOD:POST
* body:

```
 {
  "title":"JWT auth",
        "description":"a discuss on JWT",
        "tags":["Tech"]
        "reading_time":2000,
        "body":"Lorem ipsum  laborefugiat nulla pt in culpa qui officia deserunt mollit anim id est laborum."
}
   
```

* Response
```
{
    "success": true,
    "message": "blog created successfully",
    "blog": {
        "created_at": "2022-11-07T01:55:02.289Z",
        "title": "JWT auth",
        "description": "a discuss on JWT",
        "tags": ["Tech"],
        "author": "test test",
        "state": "draft",
        "read_count": 0,
        "reading_time": "this is a 2000 minute read",
        "body": "Lorem ipsum  laborefugiat nulla pt in culpa qui officia deserunt mollit anim id est laborum.",
        "_id": "63686576e3ba17edb402726f",
        "__v": 0
    }
}
```

### Get published blogs list

* Route: /published
* METHOD:GET


* Response
```
{
    "status": true,
    "message": " published blogs retrieved successfully",
    "blogs": [
        {
            "_id": "6366df1123e85b2aa029ab4e",
            "creator_id": "63658e4dc05aeffc7e03f8f9",
            "created_at": "2022-11-05T22:09:21.621Z",
            "title": "8 blog",
            "description": "req.body.description",
            "tags": "req.body.tags",
            "author": "test test",
            "state": "published",
            "read_count": 0,
            "reading_time": "this is a 56 minute read",
            "__v": 0
        },
        {
            "_id": "6366df1823e85b2aa029ab51",
            "creator_id": "63658e4dc05aeffc7e03f8f9",
            "created_at": "2022-11-05T22:09:28.524Z",
            "title": "9 blog",
            "description": "req.body.description",
            "tags": "req.body.tags",
            "author": "test test",
            "state": "published",
            "read_count": 0,
            "reading_time": "this is a 56 minute read",
            "__v": 0
        },
        {
            "_id": "6366df2123e85b2aa029ab54",
            "creator_id": "63658e4dc05aeffc7e03f8f9",
            "created_at": "2022-11-05T22:09:37.620Z",
            "title": "10 blog",
            "description": "req.body.description",
            "tags": "req.body.tags",
            "author": "test test",
            "state": "published",
            "read_count": 0,
            "reading_time": "this is a 56 minute read",
            "__v": 0
        },
        {
            "_id": "6366df2723e85b2aa029ab57",
            "creator_id": "63658e4dc05aeffc7e03f8f9",
            "created_at": "2022-11-05T22:09:43.200Z",
            "title": "11 blog",
            "description": "req.body.description",
            "tags": "req.body.tags",
            "author": "test test",
            "state": "published",
            "read_count": 0,
            "reading_time": "this is a 56 minute read",
            "__v": 0
        },
        {
            "_id": "6366df2c23e85b2aa029ab5a",
            "creator_id": "63658e4dc05aeffc7e03f8f9",
            "created_at": "2022-11-05T22:09:48.761Z",
            "title": "12 blog",
            "description": "req.body.description",
            "tags": "req.body.tags",
            "author": "test test",
            "state": "published",
            "read_count": 0,
            "reading_time": "this is a 56 minute read",
            "__v": 0
        }
    ]
}
```

### Get a published blog by its id

* Route: /published/:id
* METHOD:GET


* Response
```
{
    "success": true,
    "message": "requested blog retrieved successfully",
    "blog": {
        "_id": "6366df2c23e85b2aa029ab5a",
        "creator_id": "63658e4dc05aeffc7e03f8f9",
        "created_at": "2022-11-05T22:09:48.761Z",
        "title": "12 blog",
        "description": "req.body.description",
        "tags": "req.body.tags",
        "author": "test test",
        "state": "published",
        "read_count": 1,
        "reading_time": "this is a 56 minute read",
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborefugiat nulla pt in culpa qui officia deserunt mollit anim id est laborum.",
        "__v": 0
    }
}
```

### Get user's blogs

* Route: /blogs/getmyblogs?state=draft
* METHOD:GET
* NOTE: All available blogs will be returned if there is no query parameter



* Response
```
{
    "status": true,
    "blogs": [
        {
            "_id": "636b33e17671f339d54c9fcf",
            "creator_id": "63685dabe4a8d716b8814570",
            "created_at": "2022-11-09T05:00:17.155Z",
            "title": "JWT auth31",
            "description": "a discuss on JWT",
            "tags": "Tech",
            "author": "undefined undefined",
            "state": "draft",
            "read_count": 0,
            "reading_time": "this is a 2000 minute read",
            "__v": 0
        },
        {
            "_id": "636b33ed7671f339d54c9fd1",
            "creator_id": "63685dabe4a8d716b8814570",
            "created_at": "2022-11-09T05:00:29.704Z",
            "title": "JWT auth32",
            "description": "a discuss on JWT",
            "tags": "Tech",
            "author": "undefined undefined",
            "state": "draft",
            "read_count": 0,
            "reading_time": "this is a 2000 minute read",
            "__v": 0
        }
    ]
}
```


### Update a blog's state

* Route: /blogs/updatestate/:blog_id
* METHOD:PATCH
* body:

```
 {
    "state":"published"
}
   
```

* Response
```
{
    "status": true,
    "blog": {
        "_id": "63709f93f4b7bf2083f8f171",
        "creator_id": "63685dabe4a8d716b8814570",
        "created_at": "2022-11-13T07:41:07.377Z",
        "title": "creating a blog to test",
        "description": "creating a blog to test",
        "tags": [
            "[hunger,stress]"
        ],
        "author": "jon doe",
        "state": "published",
        "read_count": 0,
        "reading_time": "this is a 30 minute read",
        "__v": 0
    }
}
```

### Edit a blog

* Route: /blogs/edit/:blog_id
* METHOD:PUT
* body:

```
{
    "title":"Israel Adesanya's fight",
    "body":"He may have lost tonight, but...he will always be a champion",
    "description":"creating a blog to test",
    "tags":["ufc","middle weight"],
    "reading_time":"5"
}
   
```

* Response
```
{
    "status": true,
    "blog": {
        "_id": "63709f93f4b7bf2083f8f171",
        "creator_id": "63685dabe4a8d716b8814570",
        "created_at": "2022-11-13T07:41:07.377Z",
        "title": "Israel Adesanya's fight",
        "description": "creating a blog to test",
        "tags": [
            "ufc",
            "middle weight"
        ],
        "author": "jon doe",
        "state": "published",
        "read_count": 0,
        "reading_time": "this is a 30 minute read",
        "body": "He may have lost tonight, but...he will always be a champion",
        "__v": 1,
        "last_updated": "2022-11-13T10:50:17.034Z"
    }
}
```

### Delete a blog

* Route: /blogs/delete/:blog_id
* METHOD:DELETE


* Response
```
{
    "status": true,
    "message": "blog has been deleted",
    "blog": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```

### User gets a blog they authored

* Route: /blogs/getmyblog/:blog_id
* METHOD:GET


* Response
```
{
    "status": true,
    "message": "found your blog",
    "blog": {
        "_id": "636b33ed7671f339d54c9fd1",
        "creator_id": "63685dabe4a8d716b8814570",
        "created_at": "2022-11-09T05:00:29.704Z",
        "title": "JWT auth32",
        "description": "a discuss on JWT",
        "tags": [
            "Tech"
        ],
        "author": "undefined undefined",
        "state": "draft",
        "read_count": 1,
        "reading_time": "this is a 2000 minute read",
        "body": "Lorem ipsum  laborefugiat nulla pt in culpa qui officia deserunt mollit anim id est laborum.",
        "__v": 1
    }
}
```

## Contributor
- Akinnukawe Adebanji


























# RedditNewsletter
This API sends daily e-mails containing the top 3 most voted posts for each user's favorite Reddit's subreddit

Schema:

User: 

        "_id": "5dc8e180d0bd6f00444756a6"
    
        "login": "cgalvao_"
    
        "name": "Cássio Galvão"
    
        "email": "cassio.gsoares@hotmail.com"
    
        "favoriteChannels": "GlobalOffensive soccer javascript" (SPACE SEPARATED)
    
        "notify": true
    

Routes:

GET /users                          => Fetch all users in the database

GET /users/:login                   => Fetch information of a specific user

GET /users/:login/newsletter        => Fetch Reddit data for a specific user

PUT /users                          => Edit user (login + field(s) to be changed in the request body)

POST /users                         => Create a new user

POST /users/:login/sendnewsletter   => Send Reddit Newsletter Email to a specific user (if user.notify === true)

PATCH /users/channels/add           => Add a subreddit to a specific user's favorite subreddits

PATCH /users/channels/remove        => Remove a subreddit from a specific user's favorite subreddits

PATCH /users/notify                 => Change whether a specific user wants to receive daily newsletter (user.notify === true/false)

DELETE /users/:login                => Remove a specific user from the database

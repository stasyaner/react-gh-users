# react-gh-users
An SPA listing github users with details

# the idea
-   Prev/next pagination capable of routing as `/page/:pageNum`
-   Click on avatar to go to the user details

# mentioning
-   You can only page GtiHub /users API via ?since query param.
    Which should equal to the ID of the user you want to page from.
    ID is not sequental. So, we can't figure out the ?since
    if haven't loaded the page previous to the requested.
-   Chose to fetch user details instead of passing from the users array
    as `/user/:username` seemed to have more information than `/users`

# running
Standard react-create-app `npm start`

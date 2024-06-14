Unfortunately, this challenge is very advanced for my current knowledge so I have not managed everything but I am proud of what I have done. And to be honest the things I could not figure out is because I didn't even know how to google to get answers. Oddly, there is not much on youTube about interactive-comments of this sophistication.

I found the HTML more difficult than it looked and so I decided to use display grid to make it work for both the mobile and desktop screens.

This is what I have done:

The user can create, Read, Update, and Delete comments but not replies

The user can only Upvote and downvote comments on the first comment.

I did the timestamps to dynamically track the time (in days) since the comment or reply was posted but just for the one where the user creates a new comment and I know I must do some kind of if statement so that if the days are more than 7 I must divide by 7 to get the number of weeks and same for months and I tried but couldn't manage it.

Replying to a comment adds the new reply to the bottom of the nested replies within that comment.

A confirmation modal pops up before a comment or reply is deleted.

Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.

This is what I have NOT done...yet:

First-level comments are not ordered by their score, and nested replies are not ordered by time added.

The user cannot edit but they can delete their own comments and replies.

I didn't use the json file the way I should have because the active-user bit really threw me for a loop.

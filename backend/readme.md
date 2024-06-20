## Social media app.

# funtionality: A user and view/like/comment post of others and able to add filter according to post catergory

## Entities

Profile
{
username:"",
posts:[
postID1,postID2
],
followers:[username],
following:[username]
}

Post
{id:"",title:"", content:"", createdOn:"",likes:"",category:"",comment_id:""}

Category
[Action, Romance, Cartoon, ANime,.....]
Comments
{
id:"",
content:"",
commentOwner:"",
Comment_on:""
}

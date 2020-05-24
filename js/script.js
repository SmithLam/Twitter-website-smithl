//define a character input
let tweetInput = {
contents: document.getElementById('tweet-input'),
}
let MAX_LETTER = 140
let tweetList = []
//define a tweet ID
let id = 0
//define a tag in order to filter #hashtag/@username
let tag = "";

//FUNCTION TO FILTER/UNFILTER #HASHTAG & @USERNAME
function checkHashtag(word){
    if (word === tag) {
        unHashTag()
    } else {
        hashtagList = tweetList.filter(item => {
            if ('originTweetId' in item){
                words = item.originContents.split(" ")
            }
             else{ words = item.contents.split(" ")}
            return words.includes(word)
        })
        showTweet(hashtagList)
        console.log("The hashtag list is ", hashtagList)
        tag = word;
    }
}

function unHashTag(){
    showTweet(tweetList)
    tag = "";
}
//END FUNCTION TO FILTER/UNFILTER #HASHTAG & @USERNAME

//FUNCTION TO COUNT LETTER
const countLetter = () => {
 //1. get the length of sentence you type into textarea
 let lengthOfSencence = tweetInput.contents.value.length
 //2. MAX_LETTER - the length
 let remainLetter = MAX_LETTER - lengthOfSencence
 //3. show the remain number of char
 if (remainLetter<0){
    document.getElementById("remain-characters").innerHTML = `${remainLetter} letters over`
    document.getElementById("remain-characters").style.color= "red"
    document.getElementById("tweet-button").disabled = true
 } else if (remainLetter === MAX_LETTER){
    document.getElementById("remain-letter").innerHTML = ""
 }
 else {
 document.getElementById("remain-characters").innerHTML = `${remainLetter} letters left`
 document.getElementById("remain-characters").style.color= "black"
 document.getElementById("tweet-button").disabled = false
}
}
//ADD EVENTLISTER TO CHECK INPUT
tweetInput.contents.addEventListener("input", countLetter)
//END FUNCTION TO COUNT LETTER

//FUNCTION TO ADD TWEET
let addTweet = () => {
    let tweetInput = {
        contents: document.getElementById('tweet-input').value,
        isLiked: false,
        id: id
        } 
    //BLOCK CONTENTS = 0    
    if (tweetInput.contents == 0){
            alert ("You must enter something!")
            return null
        }
    //BLOCK CONTENTS = 0
    else{tweetList.unshift(tweetInput)}
    id++
    console.log("Show me your tweet ", tweetInput.contents)
    console.log("Show me your tweet list ", tweetList)
    showTweet(tweetList)
    document.getElementById("tweet-input").value = null
    remainLetter = 100
    document.getElementById("remain-characters").innerHTML = ""
}
//END FUNCTION TO ADD TWEET

//ADD EVENT LISTENER TO PRESS "ENTER" TO TWEET
tweetInput.contents.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("tweet-button").click();
    }
});
//ENTER ADD EVENT LISTENER TO PRESS "ENTER" TO TWEET

//FUNCTION TO SHOWTWEET (RENDER FUNCTION)
let showTweet =(list)=>{
    let tweetTemplate = list.map((item, index) => {
    let contents = ""
    // -Split string into words 
    if ('originTweetId' in item){
        words = item.originContents.split(" ")
    }
     else{ words = item.contents.split(" ")}
    // let words = item.contents.split(" ")
    console.log ("What are words here", words)
    // For loop
    for (let i = 0; i< words.length; i++ ){
        //use slice to check the word needed for https://www.youtube.com/watch?v= (32 letters) && 
        console.log ("What are second to last letter", words[i].slice(0, 32))

        //  if else statement to check for "#" or "@""
        if (words[i][0] == "#" || words[i][0] == "@" ){
            contents += `<a href="#" onclick = 'checkHashtag("${words[i]}")'> ` + words[i] +    `</a>`
            console.log ("What are hastag words here", contents)
        }
        //if else statement to check for image .jpg or .png or .gif
        else if (words[i].slice(-4) == ".jpg" || words[i].slice(-4) == ".png" || words[i].slice(-4) == ".gif") {
            contents += `<img src="${words[i]}" style="height:300px">`
            console.log("What are image here ", contents)
        }
        //if else statement to check if the input is a Youtube video, then put the words[i].slice(32) (the code the "https://www.youtube.com/watch?v=" into www.youtube.com/embed/)
        else if (words[i].slice(0, 32) == "https://www.youtube.com/watch?v="){
            contents += `
            <iframe frameborder="0" allowfullscreen width="420" height="345" src="https://www.youtube.com/embed/${words[i].slice(32)}">
            </iframe>
                        `
        }
        //if nothing else fits then just normal word
        else {
            contents += ` ` + words[i];
            console.log ("What are unhastag words here", contents)
        }
    }
    console.log("What is item here", item)
    //IF TWEET HAS ORIGINTWEETID MEANS THE TWEET IS A RETWEET, THUS IT WILL BE SHOWN AS A RETWEET
    if ('originTweetId' in item){
        return `
        <div class="hidden-middle-retweet">
        <div class="top-hidden-middle-retweet">
            <div class="">
                <i class="far fa-user icon fa-2x"></i>
            </div>
            <div class="">
                <span>
                    <p style="font-size: 12pt; margin-bottom: 0px; font-weight: bold;">USERNAME</p>
                    <p style="font-size: 10pt;">@Username</p>
                </span>
            </div>
        </div>
        <div class="" style="font-size: 14pt;">You reweeted this!</div>
        <div class="box-retweet">
            <div class="box-retweet-contents">
                <div class="title">
                    <i class="far fa-user icon fa-1x" style="margin-right: 0px; font-weight: bold;"></i>
                    <div class="title-top" style="margin-left: 5px; font-weight: bold; font-size: 13pt">USERNAME</div>
                    <div class="title-top">@Username</div>
                    <!-- <div class="title-top">6m</div> -->
                </div>
                <div class="retweet-contents">
                    <p>${contents}</p>
                </div>
            </div>
            <div class="retweet-time">
                <a href="index.html" class="time">Twitter Web App</a>
            </div>
        </div>
        </div>
    `
    }
    //END RETWEET CONTENTS

    //LIKE-UNLIKE - IF ITEM IS LIKED THEN IT HAS .isLiked VALUE YOU CAN IF ELSE IT
    if (item.isLiked){
    return `          
    <div class="row box1">
    <div class="col-1">
        <i class="far fa-user icon fa-2x"></i>
    </div>
    <div class="col">
        <span>
            <p style="font-size: 12pt; margin-bottom: 0px; font-weight: bold;">USERNAME</p>
            <p style="font-size: 10pt;">@USERNAME</p>
        </span>
        <p style="font-size: 12pt; margin-bottom: 0px; word-wrap: break-word;">${contents}</p>
    </div>
    <div class="col-1">
        <i class="fas fa-chevron-down"></i>
    </div>
</div>
<div class="box2">
    <a href="#" onclick="replyTweet()" class="reply-hover"><i class="far fa-comment-alt"></i>
    <a href="#" onclick="retweet(${item.id})" class="retweet-hover"><i class="fas fa-retweet"></i></a>
    <a href="#" onclick="toggleLike(${item.id})" class="heart-hover" id="heart-click"><i class="fas fa-heart" style="color: red"></i></a>
    <a href="#" onclick="share()" class="share-hover"><i class="fas fa-upload"></i></a>
    <a href="#" onclick="removeTweet(${item.id})" class="delete-hover"><i class="far fa-trash-alt"></i></a>
</div>
    `
    }
     else {return `
     <div class="row box1">
     <div class="col-1">
         <i class="far fa-user icon fa-2x"></i>
     </div>
     <div class="col">
         <span>
             <p style="font-size: 12pt; margin-bottom: 0px; font-weight: bold;">USERNAME</p>
             <p style="font-size: 10pt;">@USERNAME</p>
         </span>
         <p style="font-size: 12pt; margin-bottom: 0px; word-wrap: break-word;">${contents}</p>
     </div>
     <div class="col-1">
         <i class="fas fa-chevron-down"></i>
     </div>
    </div>
    <div class="box2">
     <a href="#" onclick="replyTweet()" class="reply-hover"><i class="far fa-comment-alt"></i>
     <a href="#" onclick="retweet(${item.id})" class="retweet-hover"><i class="fas fa-retweet"></i></a>
     <a href="#" onclick="toggleLike(${item.id})" class="heart-hover" id="heart-click"><i class="far fa-heart"></i></a>
     <a href="#" onclick="share()" class="share-hover"><i class="fas fa-upload"></i></a>
     <a href="#" onclick="removeTweet(${item.id})" class="delete-hover"><i class="far fa-trash-alt"></i></a>
    </div>
        `
    }
    // LIKE-UNLIKE FINISH
    }
    ).join('')
    document.getElementById("tweet-area").innerHTML = tweetTemplate 
   
}


//REMOVE TWEET VIA FILTER ID
function removeTweet(deleteID){
    //filter TweetList by filter/letting stay any tweetInput's ID that IS NOT the deleteID
    tweetList = tweetList.filter(tweetInput => tweetInput.id != deleteID)
    //filter TweetList by filter/letting stay any retweetTweet's originTweet ID that is NOT the 
    tweetList = tweetList.filter(retweetTweet => retweetTweet.originTweetId != deleteID)
    showTweet(tweetList)
    }

//RETWEET FUNCTION
function retweet(originId){
    const originalTweet = tweetList.find(tweetInput => tweetInput.id == originId);
    console.log("Your original post is ", originalTweet)
    const retweetTweet = {
        id: id,
        originContents: originalTweet.contents,
        originTweetId: originId,
        isLiked: originalTweet.isLiked,
    }
    console.log("Your retweet is ", retweetTweet)
    tweetList.unshift(retweetTweet)
    showTweet(tweetList)
    id++
}

// SIGN IN TO SHOW DISPLAY NAME/USERNAME AT BOTTOM LEFT
let signIn = () => {
    // 1. get value from user input
    let displayDisplayName = document.getElementById("typeDisplayName").value
    let displayUsername = document.getElementById("typeUsername").value
    // 2. display below
    document.getElementById("showDisplayName").innerHTML = `${displayDisplayName}`
    document.getElementById("showUsername").innerHTML = `@${displayUsername}`
}


// // TOGGLE LIKE/UNLIKE
let toggleLike = (id) => {
    //find the .id of the liked tweet
    let tweetInput = tweetList.find(item => item.id == id) 
    //change the islike value in tweetInput
    tweetInput.isLiked = !(tweetInput.isLiked) // tweetList[i] is object, .isLiked is key's value
    console.log("What are your likes ", tweetInput)
    showTweet(tweetList)
    // save();
}




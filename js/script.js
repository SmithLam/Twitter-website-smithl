let num = 0
let tweetInput = {
    id: num,
    contents: document.getElementById('tweet-input'),
    isLiked: false,
}
let MAX_LETTER = 140
let tweetList = []


//counting the letter
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

tweetInput.contents.addEventListener("input", countLetter)
//ending the countletter

let addTweet = () => {
    let tweetInput = {
        id: num,
        contents: document.getElementById('tweet-input').value,
        isLiked: false,
        parent: null,
        }
    tweetList.push(tweetInput)
    console.log("Show me your tweet ", tweetInput.contents)
    console.log("Show me your tweet list ", tweetList)
    showTweet(tweetList)
    document.getElementById("tweet-input").value = null
    remainLetter = 100
    document.getElementById("remain-letter").innerHTML = ""
}

let showTweet =(list)=>{
    let tweetTemplate = list.map((item, index) => {
    if (item.contents == 0){
            tweetList.splice(index,1)
            alert ("You must enter something!")
            return null 
        }
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
                <p style="font-size: 12pt; margin-bottom: 0px; word-wrap: break-word;">${item.content}</p>
            </div>
            <div class="col-1">
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>
        <div class="box2">
            <a href="#" onclick="replyTweet()" class="reply-hover"><i class="far fa-comment-alt"></i>
            <a href="#" onclick="retweet()" class="retweet-hover"><i class="fas fa-retweet"></i></a>
            <a href="#" onclick="toggleLike(${item.id})" class="heart-hover" id="heart-click"><i class="fas fa-heart" style="color: red"></i></a>
            <a href="#" onclick="share()" class="share-hover"><i class="fas fa-upload"></i></a>
            <a href="#" onclick="removeTweet()" class="delete-hover"><i class="far fa-trash-alt"></i></a>
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
                 <p style="font-size: 12pt; margin-bottom: 0px; word-wrap: break-word;">${item.content}</p>
             </div>
             <div class="col-1">
                 <i class="fas fa-chevron-down"></i>
             </div>
         </div>
         <div class="box2">
             <a href="#" onclick="replyTweet()" class="reply-hover"><i class="far fa-comment-alt"></i>
             <a href="#" onclick="retweet()" class="retweet-hover"><i class="fas fa-retweet"></i></a>
             <a href="#" onclick="toggleLike(${item.id})" class="heart-hover" id="heart-click"><i class="far fa-heart"></i></a>
             <a href="#" onclick="share()" class="share-hover"><i class="fas fa-upload"></i></a>
             <a href="#" onclick="removeTweet()" class="delete-hover"><i class="far fa-trash-alt"></i></a>
         </div>
        `
     }
    }
    ).join('')
    document.getElementById("tweet-area").innerHTML = tweetTemplate 
   
}


function removeTweet(index){
    tweetList.splice(index,1)
    showTweet(tweetList)
    }



    
//1. create new object with old contents
//2. push new object into an array
//3. render again


// // TOGGLE LIKE/UNLIKE
let toggleLike = (id) => {
    let originalTweet = tweetList.find(item => item.id == id) 
    originalTweet.isLiked = !(originalTweet.isLiked) // tweetList[i] is object, .isLiked is key's value
    showTweet(tweetList)
    // save();
}


// SEARCH BY HASHTAG
let searchByHashtag = () => {
    //1. read the value from input
    document.getElementById("tweet-input").value
    //2. assign that value into keyword variable
    // need to change URL in loadNews to be dynamic ${}

    //3. call API again - the function is loadNews()
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

// need to only allow text (no space or special characters) for username



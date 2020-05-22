let tweetInput = {
contents: document.getElementById('tweet-input'),
isLike: false,
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
        contents: document.getElementById('tweet-input').value,
        isLike: false,
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
    if (item.isLike){
    return `          
    <div class="row box1">
    <div class="col-1">
        <i class="far fa-user icon fa-2x"></i>
    </div>
    <div class="col">
        <span>
            <p style="font-size: 12pt; margin-bottom: 0px; font-weight: bold;">GOD</p>
            <p style="font-size: 10pt;">@GOD57016506</p>
        </span>
        <p style="font-size: 12pt; margin-bottom: 0px; word-wrap: break-word;">${item.contents}</p>
    </div>
    <div class="col-1">
        <i class="fas fa-chevron-down"></i>
    </div>
    </div>
    <div class="box2">
    <i class="far fa-comment-alt"></i>
    <i class="fas fa-retweet"></i>
    <i class="far fa-heart"></i>
    <i class="fas fa-upload"></i>
    <i class="far fa-trash-alt"></i>
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
             <p style="font-size: 12pt; margin-bottom: 0px; font-weight: bold;">GOD</p>
             <p style="font-size: 10pt;">@GOD57016506</p>
         </span>
         <p style="font-size: 12pt; margin-bottom: 0px; word-wrap: break-word;">${item.contents}</p>
     </div>
     <div class="col-1">
         <i class="fas fa-chevron-down"></i>
     </div>
    </div>
    <div class="box2">
     <i class="far fa-comment-alt"></i>
     <i class="fas fa-retweet"></i>
     <i class="far fa-heart"></i>
     <i class="fas fa-upload"></i>
     <i class="far fa-trash-alt"></i>
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


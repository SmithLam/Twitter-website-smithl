
let id = 0;
let tweetList = [];
let maxCount = 140;

// Danny's Variables
let page = 1;
let newsList = [];
let apiKey = `c74225add6af4f70b0edb124c26f779e`;
let todoList = [];
let currentUser = "danny"


$('#spinner').show();

// Danny's Function. Get Google API for Trending
let callAPI = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}&page=${page}`
    let data = await fetch(url);
    let result = await data.json();
    console.log("data", data);
    console.log("json", result)

    newsList = newsList.concat(result.articles);
    console.log('data', data);
    console.log('json', result);
    console.log('article list', newsList);

    twitterRender(newsList)
}

function signIn() {
    currentUser = userNameInputArea.value;
    saveTweetList()
}

//set the Areas
let userNameInputArea = document.getElementById("userNameInputArea");
let contentInputArea = document.getElementById("contentInputArea");


//save data to local storage
async function saveTweetList(data) {
    const res = await fetch("https://nguyen-twitter.herokuapp.com/tweets", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await res.json();
    console.log(result)
}

//get data from local storage
async function getTweetList() {
    const res = await fetch("https://nguyen-twitter.herokuapp.com/tweets");
    const data = await res.json()
    console.log('data',data)
    return data || []
}

let countLetter = () => {
    let remain = maxCount - contentInputArea.value.length;
    let charCountArea = document.getElementById('charCountArea');
    let tweetButton = document.getElementById('tweetButton');
    charCountArea.innerHTML = `${remain} characters left`;


    if (remain == 1) {
        charCountArea.innerHTML = `${remain} character left`;
    } else if (remain < 0) {
        tweetButton.disabled = true;
        charCountArea.style.color = "red";
    } else if (remain >= 0) {
        tweetButton.disabled = false;
        charCountArea.style.color = "black";
    }
}

contentInputArea.addEventListener("input", countLetter);

function hashtagFilter(word) {
    let hashtagList = tweetList.filter(item => item.content.includes(word));
    console.log('hashtagList:', hashtagList);
    render(hashtagList);
}

function hashtagFormat(content) {
    let splitContent = content.split(' ')
    console.log('splitContent:', splitContent);

    let contentHTML = splitContent.map(word => {
        if (word.charAt(0) === "#") {
            return `<span href="#" class="text-primary hashtag" onclick="hashtagFilter('${word}')">${word}</span>`
        }
        if (word.charAt(0) === "@") {
            return `<a href="#">${word}</a>`
        }
        else return word;
    }).join(' ');
    console.log('contentHTML:', contentHTML);
    return contentHTML;
}

let addButton = document.getElementById("tweetButton")
addButton.addEventListener("click", addTweet);
//Add a tweet
function addTweet(e) {
    e.preventDefault()
    let content = contentInputArea.value;
    let tweet = {
        id: id,
        user: currentUser,
        content: hashtagFormat(content),
        timePosted: null,
        comments: [],
        likes: []
    }
    tweetList.unshift(tweet);
    console.log('tweetList:', tweetList);
    contentInputArea.value = "";
    charCountArea.innerHTML = `${maxCount} characters left`;
    saveTweetList(tweetList);
    getTweetList();
    render(tweetList);
    id++
}

function checkIfUserHasLike(item) {
    return item.likes.includes(currentUser)  // item here is passed when called, item is a single tweet, and it has likes array inside. This function will return a BOOLEAN
    // if already liked (true) we render "unlike" text, if not liked yet, render "like" 
}

async function render(array) {
    await saveTweetList(array)
    let htmlForTweet = array.map((item) => {
        $('#spinner').hide();
        //when tweet has comments. Print all the comments, then link with original tweet
        if (item.comments && item.comments.length > 0) {
            let htmlForComments = item.comments.map((comment) => {
                console.log('comment.length:', item.comments.length)
                console.log('comment.content:', comment.content)
                return `<div class="retweet-container d-flex pb-3" style="width: 100%">
                <div class="col-2">
                </div>
                <div class="col-10">
                  <div class="card nguyen-card mt-3" style="width: 100%;">
                      <div class="card-body nguyen-card-body d-flex justify-content-center">
                          <div class="left col-2">
                              <img src="logo.png" style="max-width:100%">
                          </div>
                          <div class="right col-10">
                              <h5 class="card-title">${comment.user}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">@${comment.user}</h6>
                              <p class="card-text">${comment.content}</p>
                              </div>      
                      </div>
                    </div>
                </div>
            </div>`
            }).join('')


            return `<div class="card nguyen-card" style="width: 100%;">
                <div class="card-body nguyen-card-body d-flex">
                    <div class="left col-2">
                        <img src="logo.png" style="max-width:100%;">
                    </div>
                    <div class="right col-10">
                        <h5 class="card-title">${item.user}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">@${item.user}</h6>
                        <p class="card-text">${item.content}</p>
                        <a href="#" class="card-link" onclick="toggleLike('${item.id}')">${checkIfUserHasLike(item) ? "Unlike" : "Like"}</a>
                        <a href="#" class="card-link" onclick="comment('${item.id}')">Comment</a>
                        <a href="#" class="card-link" onclick="retweet('${item.id}')">Retweet</a>
                        <a href="#" class="card-link" onclick="deleteTweet(${item.id})">Delete</a>
                    </div>      
                </div>
              </div>` + htmlForComments;
        }

        //when tweet has retweets
        if ('originTweetID' in item) {
            return `<form>
            <div class="card nguyen-card" style="width: 100%;">
                <div class="card-body nguyen-card-body d-flex">
                    <div class="left col-2">
                        <img src="logo.png" style="max-width:100%">
                    </div>
                    <div class="right col-10">
                        <h5 class="card-title">${item.user}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">@${item.user}</h6>
                        <p class="card-text">${item.retweetMessage}</p>
                        <a href="#" class="card-link" onclick="toggleLike('${item.id}')">${checkIfUserHasLike(item) ? "Unlike" : "Like"}</a>
                        <a href="#" class="card-link" onclick="comment('${item.id}')">Comment</a>
                        <a href="#" class="card-link" onclick="retweet('${item.id}')">Retweet</a>
                        <a href="#" class="card-link" onclick="deleteTweet(${item.id})">Delete</a>
                    </div>      
                </div>
              </div>
              <div class="retweet-container d-flex pb-3" style="width: 100%">
                  <div class="col-2">
                  </div>
                  <div class="col-10">
                    <div class="card nguyen-card mt-3" style="width: 100%;">
                        <div class="card-body nguyen-card-body d-flex justify-content-center">
                            <div class="left col-2">
                                <img src="logo.png" width="60px">
                            </div>
                            <div class="right col-10">
                                <h5 class="card-title">${item.originUser}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">@earlpullara</h6>
                                <p class="card-text">${item.originContent}</p>
                            </div>      
                        </div>
                      </div>
                  </div>
              </div>   
            </form>`
        }

        //when tweet has neither retweet nor comment, print tweet.
        return `<form>
        <div class="card nguyen-card" style="width: 100%;">
            <div class="card-body nguyen-card-body d-flex">
                <div class="left col-2">
                    <img src="logo.png" style="max-width:100%"> 
                </div>
                <div class="right col-10">
                    <h5 class="card-title">${item.user}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">@${item.user}</h6>
                    <p class="card-text">${item.content}</p>
                    <a href="#" class="card-link" onclick="toggleLike('${item.id}')">${checkIfUserHasLike(item) ? "Unlike" : "Like"}</a>
                    <a href="#" class="card-link" onclick="comment('${item.id}')">Comment</a>
                    <a href="#" class="card-link" onclick="retweet('${item.id}')">Retweet</a>
                    <a href="#" class="card-link" onclick="deleteTweet(${item.id})">Delete</a>
                </div>      
            </div>
          </div>
      </div>
</form>`
    }).join('')
    document.getElementById("tweetArea").innerHTML = htmlForTweet
}



let twitterRender = (array) => {
    let htmlForNews = array.map((item, index) => {
        return `<div id="newsArea" style="padding: 1em; border-top: 1px solid #D3D3D3; background-color: rgb(250,250,250)">
           <img style="height: 70px; margin-bottom: 1em"
           src="${item.urlToImage}"
               alt="">
           <div>
               <h5 style="font-size: 0.9em">${item.title}</h5>
               <div style="font-style: italic; font-size: 0.5em">${item.author}</div>
               <a href="${item.url}" style="font-size:0.5em">Get Full Coverage</a> 
                <div style="font-size: 0.7em">${item.description}</div>
                <div style="font-size: 0.7em">${moment(item.publishedAt, "YYYYMMDD").fromNow()}</div>
           </div>   
       </div> 
       `;
    }).join('')

    document.getElementById('newsArea').innerHTML = htmlForNews;
}
callAPI()

function toggleLike(tweetID) {
    let targetTweet = tweetList.find(e => e.id == tweetID);
    // now instead of switching true false ( only work with 1 user). We now add the currentuser to the likes array ok
    // but first define the like array first, go back to where we add a new tweet
    // everytime user click this button, we check if that user already like this tweet or not. (using includes method)
    console.log('targetTweet', targetTweet)

    // if yes, we unlike by remove this user from the array
    if (targetTweet.likes.includes(currentUser)) {
        targetTweet.likes = targetTweet.likes.filter(e => e !== currentUser) // filter to keep only users that not match currentUser
    }  // currentUser defined at the top   // if no, we add this user to the like array
    else
        targetTweet.likes.push(currentUser) // pushing currentUser to likes array
    render(tweetList) // now render
}

function retweet(originID) {
    let originTweet = tweetList.find((tweet) => tweet.id == originID);
    console.log("originTweet", originTweet)
    const retweetMessage = prompt('What do you think about this?');
    let retweetObject = {
        id: id,
        originContent: originTweet.content,
        originTweetID: originID,
        originUser: originTweet.user,
        retweetMessage: retweetMessage,
        isLiked: false,
        timePosted: null,
        likes: [],
        user: currentUser
    }
    console.log("retweetObject", retweetObject);
    tweetList.unshift(retweetObject);
    render(tweetList);
    console.log(tweetList);
    id++
}

function comment(originID) {
    let originTweet = tweetList.find(tweet => tweet.id == originID); //get the original tweet
    let commentContent = prompt('Your comment:'); //get comment content
    let commentObject = {
        id: id,
        content: commentContent,
        originID: originID,
        originContent: originTweet.content,
        originUser: originTweet.user,
        likes: [],
        user: currentUser
    }
    originTweet.comments.push(commentObject); //push comment object into original tweet
    render(tweetList);
    id++
}

function deleteTweet(deleteID) {
    //filter OUT tweets without the deleteID -- both origin tweet and retweets
    tweetList = tweetList.filter(tweet => tweet.id !== deleteID && tweet.originTweetID !== deleteID);
    console.log(tweetList);
    render(tweetList);
}

async function runApp() {
    tweetList = await getTweetList()
    render(tweetList);
}

runApp()
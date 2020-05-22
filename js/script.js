// GLOBAL VARIABLES
let tweetList = []

// ADD TWEET
let addTweet = () => {
    let tweet = { // this is the tweet object to push into tweetList
        contents: document.getElementById('itemInput').value, 
        isLiked: false
    }
    tweetList.push(tweet)
    showList(tweetList)
    save()
}

let showList = (list) => { // showList will display every item

}


// TOGGLE LIKE/UNLIKE
let toggleLike = (i) => {
    tweetList[i].isLiked = !(tweetList[i].isLiked) // tweetList[i] is object, .isLiked is key's value
    showList(tweetList)
    save();
}



// RIGHT COLUMN //



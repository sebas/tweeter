/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /*
      <article class="tweet">
      <header>
        <img src="https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png">
        <span class="user-name"><strong>Bill Fields</strong></span>
        <span class="user">@MrFields</span>
      </header>
      <section>
        <span class="the-tweet">Little tweet here</span>
      </section>
      <footer>
        <span>10 days ago</span>
        <img class="interaction" src="https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png" >
      </footer>
    </article>
*/

$( function () {
  function createTweetElement(tweetObject) {
    $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $headerImage = $("<img>").attr("src", tweetObject.user.avatars.small);
    let $nameSpan = $("<span>").addClass("user-name");
    let $nameSpanStrong = $("<strong>").text(tweetObject.user.name);
    $nameSpan.append($nameSpanStrong);
    let $userSpan = $("<span>").addClass("user").text(tweetObject.user.handle);
    $header.append($headerImage);
    $header.append($nameSpan);
    $header.append($userSpan);
    $tweet.append($header);

    let $theTwit = $("<section>");
    let $twitContent = $("<span>").addClass("the-tweet").text(tweetObject.content.text);
    $theTwit.append($twitContent);

    $tweet.append($theTwit);

    let $theFooter = $("<footer>");
    let $footerContent = $("<span>").text(tweetObject.created_at);
    let $footerImage = $("<img>").attr("src","/images/interaction.png").addClass("interaction");

    $theFooter.append($footerContent);
    $theFooter.append($footerImage);

    $tweet.append($theFooter);

    return $tweet;
  }

  function renderTweets(arrayTweetObjects) {
    for (let index = 0; index < arrayTweetObjects.length; index++) {
      const tweet = arrayTweetObjects[index];
      $rndTw = createTweetElement(tweet);
      $('#tweets-container').append($rndTw);
    }
  }

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  // Fake data taken from tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];
  
  renderTweets(data);
})
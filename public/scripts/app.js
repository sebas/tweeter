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
"use strict";

$( function () {
  function createTweetElement(tweetObject) {
    let $tweet = $("<article>").addClass("tweet");
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
      const $rndTw = createTweetElement(tweet);
      $('#tweets-container').append($rndTw);
    }
  }

  function loadTweets() {
    $.ajax('/tweets').then(function(tweets) {
      renderTweets(tweets);
    });
  }

  function ajaxPost () {
    $('form').on("submit", function(event) {
      event.preventDefault();

      let textFromForm = $('.new-tweet textarea').val();
      console.log(textFromForm);
      if(textFromForm.length > 140) {
        alert("Way too long!");
        return;
      }      
      if(textFromForm === '') {
        alert("Not empty please!");
        return;
      }

      let formData = $('form').serialize();
      $.ajax('/tweets', {
        method: 'POST',
        data: formData
      }).then(function() {
        $('.new-tweet textarea').val('');
      }).then(function() {
        loadTweets();
      });
    });
  }

  ajaxPost();
  loadTweets();
})
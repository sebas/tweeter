/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
"use strict";

$( function () {

  function convertMiliseconds(milliseconds) {
      
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
    
    total_seconds = parseInt(Math.floor(milliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);

    if( days > 1 ) {
      return days + " days ago";
    }

    if(hours > 1) {
      return hours + " hour ago";
    }

    if (minutes > 1 ) {
      return minutes + " minute ago";
    }  
    
    switch(format) {
    case 's':
      return total_seconds;
      break;
    case 'm':
      return total_minutes;
      break;
    case 'h':
      return total_hours;
      break;
    case 'd':
      return days;
      break;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
    }
  };

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
    let $footerContent = $("<span>").text(moment(new Date(tweetObject.created_at)).fromNow());
    let $footerImage = $("<img>").attr("src","/images/interaction.png").addClass("interaction");

    $theFooter.append($footerContent);
    $theFooter.append($footerImage);

    $tweet.append($theFooter);

    return $tweet;
  }

  function renderTweets(arrayTweetObjects) {
    $('#tweets-container').empty();
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

  function toggleForm () {
    $('#compose').on("click", function() {
      $(".new-tweet").slideToggle();
      $(".new-tweet textarea").focus();
    });
  }

  function ajaxPost () {
    $('form').on("submit", function(event) {
      event.preventDefault();
      $('.error').slideUp();

      let textFromForm = $('.new-tweet textarea').val();
      if(textFromForm.length > 140) {
        $('.error').text("Way too long!").slideToggle();
        return;
      }      
      if(textFromForm === '') {
        $('.error').text("Not empty please!").slideToggle();
        return;
      }

      let formData = $('form').serialize();
      $.ajax('/tweets', {
        method: 'POST',
        data: formData
      }).then(function() {
        $('.new-tweet textarea').val('');
        $('.counter').text('140');
      }).then(function() {
        loadTweets();
      });
    });
  }

  toggleForm();
  ajaxPost();
  loadTweets();
});
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
"use strict";

$( function () {

  // This function creates the html for a new tweet 
  // it follows the html and styles that we defined at the start.
  // We do it by parts
  // a) the header
  // b) the tweet
  // c) the footer
  // then we put the parts in to the real tweet
  // and return it to the caller.
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

  // We get an array of tweet objects and prepare them for display.
  // First step is to clear what we currently have, the container in our 
  // DOM, to avoid duplication.
  // We then loop the array and call createTweetElement to get the
  // tweet from object to html and then we add it to the container
  // where they are displayed.
  function renderTweets(arrayTweetObjects) {
    $('#tweets-container').empty();
    for (let index = 0; index < arrayTweetObjects.length; index++) {
      const tweet = arrayTweetObjects[index];
      const $rndTw = createTweetElement(tweet);
      $('#tweets-container').append($rndTw);
    }
  }

  // We do a ajax request to get the tweets from our API/backend
  // what we get back, when we get it, that is why the "then"
  // we get them rendered by calling renderTweets, that also get them
  // displayed.
  function loadTweets() {
    $.ajax('/tweets').then(function(tweets) {
      renderTweets(tweets);
    });
  }

  // We create a event listener on for the click event
  // on our compose button that way when our user clicks
  // the compose button on the nav bar at the top we toggle
  // the compose form. It is animated with the slide toggle
  // animation provided by jQuery.
  // It also give focus to the textarea in the form.
  function toggleForm () {
    $('#compose').on("click", function() {
      $(".new-tweet").slideToggle();
      $(".new-tweet textarea").focus();
    });
  }

  // When a user composes a new tweet, and clicks the submit button
  // we catch it in here and interrupt the normal flow by preventing
  // the default behaviour, in that way we can do validation and
  // submit it using AJAX in our own terms.
  // This function also checks that the textarea in the form is
  // not empty or that there are no more than 140 characters on it.
  // If there is either one of those conditions it displays an error message.
  // If there are no errors then we do a AJAX post to our backend, to store the
  // information in the database and make it persistent.
  // Once we come back from saving the infometion we then (async) clear the
  // textarea in the form and reset the counter.
  // Once we are done with that, we load (reload) the tweets that are in the
  // database and display them. Using the loadTweets function.
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


  // When the server starts we call this functions to get the page setup.
  // We need to register the event listeners and load the tweets that
  // we have in the database.
  toggleForm();
  ajaxPost();
  loadTweets();
});
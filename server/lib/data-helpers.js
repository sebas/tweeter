"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    // We are using Mongo DB which supports collections an documments.
    // Our collection is tweets and we store documents, tweets in it.
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback(null, true));
    },

    // Get all tweets in `db`
    // We query our collection for all the documents "tweets" that is contains
    // (there are no conditions in the find) and we want an array back.
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    }

  };
};

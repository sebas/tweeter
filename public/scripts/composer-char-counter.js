"use strict";

$(document).ready(function() {
  $('textarea').on('input', function(event) {
    let charactersLeft = 140 - this.value.length;
    $(this).parent().children('span').text(charactersLeft);
    if (charactersLeft < 0) {
      $(this).parent().children('span').addClass('exceded');
    } else {
      $(this).parent().children('span').removeClass('exceded');
    }
  })
});
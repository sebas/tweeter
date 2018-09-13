"use strict";

$(document).ready(function() {
  $('textarea').on('input', function(event) {
    let charactersLeft = 140 - this.value.length;
    $(this).parent().children('.counter').text(charactersLeft);
    if (charactersLeft < 0) {
      $(this).parent().children('.counter').addClass('exceded');
    } else {
      $(this).parent().children('.counter').removeClass('exceded');
    }
  })
});
$(document).ready(function() {
  $('textarea').on('keydown', function(event) {
    let charactersLeft = 140 - this.value.length;
    $(this).parent().children('span').text(charactersLeft);
    if (charactersLeft < 0) {
      $('.counter').addClass('exceded');
    } else {
      $('.counter').removeClass('exceded');
    }
  })
});
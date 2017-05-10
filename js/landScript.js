$(document).ready(function() {
  //'pics/darkTable.jpg',
  var imgArr = [ 'pics/feildDusk.jpg', 'pics/forestShroom.jpeg', 'pics/cherries.jpeg', 'pics/chocoTruffles.jpeg', 'pics/muffins.jpg', 'pics/tea.jpeg', 'pics/pome.jpeg', 'pics/panini.jpg', 'pics/toastSpread.jpeg', 'pics/sushi.jpeg', 'pics/grapePaint.jpeg', 'pics/modernBoard.jpeg' ]

  //shuffleImages(imgArr,1000);

  // function shuffleImages(imgArr,delay) {
  //   setTimeout(function () {
  //
  //       $('img').attr('src',imgArr.shift());
  //           if (imgArr.length !== 0) {
  //             shuffleImages(imgArr, delay);
  //           }
  //   },delay)
  // }

  function shuffleImages(imgArr,delay) {
    setTimeout(function () {
      $('img').fadeOut('fast', function(){
        $('img').attr('src',imgArr.shift());
        $('img').fadeIn('fast', function() {
            if (imgArr.length !== 0) {
              shuffleImages(imgArr, delay);
            }
        });
      })
    },delay)
  }

  // $('.btn_cont').append("<button type='button' class='btn btn-default btn-lg text-center'></button>");
  // $('button').text('Get Started')


});//end doc ready

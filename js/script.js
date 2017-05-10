$(document).ready(function() {

  //create slider with tooltip
  var addedStars = 0;
  var slideVal = 500;
  var slider = $("#slider").slider({
    value: 240,
    min: 0,
    max: 480,
    step: 20,
    start: function( event, ui ) {
      // console.log(ui);
      $(ui.handle).find('.ui-slider-tooltip').show();
    },
    stop: function( event, ui ) {
      $(ui.handle).find('.ui-slider-tooltip').hide();
    },
    slide: function(event, ui) {
        $(ui.handle).find('.ui-slider-tooltip').text(ui.value+ "min");
    },
    create: function( event, ui ) {
      var tooltip = $('<div class="ui-slider-tooltip" />').css({
          position: 'absolute',
          top: -25,
          left: -10
      });
      $(event.target).find('.ui-slider-handle').append(tooltip);
    },
    change: function(event, ui) {
      slideVal = ui.value;
    }
    });


  //Ingredient Modals
  function makeModal(list){
    //creating modal elements
    var $listElem = list;
    //$listElem.css('display','initial');
    $modalContainer = $("<div id ='myModal' class= 'modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='myLargeModalLabel'>");
    $smallModal = $("<div class = 'modal-dialog modal-sm' role = 'document'></div>");
    $modalContent = $("<div class='modal-content'></div>");
    $modalHead = $("<div class = 'modal-header'></div>")
    $modalBtn = $("<button type='button' class='close' data-dismiss='modal' aria-label='Close'></button>");
    $buttonSpan = $("<span aria-hidden='true'>&times;</span>");
    $modalTitle = $("<h4 class = 'modal-title'>Ingredients</h4>");
    $modalBody = $("<div class = 'modal-body ingred_modal_body'></div>");
    //appending modal elements
    $modalContainer.append($smallModal);
    $smallModal.append($modalContent);
    $modalContent.append($modalHead);
    $modalHead.append($modalBtn);
    $modalBtn.append($buttonSpan);
    $modalHead.append($modalTitle);
    $modalContent.append($modalBody);
    $modalBody.append($listElem)
    $('body').append($modalContainer);
  }

  //recipe Modals
  function makeRecipeModal(address){
    //creating modal elements
    var $listElem = address;
    $modalContainer = $("<div id ='recipeModal' class= 'modal fade bs-example-modal-lg' tabindex='-1' role='dialog' aria-labelledby='myLargeModalLabel'>");
    $largeModal = $("<div class = 'modal-dialog modal-lg' role = 'document'></div>");
    $modalContent = $("<div class='modal-content'></div>");
    $modalContent.css('height', '1000px');
    $modalIframe = $("<iframe class ='recipeIframe'></iframe>");
    $modalIframe.attr("src", address);
    $modalIframe.css("width", "100%");
    $modalIframe.css("height", "100%");
    $modalContainer.append($largeModal);
    $largeModal.append($modalContent);
    $modalContent.append($modalIframe);
    $('body').append($modalContainer);
  }

  //make cards
  function makeCard(title, img, rate, time, arr, count, source){
    //creating elements
    let cardRow = $('.cards_row');
    let cardCol = $("<div class = 'col-sm-3' ></div>");
    let panelClass = $("<div class = 'panel panel-default recipe_panel'></div>");
    let panelHead = $("<div class = 'panel-heading'></div>");
    let panelTitle = $("<h3 class = 'panel-title'></div>");
    let panelBody = $("<div class = 'panel-body'></div>");
    let panelImg = $("<img class = 'img-responsive'>");
    let recTitle = $("<div = class 'title'></div>");
    let recipeTitle = $("<h5 class = 'text-center'></h5>");
    recipeTitle.css('margin-bottom', '0px');
    let details = $("<div class = 'details'></div>");
    let $cookTime = $("<div class = 'cook_time text-center'></div>");
    $cookTime.text(time);
    let ingredHead = $("<p class = 'ingredHead '></p>");
    ingredHead.text('  Ingredients...');
    ingredHead.css("cursor", "pointer")
    ingredHead.hover(function(){
      $(this).css("color", "blue");
    }, function(){
    $(this).css("color", "black");
    })
    let divRating = $("<div class = 'ratings text-center'></div>");
    let $ingredUl = $("<ul></ul>");
    $ingredUl.css("list-style", "none");
    $ingredUl.css("display", "none");
    let $cardBtnDiv = $("<div class = 'card_btn_div'></div>");
    let $recipeBtn = $("<button type='button' class='gets get_recipe btn btn-primary btn-sm'></button>");
    $recipeBtn.text('GET RECIPE');
    $recipeBtn.attr("value", source);
    let $groceryBtn = $("<button type='button' class='gets get_grocery btn btn-primary btn-sm'></button>");
    $groceryBtn.text('GET GROCERY LIST');

    //appending elements
    for(let i = 0; i < rate; i++){
      divRating.append($("<span class='glyphicon glyphicon-star' aria-hidden='true' style = 'color:blue'></span>"));
    }
    for(let i = 0; i < arr.length; i++){
      let $li = $("<li class = 'ingredient_item'>"+arr[i]+"<li>");
      $ingredUl.append($li);
      $ingredUl.append("<br>");
    }
    panelTitle.text(title);
    panelImg.attr("src", ""+img+"");
    cardRow.append(cardCol);
    cardCol.append(panelClass);
    //panelClass.append(panelHead);
    //panelHead.append(panelTitle);
    panelClass.append(panelBody);
    panelBody.append(panelImg);
    panelBody.append(recTitle);
    recTitle.append(recipeTitle);
    recipeTitle.text(title);
    panelBody.append(details);
    details.append($cookTime);
    details.append(divRating);
    details.append(ingredHead);
    details.append($cardBtnDiv);
    $cardBtnDiv.append($recipeBtn);
    $cardBtnDiv.append($groceryBtn);
    ingredHead.append($ingredUl);
  }

  //"add_btn" functionality
  var tAText = [];
  var searchText;
  var count = 0;
  $('.add_btn').click(function(){
    if($("#recipe").prop("checked")){
      if(tAText.length !== 0){
        alert('You can only search for one recipe at a time');
        $('.add_text').val('');
      }
      else{
        tAText.push($('.add_text').val());
        $('.add_text').val('');
        $('textarea').text(tAText.join(" "));
      }
    }
    else {
      tAText.push($('.add_text').val());
      $('.add_text').val('');
      $('textarea').text(tAText.join(" "));
    }
  });//end add_btn listenter

  function genCard(data){
    for (var i = 0; i < data.length; i++) {
      let results2 = data[i];
      if(addedStars === 0){
        var title = results2.name;
        var img = results2.images[0].hostedLargeUrl;
        var ingredients = results2.ingredientLines;
        var rate = results2.rating;
        var time = results2.totalTime;
        var source = results2.attribution.url;
        makeCard(title, img, rate, time, ingredients, count, source);
        count++;
      }
      else if(results2.rating < addedStars){
      }
      else{
        //console.log(results2);
        var title = results2.name;
        var img = results2.images[0].hostedLargeUrl;
        var ingredients = results2.ingredientLines;
        var rate = results2.rating;
        var time = results2.totalTime;
        var source = results2.attribution.url;
        makeCard(title, img, rate, time, ingredients, count, source);
        count++;
      }
    }//end for loop
  }
  function getRecipeModal(){
    $('.get_recipe').click(function(){
      let $target = $(event.target);
      let $value = $target.val()
      if($('#recipeModal').get(0)){
        $('.recipeIframe').attr("src", $value)
      }
      else{
        makeRecipeModal($value);
      }
      $('#recipeModal').modal({show:true})
    });
  }
  function getIngredientModal(){
    $('.ingredHead').click(function(event){
      let $target = $(event.target);
      var $text = $target.children().clone();
      if($('#myModal').get(0)){
        $('.ingred_modal_body').text('');
        $text.css('display', 'initial');
        $('.ingred_modal_body').append($text.get(0));
      }
      else{
        $text.css('display', 'initial');
        makeModal($text);
      }
      $('#myModal').modal({show:true})
    });//end ingredient click
  }

  //on main Search
  $('.primary_search').click(function(){
    $('.cards_row').text('');
    if($("#recipe").prop("checked")){
      searchText = tAText[0];
      let seconds = slideVal*60;
      let timeSearchParam = "&maxTotalTimeInSeconds="+seconds;
      $xhr = $.getJSON('https://g-yumly.herokuapp.com/v1/api/recipes?q='+searchText+'&requirePictures=true&maxResult=40'+timeSearchParam);
      $xhr.done(function(data){
        if ($xhr.status !== 200) {
          return;
        }
        var result = data.matches;
        var promiseArr = [];
        for(let i = 0; i < result.length; i++){
          var key = result[i].id;
          console.log(key);
          promiseArr.push($.getJSON('https://g-yumly.herokuapp.com/v1/api/recipe/'+key));
        }//end for
        Promise.all(promiseArr).then(function(data){
          genCard(data)
          getIngredientModal();
          getRecipeModal();
          groceryClick();
        });
      });
    }//end if
    else if($("#ingredients").prop("checked")){
      searchText = tAText;
      queryString = '';
      let seconds = slideVal*60;
      let timeSearchParam = "&maxTotalTimeInSeconds="+seconds;
      for(let i = 0; i < searchText.length; i++){
        amp = '&allowedIngredient[]=';
        queryString+=amp+searchText[i];
      }//end for
      $xhr = $.getJSON('https://g-yumly.herokuapp.com/v1/api/recipes?q=&requirePictures=true&maxResult=40'+queryString+timeSearchParam);
      $xhr.done(function(data){
        if ($xhr.status !== 200) {
          return;
        }
        var result = data.matches;
        var promiseArr = [];
        for(let i = 0; i < result.length; i++){
          var key = result[i].id
          promiseArr.push($.getJSON('https://g-yumly.herokuapp.com/v1/api/recipe/'+key));
        }//end for
        Promise.all(promiseArr).then(function(data){
          console.log(data)
          genCard(data);
          getIngredientModal();
          getRecipeModal();
        });
      });
    }//end else if
    $('.add_text').val('');
    $('textarea').text('');
    tAText.length = 0;
    eraseColor();
  });// end primary search function

  //menu rating functionality
  function eraseColor(){
     $('.rate_stars').addClass('rate_stars glyphicon glyphicon-star-empty');
  }
  $('.rate_stars').click(function(){
    $target = $(event.target);
    if($target.is('#one')){
      eraseColor();
      $target.removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $target.css("color", "blue");
      addedStars = 1;
      console.log(addedStars);
    }
    else if($target.is('#two')){
      eraseColor();
      $('#one').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#one').css("color", "blue");
      $('#two').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#two').css("color", "blue");
      addedStars = 2;
    }
    else if($target.is('#three')){
      eraseColor();
      $('#one').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#one').css("color", "blue");
      $('#two').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#two').css("color", "blue");
      $('#three').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#three').css("color", "blue");
      addedStars = 3;
    }
    else if($target.is('#four')){
      eraseColor();
      $('#one').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#one').css("color", "blue");
      $('#two').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#two').css("color", "blue");
      $('#three').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#three').css("color", "blue");
      $('#four').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#four').css("color", "blue");
      addedStars = 4;
    }
    else if($target.is('#five')){
      eraseColor();
      $('#one').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#one').css("color", "blue");
      $('#two').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#two').css("color", "blue");
      $('#three').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#three').css("color", "blue");
      $('#four').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#four').css("color", "blue");
      $('#five').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
      $('#five').css("color", "blue");
      addedStars = 5;
    }
  });

  function makeGroceryArea($ul){
    let $groceryRow = $("<div class = 'row grocery_row'></div>");
    let $listCol = $("<div class = 'grocery_list_col col-xs-12 col-sm-6'></div>");
    let $listDiv = $("<div class = 'list_div'></div>");
    let $title = $("<h4 class = 'grocery_title'></h4>");
    $title.text('Grocery List');

    $('.container').append($groceryRow);
    $groceryRow.append($listCol);
    $listCol.append($listDiv);
    $listDiv.append($title);
    $listDiv.append($ul);

  }

function groceryClick(){
  $('.get_grocery').click(function(event){
    let $target = $(event.target);
    let parents = $target.parent().siblings()[2].children[0];
    console.log(parents)
    let $ul = $(parents);
    let $ulClone = $ul.clone();
    $ulClone.css('display', 'initial');
    console.log($ul);
    makeGroceryArea($ulClone);
  })
}

});

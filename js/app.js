(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');
      console.log(movie.Plot)

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie["Title"]
      });

      $title.tooltip({ delay: 50 }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.imdbID}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.imdbID);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  $(".btn-large").on("click", function(){
    event.preventDefault();
    movies.length = 0;
    let mvSearch = $("#search").val();
    $.getJSON("http://www.omdbapi.com/?apikey=966e7722&s=" + mvSearch,
        (data) => {
          let results = data["Search"];
          for(var i = 0; i < results.length; i++){
            movies.push(results[i]);
          }
        }).then(function(){
          addPlot(movies)
        })
        setTimeout(function(){
            renderMovies();
        }, 2000)
  })

  function addPlot(arra){
    for(var i = 0; i < arra.length; i++){
      let idNum = arra[i]["imdbID"]
      let obj = arra[i]
      $.getJSON("http://www.omdbapi.com/?apikey=966e7722&i=" + idNum,
            (data) => {
               obj["Plot"] = data["Plot"]
            })
    }
  }

})();

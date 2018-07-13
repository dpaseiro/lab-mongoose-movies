// Use axios to route API to appropriate page. (usually
// response.data.blah)

$('.movie-button').click(function(){
  // console.log('test')
  axios.get('/api/movies')
  .then((response)=>{
    
    response.data.forEach((eachMovie)=>{
      const movieDiv = `
      <h2> ${eachMovie.title} </h2>
      <p>  genre: ${eachMovie.genre} </p>
      <h5> actors: ${eachMovie.actor}</h5>
      <h5>  plot: ${eachMovie.plot} </h5> 

      <br><br>
      <hr>
      `
      $('.movie-list').append(movieDiv);
    })
    
    
  });
});
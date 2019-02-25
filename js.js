var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");
var urls = ['http://localhost:3000/animals-1', 
            'http://localhost:3000/animals-2',
            'http://localhost:3000/animals-3'];



var timesFetched = 0;
var background = '';


btn.addEventListener("click", function() {
  var ourRequest =  new XMLHttpRequest();
  ourRequest.open('GET', urls[timesFetched]);
  ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData, background)
  };
  ourRequest.send();
  timesFetched++;
  console.log(timesFetched)
  if(timesFetched == urls.length) {
    this.classList.add('hide-me');
  }
  
  switch (timesFetched % 2 == 0) {
    case true: 
      background = 'gray';
      break;
    case false: 
      background = 'white';
      break;
  }

});


function renderHTML(data, bgColor) {
  var htmlString = "";

  for (var i=0; i <data.length; i++) {
    var {name, species, foods, likes, dislikes} =  data[i];

    htmlString += `<p style="background: ${bgColor};">${name} is a ${species} !"</p>`;
  }

  animalContainer.insertAdjacentHTML('beforeend', htmlString);

  
}


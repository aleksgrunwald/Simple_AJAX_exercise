var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");
var urls = ['http://localhost:3000/animals-1', 
            'http://localhost:3000/animals-2',
            'http://localhost:3000/animals-3'];



var timesFetched = 0;
var background = '';

function getData(urle) {
  return new Promise(function(resolve, reject) {
    var ourRequest =  new XMLHttpRequest();
    ourRequest.onload = function() {
      var data;

      if (ourRequest.status >= 200 && ourRequest.status < 400) {
          data = JSON.parse(ourRequest.responseText);
          resolve(data);
      } else {
        reject();
      };
    };
    ourRequest.open('GET', urle, true);
    ourRequest.send();
  });
};


function renderHTML(data, bgColor) {
  var htmlString = "";

  for (var i=0; i <data.length; i++) {
    var {name, species, foods, likes, dislikes} =  data[i];

    htmlString += `<p style="background: ${bgColor};">${name} is a ${species} !"</p>`;
  };

  animalContainer.insertAdjacentHTML('beforeend', htmlString);
};


btn.addEventListener("click", function() {
  getData(urls[timesFetched])
    .then(
      function(data) {
        renderHTML(data, background);
        timesFetched++;
        console.log(timesFetched)
        if (timesFetched == urls.length) {
          btn.classList.add('hide-me');
        };    
        switch (timesFetched % 2 == 0) {
          case true: 
            background = 'pink';
            break;
          case false: 
            background = 'white';
            break;
        }
      },
      function() {
        console.log('is not fullfilled')
      }
     );
});



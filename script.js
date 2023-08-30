document.addEventListener("DOMContentLoaded", function(event) {

  var large = document.querySelector("#largeFileContent");
  var small = document.querySelector("#smallFileContent");

  loadFileXhr('./largefile.txt', function(text) {
    console.log(text.length);
    large.innerHTML += '<p>' + text.length + '</p>';
  } );
  loadFileFetch('./largefile.txt', function(text) {
    console.log(text.length);
    large.innerHTML += '<p>' + text.length + '</p>';
  });

  loadFileXhr('./smallfile.txt', function(text) {
    console.log(text.length);
    small.innerHTML += '<p>' + text.length + '</p>';
  } );
  loadFileFetch('./smallfile.txt', function(text) {
    console.log(text.length);
    small.innerHTML += '<p>' + text.length + '</p>';
  });

});

function loadFileXhr(url, ok) {
  var request = new XMLHttpRequest();
  
  request.open('GET', url, true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      ok(request.responseText)
    }
  }
  request.send(null);
}

function loadFileFetch(url, ok) {
  fetch(url)
  .then(response => response.text())
  .then(text => {
    ok(text);
  });
}
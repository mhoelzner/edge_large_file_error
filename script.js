document.addEventListener("DOMContentLoaded", function(event) {
  loadFileXhr('./largefile.txt', function(text) {
    console.log(text.length);
    document.body.innerHTML += '<p>' + text.length + '</p>';
  } );
  loadFileFetch('./largeFile.txt', function(text) {
    console.log(text.length);
    document.body.innerHTML += '<p>' + text.length + '</p>';
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
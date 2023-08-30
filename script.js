document.addEventListener("DOMContentLoaded", function(event) {
  loadFile('./largefile.txt', function(text) {
    console.log(text.length);
  } );
  loadFileFetch('./largeFile.txt', function(text) {
    console.log(text.length);
  });
});

function loadFile(url, ok, err) {
  var request = new XMLHttpRequest();
  request.overrideMimeType('text/plain');
  request.open('GET', url + (/\?/.test(url) ? '&' : '?') + new Date().getTime(), true);
  request.addEventListener(
      'load',
      function (event) {
          var response = event.target.response;
          if (this.status === 200) {
              if (ok) {
                  ok(response);
              }
          } else if (this.status === 0) {
              // Some browsers return HTTP Status 0 when using non-http protocol
              // e.g. 'file://' or 'data://'. Handle as success.
              console.warn('loadFile: HTTP Status 0 received.');
              if (ok) {
                  ok(response);
              }
          } else {
              if (err) {
                  err(event);
              }
          }
      },
      false
  );

  request.addEventListener(
      'error',
      function (event) {
          if (err) {
              err(event);
          }
      },
      false
  );
  request.send(null);
}

async function loadFileFetch(url, ok) {
  const response = await fetch(url);
  const content = await response.text();
  ok(content);
}
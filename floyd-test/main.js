let style = null;
let currentStyleStr = 'bororo';
let takePicBtn;
let inputImg;
let resultImg;
let respContainer;
let styleOptionsContainer;

let dropzone;
let selectedOptionEl;
let loaderEl;



const styles = [
  'rain_princess',
  'wreck',
  'la_muse',
  'udnie',
  'wave',
  'scream',
];

let currentStyle = styles[0];

function decodeResp(response) {
  // var img = new Image();
  // var response = xhr.responseText;
  var binary = ""
  
  for(i=0;i<response.length;i++){
    binary += String.fromCharCode(response.charCodeAt(i) & 0xff);
  }
  
  return 'data:image/jpeg;base64,' + btoa(binary);
  // respContainer.appendChild(img);
}

function init() {
  loaderEl = document.querySelector('.loader');
  respContainer = document.getElementById('respContainer');
  dropzone = new Dropzone('#inputFilesContainer', {url: '/'});
  dropzone.on("addedfile", function(file) {
    loaderEl.style.display = 'flex';
    sendReq(file).then((resp, text) => {
      
      var outputImg = new Image();
      outputImg.src = decodeResp(resp);
      respContainer.appendChild(outputImg);
      loaderEl.style.display = 'none';

    }, (err) => {
      console.log('err: ', err);
    });
  });

  selectedOptionEl = document.querySelector('.selected-option');
  selectedOptionEl.innerHTML = currentStyle;

  styleOptionsContainer = document.querySelector('.style-options');
  for (let i = 0; i < styles.length; i++) {
    const el = document.createElement('h4');
    el.innerHTML = styles[i];
    el.addEventListener('click', () => {
      currentStyle = styles[i];
      selectedOptionEl.innerHTML = currentStyle;
    });

    styleOptionsContainer.appendChild(el);
  }
}

function sendReq(fileDropped) {
  data = new FormData();
  data.set('file', fileDropped);
  data.set('checkpoint', `${currentStyle}.ckpt`);

  return new Promise(function(resolve, reject) {
    // do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('post', 'https://www.floydlabs.com/serve/M9J34nNPjztEsTKrAaKtNY', true);
    // req.responseType = "blob";

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };

    // handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    req.overrideMimeType('text/plain; charset=x-user-defined');
    // make the request
    req.send(data);
    //same thing if i hardcode like
    //req.send("limit=2");
  });

  // let request = new XMLHttpRequest();
  // request.open("POST", 'https://www.floydlabs.com/serve/GzSrM5d2kzZRkxGm6d3V6E', true);
  // request.send(data)
}

window.addEventListener('load', function () {
  init();
});

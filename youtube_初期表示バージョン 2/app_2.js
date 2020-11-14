document.addEventListener('DOMContentLoaded', function () {
  // document.getElementById('btn').addEventListener('click', function () {
    ajaxRequest();
  // });

  function ajaxRequest() {
    let result = document.getElementById('result');


    

    // let xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4) {
        // if (xhr.status === 200) {
        //   result.textContent = '';
        //   console.log(xhr.responseText);
        //   let res = JSON.parse(xhr.responseText);
        //   console.log(res);
        //   for (item of res.items) {
        //     renderResult(item);
        //   }

        // } else {
        //   result.textContent = 'サーバーエラー';
        // }
      // } else {
      //   result.textContent = '通信中';
      // }
    // }

    let url = 'https://www.googleapis.com/youtube/v3/search?key=';
    let key = 'AIzaSyD3X7Ti3d5GgXGdCHP1RfBaEPROkdscjVg';
    let part = '&part=snippet&maxResults=50';
    // let q = '&q=' + document.getElementById('name').value;
    let q = '&q=沖縄';
    let type = '&type=video';
    // xhr.open('GET', url + key + part + q + type, false);
    // xhr.send(null);

    fetch(url + key + part + q + type, {
      method: "GET",
    }).then(response => response.text())
    .then(text => {
      console.log(text);
      let res = JSON.parse(text);
        //   console.log(res);
        for (item of res.items) {
          renderResult(item);
        }
    });
  }

  function renderResult(item) {

    //取得した内容を変数に格納
    let title = item.snippet.title;
    let thumbnail = item.snippet.thumbnails.medium;
    let videoId = item.id.videoId;

    //要素を組み立てる
    let img = document.createElement('img');
    let anchor = document.createElement('a');
    let text = document.createElement('p');
    let li = document.createElement('li');
    let iframe = document.createElement('iframe');

    iframe.width = thumbnail.width;
    iframe.height = thumbnail.height;
    iframe.src = 'https://www.youtube.com/embed/' + videoId;
    iframe.frameborder = 0;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    // <iframe width="560" height="315" src="https://www.youtube.com/embed/gVnqrWtS6TQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    img.src = thumbnail.url;
    img.alt = title;
    img.width = thumbnail.width;
    img.height = thumbnail.height;

    anchor.href = 'https://www.youtube.com/watch?v=' + videoId;

    text.textContent = title;

    //画面に表示
    anchor.appendChild(img);
    li.appendChild(anchor);
    li.appendChild(text);
    li.appendChild(iframe);
    document.getElementById('result').appendChild(li);
  }

});
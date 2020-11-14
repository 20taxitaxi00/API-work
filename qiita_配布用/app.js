$(function() {
  $('#btn').on('click', function(){
    ajaxRequest();
  });

  function ajaxRequest() {
    let tag = $('#name').val();
    let url = 'https://qiita.com/api/v2/tags/'+ tag +'/items?page=1&per_page=10';

    $.ajax({
      url: url,
      type: 'GET',
    })
    .done(function(data) {
      // JSON形式のデータが、配列の形に変形された状態で引数dataに渡されている
      console.log(data)
      renderResult(data);
    })
    .fail(function(error) {
    // サーバーエラーの時
    })
  }

  function renderResult(data) {
      console.log(data)

    $('#result').text('');
    for (item of data) {
      let ancher = $('<a>').text(item.title).attr('href', item.url);
      $('#result').append(ancher).append($('<br>'));
    }
  }
});
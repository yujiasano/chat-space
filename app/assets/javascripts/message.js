$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
      `<div class="message">
        <div class="main__messages--list">
          <div class="main__messages--list--title">
            <div class="main__messages--list--title--name">
              ${message.user_name}
            </div>
            <div class="main__messages--list--title--create">
              ${message.created_at}
            </div>
          </div>
          <div class="main__messages--list--message">
            <p class="lower-message__content">
              ${message.content}
            </p>   
            <img class="lower-message__image" src= ${message.image}>    
          </div>
        </div>
      </div>`
    } else {
      var html = 
      `<div class="message">
        <div class="main__messages--list">
          <div class="main__messages--list--title">
            <div class="main__messages--list--title--name">
              ${message.user_name}
            </div>
            <div class="main__messages--list--title--create">
              ${message.created_at}
            </div>
          </div>
          <div class="main__messages--list--message">
            <p class="lower-message__content">
              ${message.content}
            </p>    
          </div>
        </div>
      </div>`
    }
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data)
      $('.main__messages--lists').append(html);
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit_btn').prop('disabled', false);    
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
});
$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
      `<div class="message" data-message-id=${message.id}>
        <div class="main__messages--list" >
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
      `<div class="message" data-message-id=${message.id}>
        <div class="main__messages--list" >
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

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type:"get",
      dataType: "json",
      data: { id: last_message_id }
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__messages--lists').append(insertHTML);
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      }
    })
  
    .fail(function(){
      alert("error");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
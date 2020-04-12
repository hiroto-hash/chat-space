$(function(){
     function buildHTML(message) {
       if ( message.image ) {
         var html =
         `<div class="message">
            <div class="message__upper-info">
              <p class="message__upper-info__talker">
                ${message.user_name}
              </p>
              <p class="message__upper-info__date">
                ${message.created_at}
              </p>
            </div>
              <p class="message__text"></p>
              <p class="lower-message__content">
               ${message.content} 
              </p>
              <p></p>
              <img src=${message.image} >
          </div>`
          return html;
       }else {
        var html = 
        `<div class="message">
            <div class="message__upper-info">
              <p class="message__upper-info__talker">
                ${message.user_name}
              </p>
              <p class="message__upper-info__date">
                ${message.created_at}
              </p>
            </div>
              <p class="message__text"></p>
              <p class="lower-message__content">
                ${message.content} 
              </p>
              <p></p>
        </div>`
        return html;
       };
      }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        $('form')[0].reset();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }).fail(function() {
        alert("メッセージ送信に失敗しました");
      }).always(() => {
        $(".submit-btn").removeAttr("disabled");
      });
  });
});
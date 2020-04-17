$(function(){
     function buildHTML(message) { 
       if ( message.image ) {
         var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="upper-info">
              <p class="upper-info__talker">
                ${message.user_name}
              </p>
              <p class="upper-info__date">
                ${message.created_at}
              </p>
            </div>
            <div class = "lower-message">
              <p class="lower-message__content">
               ${message.content} 
              </p>
              <img src=${message.image} >
            </div>  
          </div>`
      }else{
        var html = 
          `<div class="message" data-message-id=${message.id}>
              <div class="upper-info">
                <p class="upper-info__talker">
                  ${message.user_name}
                </p>
                <p class="upper-info__date">
                  ${message.created_at}
                </p>
              </div>
              <div class = "lower-message">
                <p class="message__text"></p>
                <p class="lower-message__content">
                  ${message.content} 
                </p>
                </div>  
             </div>`
       };
       return html;
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


      var reloadMessages = function () {
        if (document.location.href.match(/\/groups\/\d+\/messages/)) {
          var last_message_id = $('.message:last').data("message-id");
            $.ajax({
              url: "api/messages",
              type: 'get',
              dataType: 'json',
              data: {id: last_message_id}
            })
            .done(function(messages) {
              if (messages.length !== 0) {
                var insertHTML = '';
                $.each(messages,function(i,message) {
                  insertHTML += buildHTML(message)
                });
                $('.messages').append(insertHTML);
                $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
              }
            })
           .fail(function(e) {
              alert('error');
            });
        } 
      };
      setInterval(reloadMessages, 7000);
});
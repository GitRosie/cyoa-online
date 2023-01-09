$(function () {
    let socket = io('http://localhost:3000');

    let name = prompt('What is your name?');
    
    //Show that you successfully joined the chat.
    prependMsg('You joined the chat', 'message sent')
    socket.emit('new-user', name)
    
        socket.on('received message', data => {
            prependMsg(data.name + ": " + data.message, 'message');
        });
    
        socket.on('user-connected', name => {
            prependMsg(name +' joined the chat', 'message');
        });
    
        socket.on('user-disconnected', name => {
            let msg = ''
            prependMsg(name + ' left the chat', 'message');
        });
    
        // Send button clicked, sends message
        $("#send").click( () => {
            let msg = $("#msg").val();
            if (msg.length > 0) {
                socket.emit('send message', msg);
                prependMsg('You: ' + msg, 'message sent');
            }
        });
    
        //Enter pressed while in textbox, sends message
        $("#msg").keypress(e => {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if(keycode == 13) {
                let msg = $("#msg").val();
                if (msg.length > 0) {
                    socket.emit('send message', msg);
                    prependMsg('You: ' + msg, 'message sent');
                } else {
                    $("#messages").prepend("<p class=\"empty\">No message entered</p>");
                }
            }
        });
    });
    
    //Add message text to page
    function prependMsg(msg, msgClass){
        $("#messages").prepend("<p class=\""+ msgClass + "\">" + msg + "</p>");
        $("#msg").val("");
    }
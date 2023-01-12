let socket;
$(function () {
    socket = io('http://localhost:4000');
    //check if there is a cookie storing name
    checkCookie()

    //Initialise votes
    //let votes = {};
    //$('.btn').each((i, obj) => {
        //console.log(obj.id);
        //votes[i] = "{ label: " + obj.id + ", votes:  0},";
    //});
    //console.log(votes);

    // ##### CHAT FEATURES #####
    socket.on('received-message', data => {
        prependMsg(data.name + ": " + data.message, 'message');
    });

    socket.once('user-connected', name => {
        prependMsg(name + ' joined the chat', 'message');
    });

    socket.once('user-disconnected', name => {
        prependMsg(name + ' left the chat', 'message');
    });

    socket.on('nextId', nextId => {
        directToNextNode(nextId);
    });

    socket.on('user-voted', data => {
        //Let other players know someone has voted
        prependMsg(data.name + ' has voted.', 'message');
        //add to votes
        //Once all players have voted take the highest votes and pass into url
    });

    // Send button clicked, sends message
    $("#send").click(() => {
        let msg = $("#msg").val();
        if (msg.length > 0) {
            socket.emit('send-message', msg);
            prependMsg('You: ' + msg, 'message sent');
        }
    });

    //Enter pressed while in textbox, sends message
    $("#msg").keypress(e => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13) {
            let msg = $("#msg").val();
            if (msg.length > 0) {
                socket.emit('send-message', msg);
                prependMsg('You: ' + msg, 'message sent');
            } else {
                $("#messages").prepend("<p class=\"empty\">No message entered</p>");
            }
        }
    });

    //##### GAMEPLAY #####
    //One of the option buttons clicked
    $(".btn").click((e) => {
        let vote = e.target.id;
        //console.log(vote);
        let voteText = $(e.target).html();
        socket.emit('vote', vote)
        prependMsg('You voted: ' + voteText, 'message sent');
    });
});

function directToNextNode(nextId) {
    url = 'http://localhost:4000/' + nextId;
    console.log(url)
    location.href = url;
};

//Add message text to page
function prependMsg(msg, msgClass) {
    $("#messages").prepend("<p class=\"" + msgClass + "\">" + msg + "</p>");
    $("#msg").val("");
};

function checkCookie() {
    let username = getCookie("username");
    if (username != "") {
        //Show that you successfully joined the chat.
        prependMsg('You joined the chat', 'message sent')
        socket.emit('new-user', username)
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        } else {
            username = 'Guest';
        }
        //Show that you successfully joined the chat.
        prependMsg('You joined the chat', 'message sent')
        socket.emit('new-user', username)
    };
};

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
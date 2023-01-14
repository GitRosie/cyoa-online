function rgb2hex(color) {
    var digits = /(.*?)rgba\((\d+), (\d+), (\d+), (\d+)\)/.exec(color);
    if (digits == null) {
        digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    }
    var red = parseInt(digits[2],10);
    var green = parseInt(digits[3],10);
    var blue = parseInt(digits[4],10);
    var rgb = blue | (green << 8) | (red << 16);
    if(red == 0){
        return digits[1] + '#00' + rgb.toString(16);
    }else{
        return digits[1] + '#' + rgb.toString(16);
    }
}

//HTML Tests
suite("HTML tests", function() {

    test("1.1: Check that the page title is 'Text Adventure'", function() {
        chai.assert.equal($("title").text(), "Text Adventure", "Page title is incorrect");
    });

    test("1.2: Add a div to the page with the class 'topnav'", function () {
        chai.assert.equal($(".topnav").prop("nodeName"), "DIV", "div with class 'topnav' not found in page");
    });

    test("1.3: Add a div to the page with the class 'col-8 col-s-12'", function () {
        chai.assert.equal($(".col-8").prop("nodeName"), "DIV", "div with ID 'col-8 col-s-12' not found in page");
        chai.assert.equal($(".col-s-12").prop("nodeName"), "DIV", "div with ID 'col-8 col-s-12' not found in page");
    });

    test("1.4: Add a div to the page with the ID 'text'", function () {
        chai.assert.equal($("#text").prop("nodeName"), "DIV", "div with ID 'text' not found in page");
    });

    test("1.5: Add a div with the class 'btn-grid' and an ID of 'option-buttons'", function () {
        chai.assert.equal($("#option-buttons").prop("nodeName"), "DIV", "div with ID 'option-buttons' not found in page");
        chai.assert.isTrue($("#option-buttons").hasClass("btn-grid"), "div with ID 'option-buttons' has the wrong class");
    });

    test("1.6: Check that page contains buttons with the class 'btn'.", function() {
        chai.assert.equal($(".btn").prop("nodeName"), "BUTTON", "button with class 'btn' not found in page");
    });

    test("1.7: Check that page contains a div with the class 'col-4 col-s-12'", function() {
        chai.assert.equal($(".col-4").prop("nodeName"), "DIV", "div with the class 'col-4 col-s-12' not found in page");
        chai.assert.equal($(".col-s-12").prop("nodeName"), "DIV", "div with the class 'col-4 col-s-12' not found in page");
    });

    test("1.8: Add a div to the page with the ID 'messages'", function () {
        chai.assert.equal($("#messages").prop("nodeName"), "DIV", "div with ID 'messages' not found in page");
    });

    test("1.9: Check the page contains an input of type text. It should have the ID 'msg'", function() {
        chai.assert.equal($("#msg").prop("nodeName"), "INPUT", "Input with id 'msg' not found in page");
        chai.assert.equal($("#msg").prop("type"), "text", "Input with ID 'msg' has the wrong type");
    });

    test("1.10: Check that page contains a button with the id 'send'.", function() {
        chai.assert.equal($("#send").prop("nodeName"), "BUTTON", "button with ID 'send' not found in page");
    });

});

// CSS Tests
 suite("CSS tests", function() {

    test("2.1: Set the text to Segoe UI font.", function() {
        let font = $("body").css("font-family");
        chai.assert.equal(font, "\"Segoe UI\"", "Body element has wrong font");
    });

    test("2.2: The text in the level one heading should be 36px", function() {
        let fontSize = $("#storyTitle").css("font-size");
        chai.assert.equal("36px", fontSize, "Level one heading has the wrong font size");
    });

    test("2.3: The chat should have a background colour of #33b5e5", function() {
        let chatBG = rgb2hex($(".aside").css("background-color"));
        chai.assert.equal(chatBG, "#33b5e5", "Chat has the wrong background colour");
    });

    test("2.3: The nav bar should have a background colour of #213113", function() {
        let navbarBG = rgb2hex($(".topnav").css("background-color"));
        chai.assert.equal(navbarBG, "#213113", "The nav bar is wrong colour");
    });
}); 
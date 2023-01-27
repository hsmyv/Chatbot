var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');
var httpRequest = new XMLHttpRequest();

var user = {meals:[]};
var phpWords = ["php", "web", "hi", "yo", "hey"];
var isTechnologyMenu = false;
let menu = [
    {},
    {number:1, title:"PHP", price:24, img:"imgs/php.jpg"},
    {number:2, title:"PHP(laravel)",  img:"imgs/laravel.jpg"},
    {number:3, title:"JavaScript",    img:"imgs/js.png"}
];

setTimeout(function(){
    chatbotSendMessage("Hi, welcome to Assistant of Technology");
    
    
        // chatbotSendMessage("please choose your option : (number)");
        // showMenu();
        
    
    
},500);

function phpMenu()
{
        chatbotSendMessage("please choose your option : (number)");
        showMenu();
}



function chatbotSendMessage(messageText)
{
        var messageElement = document.createElement('div');
        messageElement.classList.add('w-50');
        messageElement.classList.add('float-left');
        messageElement.classList.add('shadow-sm');
        messageElement.style.margin = "10px";
        messageElement.style.padding = "5px";

        messageElement.innerHTML = "<span>Chatbot: </span>" + 
        "<span style="+"margin-top:10px; padding:10px"+">" + messageText + "</span>";

        messageElement.animate([{easing:"ease-in", opacity:0.4},{opacity:1}], {duration:500})
        chatContainer.appendChild(messageElement);

        chatContainer.scrollTop = chatContainer.scrollHeight;
}



function server_response(){
    if(httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200){
        var result = JSON.parse(httpRequest.responseText);
        var messageElement = document.createElement('div');
        messageElement.classList.add('w-50');
        messageElement.classList.add('float-left');
        messageElement.classList.add('shadow-sm');
        messageElement.style.margin = "10px";
        messageElement.style.padding = "5px";

        messageElement.innerHTML = "<span>You: </span>" + 
        "<span style="+"margin-top:10px; padding:10px"+">" + result.response_message + "</span>";

        messageElement.animate([{easing:"ease-in", opacity:0.4},{opacity:1}], {duration:500})
        chatContainer.appendChild(messageElement);
         
    }
}


function sendMessage(messageText){
    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50');
    messageElement.classList.add('float-right');
    messageElement.classList.add('shadow-sm');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "5px";

    messageElement.innerHTML = "<span>You: </span>" + 
    "<span style="+"margin-top:10px; padding:10px"+">" + messageText + "</span>";

    messageElement.animate([{easing:"ease-in", opacity:0.4},{opacity:1}], {duration:500})
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    makeRequest(messageText);

}

function makeRequest(messageText)
{
    //ajax
    httpRequest.open("GET", 'chatbot.php?message=' + messageText, true);
    httpRequest.send();
    httpRequest.onreadystatechange = server_response;
}


sendBtn.addEventListener('click', function(e){
    if(textbox.value == ""){
        alert('Please type in a message');
    }else{
        let messageText = textbox.value;
        sendMessage(messageText);
        textbox.value = "";
        phpDisplay(messageText);
        if(isTechnologyMenu)
        {
            technologyResponseToUser(messageText);
        }
    }
    
});
function phpDisplay(messageText)
{
    
    if(phpWords.some((h) => messageText.includes(h.trim().toLowerCase())))
        {
            phpMenu();
        }
}


function technologyResponseToUser(messageText)
{
     //get number from user
     let userChoice = parseInt(messageText.trim());
     switch (userChoice) {
        case 1:
            chatbotSendMessage("you chose: " + menu[1].title);
            chatbotSendMessage("<br><img style='width:100px;' src=" + menu[1].img + "/>");
            user.meals.push(menu[1]);
            break;
        case 2:
            chatbotSendMessage("you chose: " + menu[2].title);
            chatbotSendMessage("<br><img style='width:100px;' src=" + menu[2].img + "/>");
            user.meals.push(menu[2]);
            break;
        case 3:
             chatbotSendMessage("you chose: " + menu[3].title);
            chatbotSendMessage("<br><img style='width:100px;' src=" + menu[3].img + "/>");
            user.meals.push(menu[3]);
            break;
        default:
            chatbotSendMessage("please choose a valid number");
            break;
     }
}
function showMenu()
{
    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50');
    messageElement.classList.add('float-left');
    messageElement.classList.add('shadow-sm');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "5px";

    for (let i = 1; i < menu.length; i++) {
        messageElement.innerHTML += "<br>" +
        "<span>Chatbot: </span>" + 
        "<span style="+"margin-top:10px; padding:10px"+">" 
                + menu[i].number + " - " + menu[i].title + "</span>" +
                "<br>"+
                "<img style='width:100px; margin-left:20px' src="+menu[i].img+"/>" +
                "<br>";   
    }
    messageElement.animate([{easing:"ease-in", opacity:0.4},{opacity:1}], {duration:500})
    chatContainer.appendChild(messageElement);
}
let text = document.querySelectorAll("h1, h2, h3, h4, h5, p, b, li, td, caption, span, a , i , div");
//console.log(text.toLowerCase());
for (let i=0; i<text.length; i++) 
{
    //for(let j=0; j<blockedWord.length; j++) {}
    text_segment = text[i].innerHTML
    if(text_segment.toLocaleLowerCase().includes("football")) 
    {
        text[i].innerHTML = text[i].innerHTML.replaceAll("football","<b>basketball</b>");
        text[i].innerHTML = text[i].innerHTML.replaceAll("Football","<b>basketball</b>");
    };
};

// function to send messages to background or popup
function messageBackground(key){
    // send message to chrome
    chrome.runtime.sendMessage({
        message: `${key}`
    }, response => {
        if(response.message === "success"){
            if(key === "retrieveRules"){}
            // do this
            // could specify what to do based on input keywords
        };
    })
}

// function to listen for message recieve
function receiveMessage(key, sentData){
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if(request.message === `${key}`){
            if(chrome.runtime.lastError){
                sendResponse({
                    message: "fail"
                });

                return;
            }
            sendResponse({
                message: "success",
                payload: sentData
            });
            
            return true;
        }
    });
};

//messageBackground("retrieveRules");


/*
    send message to background to extract the data from storage
    extract the blocked words and the replacements
    call a function that alters the visible text



*/
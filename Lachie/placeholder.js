
// function to send messages to background or popup
function messageBackground(key){
    // send message to chrome
    chrome.runtime.sendMessage({
        message: `${key}`
    }, response => {
        if(response.message === "success"){
            // do this
            // could specify what to do based on input keywords
        }
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



// function to retrieve from storage


/*
    add presets to storage
    retrieve the 

*/
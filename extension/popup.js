chrome.runtime.sendMessage({
    message: "get_name"
}, response => {
    if(response.message === "success"){
        document.querySelector("span").innerHTML = `Hello ${response.payload}`;
    }
});

/*
    retrieve words from popup, or from storage
    send words and rules to foreground in a message (this will require tabid)

*/

chrome.runtime.sendMessage({
    message: "getTabId"
}, response => {
    if(response.message === "success"){
        console.log(response.payload);
    }
});
// retrieve the tab id so that we can inject script onto 
/*chrome.runtime.sendmessage({
    message: "getTabId"
}, response => {
    if(response.message === "success"){
        // send message to foreground
        chrome.tabs.sendMessage(response.payload, {
            message: "changeWords",
            payload: "array of words to change"
        })
    }
});
*/
// run only once, upon installation of extension into chrome
// or runs again upon reinstall
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        // here is where we would store our user generic user class
        data: {
            name: "Eilish",
            age: "19"
        }
    });
});

// runs whenever the active tab is changed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === "complete" && /^http/.test(tab.url)){
        // injects the foreground.js script into the active tab
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["foreground.js"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT.");

                // send the tab id message here to the popup and add a message listener to popup
            })
            .catch(err => console.log(err));
    } 
    
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "get_name"){
        chrome.storage.local.get("name", data => {
            if(chrome.runtime.lastError){
                sendResponse({
                    message: "fail"
                });

                return;
            }
            sendResponse({
                message: "success", // what the background will send back
                payload: data.name // the data that will be sent back
            });
        });

        return true;
    }
});


/* 
    when the storage is changed send a message to the foreground to change the display
*/

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "getTabId"){
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        sendResponse({
            message: "success",
            payload: tab
        });

        return true;
    }
});
*/

//chrome.runtime.sendMessage() ; sends message to background and popup
//chrome.tabs.sendMessage() ; sends message to foreground
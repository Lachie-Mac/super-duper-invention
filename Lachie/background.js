// run only once, upon installation of extension into chrome
// or runs again upon reinstall
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        // here is where we would store our user generic user class
        test: {
            replace: ["football"],
            substitute: ["soccer"]
        },
        data: {
            active: true,
            dictionary: [],
            personas: [],
            pin: "0000",
            pinStatus: false,
            parentalActive: false,
            bolding: true,
            ruleCount: 0
        }
    });
});

chrome.storage.local.get("data", info => {
    //console.log(info);
})

let currentTab = 0;
// runs whenever the active tab is changed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    currentTab = tabId;
    if(changeInfo.status === "complete" && /^http/.test(tab.url)){
        // injects the foreground.js script into the active tab
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["foreground.js"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT.");
                //console.log(currentTab);
                // send the tab id message here to the popup and add a message listener to popup
            })
            .catch(err => console.log(err));
    } 
    
});

let data = {};
// listen for the update popup data call
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "updatePopupData"){
        data = request.payload;
        console.log(`RECEIVED DATA FROM POPUP: ${data.replace} ${data.substitute}`);
        // update the storage
        chrome.storage.local.set({
            test: data
        });

        // send response back to popup
        sendResponse({
            message: "success",
            payload: currentTab
        });

        return true;

    }
});



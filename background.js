// run only once, upon installation of extension into chrome
// or runs again upon reinstall
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        // here is where we store our factory data settings
        dataTemp: {
            extensionActive: true,
            dictionary: [],
            activePersonas: [],
            pin: "0000",
            parentalActive: false,
            bolding: true,
        },
        extensionActive: true,
        dictionary: [{
            blockWord: "football",
            subWord: "cog",
        },
        {
            blockWord: "what",
            subWord: "shit",
        }],
        personaDictionary: [],
        activePersonas: [{
            name: "Donald Trump",
            active: false
        },
        {
            name: "12-year-old",
            active: true
        },
        {
            name: "Influencer",
            active: true
        }],

        pin: "0000",
        parentalActive: false,
        bolding: false,
        currentTabId: "",
        baseHTML: ""
    });
});


// runs whenever the active tab is changed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tabId);
    chrome.storage.local.set({
        currentTabId: tabId
    });
    if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
        // injects the foreground.js script into the active tab
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["foreground.js"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT");
                chrome.tabs.sendMessage(tabId.currentTabId, {
                    message: "triggerReplace",
                    payload: false
                });
            })
            .catch(err => console.log(err));
    }

});




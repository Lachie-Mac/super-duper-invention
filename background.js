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
        data: {
            extensionActive: true,
            dictionary: [{
                blockWord: "football",
                subWord: "cog",
                redaction: false
            },
            {
                blockWord: "and",
                subWord: "shit",
                redaction: true
            }],
            activePersonas: [{
                name: "placeholder1",
                active: false
            },
            {
                name: "placeholder2",
                active: true
            }],
            pin: "0000",
            parentalActive: false,
            bolding: false,
        }
    });
});


let currentTab = 0;

// runs whenever the active tab is changed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    currentTab = tabId;
    if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
        // injects the foreground.js script into the active tab
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["foreground.js"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT");
            })
            .catch(err => console.log(err));
    }

});


//Object Creation for storing the info
userInfo = {
    dictionary: [],
    personas: [],
    active: false,
    bolded: true,
    pin: null,
    pinStatus: false,
    ruleCount: 0
};

let replace = ["football", "and"];
let substitute = ["australian soccer", "test"];

let button = document.getElementById("saveChanges");
button.addEventListener("click", function() {
    // variable to hold tabId
    let tabId = 0;
    // call getInfo function
    // for now we will use placeholder information
    let data = {
        replace: replace,
        substitute: substitute
    };
    console.log("BUTTON WAS CLICKED");

    // send message to background with the pulled data
    chrome.runtime.sendMessage({
        message: "updatePopupData",
        payload: data
    }, response => {
        if(response.message === "success"){
            console.log("DATA RECEIVED BY BACKGROUND");
            tabId = response.payload;
            // send message to foreground with pulled data
            console.log("NEED TO UPDATE TEXT");
            // not sending to foreground
            chrome.tabs.sendMessage(tabId, {
                message: "updateText",
                payload: data 
            });
        }
    });
});






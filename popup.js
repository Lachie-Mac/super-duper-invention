// object to store all personas
let allPersonas = [{name: "placeholder1",
                    dictionary: [{
                        blockWord: "block1",
                        subWord: "sub1",
                        redaction: false},]
                    },
                    {name: "placeholder2",
                    dictionary: [{
                        blockWord: "block2",
                        subWord: "sub1",
                        redaction: false}]
}];

// default data variable to store all the neccessary info that popup requires
let popupData = {};

// listen for call receiving data from background upon active tab change
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "sendingStoredData"){
        // store data in popupData
        popupData = response.payload;

        // scan to check which active personas are used
        let activePersonas = popupData.activePersonas;
        for(let i=0; i<activePersonas.length; i++){
            // check to see which persona from allPersonas it equals
            for(let j=0; j<allPersonas.length; j++){
                if(activePersonas[i] === allPersonas[j]){
                    // push blocked words to the dictionary
                    popupData.dictionary.push(allPersonas[j].dictionary);
                }
            }
        }

        // check whether parental lock is active
        let parentalStatus = popupData.parentalActive;
        if(parentalStatus === false){
            // display page as normal
        }
        else if(parentalStatus === true){
            // lock the rules, personas, appearance, settings, etc
            // alter the parental lock appearance
        }

        sendResponse({
            message: "success"
        });
    }
})


//
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

    // replace with let data = popupData
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







function updateWords(revertActive)
{
    // pull data and collate into big object
    chrome.storage.local.get(["extensionActive","dictionary","personaDictionary","activePersonas","pin","parentalActive","bolding"], (res) => {
        let data = {
            extensionActive: res.extensionActive,
            dictionary: res.dictionary,
            personaDictionary: res.personaDictionary,
            activePersonas: res.activePersonas,
            pin: res.pin,
            parentalActive: res.parentalActive,
            bolding: res.bolding
        }
    });

    if(!revertActive)
    {
        let bigString = document.body.innerHTML;   

        // RULES - case insensitive, word detection is a bit shet (words must not have letters either side, but dont necessarily need spaces either side)
        let rules = [{blockWord: "football",
                subWord: "<b>basketball</b> "},
                {blockWord: "Football",
                subWord: "<b>Basketball</b> "},
                {blockWord: "The",
                subWord: "<b>THE</b>"},
                {blockWord: "the",
                subWord: "<b>THE</b>"}]

        for(let i=0;i<rules.length;i++) // rules loop
        {
            for(let j=0;j<bigString.length;j++) // string loop
            {
                let tester = bigString.substring(j,j+(rules[i].blockWord.length)); 
                if(rules[i].blockWord==tester)
                {
                    for(let k=j+rules[i].blockWord.length;k<bigString.length;k++)
                    {
                        let testletter = bigString.substring(k,k+1);
                        if(testletter=="<") // good word
                        {
                            let before = bigString.slice(0,j);
                            let after = bigString.slice(j+rules[i].blockWord.length,bigString.length);
                            bigString = before + rules[i].subWord + after;
                            console.log(`Change ${tester}`);
                            break;
                        }
                        else if(bigString.substring(k,k+1)==">")
                        {
                            break;
                        }
                    }
                }
            }
        }
        console.log("finished all html")
        document.body.innerHTML = bigString;
    }

    else // revert Page to original
    {
        // retrieve base html
        chrome.storage.local.get("baseHTML", res => {
            document.body.innerHTML = res.baseHTML;
        })
    }
}

// pull data from storage upon injection
let userData = {};
chrome.storage.local.get(["extensionActive","dictionary","personaDictionary","activePersonas","pin","parentalActive","bolding"], (res) => {
    let data = {
        extensionActive: res.extensionActive,
        dictionary: res.dictionary,
        personaDictionary: res.personaDictionary,
        activePersonas: res.activePersonas,
        pin: res.pin,
        parentalActive: res.parentalActive,
        bolding: res.bolding
    }
    console.log(data);
    /*
    let popupData = data;
    // scan to check which active personas are used
    let activePersonas = popupData.activePersonas;
    for(let i=0; i<activePersonas.length; i++){
        if(activePersonas[i].active){
            for(let j=0; j<allPersonas[i].dictionary.length; j++){
                popupData.personaDictionary.push(allPersonas[i].dictionary[j]);
            }
        }
    }
    */

    let toggleStatus = data.extensionActive;
    let revertActive = false;
    if(toggleStatus){
        updateWords(revertActive);
    }
});


// on load need to retrieve the base html and store it in storage
let bigString = document.body.innerHTML;
chrome.storage.local.set({
    baseHTML: bigString
});


// listener to trigger displaying replaced words
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "triggerReplace"){
        let revertActive = request.payload;
        // retrieve data from storage
        updateWords(revertActive);
        
        sendResponse({
            message: "success"
        });

        return true;
    }
});


// listener to trigger reset display
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "triggerReset"){
        let revertActive = request.payload;
        // make call to function 
        updateWords(revertActive);

        sendResponse({
            message: "success"
        });

        return true;
    }
})

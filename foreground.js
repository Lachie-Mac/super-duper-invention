
function updateWords(revertActive)
{
    // pull data and collate into big object
    let data = {};
    chrome.storage.local.get(["extensionActive","dictionary","personaDictionary","activePersonas","pin","parentalActive","bolding"], (res) => {
        data = {
            extensionActive: res.extensionActive,
            dictionary: res.dictionary,
            personaDictionary: res.personaDictionary,
            activePersonas: res.activePersonas,
            pin: res.pin,
            parentalActive: res.parentalActive,
            bolding: res.bolding
        }
        let first_duplicate =  data.dictionary;
        let second_duplicate = [];
        let bolded = data.bolding;

        data = data.dictionary;

        for (let i = 0; i < data.length; i++){
            first_duplicate[i] = {blockWord: data[i].blockWord,
                        subWord: data[i].subWord}
        }

        for (let i = 0; i < data.length; i++){
            second_duplicate.push({blockWord: capitalise(data[i].blockWord),
                subWord: capitalise(data[i].subWord)});
        }

        let new_duplicate = first_duplicate;
        for(let k=0; k<second_duplicate.length; k++){
            new_duplicate.push(second_duplicate[k]);
        }

        if(!revertActive)
        {
            let rules;
            let bigString = document.body.innerHTML;   
            
            if (bolded){
                rules = [];
                for (let i = 0; i < new_duplicate.length; i++){
                    rules.push({blockWord: `${new_duplicate[i].blockWord}`,
                    subWord: `<b>${new_duplicate[i].subWord}</b>`});
                };
            }
            else{
                rules = new_duplicate;
            }
            
            // RULES - case insensitive, word detection is a bit shet (words must not have letters either side, but dont necessarily need spaces either side)
            for(let i=0;i<rules.length;i++) // rules loop
            {
                for(let j=0;j<bigString.length;j++) // string loop
                {
                    let tester = bigString.substring(j,j+(rules[i].blockWord.length)); 
                    if(rules[i].blockWord==tester)
                    {
                        if ( !isLetter(bigString.charAt(j-1)) &&  !isLetter(bigString.charAt(j+rules[i].blockWord.length))){
                        for(let k=j+rules[i].blockWord.length;k<bigString.length;k++)
                    {
                        let testletter = bigString.substring(k,k+1);
                        if(testletter=="<") // good word
                        {
                            let before = bigString.slice(0,j);
                            let after = bigString.slice(j+rules[i].blockWord.length,bigString.length);
                            bigString = before + rules[i].subWord + after;
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
            }
            document.body.innerHTML = bigString;
        }

        else // revert Page to original
        {
            // retrieve base html
            chrome.storage.local.get("baseHTML", res => {
                document.body.innerHTML = res.baseHTML;
            })
        }
    });
};

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  function capitalise(str){
    if (typeof(str) !== 'string') {return ''; }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// pull data from storage upon injection
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

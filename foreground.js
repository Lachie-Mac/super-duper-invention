// storing all personas so that updateWords can access its data
let allPersonas = [{name: "Donald Trump",
dictionary: [{
    blockWord: "Donald Trump",
    subWord: "Toupee Wearing Orange Demon"},
{
    blockWord: "Donald John Trump",
    subWord: "Toupee Wearing Orange Demon"},
{
    blockWord: "fake news",
    subWord: "news the wrinkly orange sack does not agree with"},
{
    blockWord: "Make America Great Again",
    subWord: "turn America into a sh*thole"
}]
},
{name: "12-year-old",
dictionary: [{
    blockWord: "sheesh",
    subWord: "*immature sounds*"},
{
    blockWord: "lit",
    subWord: "excellent"},
{
    blockWord: "vibe check",
    subWord: "how are you?"
}]
},
{name: "Influencer",
dictionary: [{
    blockWord: "entrepreneur",
    subWord: "owner of a social media account"},
{
    blockWord: "cancelled",
    subWord: "called out for being a bad person"},
{
    blockWord: "influencer",
    subWord: "vapid narcissist"
}
]}];

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

        // add active personas to dictionary
        let activePersonas = data.activePersonas;
        for(let z=0; z<activePersonas.length; z++){
            if(activePersonas[z].active){
                for(let w=0; w<allPersonas[z].dictionary.length; w++){
                    data.dictionary.push(allPersonas[z].dictionary[w]);
                }
            }
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

    let toggleStatus = data.extensionActive;
    let revertActive = false;
    if(toggleStatus){
        updateWords(revertActive);
    }
});


// on load need to retrieve the base html and store it in storage
let basePage = document.body.innerHTML;
chrome.storage.local.set({
    baseHTML: basePage
});


// listener to trigger displaying replaced words
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "triggerReplace"){
        let revertActive = request.payload;
        // retrieve data from storage
        chrome.storage.local.get("extensionActive", res => {
            if(res.extensionActive){
                updateWords(revertActive);

            }
        });
        
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

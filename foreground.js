
function updateWords(data,revertActive)
{
    let first_duplicate =  []
    let second_duplicate = []
    let bolded = true

    for (let i = 0; i < data.length; i++){
        first_duplicate[i] = {blockWord: data[i].blockWord,
                    subWord: data[i].subWord}
    }

    for (let i = 0; i < data.length; i++){
        second_duplicate[i] = {blockWord: capitalise(data[i].blockWord),
                    subWord: capitalise(data[i].subWord)}
    }

    new_duplicate = first_duplicate.concat(second_duplicate)

    if(!revertActive)
    {
        let rules;
        let bigString = document.body.innerHTML;   
        
        if (bolded){
            rules = []
            for (let i = 0; i < new_duplicate.length; i++){
                rules[i] = {blockWord: `${new_duplicate[i].blockWord}`,
                              subWord: `<b>${new_duplicate[i].subWord}</b>`}
              }
        }
        else{
            rules = new_duplicate
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
        
    }
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  function capitalise(str){
    if (typeof(str) !== 'string') {return ''; }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// pull data from storage upon injection
let userData = {};
chrome.storage.local.get('data', data => {
    // check toggle status
    let toggleStatus = data.data.extensionActive;
    if(toggleStatus){
        // load the text replacement
        replaceWords();
    }
}); 

// listener to trigger reload
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "triggerReplace"){
        let revertActive = request.payload;
        // retrieve data from storage
        chrome.storage.local.get("data", data => {
            // placholder
            updateWords(data,revertActive);
            // replaceWords(data.data);
        });
        
        sendResponse({
            message: "success"
        });

        return true;
    }
});

/*
// listener to trigger display replaced text
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "triggerReload"){
        chrome.storage.local.get('data', data => {
            replaceWords(data.data);
        });
        sendResponse({
            message: "success"
        });
    }
});

//window.location.reload();
*/
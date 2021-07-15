// pull data from storage upon injection
let userData = {};
chrome.storage.local.get('data', data => {
    // check toggle status
    let toggleStatus = data.data.extensionActive;
    if(toggleStatus){
        // load the text replacement
        replaceWords(data.data);
    }
}); 

function replaceWords()
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

// // function to replace given texts with substitutes
// function replaceWords(data){
//     let words = data.dictionary;
//     let boldingStatus = data.bolding;
//     let text = document.querySelectorAll("h1, h2, h3, h4, h5, p, b, li, td, caption, span, i , div");
//     for(let i=0; i<text.length; i++){
//         let textSegment = text[i].innerHTML;
//         for(let j=0; j<words.length; j++){
//             let blockedWord = words[j].blockWord;
//             let substituteWord = words[j].subWord;
//             let caseSensitive = words[j].caseSensitive;

//             if(textSegment.toLocaleLowerCase().includes(`${blockedWord}`)){
//                 // ammend words to allow to check for capital letters
//                 capitalBlocked = blockedWord.charAt(0).toUpperCase() + blockedWord.slice(1);
//                 capitalSubstitute = substituteWord.charAt(0).toUpperCase() + substituteWord.slice(1);
                
//                 // checking to see if the user wants the replaced words to be bolded
//                 if(boldingStatus === true){
//                     substituteWord = `<b>${substituteWord}</b>`;
//                     capitalSubstitute = `<b>${capitalSubstitute}</b>`;
//                 }

//                 text[i].innerHTML = text[i].innerHTML.replaceAll(`${blockedWord}`,`${substituteWord}`);
//                 text[i].innerHTML = text[i].innerHTML.replaceAll(`${capitalBlocked}`,`${capitalSubstitute}`);   
//             };
//         };
//     };
//     console.log("WORDS REPLACED");
// };

// listener to trigger reload
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "triggerReload"){
        // force reload
        window.location.reload();

        sendResponse({
            message: "success"
        });

        return true;
    }
});

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

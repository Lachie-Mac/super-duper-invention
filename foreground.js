// pull data from storage upon injection
let userData = {};
chrome.storage.local.get('data', data => {
    // load the text replacement
    replaceWords(data.data);
    
});

/*
chrome.runtime.sendMessage({
    message: "requestData"
}, response => {
    if(response.message === "success"){
        let data = response.payload;
        // load the page
        //replaceWords(data);
        // send message to popup 
        chrome.runtime.sendMessage({
            message: "loadPopupData",
            payload: data
        }, response => {
            if(response.message === "success"){
                console.log("POPUP LOAD MESSAGE SUCCESSFULLY SENT TO POPUP");
            }
        });


    }
}); */

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

replaceWords();

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

// run iteration of text when page loaded (script injected)
//let placeholder1 = ["football", "and"];
//let placeholder2 = ["australian soccer", "test"];
//replaceWords(placeholder1,placeholder2);

// listen for the update text call
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if(request.message === "updateText"){
//         let data = request.payload;
//         console.log(`RECEIVED DATA FROM BACKGROUND: ${data}`);
//         // call the function to display the page
//         replaceWords(data.replace,data.substitute);
//         // send response to confirm with background

//         return true;

//     }
// });
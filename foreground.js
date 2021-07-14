
// function to replace given texts with substitutes
function replaceWords(data){
    let words = data.dictionary;
    let boldingStatus = data.bolding;
    let text = document.querySelectorAll("h1, h2, h3, h4, h5, p, b, li, td, caption, span, i , div");
    for(let i=0; i<text.length; i++){
        let textSegment = text[i].innerHTML;
        for(let j=0; j<words.length; j++){
            let blockedWord = words[j].blockWord;
            let substituteWord = words[j].subWord;
            let caseSensitive = words[j].caseSensitive;

            if(textSegment.toLocaleLowerCase().includes(`${blockedWord}`)){
                // ammend words to allow to check for capital letters
                capitalBlocked = blockedWord.charAt(0).toUpperCase() + blockedWord.slice(1);
                capitalSubstitute = substituteWord.charAt(0).toUpperCase() + substituteWord.slice(1);
                
                // checking to see if the user wants the replaced words to be bolded
                if(boldingStatus === true){
                    substituteWord = `<b>${substituteWord}</b>`;
                    capitalSubstitute = `<b>${capitalSubstitute}</b>`;
                }

                text[i].innerHTML = text[i].innerHTML.replaceAll(`${blockedWord}`,`${substituteWord}`);
                text[i].innerHTML = text[i].innerHTML.replaceAll(`${capitalBlocked}`,`${capitalSubstitute}`);   
            };
        };
    };
    console.log("WORDS REPLACED");
};

// run iteration of text when page loaded (script injected)
//let placeholder1 = ["football", "and"];
//let placeholder2 = ["australian soccer", "test"];
//replaceWords(placeholder1,placeholder2);

// listen for the update text call
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "updateText"){
        let data = request.payload;
        console.log(`RECEIVED DATA FROM BACKGROUND: ${data}`);
        // call the function to display the page
        replaceWords(data.replace,data.substitute);
        // send response to confirm with background

        return true;

    }
});
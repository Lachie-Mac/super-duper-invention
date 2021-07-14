
// function to replace given texts with substitutes
function replaceWords(replace, substitute){
    let text = document.querySelectorAll("h1, h2, h3, h4, h5, p, b, li, td, caption, span, a , i , div");
    for(let i=0; i<text.length; i++){
        let textSegment = text[i].innerHTML;
        for(let j=0; j<replace.length; j++){
            let blockedWord = replace[j];
            let substituteWord = substitute[j];

            if(textSegment.toLocaleLowerCase().includes(`${blockedWord}`)){
                capitalBlocked = blockedWord.charAt(0).toUpperCase() + blockedWord.slice(1);
                capitalSubstitute = substituteWord.charAt(0).toUpperCase() + substituteWord.slice(1);

                text[i].innerHTML = text[i].innerHTML.replaceAll(`${blockedWord}`,`<b>${substituteWord}</b>`);
                text[i].innerHTML = text[i].innerHTML.replaceAll(`${capitalBlocked}`,`<b>${capitalSubstitute}</b>`);
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
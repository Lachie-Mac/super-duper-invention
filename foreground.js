let text = document.querySelectorAll("h1, h2, h3, h4, h5, p, b, li, td, caption, span, a , i , div");
//console.log(text.toLowerCase());
for (let i=0; i<text.length; i++) 
{
    //for(let j=0; j<blockedWord.length; j++) {}
    text_segment = text[i].innerHTML
    if(text_segment.toLocaleLowerCase().includes("football")) 
    {
        text[i].innerHTML = text[i].innerHTML.replaceAll("football","<b>basketball</b>");
        text[i].innerHTML = text[i].innerHTML.replaceAll("Football","<b>basketball</b>");
    };
};

/*
    send message to background to request the rules and words that are to be changed
    in the response we run the above code and iterate through all occurrences
    will need to convert all text to lowercase same with the rules

*/
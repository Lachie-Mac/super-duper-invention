let text = document.querySelectorAll("h1, h2, h3, h4, h5, p, li, td, caption, span, a");
//console.log(text.toLowerCase());
for (let i=0; i<text.length; i++) 
{
    //for(let j=0; j<blockedWord.length; j++) {}
    if(text[i].innerHTML.includes("football")) 
    {
        text[i].innerHTML = text[i].innerHTML.replace("football","<b>basketball</b>");
    };
};

/*
    send message to background to request the rules and words that are to be changed
    in the response we run the above code and iterate through all occurrences
    will need to convert all text to lowercase same with the rules

*/
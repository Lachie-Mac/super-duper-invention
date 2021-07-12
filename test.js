

// function to scan through text in document and replace users words
function replaceWords () {
    const webText = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')
    let blockedWord = document.getElementById("unduckMe");
    let substituteWord = document.getElementById("");

    for (let i=0; i<text.length; i++) 
    {
        //for(let j=0; j<blockedWord.length; j++) {}
        if(text[i].innerHTML.includes(blockedWord)) 
        {
            text[i].innerHTML = text[i].innerHTML.replace(blockedWord,`<b>${}</b>`);
        }
    }
}   
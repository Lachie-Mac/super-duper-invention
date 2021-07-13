// chrome.runtime.sendMessage({
//     message: "get_name"
// }, response => {
//     if(response.message === "success"){
//         document.querySelector("span").innerHTML = `Hello ${response.payload}`;
//     }
// });

// /*
//     retrieve words from popup, or from storage
//     send words and rules to foreground in a message (this will require tabid)

// */

// chrome.runtime.sendMessage({
//     message: "getTabId"
// }, response => {
//     if(response.message === "success"){
//         console.log(response.payload);
//     }
// });
// retrieve the tab id so that we can inject script onto 
/*chrome.runtime.sendmessage({
    message: "getTabId"
}, response => {
    if(response.message === "success"){
        // send message to foreground
        chrome.tabs.sendMessage(response.payload, {
            message: "changeWords",
            payload: "array of words to change"
        })
    }
});
*/

/*
    when changes are made in the popup send a message to storage to update
*/

// listener for expanding tab 1
let expandButton1 = document.getElementById("collapse-1-button")
expandButton1.addEventListener("click",
    (event) =>
    {
        let containerToCollapse = document.getElementById("collapse-1-div");
        if(expandButton1.innerHTML.includes("add"))
        {
            containerToCollapse.style.maxHeight="none";
            expandButton1.innerHTML = `<i class="material-icons">remove</i>`;
        }
        else
        {
            containerToCollapse.style.maxHeight="0px";
            expandButton1.innerHTML = `<i class="material-icons">add</i>`;
        }

        return;
    }
);
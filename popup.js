<<<<<<< HEAD
//Object Creation for storing the info
userInfo = {
    dictionary: [],
    personas: [],
    active: false,
    bolded: true,
    pin: null,
    pinStatus: false,
    ruleCount: 0
};

chrome.runtime.sendMessage({
    message: "get_name"
}, response => {
    if(response.message === "success"){
        document.querySelector("span").innerHTML = `Hello ${response.payload}`;
    }
});
=======
// chrome.runtime.sendMessage({
//     message: "get_name"
// }, response => {
//     if(response.message === "success"){
//         document.querySelector("span").innerHTML = `Hello ${response.payload}`;
//     }
// });
>>>>>>> f7bdc765b6d08baf691160f83c1e4a1808550f09

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

//<<<<<<<<<Storing functions>>>>>>>>>>
//Storing the PIN active status for Parental mode 
function getPinStatus(userInfo)
{
    userInfo.pinStatus = document.getElementById('pinActive').checked;
}
//Function that counts the number of Blocked words
function countRules(ruleCount)
{
    //incrementing the counter
    ruleCount++;
}
function decrementRules(ruleCount)
{
    //decrementing the word count
    ruleCount--;
}

function grabDictionary(userInfo)
{
    //Templates for the id
    blockID = "block_"
    subID = "sub_"
    insert = {
        block:null,
        sub:null
    };
    //Going through a loop
    for(let i = 1; i < userInfo.ruleCount;i++)
    {
        //Appending the number to the sting
        blockID += String(i);
        subID += String(i);
        insert.block = document.getElementById(blockID).value; //look that up
        insert.sub = document.getElementById(subID).value;
        userInfo.document[i-1] = insert;
    }
}

function getActiveState(userInfo)
{
    //Getting the user Active status
    userInfo.active = document.getElementById('activeState').checked;
}
function getBoldSatus(userInfo)
{
    //Getting the user Active status
    userInfo.bolded = document.getElementById('boldState').checked;
}

function getInfo(userInfo)
{
    //Function calls all functions associated with retreiving info from the HTML page
    getActiveState(userInfo);
    getBoldSatus(userInfo);
    getPinStatus(userInfo);
    grabDictionary(userInfo);
}


//<<<<<<<<Event Listeners that activate different functions>>>>>>>>
//Grabbing all the information from the page
document.getElementById("saveChanges").addEventListener("click", getInfo(userInfo));
//Incrementing the rule Count
document.getElementById("addRule").addEventListener("click", countRules(userInfo.ruleCount));

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


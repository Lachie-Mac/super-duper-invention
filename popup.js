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

// chrome.runtime.sendMessage({
//     message: "get_name"
// }, response => {
//     if(response.message === "success"){
//         document.querySelector("span").innerHTML = `Hello ${response.payload}`;
//     }
// });
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
// document.getElementById("saveChanges").addEventListener("click", getInfo(userInfo));
// //Incrementing the rule Count
// document.getElementById("addRule").addEventListener("click", countRules(userInfo.ruleCount));

// listener for expanding tab 1
let expandButton1 = document.getElementById("collapse-1-button")
expandButton1.addEventListener("click",
    () =>
    {
        let containerToCollapse = document.getElementById("collapse-1-div");
        if(expandButton1.innerHTML.includes("add"))
        {
            containerToCollapse.style.transition="max-height 5s ease-in-out";
            containerToCollapse.style.maxHeight="500000px";
            containerToCollapse.style.overflow="visible";
            expandButton1.innerHTML = `<i class="material-icons">remove</i>`;   
        }
        else
        {
            containerToCollapse.style.transition="none";
            containerToCollapse.style.maxHeight="0px";
            containerToCollapse.style.overflow="hidden";
            expandButton1.innerHTML = `<i class="material-icons">add</i>`;  
        }
        return;
    }
);

// listener for expanding tab2
let expandButton2 = document.getElementById("collapse-2-button")
expandButton2.addEventListener("click",
    () =>
    {
        let containerToCollapse = document.getElementById("collapse-2-div");
        if(expandButton2.innerHTML.includes("add"))
        {
            containerToCollapse.style.transition="max-height 5s ease-in-out";
            containerToCollapse.style.maxHeight="500000px";
            containerToCollapse.style.overflow="visible";
            expandButton2.innerHTML = `<i class="material-icons">remove</i>`;   
        }
        else
        {
            containerToCollapse.style.transition="none";
            containerToCollapse.style.maxHeight="0px";
            containerToCollapse.style.overflow="hidden";
            expandButton2.innerHTML = `<i class="material-icons">add</i>`;  
        }
        return;
    }
);
// listener for expanding tab3
let expandButton3 = document.getElementById("collapse-3-button")
expandButton3.addEventListener("click",
    () =>
    {
        let containerToCollapse = document.getElementById("collapse-3-div");
        if(expandButton3.innerHTML.includes("add"))
        {
            containerToCollapse.style.transition="max-height 5s ease-in-out";
            containerToCollapse.style.maxHeight="500000px";
            containerToCollapse.style.overflow="visible";
            expandButton3.innerHTML = `<i class="material-icons">remove</i>`;   
        }
        else
        {
            containerToCollapse.style.transition="none";
            containerToCollapse.style.maxHeight="0px";
            containerToCollapse.style.overflow="hidden";
            expandButton3.innerHTML = `<i class="material-icons">add</i>`;  
        }
        return;
    }
);
// listener for expanding tab4
let expandButton4 = document.getElementById("collapse-4-button")
expandButton4.addEventListener("click",
    () =>
    {
        let containerToCollapse = document.getElementById("collapse-4-div");
        if(expandButton4.innerHTML.includes("add"))
        {
            containerToCollapse.style.transition="max-height 5s ease-in-out";
            containerToCollapse.style.maxHeight="500000px";
            containerToCollapse.style.overflow="visible";
            expandButton4.innerHTML = `<i class="material-icons">remove</i>`;   
        }
        else
        {
            containerToCollapse.style.transition="none";
            containerToCollapse.style.maxHeight="0px";
            containerToCollapse.style.overflow="hidden";
            expandButton4.innerHTML = `<i class="material-icons">add</i>`;  
        }
        return;
    }
);

// on off listener, startup has mdl ensure it has generated children etc.
// storedValue must be boolean and RECOVERED FROM STORAGE AT STARTUP
componentHandler.upgradeDom();
let onOffCheckbox = document.getElementById("on-off-switch")
let storedValueIsOff = true
if(storedValueIsOff)
{
    onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: red;";
    onOffCheckbox.parentElement.children[2].innerText = "OFF";
    onOffCheckbox.parentElement.children[1].style.cssText = "background-color: red;";
}
onOffCheckbox.addEventListener
("click",
    ()=>{
        if(onOffCheckbox.parentElement.className.includes("is-checked")) // go to off state
        {
            onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: red;";
            onOffCheckbox.parentElement.children[2].innerText = "OFF";
            onOffCheckbox.parentElement.children[1].style.cssText = "background-color: red;";
        }
        else // go to on state
        {
            onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: #00e025;";
            onOffCheckbox.parentElement.children[2].innerText = "ON";
            onOffCheckbox.parentElement.children[1].style.cssText = "background-color: #00e025;";
        }
    }
)    

//Object Creation for storing the info
userInfo = {
    dictionary: [],
    personas: [],
    active: false,
    bolded: true,
    pin: null,
    pinStatus: false,
    ruleCount: 0,
    caseSensitivty: false,
    redactStatus: false
};

/*chrome.runtime.sendMessage({
    message: "get_name"
}, response => {
    if(response.message === "success"){
        document.querySelector("span").innerHTML = `Hello ${response.payload}`;
    }
});*/
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
    console.log("Pin status test " + userInfo.pinStatus);
}
function getRedaction(userInfo)
{
    userInfo.redactStatus = document.getElementById("redactStatus").checked;
    console.log("Redactive status test " + userInfo.redactStatus)
}
//Function that counts the number of Blocked words
function countRules(userInfo)
{
    //incrementing the counter
    userInfo.ruleCount ++;
}
function decrementRules(userInfo)
{
    //decrementing the word count
    userInfo.ruleCount--;

}

function grabDictionary(userInfo)
{
   //Object template to store word combinations
    insert = {
        block:null,
        sub:null
    };

    //Going through a loop
    for(let i = 1; i <= userInfo.ruleCount;i++)
    {
        //Templates for the id
        blockID = "block_"
        subID = "sub_"
        //Appending the number to the sting
        blockID += String(i);
        subID += String(i);

        insert.block = document.getElementById(blockID).value;
        insert.sub = document.getElementById(subID).value;
        userInfo.dictionary[i-1] = insert;
    }
}

function getActiveState(userInfo)
{
    //Getting the user Active status
    userInfo.active = document.getElementById("on-off-switch").checked;
}
function getCaseSatus(userInfo)
{
    //Getting the user Active status
    userInfo.caseSensitivty = document.getElementById("caseSensitivity").checked;
    console.log("Case sensitivity status test "+ userInfo.caseSensitivty)
}

function getInfo(userInfo)
{
    //Function calls all functions associated with retreiving info from the HTML page
    getActiveState(userInfo);
    getCaseSatus(userInfo);
    getPinStatus(userInfo);
    grabDictionary(userInfo);
    getRedaction(userInfo);
}


//<<<<<<<<Event Listeners that activate different functions>>>>>>>>
//Grabbing all the information from the page
document.getElementById("saveChanges").addEventListener("click", function() {getInfo(userInfo)} );
//Incrementing the rule Count
document.getElementById("addRule").addEventListener("click", function() {countRules(userInfo)});

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
let storedValue = true // TRUE = ON
if(storedValue)
{
    onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: #00e025;";
    onOffCheckbox.parentElement.children[2].innerText = "ON";
    onOffCheckbox.parentElement.children[1].style.cssText = "background-color: #00e025;";
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

// linked PIN INPUTS

    // UNLOCKED
    if(document.getElementById("pin1Unlocked")!=null) 
    // make sure unlocked tab is present before definition
    // ONLY CHECKS ON POPUP OPEN 
    {
        let pin1Unlocked = document.getElementById("pin1Unlocked");
        let pin2Unlocked = document.getElementById("pin2Unlocked");
        let pin3Unlocked = document.getElementById("pin3Unlocked");
        let pin4Unlocked = document.getElementById("pin4Unlocked");
    
            // forward navigation
            pin1Unlocked.addEventListener("input",()=>{
                if(pin1Unlocked.value.length>0)
                {
                    pin2Unlocked.focus();
                } return;
            });
    
            pin2Unlocked.addEventListener("input",()=>{
                if(pin2Unlocked.value.length>0)
                {
                    pin3Unlocked.focus();
                } return;
            });
    
            pin3Unlocked.addEventListener("input",()=>{
                if(pin3Unlocked.value.length>0)
                {
                    pin4Unlocked.focus();
                } return;
            });
    
            pin4Unlocked.addEventListener("input",()=>{
                if(pin4Unlocked.value.length>1)
                {
                    pin4Unlocked.value = pin4Unlocked.value.slice(0,1);
                } return;
            });
    
            // backward navigation
            pin4Unlocked.addEventListener("keydown",(event)=>{
                if(`${event.code}`=="Backspace"&&pin4Unlocked.value.length==0)
                {
                    pin3Unlocked.focus();
                } return;
            })
    
            pin3Unlocked.addEventListener("keydown",(event)=>{
                if(`${event.code}`=="Backspace"&&pin3Unlocked.value.length==0)
                {
                    pin2Unlocked.focus();
                } return;
            })
    
            pin2Unlocked.addEventListener("keydown",(event)=>{
                if(`${event.code}`=="Backspace"&&pin2Unlocked.value.length==0)
                {
                    pin1Unlocked.focus();
                } return;
            })
    
            // rogue click handling
            document.addEventListener("click",(event)=>{
                if(event.target.id.includes("pin")&&event.target.id.includes("Unlocked"))
                {
                    for(let i=1;i<=4;i++)
                    {
                        let test = document.getElementById(`pin${i}Unlocked`);
                        if(test.value.length==0)
                        {
                            test.focus();
                            return;
                        }
                    }
                    // if no empty fields are found, put cursor at end
                    pin4Unlocked.focus();
                    return;
                }
            })
    }


    // LOCKED
    if(document.getElementById("pin1Locked")!=null) 
    // make sure locked tab is present before definition
    // ONLY CHECKS ON POPUP OPEN 
    {
        let pin1Locked = document.getElementById("pin1Locked");
        let pin2Locked = document.getElementById("pin2Locked");
        let pin3Locked = document.getElementById("pin3Locked");
        let pin4Locked = document.getElementById("pin4Locked");
        
            // forward navigation
            pin1Locked.addEventListener("input",()=>{
                if(pin1Locked.value.length>0)
                {
                    pin2Locked.focus();
                } return;
            });

            pin2Locked.addEventListener("input",()=>{
                if(pin2Locked.value.length>0)
                {
                    pin3Locked.focus();
                } return;
            });

            pin3Locked.addEventListener("input",()=>{
                if(pin3Locked.value.length>0)
                {
                    pin4Locked.focus();
                } return;
            });

            pin4Locked.addEventListener("input",()=>{
                if(pin4Locked.value.length>1)
                {
                    pin4Locked.value = pin4Locked.value.slice(0,1);
                } return;
            });

            // backward navigation
            pin4Locked.addEventListener("keydown",(event)=>{
                if(`${event.code}`=="Backspace"&&pin4Locked.value.length==0)
                {
                    pin3Locked.focus();
                } return;
            })

            pin3Locked.addEventListener("keydown",(event)=>{
                if(`${event.code}`=="Backspace"&&pin3Locked.value.length==0)
                {
                    pin2Locked.focus();
                } return;
            })

            pin2Locked.addEventListener("keydown",(event)=>{
                if(`${event.code}`=="Backspace"&&pin2Locked.value.length==0)
                {
                    pin1Locked.focus();
                } return;
            })

            // rogue click handling
            document.addEventListener("click",(event)=>{
                if(event.target.id.includes("pin")&&event.target.id.includes("Locked"))
                {
                    for(let i=1;i<=4;i++)
                    {
                        let test = document.getElementById(`pin${i}Locked`);
                        if(test.value.length==0)
                        {
                            test.focus();
                            return;
                        }
                    }
                    // if no empty fields are found, put cursor at end
                    pin4Locked.focus();
                    return;
                }
            })
    }
/*

    PERSISTENT DATA

*/

let clicked = null;


let allPersonas = [{name: "Donald Trump",
                    dictionary: [{
                        blockWord: "Donald Trump",
                        subWord: "Toupee wearing Orange Demon"},
                    {
                        blockWord: "fake news",
                        subWord: "news the wrinkly orange sack does not agree with"},
                    {
                        blockWord: "Make America Great Again",
                        subWord: "turn America into a sh*thole"
                    }]
                    },
                    {name: "12-year-old",
                    dictionary: [{
                        blockWord: "sheesh",
                        subWord: "*immature sounds*"},
                    {
                        blockWord: "lit",
                        subWord: "excellent"},
                    {
                        blockWord: "vibe check",
                        subWord: "how are you?"
                    }]
                    },
                    {name: "Influencer",
                    dictionary: [{
                        blockWord: "entrepreneur",
                        subWord: "owner of a social media account"},
                    {
                        blockWord: "cancelled",
                        subWord: "called out for being a bad person"},
                    {
                        blockWord: "influencer",
                        subWord: "vapid narcissist"
                    }
]}];


/*

    ON POPUP LOAD

*/
// default data variable to store all the neccessary info that popup requires
let popupData = {};

let focalPoint = {area: "",
                  index: null};

let rulesNew = true;
let personaNew = true;



/*

    EVENT LISTENERS FOR BUTTONS

*/

// ON PAGELOAD --------------------------

function updateRules(dictionary,clicked)
{
    let rulesDiv = document.getElementById("collapse-1-div");
    let inner = "";
    let blockInput;
    let subInput;

    // storing previous values
    let changedDictionary = [];
    let addRule;
    if(!rulesNew)
    {
        addRule = {blockWord: document.getElementById("add_block").value,
                     subWord: document.getElementById("add_sub").value};
    }
    else
    {
        addRule = {blockWord:"",
                   subWord:""};
    }

    let l=0;
    while(document.getElementById(`block_${l}`)!=null)
    {
        let newblock = {blockWord: document.getElementById(`block_${l}`).value,
                        subWord: document.getElementById(`sub_${l}`).value};
        changedDictionary.push(newblock);
        l++;
    }

    // adding rules from dictionary onto popup
    for(let i=0;i<dictionary.length;i++)
    {
        // adds big slot boi with delete rule button if in focus
        if(focalPoint.area=="rule"&&focalPoint.index==i)
        {
            inner+=`<div class="slot-joiner">
                    <div class="card-slot" style="justify-content: space-evenly;">
                        Change&#8287 
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" type="text" id="block_${i}">
                            <label class="mdl-textfield__label" for="block_${i}"></label>
                        </div>
                        &#8287to&#8287 
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" type="text" id="sub_${i}">
                            <label class="mdl-textfield__label" for="sub_${i}"></label>
                        </div>
                    </div>
                    <div class="card-slot" style="justify-content: center;">
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" id = "deleteRule-${i}">
                            Delete Rule
                        </button>
                    </div>
                </div>`;
        }
        else
        {
            inner +=`<div class="card-slot" id="rule_${i}" style="justify-content: space-evenly;">
                        Change&#8287&#8287
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" type="text" id="block_${i}">
                            <label class="mdl-textfield__label" for="block_${i}"></label>
                        </div>
                        &#8287&#8287to&#8287&#8287 
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" type="text" id="sub_${i}">
                            <label class="mdl-textfield__label" for="sub_${i}"></label>
                        </div>
                    </div>`
        }
    }

    inner+=`<div class="slot-joiner">
                <div class="card-slot" id="add-card-1" style="justify-content: space-evenly;">
                    Change&#8287 
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="add_block">
                        <label class="mdl-textfield__label" for="add_block"></label>
                    </div>
                    &#8287to&#8287 
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="add_sub">
                        <label class="mdl-textfield__label" for="add_sub"></label>
                    </div>
                </div>
                <div class="card-slot" id="add-card-2" style="justify-content: center;">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" id = "addRule">
                        Add Rule
                    </button>
                </div>
            </div>`;
    rulesDiv.innerHTML = inner;

    // refresh MDL
    componentHandler.upgradeDom();

    if(rulesNew) // add values to dictionary rules only when on load
    {
        for(let i=0;i<dictionary.length;i++)
        {
            blockInput = document.getElementById(`block_${i}`);
            blockInput.value = dictionary[i].blockWord;

            subInput = document.getElementById(`sub_${i}`);
            subInput.value = dictionary[i].subWord;
        }
    }
    else // replace with previous inputs
    {
        for(let i=0;i<changedDictionary.length;i++)
        {
            blockInput = document.getElementById(`block_${i}`);
            blockInput.value = changedDictionary[i].blockWord;

            subInput = document.getElementById(`sub_${i}`);
            subInput.value = changedDictionary[i].subWord;
        }

        // replacing previous inputs in add box
        document.getElementById("add_block").value=addRule.blockWord;
        document.getElementById("add_sub").value=addRule.subWord;
    }

    // focusing on target again
    if(focalPoint.area!="" && clicked != null)
    {
        let target = document.getElementById(`${clicked.id}`);
        target.focus();
        target.select();
        target.selectionStart = target.selectionEnd;
    }

    rulesNew = false;

    return;
}

function updatePersonas(activePersonas)
{
    let personasDiv = document.getElementById("collapse-2-div");
    let inner = "";
    let checkbox;

    // generate list then insert
    for(let i=0;i<activePersonas.length;i++)
    {

        inner+=`<div class="card-slot" id="persona-${i}">
                    ${activePersonas[i].name}
                    <div>
                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${i}">
                            <input type="checkbox" id="list-checkbox-${i}" class="mdl-checkbox__input"/>
                        </label>
                    </div>
                </div>`;
    }

    personasDiv.innerHTML = inner;

    // refresh MDL
    componentHandler.upgradeDom();

    // tick all checkboxes
    for(let i=0;i<activePersonas.length;i++)
    {
        if(activePersonas[i].active)
        {
            checkbox = document.getElementById(`list-checkbox-${i}`);
            checkbox.parentElement.MaterialCheckbox.check();
        }
    }

    return;
}

function collectDataOnSave()
{
    // determining which personas have been ticked
    let saveActivePersonas = popupData.activePersonas;
    for(let i=0;i<popupData.activePersonas.length;i++)
    {
        saveActivePersonas[i].active = document.getElementById(`list-checkbox-${i}`).parentElement.className.includes("is-checked");
    }

    // grabbing current pin
    let savePin = "";
    let pin1 = document.getElementById("pin1");
    savePin += pin1.value;
    let pin2 = document.getElementById("pin2");
    savePin += pin2.value;
    let pin3 = document.getElementById("pin3");
    savePin += pin3.value;
    let pin4 = document.getElementById("pin4");
    savePin += pin4.value;

    // grabbing inputs from rules
    let saveDictionary = []
    let m=0
    while(document.getElementById(`block_${m}`)!=null)
    {
        saveDictionary.push({blockWord: document.getElementById(`block_${m}`).value,
                             subWord: document.getElementById(`sub_${m}`).value
                            });
        m++;
    }

    // send collated data to storage
    chrome.storage.local.set({
        dictionary: saveDictionary,
        personaDictionary: [],
        activePersonas: saveActivePersonas,
        pin: savePin,
        parentalActive: false,
        bolding: document.getElementById("boldActive").parentElement.className.includes("is-checked")
    });
}

function popupUpdate(data)
{
    // inserting layout
    componentHandler.upgradeDom(); // ensures switch has its children
    let onOffCheckbox = document.getElementById("on-off-switch")
    let allCards = document.getElementById("all-card-container")

    if(data.parentalActive)
    {
        // set toggle to permanently on
        onOffCheckbox.parentElement.className += " is-checked";
        onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: #00e025;";
        onOffCheckbox.parentElement.children[2].innerText = "ON";
        onOffCheckbox.parentElement.children[1].style.cssText = "background-color: #00e025;";
        onOffCheckbox.disabled = true;

        // inserting parent has locked card
        allCards.innerHTML = `<div class="card-header" style="justify-content: center;">
                                    Parental Control is Active
                                </div>
                                <div class="card-content" style="max-height: none; overflow: visible;">
                                    <div class="card-slot">Enter Pin
                                        <!- IDs IN USE ->
                                        <div class="mdl-textfield mdl-js-textfield" style="flex-direction: row; display:flex;">
                                            <input class="mdl-textfield__input" type="number" id="pin1" name="pinInput" style="margin-left:auto">
                                            <label class="mdl-textfield__label" for="pin1"></label>
                                            <input class="mdl-textfield__input" type="number" id="pin2" name="pinInput">
                                            <label class="mdl-textfield__label" for="pin2"></label>
                                            <input class="mdl-textfield__input" type="number" id="pin3" name="pinInput">
                                            <label class="mdl-textfield__label" for="pin3"></label>
                                            <input class="mdl-textfield__input" type="number" id="pin4" name="pinInput" style="margin-right: 4px;">
                                            <label class="mdl-textfield__label" for="pin4"></label>
                                        </div>
                                    </div>
                                </div>`
    }  
    else
    {
        // setting on/off toggle state
        if(data.extensionActive)
        {
            onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: #00e025;";
            onOffCheckbox.parentElement.children[2].innerText = "ON";
            onOffCheckbox.parentElement.children[1].style.cssText = "background-color: #00e025;";
            onOffCheckbox.parentElement.className+=" is-checked";
        }
        else
        {
            onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: red";
            onOffCheckbox.parentElement.children[2].innerText = "OFF";
            onOffCheckbox.parentElement.children[1].style.cssText = "background-color: red";
        }

        // adding listener to allow toggles LISTENER
        onOffCheckbox.addEventListener("click",
            ()=>{
                if(onOffCheckbox.parentElement.className.includes("is-checked")) // go to off state
                {
                    onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: red;";
                    onOffCheckbox.parentElement.children[2].innerText = "OFF";
                    onOffCheckbox.parentElement.children[1].style.cssText = "background-color: red;";

                    // retrieve tabId from storage
                    chrome.storage.local.get("currentTabId", tabId => {
                        chrome.tabs.sendMessage(tabId.currentTabId, {
                            message: "triggerReset",
                            payload: true
                        });
                    });

                    // change extensionActive status to false
                    chrome.storage.local.set({
                        extensionActive: false
                    });

                }
                else // go to on state
                {
                    onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: #00e025;";
                    onOffCheckbox.parentElement.children[2].innerText = "ON";
                    onOffCheckbox.parentElement.children[1].style.cssText = "background-color: #00e025;";

                    // retrieve tabId from storage
                    chrome.storage.local.get("currentTabId", tabId => {
                        chrome.tabs.sendMessage(tabId.currentTabId, {
                            message: "triggerReplace",
                            payload: false
                        });
                    });

                    // change extensionActive status to true
                    chrome.storage.local.set({
                        extensionActive: true
                    });
                }
            }
        );

        // inserting semi empty cards
        allCards.innerHTML = `  <div class="card-header">
                                    Rules
                                    <button id="collapse-1-button" class="mdl-button mdl-button--primary mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                                        <i class="material-icons">add</i>
                                    </button>
                                </div>
                                <div class="card-content" id="collapse-1-div">
                                </div>

                                <div class="card-header">
                                    Personas
                                    <button id="collapse-2-button" class="mdl-button mdl-button--primary mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                                        <i class="material-icons">add</i>
                                    </button>
                                </div>
                                <div class="card-content" id="collapse-2-div">
                                </div>

                                <div class="card-header">
                                    Appearance
                                    <button id="collapse-3-button" class="mdl-button mdl-button--primary mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                                        <i class="material-icons">add</i>
                                    </button>
                                </div>
                                <div class="card-content" id="collapse-3-div">
                                    <div class="card-slot">Bolding
                                        <div>
                                            <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="boldActive">
                                                <input type="checkbox" id="boldActive" class="mdl-switch__input">
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-header">
                                    Parental Control
                                    <button id="collapse-4-button" class="mdl-button mdl-button--primary mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                                        <i class="material-icons">add</i>
                                    </button>
                                </div>
                                <div class="card-content" id="collapse-4-div">
                                    <div class="card-slot">Current Pin
                                        <!--IDs IN USE-->
                                        <div class="mdl-textfield mdl-js-textfield" style="flex-direction: row; display:flex;">
                                            <input class="mdl-textfield__input" type="number" id="pin1" name="pinInput" style="margin-left:auto">
                                            <label class="mdl-textfield__label" for="pin1"></label>
                                            <input class="mdl-textfield__input" type="number" id="pin2" name="pinInput">
                                            <label class="mdl-textfield__label" for="pin2"></label>
                                            <input class="mdl-textfield__input" type="number" id="pin3" name="pinInput">
                                            <label class="mdl-textfield__label" for="pin3"></label>
                                            <input class="mdl-textfield__input" type="number" id="pin4" name="pinInput" style="margin-right: 4px;">
                                            <label class="mdl-textfield__label" for="pin4"></label>
                                        </div>
                                    </div>
                                    <div class="card-slot">Activate Pin
                                        <div>
                                            <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="pinActive">
                                                <input type="checkbox" id="pinActive" class="mdl-switch__input">
                                            </label>
                                        </div>
                                    </div>
                                </div>`

        // linking collapsibles

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
    }
    // linking pin inputs, 
    let pin1 = document.getElementById("pin1");
    let pin2 = document.getElementById("pin2");
    let pin3 = document.getElementById("pin3");
    let pin4 = document.getElementById("pin4");

        // forward navigation
        pin1.addEventListener("input",()=>{
            if(pin1.value.length>0)
            {
                pin2.focus();
            } return;
        });

        pin2.addEventListener("input",()=>{
            if(pin2.value.length>0)
            {
                pin3.focus();
            } return;
        });

        pin3.addEventListener("input",()=>{
            if(pin3.value.length>0)
            {
                pin4.focus();
            } return;
        });

        pin4.addEventListener("input",()=>{
            if(pin4.value.length>1)
            {
                pin4.value = pin4.value.slice(0,1);
            } return;
        });

        // backward navigation
        pin4.addEventListener("keydown",(event)=>{
            if(`${event.code}`=="Backspace"&&pin4.value.length==0)
            {
                pin3.focus();
            } return;
        })

        pin3.addEventListener("keydown",(event)=>{
            if(`${event.code}`=="Backspace"&&pin3.value.length==0)
            {
                pin2.focus();
            } return;
        })

        pin2.addEventListener("keydown",(event)=>{
            if(`${event.code}`=="Backspace"&&pin2.value.length==0)
            {
                pin1.focus();
            } return;
        })

        // rogue click handling
        document.addEventListener("click",(event)=>{
            if(event.target.id.includes("pin")&&event.target.id.includes(""))
            {
                for(let i=1;i<=4;i++)
                {
                    let test = document.getElementById(`pin${i}`);
                    if(test.value.length==0)
                    {
                        test.focus();
                        return;
                    }
                }
                // if no empty fields are found, put cursor at end
                pin4.focus();
                return;
            }
        })    

    // if unlocked 
    if(!data.parentalActive)
    {
        if(data.pin.length==4)
        {
            // show current pin
            pin1.value = Number(data.pin.substring(0,1));
            pin2.value = Number(data.pin.substring(1,2));
            pin3.value = Number(data.pin.substring(2,3));
            pin4.value = Number(data.pin.substring(3,4));
        }
        
        // bolding status
        componentHandler.upgradeDom(); // refresh MDL
        let boldSwitch = document.getElementById("boldActive");
        if(data.bolding)
        {    
            boldSwitch.parentElement.className += " is-checked";
        }

        // updating rules and personas if those tabs are present
        rulesNew = true;
        personaNew = true;
        updatePersonas(data.activePersonas);
        updateRules(data.dictionary,clicked);

        // inserting save changes button
        let saveContainer = document.getElementById("save-container");
        saveContainer.className = "save-container";
        saveContainer.innerHTML = `<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" style="margin-top:0px" id = "saveChanges">
                                        Save Changes
                                    </button>`;
        componentHandler.upgradeDom();

        // add listener to save button
        document.getElementById("saveChanges").addEventListener("click",
            ()=>
            {
                collectDataOnSave();

                // retrieve tabId from storage
                chrome.storage.local.get("currentTabId", tabId => {
                    chrome.tabs.sendMessage(tabId.currentTabId, {
                        message: "triggerReset",
                        payload: true
                    }, response => {
                        if(response.message === "success"){
                            chrome.tabs.sendMessage(tabId.currentTabId, {
                                message: "triggerReplace",
                                payload: false
                            });
                        }
                    });
                });
                // restore the original html
                // load in the new changes
            }
        )
    }

    return;
}

// click handler function
document.body.addEventListener("click",
    (event) =>
    {
        clicked = event.target
        console.log(event.target.id);
        /*
        chrome.storage.local.get(["dictionary", "activePersonas"], (res) => {
            let dictionary = res.dictionary;
            let activePersonas = res.activePersonas;
        */
        // setting focus onto a rule
        if((clicked.id.includes("rule")
           ||clicked.id.includes("sub")
           ||clicked.id.includes("block"))) //&& focalPoint.index!=clicked.id.substring(clicked.id.length-1,clicked.id.length)) // don't trigger if double click
        {
            focalPoint.area = "rule";
            focalPoint.index = clicked.id.substring(clicked.id.length-1,clicked.id.length);
            updateRules(popupData.dictionary,clicked);
        }

        // setting focus onto a persona
        else if((clicked.id.includes("list-checkbox")
           ||clicked.id.includes("persona"))) // && focalPoint.index!=clicked.id.substring(clicked.id.length-1,clicked.id.length))
        {
            focalPoint.area = "persona";
            focalPoint.index = clicked.id.substring(clicked.id.length-1,clicked.id.length);
            updatePersonas(popupData.activePersonas); // add event tag to implement focus here
        }

        else if(!focalPoint.area!="") // defocus
        {
            focalPoint.area = "";
            focalPoint.index = null;
            updateRules(popupData.dictionary,clicked);
            updatePersonas(popupData.activePersonas);
        }

        return;
    }
)


function onLoad(){
    // pull data from storage upon injection
    chrome.storage.local.get(["extensionActive","dictionary","personaDictionary","activePersonas","pin","parentalActive","bolding"], (res) => {
        let data = {
            extensionActive: res.extensionActive,
            dictionary: res.dictionary,
            personaDictionary: res.personaDictionary,
            activePersonas: res.activePersonas,
            pin: res.pin,
            parentalActive: res.parentalActive,
            bolding: res.bolding
        }
        console.log(data);
        popupData = data;
        // scan to check which active personas are used
        let activePersonas = data.activePersonas;
        for(let i=0; i<activePersonas.length; i++){
            if(activePersonas[i].active){
                for(let j=0; j<allPersonas[i].dictionary.length; j++){
                    data.personaDictionary.push(allPersonas[i].dictionary[j]);
                }
            }
        }
        // send call to function to display user info
        console.log(data);
        popupUpdate(data);
    });
}
onLoad();
/*

    PERSISTENT DATA

*/

let clicked = null;


let allPersonas = [{name: "Donald Trump",
                    dictionary: [{
                        blockWord: "Donald Trump",
                        subWord: "Toupee wearing Orange Demon"},
                        {
                        blockWord: "Donald John Trump",
                        subWord: "Toupee Wearing Orange Demon"},
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

let addStoredRulesInputs = true;
let maintainAddInputs = true;
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
    if(maintainAddInputs)
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

    // always load in inputs from dictionary, sometimes replace them with old inputs.
    for(let i=0;i<dictionary.length;i++)
    {
        blockInput = document.getElementById(`block_${i}`);
        blockInput.value = dictionary[i].blockWord;

        subInput = document.getElementById(`sub_${i}`);
        subInput.value = dictionary[i].subWord;
    }        

    if(addStoredRulesInputs) // replace with previous inputs
    {
        for(let i=0;i<changedDictionary.length;i++)
        {
            blockInput = document.getElementById(`block_${i}`);
            blockInput.value = changedDictionary[i].blockWord;

            subInput = document.getElementById(`sub_${i}`);
            subInput.value = changedDictionary[i].subWord;
        }
    }

    if(maintainAddInputs)
    {
        // replacing previous inputs in add box
        document.getElementById("add_block").value=addRule.blockWord;
        document.getElementById("add_sub").value=addRule.subWord;
    }

    // focusing on target again
    if(focalPoint.area=="rule" && clicked != null)
    {
        if(document.getElementById(`${clicked.id}`)!=null)
        {
            let target = document.getElementById(`${clicked.id}`);
            target.focus();
            target.select();
        }
        
    }

    // event listener for add button
    document.getElementById("addRule").addEventListener("click",
        ()=>
        {
            let newRule = {blockWord: document.getElementById("add_block").value,
                           subWord: document.getElementById("add_sub").value};

            // pushing rule to local dictionary
            popupData.dictionary.push(newRule);

            // when adding a rule, lose the add inputs, and add back previous rules
            addStoredRulesInputs = true;
            maintainAddInputs = false;
            updateRules(popupData.dictionary,null);
        }
    );

    return;
}

function updatePersonas(activePersonas,clicked)
{
    let personasDiv = document.getElementById("collapse-2-div");
    let inner = "";
    let checkbox;

    let checkboxArray=[];
    let c = 0;

    // detecting checked tickboxes and assigning them to an array
    while(document.getElementById(`list-checkbox-${c}`)!=null)
    {
        checkboxArray.push(document.getElementById(`list-checkbox-${c}`).parentElement.className.includes("is-checked"));
        c++;
    }
    // generate list then insert
    for(let i=0;i<activePersonas.length;i++)
    {

        if(focalPoint.area == "persona" && focalPoint.index == i)
        {
            let personaAllRulesString = "";
            let personaAllRules = allPersonas[i];
            for(let i=0;i<personaAllRules.dictionary.length;i++)
            {
                personaAllRulesString += `- Change ${personaAllRules.dictionary[i].blockWord} to ${personaAllRules.dictionary[i].subWord} <br>`
            }
            inner+=`<div class="slot-joiner">
                        <div class="card-slot">
                            ${allPersonas[i].name}
                            <div>
                                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${i}" id="list-checkbox-parent-${i}">
                                    <input type="checkbox" id="list-checkbox-${i}" class="mdl-checkbox__input"/>
                                </label>
                            </div>
                        </div>
                        <div class="card-slot" style="font-size: 14px; padding-left: 20px; white-space:normal;">
                            ${personaAllRulesString}
                        </div>
                    </div>`
        }
        else
        {
            inner+=`<div class="card-slot" id="persona-${i}">
                    ${activePersonas[i].name}
                    <div>
                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${i}" id="list-checkbox-parent-${i}">
                            <input type="checkbox" id="list-checkbox-${i}" class="mdl-checkbox__input"/>
                        </label>
                    </div>
                </div>`;
        }
    }

    personasDiv.innerHTML = inner;

    // refresh MDL
    componentHandler.upgradeDom();

    // tick all checkboxes
    if(personaNew)
    {
        for(let i=0;i<activePersonas.length;i++)
        {
            if(activePersonas[i].active)
            {
                checkbox = document.getElementById(`list-checkbox-${i}`);
                checkbox.parentElement.MaterialCheckbox.check();
            }
        }
    }
    else // checks based on what was checked before
    {
        for(let i=0;i<activePersonas.length;i++)
        {
            if(checkboxArray[i])
            {
                checkbox = document.getElementById(`list-checkbox-${i}`);
                checkbox.parentElement.MaterialCheckbox.check();
            }
        }
    }

    // toggling tickbox if required
    if(clicked!=null)
    {
        if(clicked.parentElement!=null)
        {
            if(clicked.parentElement.id.includes("list-checkbox"))
            {
                let parent = document.getElementById(`${clicked.parentElement.id}`);
            
                // toggle checkbox
                if(checkboxArray[focalPoint.index])
                {
                    parent.MaterialCheckbox.uncheck();
                }
                else
                {
                    parent.MaterialCheckbox.check();
                }
            }
        }
    }

    return;
}

function collectDataOnSave() // only works on unlocked page
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
        onOffCheckbox.parentElement.MaterialSwitch.on();
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
            onOffCheckbox.parentElement.MaterialSwitch.on();
        }
        else
        {
            onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: red";
            onOffCheckbox.parentElement.children[2].innerText = "OFF";
            onOffCheckbox.parentElement.children[1].style.cssText = "background-color: red";
        }

        // adding listener to allow toggling on and off
        onOffCheckbox.addEventListener("click",
            ()=>{
                if(onOffCheckbox.parentElement.className.includes("is-checked")) // go to off state
                {
                    onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: red;";
                    onOffCheckbox.parentElement.children[2].innerText = "OFF";
                    onOffCheckbox.parentElement.children[1].style.cssText = "background-color: red;";
                    onOffCheckbox.parentElement.MaterialSwitch.off();


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
                    onOffCheckbox.parentElement.MaterialSwitch.on();

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
                pin2.select();
            } return;
        });

        pin2.addEventListener("input",()=>{
            if(pin2.value.length>0)
            {
                pin3.focus();
                pin3.select();
            } return;
        });

        pin3.addEventListener("input",()=>{
            if(pin3.value.length>0)
            {
                pin4.focus();
                pin4.select();
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
                pin3.select();
            } return;
        })

        pin3.addEventListener("keydown",(event)=>{
            if(`${event.code}`=="Backspace"&&pin3.value.length==0)
            {
                pin2.focus();
                pin2.select();
            } return;
        })

        pin2.addEventListener("keydown",(event)=>{
            if(`${event.code}`=="Backspace"&&pin2.value.length==0)
            {
                pin1.focus();
                pin1.select();
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
                        test.select();
                        return;
                    }
                }
                // if no empty fields are found, put cursor at end
                pin4.focus();
                pin4.select();
                return;
            }
        })

    // if unlocked 
    if(!data.parentalActive)
    {
        if(data.pin.length==4)
        {
            // refresh pins
            let pn1 = document.getElementById("pin1");
            let pn2 = document.getElementById("pin2");
            let pn3 = document.getElementById("pin3");
            let pn4 = document.getElementById("pin4");

            // show current pin
            pn1.value = Number(data.pin.substring(0,1));
            pn2.value = Number(data.pin.substring(1,2));
            pn3.value = Number(data.pin.substring(2,3));
            pn4.value = Number(data.pin.substring(3,4));
        }
        
        // bolding status
        componentHandler.upgradeDom(); // refresh MDL
        let boldSwitch = document.getElementById("boldActive");
        if(data.bolding)
        {    
            boldSwitch.parentElement.MaterialSwitch.on();
        }

        // updating rules entirely from dictionary when updatePopup is called
        addStoredRulesInputs = false;
        maintainAddInputs = false;
        updateRules(data.dictionary,clicked);

        // updating rules entirely from storage when updatePopup is called.
        personaNew = true;
        updatePersonas(data.activePersonas,clicked);

        // inserting save changes button
        let saveContainer = document.getElementById("save-container");
        saveContainer.className = "save-container";
        saveContainer.innerHTML = `<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" style="margin-top:0px" 
                                    id = "saveChanges">
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

        // add listener to activate pin button
        document.getElementById("pinActive").addEventListener("click",
            ()=>
            {
                // grabbing current pin
                let savePin = "";
                let pinn1 = document.getElementById("pin1");
                savePin += pinn1.value;
                let pinn2 = document.getElementById("pin2");
                savePin += pinn2.value;
                let pinn3 = document.getElementById("pin3");
                savePin += pinn3.value;
                let pinn4 = document.getElementById("pin4");
                savePin += pinn4.value;

                // change ParentalActive attribute and pin attribute
                chrome.storage.local.set({
                    pin: savePin,
                    parentalActive: true
                });
                
                onLoad();
            }
        )

    }
    else if(data.parentalActive)// if locked, implement pin checking listener
    {
        document.body.addEventListener("keyup",
            ()=>
            {
                let p1 = document.getElementById("pin1");
                let p2 = document.getElementById("pin2");
                let p3 = document.getElementById("pin3");
                let p4 = document.getElementById("pin4");
                let inputString = p1.value + p2.value + p3.value + p4.value;
                if(inputString.length==4)
                {
                    if(inputString===popupData.pin)
                    {
                        // update parentalActive to false in storage
                        chrome.storage.local.set({
                            parentalActive: false
                        });
                        onLoad();

                    }
                    else
                    {
                        // adding red if incorrect pin entered
                        p1.style.borderBottomColor="red";
                        p2.style.borderBottomColor="red";
                        p3.style.borderBottomColor="red";
                        p4.style.borderBottomColor="red";
                    }
                }
                else
                {
                    p1.style.borderBottomColor="#3b4fff";
                    p2.style.borderBottomColor="#3b4fff";
                    p3.style.borderBottomColor="#3b4fff";
                    p4.style.borderBottomColor="#3b4fff";
                }
                return;
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

        // setting focus onto a rule
        if((clicked.id.includes("rule")
           ||clicked.id.includes("sub")
           ||clicked.id.includes("block"))) //&& focalPoint.index!=clicked.id.substring(clicked.id.length-1,clicked.id.length)) // don't trigger if double click
        {
            focalPoint.area = "rule";
            focalPoint.index = clicked.id.substring(clicked.id.length-1,clicked.id.length);

            // when focusing on a rule, return previous inputs to every section
            maintainAddInputs = true;
            addStoredRulesInputs = true;
            updateRules(popupData.dictionary,clicked);
        }

        // setting focus onto a persona
        else if(clicked.id.includes("persona")) // && focalPoint.index!=clicked.id.substring(clicked.id.length-1,clicked.id.length))
        {
            focalPoint.area = "persona";
            focalPoint.index = clicked.id.substring(clicked.id.length-1,clicked.id.length);

            personaNew = false;
            updatePersonas(popupData.activePersonas,clicked); // add event tag to implement focus here
        }

        else if(clicked.parentElement!=null)
        {
            if(clicked.parentElement.id.includes("list-checkbox"))
            {
                focalPoint.area = "persona";
                focalPoint.index = clicked.parentElement.id.substring(clicked.parentElement.id.length-1,clicked.parentElement.id.length);

                personaNew = false;
                updatePersonas(popupData.activePersonas,clicked); // add event tag to implement focus here
            }
            else if(clicked.parentElement.id.includes("deleteRule")) // delete listener
            {
                index = clicked.parentElement.id.substring(clicked.parentElement.id.length-1,clicked.parentElement.id.length);
                popupData.dictionary.splice(index,1);

                // update Rules while maintaining data that was in add boxes, cannot add stored rules as this will include deleted rule
                addStoredRulesInputs = false;
                maintainAddInputs = true;
                updateRules(popupData.dictionary,null)
            }
        }    

        else if(!focalPoint.area!="") // defocus
        {
            focalPoint.area = "";
            focalPoint.index = null;

            //  when defocusing, return all inputs as they were
            addStoredRulesInputs = true;
            maintainAddInputs = true;
            updateRules(popupData.dictionary,clicked);

            personaNew = false;
            updatePersonas(popupData.activePersonas,clicked);
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

        // send call to function to display user info
        console.log(data);
        popupUpdate(data);

    });
}
onLoad();
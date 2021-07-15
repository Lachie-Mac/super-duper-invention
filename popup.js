/*

    PERSISTENT DATA

*/

let allPersonas = [{name: "placeholder1",
                    dictionary: [{
                        blockWord: "block1",
                        subWord: "sub1",
                        redaction: false},]
                    },
                    {name: "placeholder2",
                    dictionary: [{
                        blockWord: "block2",
                        subWord: "sub2",
                        redaction: false}]
}];


/*

    ON POPUP LOAD

*/
// default data variable to store all the neccessary info that popup requires
let popupData = {extensionActive: false,
                dictionary: [{
                                blockWord: "football",
                                subWord: "cog",
                            },
                            {
                                blockWord: "what",
                                subWord: "shit",
                            }],
                personaDictionary: [],
                activePersonas: [{
                                    name: "placeholder1",
                                    active: false
                                },
                                {
                                    name: "placeholder2",
                                    active: true
                                }],
                pin: "0000",
                parentalActive: false,
                bolding: false,};

let focalPoint = {area: "",
                  index: null};

popupUpdate(popupData) 

// function onLoad(){
//     // pull data from storage upon injection
//     chrome.storage.local.get('data', data => {
//         popupData = data.data;
//         console.log(popupData);
//         // scan to check which active personas are used
//         let activePersonas = popupData.activePersonas;
//         for(let i=0; i<activePersonas.length; i++){
//             if(activePersonas[i].active){
//                 for(let j=0; j<allPersonas[i].dictionary.length; j++){
//                     popupData.personaDictionary.push(allPersonas[i].dictionary[j]);
//                 }
//             }
//         }

//         // send call to function to display user info
//         popupUpdate(popupData);

//     });
// }

// onLoad();


/*

    EVENT LISTENERS FOR BUTTONS

*/

// ON PAGELOAD --------------------------

function updateRules(dictionary)
{
    let rulesDiv = document.getElementById("collapse-1-div");
    let inner = "";
    let blockInput;
    let subInput;

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

    // add values to dictionary rules
    for(let i=0;i<dictionary.length;i++)
    {
        blockInput = document.getElementById(`block_${i}`);
        blockInput.value = dictionary[i].blockWord;

        subInput = document.getElementById(`sub_${i}`);
        subInput.value = dictionary[i].subWord;
    }
}

function updatePersonas(activePersonas)
{
    let personasDiv = document.getElementById("collapse-2-div");
    let inner = "";
    let checkbox;

    // generate list then insert
    for(let i=0;i<allPersonas.length;i++)
    {

        inner+=`<div class="card-slot" id="persona-${i}">
                    ${allPersonas[i].name}
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
    for(let i=0;i<allPersonas.length;i++)
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

    let saveData = {extensionActive: popupData.extensionActive,
                    dictionary: popupData.dictionary,
                    personaDictionary: [],
                    activePersonas: saveActivePersonas,
                    pin: savePin,
                    parentalActive: true,
                    bolding: document.getElementById("boldActive").parentElement.className.includes("is-checked")};

    console.log(saveData);
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
            onOffCheckbox.value = "on";
            onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: #00e025;";
            onOffCheckbox.parentElement.children[2].innerText = "ON";
            onOffCheckbox.parentElement.children[1].style.cssText = "background-color: #00e025;";
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

                    
                    // send message to foreground
                    // upon receiving message trigger replaceWords


                    /*
                    GENERAL IDEA
                    // force the page to reload
                    // send message to background to retrieve tab id
                    // send a message to foreground telling it to reload
                    // later add retrieve data and send to storage
                    chrome.runtime.sendMessage({
                        message: "forceReload"
                    });
                    */
                }
                else // go to on state
                {
                    onOffCheckbox.parentElement.children[2].style.cssText = "text-align: center; font-family:'Poppins',sans-serif; font-size: 10px; background-color: #00e025;";
                    onOffCheckbox.parentElement.children[2].innerText = "ON";
                    onOffCheckbox.parentElement.children[1].style.cssText = "background-color: #00e025;";

                    // // retrieve tabId from storage
                    // chrome.storage.local.get("currentTabId", tabId => {
                    //     chrome.tabs.sendMessage(tabId.currentTabId, {
                    //         message: "triggerReplace",
                    //         payload: false
                    //     });
                    // });
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
        updatePersonas(data.activePersonas);
        updateRules(data.dictionary);

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
            }
        )
    }

    return;
}

// click handler function
document.body.addEventListener("click",
    (event) =>
    {
        let clicked = event.target

        // setting focus onto a rule
        if(clicked.id.includes("rule")
           ||clicked.id.includes("sub")
           ||clicked.id.includes("block"))
        {
            focalPoint.area = "rule";
            focalPoint.index = clicked.id.substring(clicked.id.length-1,clicked.id.length);
            updateRules(popupData.dictionary);
        }

        // setting focus onto a persona
        else if(clicked.id.includes("list-checkbox")
           ||clicked.id.includes("persona"))
        {
            focalPoint.area = "persona";
            focalPoint.index = clicked.id.substring(clicked.id.length-1,clicked.id.length);
            updatePersonas(popupData.dictionary);
        }

        else // defocus
        // if(clicked.id.includes("add") // if click on add box, then defocus
        //    ||clicked.id.includes("")
        //   ) 
        {
            focalPoint.area = "";
            focalPoint.index = null;
            updateRules(popupData.dictionary);
        }
    }
)
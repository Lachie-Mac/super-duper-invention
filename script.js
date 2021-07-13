class User 
{
    constructor()
    {
        this.active = true;
        this.pin = null;
        this.bolding = true;
        
        this.personaArray = 
        {
            trumpActive: true,
        };
        
        this.ruleArray = [];

    }
    
    fromData(data)
    {
        this.active = active;
        this.pin = pin;
        this.bolding = bolding;
        this.personaArray = personaArray;

        // rule Array recovery
        for(let i=0;i<data.ruleArray.length;i++)
        {
            let newRule = new Rule;
            newRule.fromData(data.ruleArray[i]);
            this.ruleArray.push(newRule);
        }
    }
}

class Rule
{
    constructor()
    {
        this.blockedWords = blockedWords;
        this.substituteWords = substituteWords;
        this.caseSensitive = caseSensitive;
        this.blocking = blocking;
    }
}

function getUserInfo()
{
    //Function to get user credentials from storage
    userInfo = {};
    //Storing the
    chrome.storage.sync.get(
        //Default set user info to null
        {storedInfo = null}, 
    function(user)
    {
        //Assigning to the user info
        userInfo = user;
    });
    return userInfo;
}
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
        this.substitute = substitute;
        this.caseSensitive = caseSensitive;
        this.blocking = blocking;
    }
}

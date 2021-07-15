let bigString = "the quick brown football jump over the <football> lazy football <";
// let rules = [{blockWord: "football",
//               subWord: "basketball"},
//               {blockWord: "the",
//               subWord: "THE"}]

//             for(let i=0;i<rules.length;i++) // rules loop
//             {
//               for(let j=0;j<bigString.length;j++) // string loop
//               {
//                   let tester = bigString.substring(j,j+(rules[i].blockWord.length)); 
//                   if(rules[i].blockWord==tester)
//                   {
//                       for(let k=j+rules[i].blockWord.length;k<bigString.length;k++)
//                       {
//                           let testletter = bigString.substring(k,k+1);
//                           if(testletter=="<") // good word
//                           {
//                               let before = bigString.slice(0,j);
//                               let after = bigString.slice(j+rules[i].blockWord.length,bigString.length);
//                               bigString = before + rules[i].subWord + after;
//                               console.log(`Change ${tester}`);
//                               break;
//                           }
//                           else if(bigString.substring(k,k+1)==">")
//                           {
//                               break;
//                           }
//                       }
//                   }
//               }
//             } 
            
// console.log(bigString);
let rules = [{blockWord: "football",
                subWord: "<b>basketball</b> "},
                {blockWord: "Football",
                subWord: "<b>Basketball</b> "},
                {blockWord: "The",
                subWord: "<b>THE</b>"},
                {blockWord: "the",
                subWord: "<b>THE</b>"}]

        for(let i=0;i<rules.length;i++) // rules loop
        {
            for(let j=0;j<bigString.length;j++) // string loop
            {
                let tester = bigString.substring(j,j+(rules[i].blockWord.length)); 
                if(rules[i].blockWord==tester)
                {
                    if ( !isLetter(bigString.charAt(j-1)) &&  !isLetter(bigString.charAt(j+rules[i].blockWord.length))){
                    for(let k=j+rules[i].blockWord.length;k<bigString.length;k++)
                {
                    let testletter = bigString.substring(k,k+1);
                    if(testletter=="<") // good word
                    {
                        let before = bigString.slice(0,j);
                        let after = bigString.slice(j+rules[i].blockWord.length,bigString.length);
                        bigString = before + rules[i].subWord + after;
                        console.log(`Change ${tester}`);
                        break;
                    }
                    else if(bigString.substring(k,k+1)==">")
                    {
                        break;
                    }
                 }

                }
                }
            }
        }

        console.log(bigString)


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }


















    // for(let j=0;j<bigString.length;j++) // string loop
    // {
    //     let tester = bigString.substring(j,j+8);
    //     if(tester==blocked)
    //     {
    //         for(let k=j+8;k<bigString.length;k++)
    //         {
    //             let testletter = bigString.substring(k,k+1);
    //             if(testletter=="<") // good word
    //             {
    //                 let before = bigString.slice(0,j);
    //                 let after = bigString.slice(j+8,bigString.length);
    //                 bigString = before + sub + after;
    //                 console.log("Change");
    //                 break;
    //             }
    //             else if(bigString.substring(k,k+1)==">")
    //             {
    //                 break;
    //             }
    //         }
    //     }

    // }

    // console.log("finished text unit")
    // console.log(bigString)

    
// let blocked = ["football", "Football","the"];
// let sub = ["<b>basketball</b>","<b>Basketball</b>","<b>THE</b>"];  

// let bigString = document.body.innerHTML;



// // findIndex
// bigString.findIndex()


// console.log("finished all html")
// document.body.innerHTML = bigString;

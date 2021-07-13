// function to scan through text in document and replace users words
/*function replaceWords() {
    const webText = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');
    let blockedWord = document.getElementById("unduckMe");
    let substituteWord = document.getElementById("sub");

    for (let i=0; i<text.length; i++) 
    {
        //for(let j=0; j<blockedWord.length; j++) {}
        if(text[i].innerHTML.includes(blockedWord)) 
        {
            text[i].innerHTML = text[i].innerHTML.replace(blockedWord,`<b>${substituteWord}</b>`);
        }
    }
}  */
//Storing the PIN active status for Parental mode 
  function savePinStatus()
  {
      var pinStatus = document.getElementById('pinActive').checked;
      //Storing The value into chrome.storage
      chrome.storage.sync.set({pinStatus: pinStatus}, 
        function() 
        {
        });
        if (pinStatus)
        {
            document.getElementById('status').innerHTML = 'Parental Mode Activated.';
        }
  }

// Restores select box state using the preferences stored in chrome.storage.
function restore_options() {
    // Use default of pin off
    chrome.storage.sync.get({
      pinStatus: false
    }, function(items) {
      document.getElementById('pinActive').checked = items.pinStatus;
      if(items.pinStatus)
      {
          document.getElementById('mainBody').innerHTML = 'Enter Pin'
      }
    });  
  }

  //document.getElementById("button").addEventListener("click", replaceWords);
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',savePinStatus);
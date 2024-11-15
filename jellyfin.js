(async () => {

    // yourjellyfinURL
  const { JELLYFIN_URL_QUERY = "https://192.168.7.7/web/#/search.html?query=" } = await import(chrome.runtime.getURL('config.js'));
    

  // Insert an iframe
  function insertIframe(keyword = '777', position = "upper", id="jellyfin_inserted") {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', JELLYFIN_URL_QUERY + keyword);
    iframe.setAttribute('id', id);
    iframe.style.width = "100%"; // Make iframe fill the div
    iframe.style.height = "100%"; // Make iframe fill the div
    iframe.style.resize = 'both'; // Allow resizing in both directions
    iframe.style.overflow = 'auto'; // Add scrollbars if needed  
        
    iframe.addEventListener('load', function () {
        console.log('Iframe content loaded');
        window.parent.postMessage({ action: 'iframe-loaded' }, '*');
    });

    // Create a div with class 'columns'
    var columnsDiv = document.createElement('div');
    columnsDiv.className = 'columns';
    // columnsDiv.style.width = "100%"; // Optional: Adjust as needed
    columnsDiv.style.height = "40vh"; // Optional: Adjust as needed, e.g., to fill the viewport height
    columnsDiv.style.resize = 'both'; // Allow resizing in both directions
    columnsDiv.style.overflow = 'auto'; // Add scrollbars if needed

    // Create a div with class 'column' and append the iframe to it
    var columnDiv = document.createElement('div');
    columnDiv.className = 'column';
    
    columnDiv.style.width = "100%"; // Ensure the div fills its parent
    columnDiv.style.height = "100%"; // Ensure the div fills its parent
    columnDiv.style.resize = 'both'; // Allow resizing in both directions
    columnDiv.style.overflow = 'auto'; // Add scrollbars if needed


    columnDiv.appendChild(iframe);
    // Append the column div to the columns div
    columnsDiv.appendChild(columnDiv);



    var columnsURL = document.createElement('div');

    // Create a clickable URL outside the iframe
    var clickableUrl = document.createElement('a');
    clickableUrl.setAttribute('href', JELLYFIN_URL_QUERY + keyword);
    // clickableUrl.setAttribute('target', '_blank'); // Open in a new tab
    clickableUrl.textContent = 'Open Jellyfin Search';
    clickableUrl.style.display = 'block'; // Make it a block element for better layout

    // Append the clickable URL to the columnsDiv
    columnsURL.appendChild(clickableUrl);

    var anchor = document.querySelector("body > section > div > div.video-detail")
    if (position == "upper") {
        var thirdChild = anchor.children[2]; // Children are 0-indexed
        anchor.insertBefore(columnsURL, thirdChild);
        anchor.insertBefore(columnsDiv, thirdChild);
        

    }
    if (position == "lower") {
        const targetElement = document.querySelector("body > section > div > div.video-detail > div:nth-child(8)");
        targetElement.insertAdjacentElement('afterend', columnsDiv);
    }


  }

  function getFemaleActor() {
    // Step 1: Select all div elements with class "panel-block"
    const panelBlocks = document.querySelectorAll('.panel-block');

    // Step 2: Find the div that contains <strong> with text "演員:"
    const actorDiv = Array.from(panelBlocks).find(div => div.querySelector('strong')?.textContent.includes('演員:'));

    if (actorDiv) {
        // Step 3: Select all <a> elements within the found div
        const allAnchors = actorDiv.querySelectorAll('a');

        // Step 4: Filter <a> elements that are immediately followed by <strong class="symbol female">
        const femaleActorAnchors = Array.from(allAnchors).filter(anchor => anchor.nextSibling && anchor.nextSibling.nodeType === Node.ELEMENT_NODE && anchor.nextSibling.classList.contains('symbol') && anchor.nextSibling.classList.contains('female'));

        // Step 5: Extract text content of these <a> elements
        const femaleActorNames = femaleActorAnchors.map(anchor => anchor.textContent.trim());

        console.log(femaleActorNames);
        return femaleActorNames;
    }
    return [];
  }

  // insert by actor name
  // getFemaleActor().forEach(actor => {
  //     insertIframe(actor, "lower");
  // });
  // insert by ssid

  window.addEventListener('message', function (event) {
    // Check the origin of the message to ensure it's from a trusted source
    if (event.origin !== 'https://javdb.com') {
        return;
    }

    // Handle the message
    if (event.data.action === 'iframe-loaded') {
        console.log('Received message from iframe: ', event.data);
        // You can add more actions here
    }
    console.log('Received message from iframe: ', event.data);

    if (event.data.action === 'selected-text') {
        console.log('Selected text from iframe: ', event.data.text);
        // You can add more actions here
    }

  }, false);

  ssid = document.querySelector("body > section > div > div.video-detail > h2 > strong:nth-child(1)").innerText;
  ssid = ssid.replace(/\s/g, '');
  keyword = ssid.split('-').pop();
  insertIframe(keyword, "upper", "inserted_jellyfin_query");
})();
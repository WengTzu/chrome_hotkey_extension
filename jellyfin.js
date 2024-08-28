const JELLYFIN_URL_QUERY = "https://192.168.50.7:2096/web/#/search.html?query=";
// Insert an iframe
function insertIframe(keyword = '777', position = "upper", id="jellyfin_inserted") {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', JELLYFIN_URL_QUERY + keyword);
    iframe.setAttribute('id', id);
    iframe.style.width = "100%"; // Make iframe fill the div
    iframe.style.height = "100%"; // Make iframe fill the div

    // Add sandbox attribute with some permissions
    // iframe.setAttribute('sandbox', 'allow-scripts allow-forms allow-same-origin');
    // iframe.addEventListener('load', function () {
    //     console.log('Iframe content loaded');
    //     window.parent.postMessage({ action: 'iframe-loaded' }, '*');
    //     // You can add more actions here
    // });
    
        
    iframe.addEventListener('load', function () {
        console.log('Iframe content loaded');
        window.parent.postMessage({ action: 'iframe-loaded' }, '*');
        // You can add more actions here

        // Add event listener for selection change inside the iframe
        // iframe.contentWindow.document.addEventListener('selectionchange', function () {
        //     var selectedText = iframe.contentWindow.getSelection().toString();
        //     console.log('Selected text in iframe:', selectedText);
        //     window.parent.postMessage({ action: 'selected-text', text: selectedText }, '*');
        // });
    });

    // Create a div with class 'columns'
    var columnsDiv = document.createElement('div');
    columnsDiv.className = 'columns';
    // columnsDiv.style.width = "100%"; // Optional: Adjust as needed
    columnsDiv.style.height = "40vh"; // Optional: Adjust as needed, e.g., to fill the viewport height

    // Create a div with class 'column' and append the iframe to it
    var columnDiv = document.createElement('div');
    columnDiv.className = 'column';
    columnDiv.style.width = "100%"; // Ensure the div fills its parent
    columnDiv.style.height = "100%"; // Ensure the div fills its parent
    columnDiv.appendChild(iframe);
    // Append the column div to the columns div
    columnsDiv.appendChild(columnDiv);

    // if (iframe.attachEvent) {
    //     iframe.attachEvent("onload", function () {
    //         document.querySelector("#video-search").focus();
    //         window.scrollTo(0, 0)
    //     });
    // } else {
    //     iframe.onload = function () {
    //         document.querySelector("#video-search").focus();
    //         window.scrollTo(0, 0)
    //     };
    // }
    var anchor = document.querySelector("body > section > div > div.video-detail")
    if (position == "upper") {
         var thirdChild = anchor.children[2]; // Children are 0-indexed
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

ssid = document.querySelector("body > section > div > div.video-detail > h2 > strong:nth-child(1)").innerText
ssid = ssid.replace(/\s/g, '');
insertIframe(ssid.split('-').pop(), "upper", "inserted_jellyfin_query");
var toggleBg = false;
let port = null
let selectedTextGlobal = "";

// chrome.commands.onCommand.addListener(newTab);


chrome.commands.onCommand.addListener(function (command, tab) {

    console.log(tab.id);
    console.log('Command:', command);

    function getSelectedTextFromPage() {
        // Retrieve the current text selection from the window
        const selection = window.getSelection().toString();
        // Process the selected text (this step is optional and can be customized)
        // For demonstration, let's just return the trimmed version of the selected text
        // return selectedText.trim();

        if (selection) {
            return selection.trim(); // Return the selection if it's not empty
        } else {
            // // If the main window has no selection, check iframes
            // const iframes = document.getElementsByTagName('iframe');
            // for (let i = 0; i < iframes.length; i++) {
            //     try {
            //         // Attempt to access iframe content
            //         const iframeDoc = iframes[i].contentDocument || iframes[i].contentWindow.document;
            //         const iframeSelection = iframeDoc.getSelection().toString();
            //         if (iframeSelection) {
            //             return iframeSelection; // Return the selection from the iframe
            //         }
            //     } catch (e) {
            //         console.error('Error accessing iframe content:', e);
            //         // Iframe content might not be accessible due to same-origin policy
            //     }
            // }
        }
    }

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getSelectedTextFromPage
    }, (results) => {
        // results[0].result will contain the value returned by getSelectedTextFromPage
        selectedTextGlobal = results[0].result;
        console.log('Selected text:', results[0].result);
    });

    //const tabId = getTabId()
    if (command == "copy-magnet-name") {
        // chrome.scripting.executeScript({
        //     target: { tabId: tab.id },
        //     files: ['copy.js'],
        // });

        // setTimeout(function () {
        //     port = chrome.runtime.connectNative("com.magnet_autocopy.myauto")
        //     port.onMessage.addListener(function (msg) {
        //         console.log("Received" + msg);
        //     });
        //     port.onDisconnect.addListener(function () {
        //         console.log("Disconnected");
        //         if (chrome.runtime.lastError) {
        //             console.log(chrome.runtime.lastError);
        //         }
        //     });
        // }, 2000);
    }

    if (command == "search_on_jav") {
        async function getElementsWithoutOpen(sid) {
            console.log('search on jav')
            // var sid = selectedTextGlobal
            console.log("get selected", sid);

            // let sids = selected.split(" ");
            // console.log("sid", sids);

            let url = 'https://javdb.com/search?q=' + encodeURIComponent(sid) + '&f=all';

            const regex = /^[a-zA-Z0-9-]+$/;
            if (!regex.test(sid)) {
                console.log("Selected text contains characters other than numbers and alphabets.");
                // chrome.tabs.create({ url: url }); 
                window.open(url, '_blank').focus();
                return; // Exit the function if the check fails
            }
            else if (sid.length < 4) {
                console.log("Selected text is too short.");
                // chrome.tabs.create({ url: url }); 
                window.open(url, '_blank').focus();
                return; // Exit the function if the check fails
            }

            try {
                let response = await fetch(url);
                if (response.ok) {
                    let text = await response.text();
                    // Use DOMParser to parse the HTML text
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(text, "text/html");
                    let items = doc.getElementsByClassName("item");
                    if (items.length > 0) {
                        // Process the first item or all items as needed
                        console.log("First item:", items[0].innerHTML);
                        let firstItemLink = items[0].querySelector('a');
                        url = 'https://javdb.com' + firstItemLink.getAttribute('href');
                        // Further processing can be done here
                    } else {
                        console.log("No items found");
                    }
                } else {
                    console.log("HTTP-Error: " + response.status);
                }
            }
            catch (error) {
                console.error("Error fetching the URL:", error);
            }
            finally {
                // chrome.tabs.create({ url: url }); 
                window.open(url, '_blank').focus();
            }
        }
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getElementsWithoutOpen,
            args: [selectedTextGlobal],
        });
    }
    

    if (command == "search_on_yahoo") {
        console.log('search on yahoo')
        function yahoo(selected) {
            // var selected = selectedTextGlobal
            console.log("get selected", selected)
            url = 'https://tw.dictionary.search.yahoo.com/search?p=' + selected
            window.open(url, '_blank').focus();
            //return selected;
        }
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: yahoo,
            args: [selectedTextGlobal],
        });
    }

    if (command == "search_on_skell") {
        console.log('search on skell')
        function getselected(selected) {
            // var selected = selectedTextGlobal
            console.log("get selected", selected)
            url = 'https://skell.sketchengine.eu/#result?f=wordsketch&lang=en&query=' + selected
            window.open(url, '_blank').focus();
            //return selected;
        }
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getselected,
            args: [selectedTextGlobal],
        });
    }

    if (command == "search_on_cambridge") {
        console.log('search on cambridge')
        function getselected(selected) {
            // var selected = selectedTextGlobal  
            console.log("get selected", selected)
            url = 'https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/' + selected
            window.open(url, '_blank').focus();
            //return selected;
        }
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getselected,
            args: [selectedTextGlobal],
        });
    }

    if (command == "search_on_longman") {
        console.log('search on longman')
        function getselected(selected) {
            // var selected = selectedTextGlobal
            console.log("get selected", selected)
            url = 'https://www.ldoceonline.com/dictionary/' + selected
            window.open(url, '_blank').focus();
            //return selected;
        }
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getselected,
            args: [selectedTextGlobal],
        });
    }

    if (command == "search_on_wordhippo") {
        console.log('search on wordhippo')
        function getselected(selected) {
            // var selected = selectedTextGlobal
            console.log("get selected", selected)
            url = 'https://www.wordhippo.com/what-is/another-word-for/' + selected + '.html'
            window.open(url, '_blank').focus();
            //return selected;
        }
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getselected,
            args: [selectedTextGlobal],
        });
    }

    if (command == "search_on_google") {
        console.log('search on google')
        function getselected(selected) {
            // var selected = selectedTextGlobal
            console.log("get selected", selected)
            url = 'https://translate.google.com/?sl=auto&tl=zh-TW&text=' + selected + '&op=translate'
            window.open(url, '_blank').focus();
            //return selected;
        }
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getselected,
            args: [selectedTextGlobal],
        });
    }

    // if(command == "native_messaging"){
    //     //const tabId = getTabId()
    //     chrome.scripting.executeScript({  
    //         //allFrames: true,
    //         target: {tabId: tab.id},
    //         files: ['name.js'],
    //     }); 
    // }
});


function copytitle(){
    var input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', name);
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('copy name', name);
    }
    else{
        alert("copy false")
    }
    document.body.removeChild(input);
}
// get title
title = "title is-4"
t = document.getElementsByClassName(title)
name = t[0].textContent
name.split(' ')
title = name.split(" ")
title.shift()
title.shift()
title.shift()
title = title.join("")
//class_name = "button is-info is-small copy-to-clipboard"
td_class = "magnet-name"
//table = "magnet-name"
//new_HTML = magnet_table.innerHTML
href_table = document.getElementsByClassName(td_class)
// add dn="info" into tags
for(var i=0; i<href_table.length; i++){
    href_table[i].innerHTML = href_table[i].innerHTML.replace('.torrent','')
    href_table[i].innerHTML = href_table[i].innerHTML.replace(/dn=[^\]]*./,"")
    // href_table[i].innerHTML = href_table[i].innerHTML.replace(/" title/," "+title+"\" title")
    //href_table[i].innerHTML = href_table[i].innerHTML.replace('.torrent','')
}
//href_table[0].innerHTML = href_table[0].innerHTML.replace(/dn=[^\]]*./,"dn=")
//magnet_table.innerHTML

//setTimeout(//copytitle(), 1500);
// add deluge tag
magnets = document.getElementsByClassName("magnet-name column is-four-fifths")
for(var i=0; i<magnets.length; i++){
    tags = magnets[i].getElementsByClassName("tags")
    console.log(tags)

    let newSpan = document.createElement('span'); // 創建一個新的 span 標籤
    newSpan.className = 'tag is-primary is-small is-light'; // 設定新 span 的 class
    newSpan.textContent = 'Deluge'; // 設定新 span 的內容
    newSpan.style.backgound = 'blue';
    if (tags.length > 0){
        tags[0].appendChild(newSpan); // 將新的 span 標籤添加到 div 中
    }
    else{
        let newDiv = document.createElement('div'); // 創建一個新的 span 標籤
        newDiv.className = 'tags'; // 設定新 span 的 class

        newDiv.appendChild(newSpan); // 將新的 span 標籤添加到 div 中
        magnets[i].getElementsByTagName("a")[0].appendChild(newDiv); 
    }
    c = newSpan.style.backgound
    console.log(c)
}

const copyButtons = document.querySelectorAll('.copy-to-clipboard');
copyButtons.forEach(button => {
    const bitcometButton = document.createElement('button');
    bitcometButton.textContent = 'Bitcomet';
    bitcometButton.className = 'button is-primary is-small';

    // Assuming the magnet link is stored in a data attribute of the button
    // For example: <button class="copy-to-clipboard" data-magnet="magnet:?xt=...">Copy</button>
    const magnetLink = button.getAttribute('data-clipboard-text');
    console.log(magnetLink);
    // Modify this line to pass the magnet link to the bitcomet_fetch function
    bitcometButton.addEventListener('click', () => bitcomet_fetch(magnetLink, bitcometButton));

    button.parentNode.insertBefore(bitcometButton, button.nextSibling);
});

// Step 2: Create and send the POST request
function bitcomet_fetch(magnet, button) {
    var url = "https://192.168.50.210:10029/panel/task_add_magnet_result";
    var encodedMagnet = encodeURIComponent(magnet);
    var path = encodeURIComponent("/home/sandbox/Downloads/bitcomet_incomplete");
    var bodyContent = "url=" + encodedMagnet + "&save_path=" + path;

    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyContent,
        mode: 'no-cors', // Disable CORS
        credentials: 'include', // Send cookies with cross-origin requests
    })
    .then(response => {
        // Since we are using 'no-cors', we cannot access the response content
        console.log('Request sent, but response is opaque due to no-cors mode.');
        button.textContent = 'Request Sent';
        button.style.backgroundColor = 'orange';
    })
    .catch(error => {
        console.error('Error:', error);
        button.textContent = 'Failed';
        button.style.backgroundColor = 'red';
    });
}
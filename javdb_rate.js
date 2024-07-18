//alert("hello world");
console.log("hello world");
items = document.getElementsByClassName("item")

for(var i=0; i<items.length; i++){
    value = items[i].getElementsByClassName("value")[0]
    if (value) {
        var v = value.innerText
        v = v.split("分")[0].split("\n")[1]
        v = parseFloat(v); // 將 v 轉換為數字

        if (v >= 4.3){
            value.style.color = "#FF0000";
        }
        else if (v >= 4.0){
            value.style.color = "#00FFFF";
        }
        else if (v >= 3.9){
            value.style.color = "#66B3FF";
        }
        console.log(v)
    }
}
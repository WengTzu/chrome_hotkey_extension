console.log("sehuatang auto scroll");
window.onload=function()
{

    console.log('load finish, start');

    var obj = document.getElementById('thread_subject');
    console.log(obj);
    //var x = obj.offsetLeft;
    //var y = obj.offsetTop;
    //alert('x:'+x+', y:'+y);
    var y = obj.getBoundingClientRect().top;
    console.log("offset", y)
    window.scrollBy(0, obj.getBoundingClientRect().top-30);
    /*window.scrollTo({
        top: y,
        behavior: "smooth"
    });*/
}




console.log("end");
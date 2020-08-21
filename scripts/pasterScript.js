window.onload = function () {
    let mCount = 0;
    const pContainer = document.getElementById("elements");
    const pCounter = document.getElementById("counter");
    function setCount(){
        let count = pContainer.getElementsByTagName('p').length;
        let charLength = pContainer.innerHTML.length;
        pCounter.innerHTML = count.toLocaleString() + ' / ' + charLength.toLocaleString();
        mCount = count;
    }
    function doListen(b){
        if(b){
            pContainer.addEventListener("DOMNodeInserted", listener, false);
        } else{
            pContainer.removeEventListener("DOMNodeInserted", listener, false);
        }
    }
    function doWithoutListen(callback){
        doListen(false);
        setTimeout(callback, 0);
        doListen(true);
    }
    const listener = function () {
        const elements = pContainer.getElementsByTagName('p');
        const countNew = elements.length;
        if (countNew - mCount > 0) {
            const newEl = elements[countNew - 1];
            const newline = newEl.innerHTML;
            if (newline.indexOf('. ') === -1) {
                newEl.innerHTML = newline + '. '
            }
            if(countNew > 1){
                doWithoutListen(()=>{
                    pContainer.insertBefore(newEl, elements[0]);
                });
            }
            setCount();
        }
    };
    doListen(true);
    document.getElementById("remove_button").addEventListener("click", function () {
        const elements = pContainer.getElementsByTagName('p');
        if (elements.length > 0) {
            let last = elements[elements.length - 1];
            pContainer.innerHTML = '';
            pContainer.insertBefore(last, elements[0]);
            setCount();
        }
    });
};
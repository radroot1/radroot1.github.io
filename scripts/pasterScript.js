window.onload = function () {
    let mCount = 0;
    let mCharsLength = 0;
    const pContainer = document.getElementById("elements");
    const pCounter = document.getElementById("counter");
    function setCount(count, charLength){
        mCount = count;
        mCharsLength = charLength;
        pCounter.innerHTML = count.toLocaleString() + ' / ' + charLength.toLocaleString();
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
            let charsLengthNew = mCharsLength + newline.length;
            setCount(countNew, charsLengthNew);
        }
    };
    doListen(true);
    document.getElementById("remove_button").addEventListener("click", function () {
        const pContainer = document.getElementsByTagName('p');
        let remove_lines = pContainer.length;
        if (remove_lines > 0) {
            const node = document.getElementById("elements");
            node.innerHTML = '';
            setCount(0, 0);
        }
    });
};
window.onload = function () {
    let mCount = 0;
    let mCharsLength = 0;
    const pContainer = document.getElementById("elements");
    const pCounter = document.getElementById("counter");
    function setCount(c){mCount = c;}
    function setCharLength(c){mCharsLength = c;}
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
        if ((countNew - mCount) > 0) {
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
            let charsDisp = charsLengthNew.toLocaleString();
            let linesDisp = countNew.toLocaleString();
            pCounter.innerHTML = charsDisp + ' / ' + linesDisp;
            setCount(countNew);
            setCharLength(charsLengthNew);
        }
    };
    doListen(true);
    document.getElementById("remove_button").addEventListener("click", function () {
        const pContainer = document.getElementsByTagName('p');
        let remove_lines = pContainer.length;
        if (remove_lines > 0) {
            const node = document.getElementById("elements");
            node.innerHTML = '';
            let newch = 0;
            let newl = mCount - 1;
            pCounter.innerHTML = newch.toLocaleString() + ' / ' + newl.toLocaleString();
            setCharLength(newch);
            setCount(newl);
        }
    });
};
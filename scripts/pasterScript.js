window.onload = async function () {
    let mCount = 0;
    let mWeb = false;
    const pContainer = document.getElementById("elements");
    const pCounter = document.getElementById("counter");
    function setCount(){
        let count = pContainer.getElementsByTagName('p').length;
        let charLength = pContainer.innerHTML.length;
        pCounter.innerHTML = count.toLocaleString() + ' / ' + charLength.toLocaleString();
        mCount = count;
    }
    function doListenForClipChanges(b){
        if(b){
            pContainer.addEventListener("DOMNodeInserted", clipListener, false);
        } else{
            pContainer.removeEventListener("DOMNodeInserted", clipListener, false);
        }
    }
    function modifyWithoutClipListen(callback){
        doListenForClipChanges(false);
        setTimeout(callback, 0);
        doListenForClipChanges(true);
    }
    function clipListener() {
        modifyWithoutClipListen(() => {
            const elements = pContainer.getElementsByTagName('p');
            const countNew = elements.length;
            if (countNew - mCount > 0) {
                const newEl = elements[countNew - 1];
                const newElContent = newEl.innerHTML;
                if(mWeb){
                    var a = document.createElement('a');
                    var linkText = document.createTextNode(newElContent);
                    a.appendChild(linkText);
                    a.title = newElContent;
                    a.href = newElContent;
                    newEl.innerHTML = "";
                    newEl.appendChild(a);
                } else {
                    if (newElContent.indexOf('. ') === -1) {
                        newEl.innerHTML = newElContent + '. ';
                    }
                }
                if (countNew > 1) {
                    pContainer.insertBefore(newEl, elements[0]);
                }
                setCount();
            }
        })
    }
    doListenForClipChanges(true);
    document.getElementById("remove_button").addEventListener("click", function () {
        const elements = pContainer.getElementsByTagName('p');
        if (elements.length > 0) {
            const first = elements[0];
            pContainer.innerHTML = '';
            pContainer.insertBefore(first, null);
            setCount();
        }
    });
    document.getElementById("web_button").addEventListener("click", function () {
        mWeb = true

    });
    const text = await navigator.clipboard.readText();
    pContainer.innerHTML = `<p>${text}</p>`;
};
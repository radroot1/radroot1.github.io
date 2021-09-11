window.onload = async function () {
    let mCount = 0;
    const pContainer = document.getElementById("elements");
    const pCounter = document.getElementById("counter");
    function setCount(){
        let count = pContainer.childNodes.length;
        let charLength = pContainer.innerHTML.length;
        pCounter.innerHTML = count.toLocaleString() + ' / ' + charLength.toLocaleString();
        mCount = count;
    }
    function wrapIn(el) {
        const wrapper = document.createElement('p');
        if(typeof el == "string"){
            wrapper.textContent = el;
        } else{
            wrapper.appendChild(el);
        }
        return wrapper;
    }
    function wrapInAndAppendToTop(el) {
        const wrapper = wrapIn(el);
        moveToTop(wrapper, el.parentNode);
        return wrapper;
    }
    function moveToTop(el, parent) {
        parent.insertBefore(el, parent.childNodes[0]);
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
            const elements = pContainer.childNodes;
            if (elements.length - mCount > 0) {
                const newEl = elements[elements.length - 1];
                if (newEl.innerHTML.indexOf('。') === -1) {
                    newEl.innerHTML = newEl.innerHTML + '。';
                }
                moveToTop(newEl, newEl.parentNode);
                setCount();
            }
        })
    }
    async function pasteClip() {
        const text = await navigator.clipboard.readText();
        pContainer.appendChild(wrapIn(text))
    }

    doListenForClipChanges(true);
    document.getElementById("remove_button").addEventListener("click", function () {
        const elements = pContainer.childNodes;
        if (elements.length > 0) {
            const first = elements[0];
            pContainer.innerHTML = '';
            pContainer.insertBefore(first, null);
            setCount();
        }
    });
    setTimeout(pasteClip, 0);
};
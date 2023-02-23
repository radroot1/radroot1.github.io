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
    function getNode(text) {
        const containsJapanese = text.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/);

        if(containsJapanese){
            const node = document.createElement('p');
            if (text.substring(text.length - 1) !== '。') {
                node.innerHTML = text + '。';
            } else{
                node.innerHTML = text;
            }
            return node;
        }

        if (text.includes("http")) {
            const node = document.createElement('a');
            node.href = text;
            node.innerHTML = text;
            return node
        }

        const node = document.createElement('p');
        node.innerHTML = text;

        return node
    }
    function clipListener() {
        modifyWithoutClipListen(() => {
            const elements = pContainer.childNodes;
            if (elements.length - mCount > 0) {
                const pasteNode = elements[elements.length - 1];
                const array = pasteNode.innerHTML.split(/\r?\n/).filter(element => element);
                for(const i in array.reverse()){
                    const text = array[i];
                    if(text.length > 0){
                        moveToTop(getNode(text), pasteNode.parentNode);
                    }
                }
                pasteNode.remove();
                setCount();
            }
        })
    }
    async function pasteClip() {
        const text = await navigator.clipboard.readText();
        pContainer.appendChild(getNode(text))
    }

    doListenForClipChanges(true);
    document.getElementById("remove_button").addEventListener("click", function () {
        const elements = pContainer.childNodes;
        if (elements.length > 1) {
            const first = elements[0];
            pContainer.innerHTML = '';
            pContainer.insertBefore(first, null);
            setCount();
        } else if(elements.length === 1){
            pContainer.innerHTML = '';
            setCount();
        }
    });
    setTimeout(pasteClip, 0);
};
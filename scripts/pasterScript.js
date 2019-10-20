import $ from "./jquery-2.2.2.min.js" ;
$(document).ready(function () {
    let mCount = 0;
    let mCharsLength = 0;
    const pContainer = document.getElementById("elements");


    function setCount(c){mCount = c;}
    function setCharLength(c){mCharsLength = c;}
    document.addEventListener("DOMNodeInserted", function () {
        const elements = Array.from(pContainer.getElementsByTagName('p'));
        const countNew = elements.length;
        if ((countNew - mCount) > 0) {
            const newEl = elements[countNew - 1];

            const newline = newEl.innerHTML;
            if (newline.indexOf('. ') === -1) {
                newEl.innerHTML = newline + '. '
            }
            elements.unshift(newEl);
            elements.pop();
            pContainer.innerHTML = "";
            elements.forEach((el, i)=>{
                pContainer.appendChild(el);
            });

            let charsLengthNew = mCharsLength + newline.length;
            let charsDisp = charsLengthNew.toLocaleString();
            let linesDisp = countNew.toLocaleString();
            $('#counter').text(charsDisp + ' / ' + linesDisp);
            setCount(countNew);
            setCharLength(charsLengthNew);
        }
    }, false);
    document.getElementById("remove_button").addEventListener("click", function () {
        const pContainer = document.getElementsByTagName('p');
        let remove_lines = pContainer.length;
        if (remove_lines > 0) {
            let q = remove_lines - 1;
            let last = pContainer[q].innerHTML;
            let lastlen = last.length;
            $('body').children('p:last').remove();
            let newch = mCharsLength - lastlen;
            let newchdisp = newch.toLocaleString();
            let newl = mCount - 1;
            let newldisp = newl.toLocaleString();
            $('#counter').text(newchdisp + ' / ' + newldisp);
            setCharLength(newch);
            setCount(newl);
        }
    });
});
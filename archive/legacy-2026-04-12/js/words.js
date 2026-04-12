window.onload = function(){
    console.log("Say Hi!");

    var content = document.getElementById("content");



    function getWordlist(){
        var words = {};
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../data/wordslist.json", false);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                words["0"] = Object.keys(data).slice();
                for (let i in data){
                    words[i] = data[i];
                }
                // console.log(words["0"]);
                // content.innerHTML = words[0].word;
            }
        }
        xhr.send();
        return words;
    }

    function displayWords(){
        var wordlist = getWordlist();
        console.log(wordlist);
        var words = wordlist["0"];
        for (let i=0;i<20; i++){
            var num = Math.floor(Math.random() * words.length)
            var ele = document.createElement("div");
            ele.className = "word";
            var baseUrl = "https://words.hk/zidin/";
            ele.innerHTML = `<a href="${baseUrl+wordlist["0"][num]}" target="_blank">${wordlist["0"][num]}</a> : ${wordlist[wordlist["0"][num]]}`
            // wordlist["0"][num]+": "+wordlist[wordlist["0"][num]];
            content.appendChild(ele);
            console.log(wordlist["0"][num]+": "+wordlist[wordlist["0"][num]]);
        }


    }

    displayWords();

}
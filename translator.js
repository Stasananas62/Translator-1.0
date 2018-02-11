(function() {


const sourceTextInput = document.querySelector('#sourceTextInput');
const targetTextInput = document.querySelector('#targetTextInput');

const getTranslationButton = document.querySelector('#getTranslation');
const sourceLangDiv = document.querySelector('.source-lang-div');
const targetLangDiv = document. querySelector('.target-lang-div');

function makeSelectors(){
  const select_source_lang = document.createElement('select');
  select_source_lang.classList.add('source-lang-selection');
  const values = ['auto', 'en', 'ua', 'ru', 'fr', 'it', 'pl', 'pt', 'cs', 'de', 'es'];
  const innerText = ['Определить язык', 'Английский', 'Украинский', 'Русский',
  'Французкий', 'Итальянский', 'Польский', 'Португальский', 'Чешский', 'Немецкий', 'Испанский'];
   values.forEach((item, i)=>{
     const option = document.createElement('option');
     option.value = item;
     option.innerHTML = innerText[i];
     select_source_lang.appendChild(option);
   });
   const select_target_lang = select_source_lang.cloneNode(true);
   select_target_lang.className = 'target-lang-selection';
   select_target_lang.removeChild(select_target_lang.childNodes[0]);
   sourceLangDiv.appendChild(select_source_lang);
   targetLangDiv.appendChild(select_target_lang);
}

makeSelectors();
const sourceLangSelection = document.querySelector('.source-lang-selection');
const targetLangSelection = document.querySelector('.target-lang-selection');
function init() {

    getTranslationButton.addEventListener ("click",function(){
      processState()},false);

    sourceTextInput.addEventListener("keydown", function () {
        setTimeout(function () {
            return processState()
        }, 300);
    },false);

    targetLangSelection.addEventListener("click",function(){ processState()},false);

    sourceLangSelection.addEventListener("click",function(){ processState()},false);
}



function processState() {
    const sourceText = sourceTextInput.value;
    const sourceLang = sourceLangSelection.value;
    const targetLang = targetLangSelection.value;

    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(sourceText)}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then((data) => {
            let translatedText = '';
            data[0].map(item => {
                translatedText += item[0]
            });
            targetTextInput.value = translatedText

        }).catch(console.log)
}

init();
})();

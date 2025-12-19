const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e)=>{
  e.preventDefault();

  // "form.elements[0]" means 1st children of form element which is input
  let word  = form.elements[0].value;
  getWordInfo(word);
});


async function getWordInfo(word){

  try{
  resultDiv.innerHTML = "Fetching Data...";
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  let response = await fetch(url);
  let data = await response.json();
  // console.log(data);

  let definitions = data[0].meanings[0].definitions[0];
  let meanings = data[0].meanings[0];
  // console.log(meanings.synonyms);
  resultDiv.innerHTML = `
    <h2>Word: ${word}</h2>
    <p class="partsOfSpeech">${meanings.partOfSpeech}</p>
    <p><strong>Meaning</strong>:${definitions.definition === undefined ? "Not Found" : definitions.definition}<p>
    <p><strong>Example:</strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
    <p><strong>Antonyms:</strong></p>
  `

  // Fetching Antonyms
  if(meanings.antonyms.length === 0){
    resultDiv.innerHTML += '<p>Not Found</p>'
  }else{
    for(let i=0; i<meanings.antonyms.length; i++){
    resultDiv.innerHTML += `
      <li class="antonym-list">${meanings.antonyms[i]}</li>
    `
    }
  }

  //Fetching Synonyms
  resultDiv.innerHTML+=`<p><strong>Synonyms:</strong></p>`

  if(meanings.synonyms.length === 0){
    resultDiv.innerHTML +=`<p>Not Found</p>`
  }
  else{
  for(let i=0; i<meanings.synonyms.length; i++){
    resultDiv.innerHTML+=`
    <li>${meanings.synonyms[i]}</li>
    `
    }
  }
  // Adding Read More Button
  resultDiv.innerHTML += `<a href="${data[0].sourceUrls}" target = "_blank"><button>Read More</button></a>`

  }
  catch(error){
    resultDiv.innerHTML = "Enter other word";
    alert(`Sorry the word could not be found`);
  }
}
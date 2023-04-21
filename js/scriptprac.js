let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let apiKey = "047467f1-cdc6-4a8a-8fe4-ff819415ae37";
let notFound = document.querySelector('.not-found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  audioBox.innerHTML='';
    notFound.innerText='';
    defBox.innerText='';

  //get input data
  let word = input.value;

  if (word === "") {
    alert("Please enter something");
    return;
  }

  getData(word);
});

async function getData(word) {
    loading.style.display = 'block';
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`
  );
  const data = await response.json();

  //if empty res
  if (!data.length) {
    notFound.innerText = "No results found !!!";
    return;
  };

  //if res is sugg
  if(typeof data[0] === 'string') {
    loading.style.display = 'none';
    let heading = document.createElement('h3');
    heading.innerText = "Did you mean?";
    notFound.appendChild(heading);
    data.forEach(element => {
        let suggestion = document.createElement('span');
        suggestion.classList.add('suggestion');
        suggestion.innerText = element;
        notFound.appendChild(suggestion)
    });
    return;
  }

  //res found
  loading.style.display = 'none';
  let definition = data[0].shortdef;
  defBox.innerText = definition;

  //sound
  let soundName = data[0].hwi.prs[0].sound.audio;

  if (soundName) {
    renderSound(soundName)
  }
  
}

function renderSound(soundName) {
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud)
}

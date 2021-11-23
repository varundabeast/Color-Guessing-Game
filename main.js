const rgbColorElement = document.getElementById('rgb-color');
const optionsContainer = document.getElementById('options');
let data ;
const happy = '&#x1F60A';
const sad = '&#x1F615';
const focus = '&#x1F9D0';
const partyPopper = '&#x1F389'

function startGame(){
   optionsContainer.innerHTML =  
    `
     <div class="option"></div>
      <div class="option"></div>
      <div class="option"></div>
      <div class="option"></div>
      <div class="option"></div>
      <div class="option"></div>
    `;
  generateOptions();
  data = initializeData();
  document.getElementById('emotion').innerHTML = focus;
}
function generateOptions(){
  let colors = [];
  let options = document.querySelectorAll('.option'); 
  options.forEach((option)=>{
    colors.push(randomColor());
    option.style.backgroundColor = colors[colors.length-1] ;
    option.onclick = checkColor;
  });
  rgbColorElement.textContent = colors[randomNumber(0,colors.length)];
}
function randomColor(){
  let r = randomNumber(0,256);
  let g = randomNumber(0,256);
  let b = randomNumber(0,256);
  return `rgb(${r}, ${g}, ${b})`;
}
function randomNumber(min, max){
  return min + Math.floor(Math.random()*(max-min));  
}
function checkColor(e){ 
  data.chancesLeft--;
  document.getElementById('guesses').textContent = data.chancesLeft; 
  
  if(data.chancesLeft > 0)
  {
     if(e.target.style.backgroundColor ==  rgbColorElement.textContent)
    {
        data.score++;
        document.getElementById('score').textContent = data.score;
        document.getElementById('emotion').innerHTML = happy;
        generateOptions();
    }
    else
    {
       document.getElementById('emotion').innerHTML  = sad;
    }
  }   
  else
  {
    optionsContainer.innerHTML = '';
    const result = document.createElement('h1');
    
    if(data.score > data.highScore)
    {
      localStorage.setItem('highScore', data.score);
      result.textContent ='Congratulations. It is a high score'; 
      document.getElementById('emotion').innerHTML = partyPopper;
    }
    else
    {
      result.textContent ='Game Over.'
      document.getElementById('emotion').innerHTML = '';
    } 
    
    optionsContainer.append(result);
    document.getElementById('play-button').textContent = 'RESTART';
   }
}
function initializeData(){
  let data = {
    score: 0 ,
    highScore: localStorage.getItem('highScore') || 0,
    chancesLeft: 7
  };  
  document.getElementById('score').textContent = data.score ;
  document.getElementById('guesses').textContent = data.chancesLeft ;
  document.getElementById('high-score').textContent = data.highScore ;
  
  return data ;
}

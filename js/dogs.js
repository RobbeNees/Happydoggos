var goBack = () => {
    console.log("go back");
    window.history.back();
}


const backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', goBack);


/*
class Dog {
    constructor(url, breed) {
        this.url = url;
        this.breed = breed;
    }
}
*/

var dogs = [];
var nmbrOfDogs;
var breed;
var gridContainer = document.getElementById("hiero");



document.getElementById("dogForm").addEventListener("submit", function(event){

    event.preventDefault();

    var ExistingCards = document.querySelectorAll("div.card");
    for (i = 0; i < ExistingCards.length; i++) {
        //console.log(images[i]);
        ExistingCards[i].remove();
        }

    checkHowManyDogs();

});



checkHowManyDogs = () => {
  console.log("checking how many dogs");
  nmbrOfDogs = document.getElementById('nmbrOfDogs').value;
  //console.log(nmbrOfDogs);
  fetchDogs()
}



fetchDogs = () => {
    var url = 'https://dog.ceo/api/breeds/image/random/' + nmbrOfDogs; 
    //console.log(url);
    
    $.getJSON(url, function(data) {
            
        var dogs = data.message;
        //console.log("jowjow    " + dogs);
        
        fillDogsArray(dogs)
        
    });
}


fillDogsArray = (dogs) => {
    console.log("hey hey hey  ");
   
    for (var i = 0; i < dogs.length; i++) {
        // console.log(i);
        // dogs.push(dogs[i]);

        findBreed(dogs[i]);

        //nieuwe html elementen maken 
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const span = document.createElement("span");
        const img = document.createElement("img"); 

        //juiste classes etc toekennen
        div1.classList.add("card");
        div2.classList.add("card-image");
        span.classList.add("card-title");
        span.innerHTML = breed;       
        img.src = dogs[i];       
        
        //naar html renderen
        gridContainer.appendChild(div1);                 
        div1.appendChild(div2); 
        div2.appendChild(img); 
        div2.appendChild(span); 
    }
    
    //console.log(dogs);
    
}

findBreed = (dog) => {
    var splitted = dog.split("/");
    //console.log(splitted);
    return breed = splitted[4];
}


/*
nmbrOfDogs = document.getElementById('nmbrOfDogs').value;
console.log(nmbrOfDogs);

$.getJSON('https://dog.ceo/api/breeds/image/random/3', function(data) {
        
    var dogs = data.message;
            
    console.log(dogs);


    
    document.getElementById("img1").src = dogs[0];
    document.getElementById("img2").src = dogs[1];
    document.getElementById("img3").src = dogs[2];
    
});
*/











/*
var i;
for (i = 0; i < 9; i++) {
    var btn = document.createElement("BUTTON");   // Create a <button> element
    btn.innerHTML = "CLICK ME " + i;                   // Insert text
    document.body.appendChild(btn);    
}



async function getDogs() {
    let url = 'https://dog.ceo/api/breeds/image/random/3';
    try {
        res = await fetch(url);
        console.log("try in fetch");
        return await res.json();
    } catch (error) {
        console.log(error);
        console.log("try in fetch");
    }
}
*/

//   https://dog.ceo/api/breeds/image/random/3
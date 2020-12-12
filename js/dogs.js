if ( 'serviceWorker' in navigator ) {
    try {
        let serviceWorker = navigator.serviceWorker.register('sw.js');
        console.log("serviceWorker Found");

    } catch (err) {
        console.error(err);
    }
}





let dogs = [];
let nmbrOfDogs;
let breed;
let gridContainer = document.getElementById("hiero");



document.getElementById("dogForm").addEventListener("submit", function(event){

    event.preventDefault();

    let existingCards = document.querySelectorAll("div.card");
    //Delete existing cards
    existingCards.forEach(card => {
        card.remove();
    });

    checkHowManyDogs();

});


checkHowManyDogs = () => {
  console.log("checking how many dogs");
  nmbrOfDogs = document.getElementById('nmbrOfDogs').value;
  //console.log(nmbrOfDogs);
    fetchDogs();
}


fetchDogs = () => {
    
    let url = `https://dog.ceo/api/breeds/image/random/${nmbrOfDogs}`; 
    
    fetch(url)
        .then(result => {
            console.log(`result before to json ${result}`);
            return result.json();
        })
        .then(res => {
            console.log(res);
            var dogs = res.message;
            fillDogsArray(dogs);
        })
        .catch (err => {
            console.log(err);
        })

}


fillDogsArray = (dogs) => {
   
    for (var i = 0; i < dogs.length; i++) {

        findBreed(dogs[i]);

        //Per hond nieuw html elementen maken 
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const span = document.createElement("span");
        const img = document.createElement("img"); 

        //juiste classes etc toekennen aan elementen
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
    
}

findBreed = (dog) => {
    var splittedUrl = dog.split("/");
    //console.log(splitted);
    return breed = splittedUrl[4];
}

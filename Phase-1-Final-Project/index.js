

function imageList(item) { //creating a function that will list out each object from the json file
    const clothingContainer = document.createElement("div"); //creating a div to put the image & item info into
    clothingContainer.setAttribute('class', "container"); //setting the class of the created div to "container"
    const clothingItem = document.createElement("img"); //creating an image element as a spot to put the image from json
    clothingItem.setAttribute('src', item.image); //setting the created image source to the URL in the json file
    clothingContainer.append(clothingItem); //putting the clothing image inside of the created "container" div
    closetList.append(clothingContainer); //putting the clothing container into the HTML div "closetList"
    const type = item.type; //creating a variable to reference the item's type in the json file
    const styleDescriptor = item.styleDescriptor; //creating a variable to reference the item's style descriptor in the json file
    const colorDecsriptor = item.colorDescriptor; //creating a variable to reference the item's color descriptor in the json file
    const textContainer = document.createElement("div"); //creating a div to hold all of the item's info together
    textContainer.setAttribute('class', 'imageText hidden') //setting the class of the created div so it can be hidden in CSS
    textContainer.textContent = styleDescriptor + " " + colorDecsriptor + " " + type; //setting the text content of the created div to the created variables to pull the full item info into one line
    clothingContainer.append(textContainer); //adding the div with the item info to the div that already holds the item image
    clothingItem.addEventListener('mouseenter', () => { //initiating the event listener that will activate when the mouse hovers over the item image
        textContainer.classList.toggle('hidden'); //setting the text div to appear over the image when the event listener is activated
    });
    clothingItem.addEventListener('mouseout', () => { //initiating the event listener that will activate when the mouse leaves the item image area
        textContainer.classList.toggle('hidden'); //setting the text div to be hidden when the event listener is activated
    });
    const heart = document.createElement('button'); //creating a heart button 
    heart.setAttribute('id', 'heartButton') //setting the button id to 'heartButton' so it can be referred to specifically in CSS
    heart.textContent = "♡"; //setting the default text content of the heart button to an empty heart
    clothingContainer.append(heart); //adding the heart button to the item div that already contains the item info and image
    heart.addEventListener('click', () => { //initiating the event listener that will be activated when the heart button is clicked
        if (heart.textContent === "❤") { //setting up a conditional that checkes if the current heart button is a filled heart
            heart.textContent = "♡"; //if the condition is met, changing it to an empty heart
            closetList.append(clothingContainer); //adding the item back to the main list if the heart is clicked (aka "unhearted")
        } else { //setting up the alternative to the conditional (if the heart is empty when it is clicked)
            heart.textContent = "❤"; //changing the text content of the button to a full heart
            document.querySelector("#ootdList").append(clothingContainer); //adding the clicked ("hearted") item to a div in the HTML with the id of ootdList
        }
    },
        heart.addEventListener("click", () => { //initiating an additional event listener to the heart button
            document.querySelector("#ootd").textContent = "Today's Outfit ❤"; //setting the text content of a div in the HTML with the id of ootd
        }, { once: true }) //setting the event listener to only activate once (so there's only one "today's outfit" header)
    )
    return clothingContainer; //returning the container div which holds the image, image info, and heart button
}
const closetList = document.querySelector("#closetItems"); //creating a variable to refer to the #closetItems div (which contains the entire list of clothing containers)
fetch("http://localhost:3000/Clothing") //setting up a GET request to pull the json data
    .then(response => response.json()) //converting json to javascript
    .then(Clothing => {
        Clothing.forEach(item => { //going through each item in the Clothing array (in json) and...
            imageList(item) //performing the imageList function (above) on each item
        })

        function filter(type) { //initiating a function called filter with the parameter of type
            const filteredClothing = Clothing.filter(item => item.type === type); //creating a variable and setting it equal to a filtered version of the clothing array. The filter checks if the item type is equal to the parameter "type"
            closetList.innerHTML = ""; //clearing out the closetList to make space for just the filtered items

            filteredClothing.forEach(item => { //going through each item in the filteredClothing array...
                const container = (imageList(item)); //putting each item in the array through the imageList function, and storing them in a variable called container
                closetList.append(container) //putting the filtered items into the main closetList
            })
        }
        document.querySelector("#topsFilter").addEventListener("click", () => { //adding a click event listener to the "tops" button
            filter("top"); // using the filter function to filter out all items that don't have the item type of "top"
        });
        document.querySelector("#pantsFilter").addEventListener("click", () => {//adding a click event listener to the "pants" button
            filter("pants"); // using the filter function to filter out all items that don't have the item type of "pants"
        });
        document.querySelector("#skirtsFilter").addEventListener("click", () => {//adding a click event listener to the "skirts" button
            filter("skirt"); // using the filter function to filter out all items that don't have the item type of "skirt"
        });
        document.querySelector("#jacketsFilter").addEventListener("click", () => {//adding a click event listener to the "jackets" button
            filter("jacket"); // using the filter function to filter out all items that don't have the item type of "jacket"
        });
        document.querySelector("#dressesFilter").addEventListener("click", () => {//adding a click event listener to the "dresses" button
            filter("dress"); // using the filter function to filter out all items that don't have the item type of "dress"
        });
        document.querySelector("#resetFilter").addEventListener("click", () => {//adding a click event listener to the "all" button
            Clothing.forEach(item => { //going through each item in the clothing array...
                imageList(item) //and adding them all back to the main closet list
            })
        });
    })
document.querySelector('#new-item').addEventListener("submit", event => { //adding a submit event listener to the #new-item form
    event.preventDefault(); //preventing the page from refreshing
    const itemType = document.querySelector('input[name="type"]:checked').value; //getting the value of the selected item type and assigning it to a variable
    const itemStyleDescriptor = document.querySelector('input[name="styleDescriptor"]:checked').value; //getting the value of the selected style descriptor and assigning it to a variable
    const itemColorDescriptor = document.querySelector('input[name="colorDescriptor"]:checked').value; //getting the value of the selected color descriptor and assigning it to a variable
    fetch("http://localhost:3000/Clothing", { //setting up a fetch, connecting to the json file
        method: "POST",//specifying FETCH type 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            image: document.querySelector('#newImage').value, //grabbing the new imputted image & associating it to the image key in JSON
            type: itemType, // associating the type key in JSON with the above created variable
            styleDescriptor: itemStyleDescriptor, // associating the styleDescriptor key in JSON with the above created variable
            colorDescriptor: itemColorDescriptor // associating the colorDescriptor key in JSON with the above created variable
        })
    })
        .then(response => response.json()) //converting json to javascript
        .then(newItem => { //initiating a function that grabbs the new item imputted into the form
            imageList(newItem) //and running that new item through the imageList funtion
        })
})

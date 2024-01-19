// const clothingInfo = document.querySelector()
// const 
// function displayInfo (item) {

// }
const closetList = document.querySelector("#closetItems");
fetch("http://localhost:3000/Clothing")
    .then(response => response.json())
    .then(Clothing => {
        Clothing.forEach(item => {
            const clothingItem = document.createElement("img");
            // clothingItem.src = item.image;
            clothingItem.setAttribute('src', item.image);
            closetList.append(clothingItem);
        })
    })


function imageList (item){
    const clothingContainer = document.createElement("div");
    clothingContainer.setAttribute('class', "container");
    const clothingItem = document.createElement("img");
    clothingItem.setAttribute('src', item.image);
    clothingContainer.append(clothingItem);
    closetList.append(clothingContainer);
    const type = item.type;
    const styleDescriptor = item.styleDescriptor;
    const colorDecsriptor = item.colorDescriptor;
    const textContainer = document.createElement("div");
    textContainer.setAttribute('class', 'imageText hidden')
    textContainer.textContent = styleDescriptor + " " + colorDecsriptor + " " + type;
    clothingContainer.append(textContainer);
    clothingItem.addEventListener('mouseenter', () => {
        textContainer.classList.toggle('hidden');
    });
    clothingItem.addEventListener('mouseout', () => {
        textContainer.classList.toggle('hidden');
    });
    const heart = document.createElement('button');
    heart.setAttribute('id', 'heartButton')
    heart.textContent = "♡";
    clothingContainer.append(heart);
    heart.addEventListener('click', () => {
        if (heart.textContent === "❤") {
            heart.textContent = "♡";
            closetList.append(clothingContainer);
        } else {
            heart.textContent = "❤";
            document.querySelector("#ootdList").append(clothingContainer);
        }
    },
    heart.addEventListener("click", () => {
        document.querySelector("#ootd").textContent = "Today's Outfit ❤";
        }, {once : true})
    )
    return clothingContainer;
}
const closetList = document.querySelector("#closetItems");
fetch("http://localhost:3000/Clothing")
    .then(response => response.json())
    .then(Clothing => {
        Clothing.forEach(item => {
            imageList(item)
        })

        function filter (type) {
            const filteredClothing = Clothing.filter(item => item.type === type);
            closetList.innerHTML = "";

            filteredClothing.forEach(item => {
                const container = (imageList(item));
                closetList.append(container)
            })            
        }
        document.querySelector("#topsFilter").addEventListener("click", () => {
            filter("top");
        });
        document.querySelector("#pantsFilter").addEventListener("click", () => {
            filter("pants");
        });
        document.querySelector("#skirtsFilter").addEventListener("click", () => {
            filter("skirt");
        });
        document.querySelector("#jacketsFilter").addEventListener("click", () => {
            filter("jacket");
        });
        document.querySelector("#dressesFilter").addEventListener("click", () => {
            filter("dress");
        });
        document.querySelector("#resetFilter").addEventListener("click", () => {
            Clothing.forEach(item => {
                imageList(item)
            })
        });
    })


document.querySelector('#new-item').addEventListener("submit", event => {
    event.preventDefault();
    const itemType = document.querySelector('input[name="type"]:checked').value;
    const itemStyleDescriptor = document.querySelector('input[name="styleDescriptor"]:checked').value;
    const itemColorDescriptor = document.querySelector('input[name="colorDescriptor"]:checked').value;
    fetch("http://localhost:3000/Clothing", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
            image: document.querySelector('#newImage').value,
            type: itemType,
            styleDescriptor: itemStyleDescriptor,
            colorDescriptor: itemColorDescriptor
        })
    })
    .then(response => response.json())
    .then(newItem => {
        imageList(newItem)
    })
})

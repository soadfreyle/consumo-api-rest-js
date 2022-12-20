const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_ipwiI7pbcqPZuGeL1p6cJQDqImSxvgn9Oyyd0x83jwpATwTkvPPYpeN9Ae4yaZgt';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_ipwiI7pbcqPZuGeL1p6cJQDqImSxvgn9Oyyd0x83jwpATwTkvPPYpeN9Ae4yaZgt';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_ipwiI7pbcqPZuGeL1p6cJQDqImSxvgn9Oyyd0x83jwpATwTkvPPYpeN9Ae4yaZgt`;




const spanError = document.getElementById('error');

async function LoadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random')
    console.log(data);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status;
        
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
        btn3.onclick = () => saveFavouriteMichi(data[2].id);
    }


}

async function LoadFavouriteMichis() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('favoritos')
    console.log(data);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status + data.message; 
    } else {

        const section = document.getElementById('favouriteMichis');

        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos');
    
            img.src = michi.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteMichi(michi.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),

    }); 
    const data = await res.json();
    console.log('Save')
    console.log(res);  
    

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error" + res.status + data.message; 
    } else {
        console.log('Michi guardado en favoritos')
        LoadFavouriteMichis();
    }
    
}

async function deleteFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
    });
    const data = await res.json();
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status +data.message;
    } else {
        console.log('Michi eliminadp de favourites')
        LoadFavouriteMichis();
    }
}

LoadRandomMichis();
LoadFavouriteMichis();


//search Food
document.getElementById('submitBtn').addEventListener('click',function(){
    const inputText=document.getElementById('input')
    const input=inputText.value;
   
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>searchResult(data));
})

const searchResult=(data)=>{
    const meal=data.meals;
    if(meal==null){
        alert("Nothing is found Search Again");
    }
    else{
        const name=meal[0].strMeal;
    const pic=meal[0].strMealThumb;
    const searchItems=document.getElementById('searchItems');
    searchItems.innerHTML=`
    <h3>Search Item:</h3>
    <button onclick="moreDetailsInfo('${name}')">
    <img src="${pic}">
        <h3>${name}</h3>
    </button>
    <br>
    <h3>Related Foods : </h3>
    `;
    }
}

//load 8 different food from api

const loadFood=()=>{
    const foodContainer=document.getElementById('foodContainer');

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res=>res.json())
    .then(data=>{
        const div=document.createElement('div');
        const meal=data.meals;
        const name=meal[0].strMeal;
        const pic=meal[0].strMealThumb;
        div.className='itams';
        div.innerHTML=`
        <button onclick="moreDetailsInfo('${name}')">
        <img src="${pic}">
            <h3>${name}</h3>
        </button>
        `;
        foodContainer.appendChild(div);

    }) 
}

for(let i=0;i<8;i++){
    loadFood();
}

//more Details shown on clicked food

const moreDetailsInfo=(meal)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        const meal=data.meals;
        const instractions=meal[0].strInstructions;
        const pic=meal[0].strMealThumb;
        const foodDetails=document.getElementById('foodDetails');
        foodDetails.innerHTML=`
            <h1>${meal[0].strMeal}</h1>
            <img src="${pic}">
            <p>${instractions}</p>
            <h3>Ingredient:</h3>
        `;

        liItems(meal[0].strIngredient1);
        liItems(meal[0].strIngredient2);
        liItems(meal[0].strIngredient3);
        liItems(meal[0].strIngredient4);
        liItems(meal[0].strIngredient5);
        liItems(meal[0].strIngredient6);
        liItems(meal[0].strIngredient7);
        liItems(meal[0].strIngredient8);
    })

}

const liItems=(ingredients)=>{
    const li=document.createElement('li');
        li.innerText=ingredients;
        foodDetails.appendChild(li);
}


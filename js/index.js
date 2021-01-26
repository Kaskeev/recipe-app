
const meals = document.querySelector("#meals")


getRandomMeal();

async function getRandomMeal(){
   const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")

    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    console.log(randomMeal);
   addMeal(randomMeal, true);
}

async function getMealById(id){
    const meal = await fetch("https://www.themealdb.com/api/json/v1/1/random.php?i="+id)
}

async function getMealsBySearch(term){
    const meals = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+ term)
}

function addMeal(mealData, random = false){
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
           
            <div class="meal-header">
               ${random ? `
               <span class="random">
               Random Recipe
           </span>` : ''}
                <img 
                src="${mealData.strMealThumb}"
                alt="${mealData.Meal}">
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav_btn">
                    <i class="fa fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    meals.appendChild(meal);

    const btn = document.querySelector(" .fav_btn");

    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
    });
}

function addMealtoLS(meal){
    const mealIds = getMealsFromLS();

    localStorage.setItem(".mealIds", JSON.stringify ([...mealIds, mealId]));
}

function getMealsFromLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds;
}
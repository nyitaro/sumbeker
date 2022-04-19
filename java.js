const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');
const get_ingredient = document.getElementById('searchfield');

get_meal_btn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
        createMeal(res.meals[0]);
    })
    .catch(e => {
        console.warn(e);
    });
});

get_ingredient.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+document.getElementById('searchfield').value)
    .then(res => res.json())
    .then(res => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+res.meals[0].strMeal)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            createMeal(res.meals[0]);
        }
        )
        .catch(e => {
            console.warn(e);
        });   
    })
    .catch(e => {
        console.warn(e);
    });
});

const createMeal = (meal) => {
    const ingredients = [];

  for (let i = 1; i <= 20; i++){
      if(meal[`strIngredient${i}`]){
          ingredients.push(
              `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
          } else {
              break;
          }
        }
        const newInnerHTML = `
        <div class="row">
        <div class="columns_five">
        <img src="${meal.strMealThumb}" alt="Meal Image" class="center">
        ${
            meal.strCategory
                ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
                : ''
        }
        ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
        ${
            meal.strTags
                ? `<p><strong>Tags:</strong> ${meal.strTags
                        .split(',')
                        .join(', ')}</p>`
                : ''
        }
        <h5>Ingredients:</h5>
        <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
    </div>
    <div class="columns seven">
        <h4>${meal.strMeal}</h4>
        <p>${meal.strInstructions}</p>
    </div>
</div>
${
    meal.strYoutube
        ? `
<div class="row">
    <h5>Video Recipe</h5>
    <div class="videoWrapper">
        <iframe width="420" height="315"
        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
        </iframe>
    </div>
</div>`
        : ''
}
        `;
        meal_container.innerHTML=newInnerHTML;
    }


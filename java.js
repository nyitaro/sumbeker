const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');
const get_ingredient = document.getElementById('searchfield');
const search_meal_btn = document.getElementById('search_btn');

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

get_ingredient.addEventListener('keydown', function (e)  {
    if (e.key == 'Enter') {
        search_meal();
    }
});

search_meal_btn.addEventListener('click', () => {
    search_meal();
});

/*get_ingredient.addEventListener('click', () => {
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
});*/

/** 
    pushing - [strIngredient${i}, meal[`strMeasure${i}]]

    ingredients [
        ["Rice", "200g"],  
        ["Cumin", "10g"],
        ["milk", "100ml"]
    ]

    meal: {
        strIngredients: {
            strIngredients1: "Rice",
            strIngredients2: "Cumin",
            strIngredients3: "milk"
        },
        strMeasure: {
            strMeasure1: "200g",
            strMeasure2: "10g",
            strMeasure3: "100ml"
        },
        strMealThumb: "test"
    }

    1st iteration of loop: 
        [strIngredient1}, meal[`strMeasure1]]
        == 
        ingredients [
        ["Rice", "200g"]
    ]
**/

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


    // Works with search button and search get ingredient text box
    function search_meal() {
        search_field_value = get_ingredient.value; // == document.getElementById('searchfield').value
        if (search_field_value) {
            console.log(search_field_value);
            fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+search_field_value)
                    .then(res => res.json())
                    .then(res => {
                        if(res.meals == null){
                        meal_container.innerHTML='<img src="https://pngset.com/images/download-pepe-pepe-listening-to-music-plant-animal-reptile-food-transparent-png-2679541.png" alt="Meal Image" class="center">';
                    }
                    else {
                       console.log(res);
                       fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+res.meals[0].strMeal)
                       .then(res => res.json())
                       .then(res => {
                            createMeal(res.meals[0]);
                       })
                       .catch(e => {
                         console.warn(e);
                       });
                    }
            }
            )
            .catch(e => {
                console.warn(e);
                console.log("Error hit");
            });
        } else {
            console.log("The value is empty.");
        }
    }
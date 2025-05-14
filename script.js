const mailDbAPI = "https://www.themealdb.com/api/json/v1/1/";

// const response = await fetch(mailDbAPI + "categories.php");
// const data = await response.json();

const data = await getMealDBdata("categories.php");

const mailGrid = document.querySelector(".mailGrid");

const categorySelect = document.querySelector(".foodCategories");

for (let category of data.categories) {
  let categoryElement = document.createElement("option");

  // categoryElement.value = category.idCategory;

  categoryElement.innerHTML = ` ${category.strCategory} `;
  categorySelect.append(categoryElement);
}
categorySelect.addEventListener("change", async () => {
  mailGrid.innerHTML = "";

  // const response = await fetch(
  //   mailDbAPI + "filter.php?c=" + categorySelect.value
  // );
  // const data = await response.json();

  const data = await getMealDBdata("filter.php?c=" + categorySelect.value);

  for (let miles of data.meals) {
    let newDiv = document.createElement("div");
    newDiv.classList = "mealImage";

    newDiv.innerHTML = `<img src="${miles.strMealThumb}" alt="${miles.strMeal}" width="150" />
                       <p> ${miles.strMeal} </p>`;

    mailGrid.append(newDiv);

    newDiv.addEventListener("click", async () => {
      // let recipeResponse = await fetch(
      //   mailDbAPI + "lookup.php?i=" + miles.idMeal
      // );
      // let data = await recipeResponse.json();
      let coctelDiv = document.createElement("div");

      const data = await getMealDBdata("lookup.php?i=" + miles.idMeal);

      document.querySelector(".recipeText").innerText =
        data.meals[0].strInstructions;
      document.querySelector(".popup").style.display = "block";

      let coctelRandom = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      let dataCoctel = await coctelRandom.json();
      coctelDiv.innerHTML = `
      <img src="${dataCoctel.drinks[0].strDrinkThumb}" alt="${miles.strMeal}" width="150" />
                       <p> ${dataCoctel.drinks[0].strDrink} </p>`;

      document.querySelector(".coctel").append(coctelDiv);
      console.log(dataCoctel.drinks[0].strDrink);
    });
  }
});
document.querySelector(".closePopup").addEventListener("click", async () => {
  document.querySelector(".popup").style.display = "none";
});

async function getMealDBdata(endpoint) {
  let response = await fetch(mailDbAPI + endpoint);
  return await response.json();
}

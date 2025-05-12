const mailDbAPI = "https://www.themealdb.com/api/json/v1/1/";

const response = await fetch(mailDbAPI + "categories.php");

const mailGrid = document.querySelector(".mailGrid");

const data = await response.json();

const categorySelect = document.querySelector(".foodCategories");

for (let category of data.categories) {
  let categoryElement = document.createElement("option");

  // categoryElement.value = category.idCategory;

  categoryElement.innerHTML = ` ${category.strCategory} `;
  categorySelect.append(categoryElement);
}
categorySelect.addEventListener("change", async () => {
  mailGrid.innerHTML = "";
  const response = await fetch(
    mailDbAPI + "filter.php?c=" + categorySelect.value
  );
  const data = await response.json();

  for (let miles of data.meals) {
    let newDiv = document.createElement("div");
    newDiv.classList = "mealImage";

    newDiv.innerHTML = `<img src="${miles.strMealThumb}" alt="${miles.strMeal}" width="150" />
                       <p> ${miles.strMeal} </p>`;

    mailGrid.append(newDiv);

    newDiv.addEventListener("click", async () => {
      let recipeResponse = await fetch(
        mailDbAPI + "lookup.php?i=" + miles.idMeal
      );
      let data = await recipeResponse.json();

      document.querySelector(".recipeText").innerText =
        data.meals[0].strInstructions;
      document.querySelector(".popup").style.display = "block";
    });
  }
});
document.querySelector(".closePopup").addEventListener("click", () => {
  document.querySelector(".popup").style.display = "none";
});
//  {strMeal: 'Kapsalon', strMealThumb: 'https://www.themealdb.com/images/media/meals/sxysrt1468240488.jpg', idMeal: '52769'}
// idMeal: "52769"
// strMeal: "Kapsalon"
// strMealThum: "https://www.themealdb.com/images/media/meals/sxysrt1468240488.jpg"
// [[Prototype]]: Object

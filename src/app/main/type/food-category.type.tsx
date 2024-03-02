export interface FoodCategory{
    "id": string,
    "name": string,
    "createAt": string
  }

export interface ObjectFoodCategoryToCreate{
    "name": string,
  }
export interface ObjectFoodCategoryToEdit{
    "id": string,
    "name": string,
  }
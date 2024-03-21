import { FoodCategory } from "./food-category.type"
import { UnitOfMeasurement } from "./unit-of-measurement.type"

export interface Food{
    "id": string
    "thumbnailUrl": string
    "name": string
    "foodCategory": FoodCategory
    "quantity": number
    "unitOfMeasurement": UnitOfMeasurement
    "status": string
    "createAt": string
  }

export interface ObjectFoodToCreate{
    "thumbnail": string
    "name": string
    "quantity": number
    "foodCategoryId":{
      label: string | null
      value: string | null
    }
    "unitOfMeasurementId": {
      label: string | null
      value: string | null
    }
  }
export interface ObjectFoodToEdit{
    "id": string
    "thumbnail": string | null
    "name": string
    "foodCategoryId":{
      label: string | null
      value: string | null
    }
    "quantity":number
    "unitOfMeasurementId": {
      label: string | null
      value: string | null
    }
    "status":string
  }
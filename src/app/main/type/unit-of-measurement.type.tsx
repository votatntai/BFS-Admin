export interface UnitOfMeasurement{
    "id": string,
    "name": string,
    "createAt":string
  }

export interface ObjectUnitToCreate{
  name: string
}

export interface ObjectUnitToEdit{
  id: string
  name: string
}
import Manager from "./manager.type"

export default interface Farm{
    "id": string,
    "name": string,
    "thumbnailUrl": string | null,
    "address": string,
    "phone": string,
    "manager": Manager,
    "createAt": string
  }

export interface ObjectFarmToCreate{
    "name": string,
    "thumbnailUrl": string | null,
    "address": string,
    "phone": string,
    "managerId": string,
  }
export interface ObjectFarmToEdit{
    "id": string,
    "name": string,
    "thumbnailUrl": string | null,
    "address": string,
    "phone": string,
  }
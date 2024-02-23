export default interface Area{
    "id": string,
    "name": string,
    "thumbnailUrl": string | null,
    "createAt": string
  }

export interface ObjectAreaToCreate{
    "name": string,
    "thumbnailUrl": string | null,
    "farmId": {
      label: string | null,
      value: string | null
    },
  }
export interface ObjectAreaToEdit{
    "id": string,
    "name": string,
    "thumbnailUrl": string | null,
  }
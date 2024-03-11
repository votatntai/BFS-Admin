export interface ObjectMenuSampleToCreate{
    "name": string,
    "speciesId": {
      label: string | null
      value: string | null
    },
    "careModeId": {
      label: string | null
      value: string | null
    }
  }

export interface ObjectMenuSampleToEdit{
    "id": string,
    "name": string,
    "speciesId": {
      label: string | null
      value: string | null
    },
    "careModeId": {
      label: string | null
      value: string | null
    },
  }

export interface menuSample{
    "id":string,
    "name": string,
    "speciesId": string,
    "careModeId": string,
    "createAt": string
}
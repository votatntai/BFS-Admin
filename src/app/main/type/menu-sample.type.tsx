import { CareMode } from "./care-mode.type"
import { Species } from "./species.type"

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
    "species": Species,
    "careMode": CareMode,
    "createAt": string
}
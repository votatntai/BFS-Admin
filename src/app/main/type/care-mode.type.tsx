export interface CareMode{
    "id": string,
    "name": string,
    "priority": number,
    "createAt": string
  }

export interface ObjectCaremodeToCreate{
    "name": string,
    "priority": number,
  }
export interface ObjectCaremodeToEdit{
    "id": string,
    "name": string,
    // "priority": number,
  }
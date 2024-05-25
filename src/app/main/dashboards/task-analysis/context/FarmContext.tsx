import { createContext } from "react";

export const FarmContext = createContext({
    farmId: "",  // Giá trị mặc định cho farmId
    setFarmId: (id: string) => { }    // Hàm mặc định cho setFarmId
})
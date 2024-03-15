export type MealItemSampleType = {
    id: string,
    order: number,
    name:string,
    quantity: number,
    menuMealSample?: {
        id: string,
        name: string,
    },
    food?: {
        id: string,
        name: string,
    },
    createAt: string,
}
export type MealItemSamplesType =
    {
        data: MealItemSampleType[],
        pagination: {}
    };
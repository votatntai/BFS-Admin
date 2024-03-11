export type BirdCategoryType =
{
    id? :string,
    thumbnailUrl?:string,
    name:string,
    createAt?:string
}
export type BirdCategoriesType = 
{
    data :BirdCategoryType[],
    pagination:{}

};

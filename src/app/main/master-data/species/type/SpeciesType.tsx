export type SpeicesType = {
    id:string,
    craateAt:string,
    name:string,
    thumbnailUrl:string,
    birdCategoryId:String,
}
export type SpeicesListType = 
{
    data :SpeicesType[],
    pagination:{}

};
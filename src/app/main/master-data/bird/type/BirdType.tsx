export type BirdType = {
    id:string,
    code:string,
    name:string,
    dayOfBirth:Date,
    gender:string,
    characteristic:string,
    thumbnailUrl:string,
    careMode?:{
        id:string,
        proirity:string,
        name:string,
        createAt:string,
    },
    species?:{
        id:string,
        thumbnailUrl:string,
        name:string,
        createAt:string,
    },
    category?:{
        thumbnailUrl:string,
        name:string,
    },
    createAt:string,


}
export type BirdsType = 
{
    data :BirdType[],
    pagination:{}

};

export type NameType = {
    id: string;
    name: string;
}
export type SpeciesType = {
    id: string
    thumbnailUrl: string
    name: string
    createAt: string
}
export type CareModeType = {
    id : string
    name : string
    priority : number 
 }
export type menuSampleType = {
    id: string;
    name: string;
    species: SpeciesType
    careMode :CareModeType
    menuMealSamples: menuMealSampleType[]
}
export type menuMealSampleType = {
    id: string;
    from: string;
    to: string;
    mealItemSamples: mealItemSamplesType[];
    name: string;

}
export type mealItemSamplesType = {
    id: string;

    quantity: number;
    food: FoodType;
    order: number;
}

export type BirdType = {
    id: string,
    code: string,
    name: string,
    dayOfBirth: Date,
    gender: string,
    characteristic: string,
    thumbnailUrl: string,
    cage: {
        id: string,
    }
    careMode?: {
        id: string,
        proirity: string,
        name: string,
        createAt: string,
    },
    species?: {
        id: string,
        thumbnailUrl: string,
        name: string,
        createAt: string,
    },
    category?: {
        thumbnailUrl: string,
        name: string,
    },
    createAt: string,
    recommend: boolean,
    menuId: string,
    menu: MenuType

}
/**
 *  Type
 */

export type PlanType = {
	id: string;
	from: string;
	to: string;
	title: string;
	createAt?: string
	cage?: CageType;
	menu?: MenuType
	planDetails: planDetailType[]
	// allDay?: boolean | undefined;
	// extendedProps?: {
	// 	desc?: string;
	// 	label?: string;
	// };
};
export type planDetailType = {
	date: string
	id: string
	status: boolean
}
export type CageType = {
	id: string,
	code: string,
	name: string,
	material: string,
	description: string,
	height: number,
	width: number,
	depth: number,
	thumbnailUrl: string,
	caremode: {
		id: string,
		proirity: string,
		name: string,
		createAt: string,
	},
	species: {
		id: string,
		thumbnailUrl: string,
		name: string,
		createAt: string,
	},
	area: {
		id: string,
		thumbnailUrl: string,
		name: string,
		createAt: string,
	},
	createAt: string,
}
export type MenuType = {
	id: string;
	createAt?: string
	name: string;
	menuMeals: MenuMealType[]
}
export type MenuMealType = {
	id: string;
	createAt?: string
	name: string;
	from: string;
	to: string;
	mealItems: MealItemType[]
}
export type MealItemType = {
	id: string;
	order: number;
	quantity: number;
	food: FoodType
	hasChanged: boolean;
}
export type FoodType = {
	id: string;
	name: string;
	thumbnailUrl: string;
	unitOfMeasurement: UoM
}
export type UoM = {
	name: string;
}
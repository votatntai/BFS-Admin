import { FuseNavigationType } from '@fuse/core/FuseNavigation/types/FuseNavigationType';

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavigationType = [
	{
		id: 'apps',
		title: 'modules',
		type: 'group',
		translate: 'MODULES',
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				type: 'item',
				icon: 'heroicons-solid:user-group',
				url: 'dashboard'
			},
			{
				id: 'account',
				title: 'Account',
				type: 'item',
				icon: 'heroicons-solid:user-group',
				url: 'account'
			},
			{
				id: 'master-data',
				title: 'Master data',
				type: 'collapse',
				icon: 'heroicons-solid:database',
				children: [
					{
						id: 'master-data-bird',
						title: 'Bird',
						type: 'item',
						url: 'master-data/bird',
						end: true
					},
					{
						id: 'master-data-bird-category',
						title: 'Bird category',
						type: 'item',
						url: 'master-data/bird-category',
						end: true
					},
					{
						id: 'master-data-species',
						title: 'Species',
						type: 'item',
						url: 'master-data/species',
						end: true
					},
					{
						id: 'master-data-care-mode',
						title: 'Care mode',
						type: 'item',
						url: 'master-data/care-mode',
						end: true
					},
					{
						id: 'master-data-food',
						title: 'Food',
						type: 'item',
						url: 'master-data/food',
						end: true
					},
					{
						id: 'master-data-food-category',
						title: 'Food category',
						type: 'item',
						url: 'master-data/food-category',
						end: true
					},
					{
						id: 'master-data-unit',
						title: 'Unit',
						type: 'item',
						url: 'master-data/unit',
						end: true
					},
					{
						id: 'master-data-menu-sample',
						title: 'Menu sample',
						type: 'item',
						url: 'master-data/menu-sample',
						end: true
					},
				
					{
						id: 'master-data-cage',
						title: 'Cage',
						type: 'item',
						url: 'master-data/cage',
						end: true
					},
					{
						id: 'master-data-farm',
						title: 'Farm',
						type: 'item',
						url: 'master-data/farm',
						end: true
					},
					{
						id: 'master-data-area',
						title: 'Area',
						type: 'item',
						url: 'master-data/select-farm',
						end: true
					},
				]
			},
		]
	}

];

export default navigationConfig;

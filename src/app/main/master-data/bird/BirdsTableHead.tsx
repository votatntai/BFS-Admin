import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from "@mui/material";
import { useAppDispatch } from "app/store";
import { MouseEvent } from "react";


/*
The table head row type
*/
type rowType = {
    id: string,
    align: 'left' | 'right' | 'center',
    disablePadding: boolean,
    label: string,
    sort: boolean
}
const rows: rowType[] = [
    {
        id: 'image',
        align: 'center',
        disablePadding: true,
        label: '',
        sort: false
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Name',
        sort: true
    },
 
    {
        id: 'gender',
        align: 'left',
        disablePadding: true,
        label: 'Gender',
        sort: true
    },
    {
        id: 'code',
        align: 'left',
        disablePadding: true,
        label: 'code',
        sort: true
    },
    {
        id: 'dateOfBirth',
        align: 'left',
        disablePadding: true,
        label: 'Date of birth',
        sort: true
    },
    {
        id: 'caremode',
        align: 'left',
        disablePadding: true,
        label: 'Caremode',
        sort: true
    },


]
// propType
type TableHeadPropType = {
    onRequestSort: (event: MouseEvent<HTMLSpanElement>, property: string) => void;
    tableOrder: {
        direction: 'asc' | 'desc',
        id: string
    },
    rowCount: number,
}
function BirdsTableHeader(prop: TableHeadPropType) {
	const {  tableOrder,  onRequestSort, rowCount } = prop;
	const dispatch = useAppDispatch();
	const createSortHandler = (event: MouseEvent<HTMLSpanElement>, property: string) => {
		onRequestSort(event, property);
	}   
    return  (
    <TableHead>
        <TableRow className="h-48">
            {rows.map((row) => {
                return (
                    <TableCell
                        className="p-4 md:p-16"
                        key={row.id}
                        align={row.align}
                        padding={row.disablePadding ? 'none' : 'normal'}
                        sortDirection={tableOrder.id === row.id ? tableOrder.direction : false}
                    >
                        {row.sort && (
                            <Tooltip
                                title="Sort"
                                placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                                enterDelay={300}
                            >
                                <TableSortLabel
                                    active={tableOrder.id === row.id}
                                    direction={tableOrder.direction}
                                    onClick={(ev: MouseEvent<HTMLSpanElement>) => createSortHandler(ev, row.id)}
                                    className="font-semibold"
                                >
                                    {row.label}
                                </TableSortLabel>
                            </Tooltip>
                        )}
                    </TableCell>
                );
            })}
        </TableRow>
    </TableHead>);
}
export default BirdsTableHeader
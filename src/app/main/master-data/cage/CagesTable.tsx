import FuseLoading from "@fuse/core/FuseLoading";
import withRouter, { WithRouterProps } from "@fuse/core/withRouter/withRouter";
import { useAppDispatch, useAppSelector } from "app/store";
import { MouseEvent, useEffect, useState } from "react";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { TablePagination } from "@mui/material";
import { Typography, Table, TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import _, { Many } from "lodash";
import CagesTableHeader from "./CagesTableHead";
import { getCages, selectCageSearchText, selectCages } from "./store/cageSlice";
import { CageType } from "./type/CageType";


type CagesTableeProps = WithRouterProps & {
    navigate: (path: string) => void;
};
function CagesTable(prop: CagesTableeProps) {
    const { navigate } = prop;
    const dispatch = useAppDispatch();
    const ListItem = useAppSelector(selectCages);
    const searchText = useAppSelector(selectCageSearchText);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(ListItem);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableOrder, setTableOrder] = useState<{
        direction: 'asc' | 'desc';
        id: string;
    }>({
        direction: 'asc',
        id: ''
    });

    useEffect(() => {
        dispatch(getCages()).then(() => setLoading(false));
    }, [dispatch]);


    useEffect(() => {
        if (searchText.length !== 0) {
            setData(_.filter(ListItem, (item) => item.name.toLowerCase().includes(searchText.toLowerCase())));
            setPage(0);
        } else {
            setData(ListItem);
        }
    }, [ListItem, searchText]);

    function handleRequestSort(event: MouseEvent<HTMLSpanElement>, property: string) {
        const newOrder: {
            direction: 'asc' | 'desc';
            id: string;
        } = { id: property, direction: 'desc' };

        if (tableOrder.id === property && tableOrder.direction === 'desc') {
            newOrder.direction = 'asc';
        }

        setTableOrder(newOrder);
    }
    function handleClick(item: CageType) {
        navigate(`/master-data/cage/${item.id}`);
    }

    function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, page: number) {
        setPage(+page);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(+event.target.value);
    }

    if (loading) {
        return (
            <div className="flex w-full  items-center justify-center h-full">
                <FuseLoading />
            </div>
        )
    }
    if (data.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography
                    color="text.secondary"
                    variant="h5"
                >
                    There are no Cages!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col min-h-full">
            <FuseScrollbars className="grow overflow-x-auto">
                <Table
                    stickyHeader
                    className="min-w-xl ml-60"
                    aria-labelledby="tableTitle"
                >
                    {/* table header tim hieu sau */}
                    <CagesTableHeader
                        tableOrder={tableOrder}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />

                    <TableBody>
                        {_.orderBy(
                            data,
                            [
                                (o) => {
                                    switch (o.id) {
                                        case 'name': {
                                            return o.name[0];
                                        }
                                        default: {
                                            return o.id;
                                        }
                                    }
                                }
                            ],
                            [tableOrder.direction] as Many<boolean | 'asc' | 'desc'>
                        )
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((n) => {
                                return (
                                    <TableRow
                                        className="h-72 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={n.name}
                                        onClick={() => handleClick(n)}
                                    >

                                        {/* img cell */}
                                        <TableCell
                                            className="w-52 px-4 md:px-0"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            {n?.thumbnailUrl ? (
                                                <img
                                                    className="w-full block rounded"
                                                    src={n.thumbnailUrl}
                                                    alt={n.name}
                                                />
                                            ) : (
                                                <img
                                                    className="w-full block rounded"
                                                    src="assets/images/apps/ecommerce/product-image-placeholder.png"
                                                    alt={n.name}
                                                />
                                            )}
                                        </TableCell>
                                        {/* name cell */}
                                        <TableCell
                                            className="p-4 md:p-16"
                                            component="th"
                                            scope="row"
                                        >
                                            {n.name}
                                        </TableCell>
                                        {/* material  cell */}
                                        <TableCell
                                            className="p-4 md:p-16"
                                            component="th"
                                            scope="row"
                                        >
                                            {n.material}
                                        </TableCell>
                                        {/* material  cell */}
                                        <TableCell
                                            className="p-4 md:p-16"
                                            component="th"
                                            scope="row"
                                        >
                                            {n.description}
                                        </TableCell>
                                        {/* material  cell */}
                                        <TableCell
                                            className="p-4 md:p-16"
                                            component="th"
                                            scope="row"
                                        >
                                            {n.createAt}
                                        </TableCell>
                                        {/* material  cell */}
                                        <TableCell
                                            className="p-4 md:p-16"
                                            component="th"
                                            scope="row"
                                        >
                                            {n.area.name}
                                        </TableCell>
                                 
                             

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>
            {/* paging		 */}
            <TablePagination
                className="shrink-0 border-t-1"
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>

    )

}
export default withRouter(CagesTable);
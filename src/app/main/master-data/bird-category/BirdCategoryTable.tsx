import FuseLoading from "@fuse/core/FuseLoading";
import withRouter, { WithRouterProps } from "@fuse/core/withRouter/withRouter";
import { useAppDispatch, useAppSelector } from "app/store";
import { MouseEvent, useEffect, useState } from "react";
import { getBirdCategories, selectBirdCategories, selectBirdCategorySearchText } from "./store/birdCategorySlice";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { TablePagination } from "@mui/material";
import { Typography, Table, TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import _, { Many } from "lodash";
import BirdCategoryTableHead from "./BirdCategoryTableHead";
import { BirdCategoryType } from "./type/BirdCategoryType";


type BirdCategoryTableProps = WithRouterProps & {
    navigate: (path: string) => void;
};
function BirdCategoryTable(prop: BirdCategoryTableProps) {
    const { navigate } = prop;
    const dispatch = useAppDispatch();
    const birdCategories = useAppSelector(selectBirdCategories);
    const searchText = useAppSelector(selectBirdCategorySearchText);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(birdCategories);
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
        dispatch(getBirdCategories()).then(() => setLoading(false));
    }, [dispatch]);


    useEffect(() => {
        if (searchText.length !== 0) {
            setData(_.filter(birdCategories, (item) => item.name.toLowerCase().includes(searchText.toLowerCase())));
            setPage(0);
        } else {
            setData(birdCategories);
        }
    }, [birdCategories, searchText]);

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
    function handleClick(item: BirdCategoryType) {
        navigate(`/master-data/bird-category/${item.id}`);
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
        );
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
                    There are no birdCategory!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col min-h-full">
            <div className="grow overflow-x-auto">
                <Table
                    stickyHeader
                    className="min-w-xl ml-60"
                    aria-labelledby="tableTitle"
                >
                    {/* table header tim hieu sau */}
                    <BirdCategoryTableHead
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
                             

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
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
export default withRouter(BirdCategoryTable);
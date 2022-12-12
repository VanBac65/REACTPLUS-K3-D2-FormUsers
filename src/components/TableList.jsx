import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../app/UsersSlice';
import { columns } from '../Common/Columns';

const TableList = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const dataUsers = useSelector(store => store.users.listUsers)
    useEffect(() => {
        setLoading(true)
        const getDataUsers = async () => {
            try {
                await dispatch(getUsers('/users'))
                setLoading(false)
            } catch (error) {
                setLoading(true)
            }
        }
        getDataUsers()
    }, [JSON.stringify(tableParams)]);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };
    return (
        <Table
            columns={columns}
            dataSource={dataUsers}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};
export default TableList;
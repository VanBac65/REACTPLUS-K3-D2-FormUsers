import { AiFillRightCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        width: '5%',
    },
    {
        title: 'Name',
        dataIndex: 'firstName',
        sorter: (a, b) => a.firstName.charAt(0) >= b.firstName.charAt(0),
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (_, user) => `${user.firstName} ${user.lastName}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            {
                text: 'male',
                value: 'male',
            },
            {
                text: 'female',
                value: 'female',
            },
            {
                text: 'other',
                value: 'other',
            }
        ],
        onFilter: (value, record) => record.gender?.startsWith(value),
        filterSearch: true,
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Actions',
        render: (_, user) => {
            return (
                <Link to={`/users/${user.id}`}><AiFillRightCircle /></Link>
            )
        },
        width: '5%',
    },
];
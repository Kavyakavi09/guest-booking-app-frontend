import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import URL from '../../api/global';

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path1 = location.pathname.split('/')[1];
  const path2 = location.pathname.split('/')[2];
  const [list, setList] = useState('');
  const { data, loading, error } = useFetch(`${URL}/${path1}/${path2}`, {
    headers: {
      ownerauth: JSON.parse(localStorage.getItem('ownerauth')),
    },
  });

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        'Are you sure you want to delete this data?'
      );
      if (confirm) {
        await axios.delete(`${URL}/${path1}/${id}`, {
          headers: {
            ownerauth: JSON.parse(localStorage.getItem('ownerauth')),
          },
        });
        setList(list.filter((item) => item._id !== id));
      } else {
        alert('Your data is safe!');
      }
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <div
              className='deleteButton'
              onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        {path1}
        <Link to={`/${path1}/${path2}/new`} className='link'>
          Add New
        </Link>
      </div>
      <DataGrid
        className='datagrid'
        rows={list}
        columns={columns?.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row?._id}
      />
    </div>
  );
};

export default Datatable;

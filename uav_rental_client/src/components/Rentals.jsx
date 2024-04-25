import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { GlobalContext } from '../context/Context';
import RentalModal from './RentalModal';

const Rentals = () => {
  const rental = {
    id: '',
    date: '',
    uav: {
      id: '',
      category: {
        id: '',
        category: '',
      },
      brand: '',
      model: '',
      weight: '',
      altitude: '',
      height: '',
      length: '',
      payload_capacity: '',
    },
    user: {
      id: '',
      username: '',
      first_name: '',
      last_name: '',
      email: '',
    },
  };

  const [rentals, setRentals] = useState([{ ...rental }]);

  const [row, setRow] = useState({ ...rental });

  const [isRentalModal, setIsRentalModal] = useState(false);

  const { session } = useContext(GlobalContext);

  const fetchRentals = async () => {
    const rentals_url = 'http://127.0.0.1:8000/api/rentals/';
    await axios
      .get(rentals_url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setRentals(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  //OPEN UPDATE RENTAL MODAL
  const editRental = (row) => {
    setIsRentalModal(true);
    setRow(row);
  };

  //DELETE SELECTED RENTAL RECORD
  const deleteRental = async (id) => {
    const delete_rental_url = `http://127.0.0.1:8000/api/rentals/${id}/`;
    await axios
      .delete(delete_rental_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        fetchRentals();
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  //DEFINE COLUMNS FOR RENTAL DATATABLE
  const columns = [
    { name: 'ID', selector: (row) => row.id, sortable: true },
    {
      name: 'Date',
      selector: (row) => new Date(row.date).toDateString(),
      sortable: true,
    },
    { name: 'Member', selector: (row) => row.user.username, sortable: true },
    {
      name: 'Member E-mail',
      selector: (row) => row.user.email,
      sortable: true,
    },

    { name: 'UAV Brand', selector: (row) => row.uav.brand, sortable: true },

    { name: 'UAV Model', selector: (row) => row.uav.model, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button className='me-1' size='sm' onClick={() => editRental(row)}>
            <MdModeEdit />
          </Button>
          <Button size='sm'>
            <MdDelete onClick={() => deleteRental(row.id)} />
          </Button>
        </>
      ),
    },
  ];

  //SEARCH RENTALS
  const [searchQuery, setSearchQuery] = useState('');

  const searchRentals = async (e) => {
    e.preventDefault();
    const searchURL = `http://127.0.0.1:8000/api/rentals/?search=${searchQuery}`;
    await axios
      .get(searchURL, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        console.log(response);
        setRentals(response.data);
      })
      .catch((error) => console.log(error));
  };

  //FILTER RENTALS
  const [filterQuery, setFilterQuery] = useState({
    uavModelFilter: '',
    userFilter: '',
  });

  const { uavModelFilter, userFilter } = filterQuery;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterQuery({ ...filterQuery, [name]: value });
  };
  const filterRentals = async (e) => {
    e.preventDefault();
    const filter_rental_url = `http://127.0.0.1:8000/api/rentals/?uav__model=${uavModelFilter}&user__username=${userFilter}`;
    await axios
      .get(filter_rental_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setRentals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className='mt-5 pb-3'>
      <Row>
        <Form className='mb-1' onSubmit={searchRentals}>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Search Rentals'
              name='search'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Form className='d-flex mb-1' onSubmit={filterRentals}>
          <Col lg={4}>
            <Form.Group>
              <Form.Control
                type='text'
                name='uavModelFilter'
                placeholder='Filter by UAV Model'
                value={uavModelFilter}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group>
              <Form.Control
                type='text'
                name='userFilter'
                placeholder='Filter by User'
                value={userFilter}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col lg={4} className='d-grid'>
            <Button type='submit'>Filter</Button>
          </Col>
        </Form>
      </Row>
      <Row>
        <RentalModal
          show={isRentalModal}
          setShow={setIsRentalModal}
          data={row.id}
          fetchRentals={fetchRentals}
        />
        <Col>
          <DataTable
            columns={columns}
            data={rentals}
            title='Rentals'
            pagination
          />
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col lg={2}>
          <Button onClick={fetchRentals}>Show All Records</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Rentals;

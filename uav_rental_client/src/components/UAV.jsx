import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import UAVModal from './UAVModal';
import { GlobalContext } from '../context/Context';

const UAV = () => {
  const [UAVData, setUAVData] = useState([
    {
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
  ]);

  const [row, setRow] = useState([
    {
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
  ]);

  const [isModal, setIsModal] = useState(false);

  //WE DEFINE AN OPERATION STATE TO SHARE ONE MODAL FOR BOTH UPDATE AND ADD OPERATIONS
  const [operation, setOperation] = useState('');

  const { session } = useContext(GlobalContext);

  const fetchUAV = async () => {
    const uav_url = 'http://127.0.0.1:8000/api/uav/';
    await axios
      .get(uav_url, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setUAVData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //FETCH UAV LIST WHEN COMPONENT LOADS
  useEffect(() => {
    fetchUAV();
  }, []);

  //OPEN UPDATE UAV MODAL AND PASS DATA OF SELECTED ROW
  const editUAV = (row) => {
    setOperation('Update UAV');
    setIsModal(true);
    setRow(row);
  };

  //OPEN ADD UAV MODAL
  const addUAV = () => {
    setOperation('Add UAV');
    setIsModal(true);
    //RESET ROW DATA TO CLEAR INPUT VALUES IN MODAL
    setRow({
      id: '',
      category: '',
      brand: '',
      model: '',
      weight: '',
      altitude: '',
      height: '',
      length: '',
      payload_capacity: '',
    });
  };

  //DELETE UAV RECORD
  const deleteUAV = async (id) => {
    const delete_uav_url = `http://127.0.0.1:8000/api/uav/${id}/`;

    await axios
      .delete(delete_uav_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        fetchUAV();
      })
      .catch((error) => console.log(error));
  };

  const rentUAV = async (id) => {
    const rent_uav_url = 'http://127.0.0.1:8000/api/rentals/';
    await axios
      .post(
        rent_uav_url,
        {
          uav_id: id,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': session,
          },
        }
      )
      .then((response) => {
        location.reload();
      })
      .catch((error) => console.log(error));
  };

  //DEFINE COLUMNS FOR UAV DATATABLE
  const columns = [
    { name: 'ID', selector: (row) => row.id, sortable: true },
    {
      name: 'Category',
      selector: (row) => row.category.category,
      sortable: true,
    },
    { name: 'Brand', selector: (row) => row.brand, sortable: true },
    { name: 'Model', selector: (row) => row.model, sortable: true },
    { name: 'Weight', selector: (row) => row.weight, sortable: true },
    { name: 'Altitude (ft)', selector: (row) => row.altitude, sortable: true },
    { name: 'Height', selector: (row) => row.height, sortable: true },
    { name: 'Length', selector: (row) => row.length, sortable: true },
    {
      name: 'Payload Capacity',
      selector: (row) => row.payload_capacity,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button className='me-1' size='sm' onClick={() => editUAV(row)}>
            <MdModeEdit />
          </Button>
          <Button size='sm'>
            <MdDelete onClick={() => deleteUAV(row.id)} />
          </Button>
        </>
      ),
    },
    {
      name: 'Rent',
      cell: (row) => (
        <>
          <Button size='md' onClick={() => rentUAV(row.id)}>
            Rent
          </Button>
        </>
      ),
    },
  ];

  //SEARCH UAV
  const [searchQuery, setSearchQuery] = useState('');

  const searchUAV = async (e) => {
    e.preventDefault();
    const searchURL = `http://127.0.0.1:8000/api/uav/?search=${searchQuery}`;
    await axios
      .get(searchURL, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        setUAVData(response.data);
      })
      .catch((error) => console.log(error));
  };

  //FILTER UAV
  const [filterQuery, setFilterQuery] = useState({
    brandFilter: '',
    modelFilter: '',
    categoryFilter: '',
  });

  //DESTRUCT filterQuery OBJECT
  const { brandFilter, modelFilter, categoryFilter } = filterQuery;

  //CHANGE FILTER QUERY STATE
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterQuery({ ...filterQuery, [name]: value });
  };

  const filterUAV = async (e) => {
    e.preventDefault();
    const filter_uav_url = `http://127.0.0.1:8000/api/uav/?category__id=${categoryFilter}&brand=${brandFilter}&model=${modelFilter}`;
    await axios
      .get(filter_uav_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setUAVData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className='mb-5'>
      <Row>
        <Form onSubmit={searchUAV}>
          <Form.Group className='d-flex mb-1'>
            <Form.Control
              type='text'
              name='search'
              placeholder='Search UAV'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Form className='d-flex mb-1' onSubmit={filterUAV}>
          <Col lg={3}>
            <Form.Group>
              <Form.Control
                type='text'
                name='brandFilter'
                placeholder='Filter by Brand'
                value={brandFilter}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group>
              <Form.Control
                type='text'
                name='modelFilter'
                placeholder='Filter by Model'
                value={modelFilter}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group>
              <Form.Control
                type='text'
                name='categoryFilter'
                placeholder='Filter by Category ID'
                value={categoryFilter}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col lg={3} className='d-grid'>
            <Button type='submit'>Filter</Button>
          </Col>
        </Form>
      </Row>
      <Row>
        <UAVModal
          data={row}
          show={isModal}
          setShow={setIsModal}
          fetchUAV={fetchUAV}
          operation={operation}
        />
        <Col lg={12}>
          <DataTable
            columns={columns}
            data={UAVData}
            title='UAV List'
            pagination
          />
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col lg={2}>
          <Button onClick={fetchUAV}>Show All Records</Button>
        </Col>
        <Col lg={2}>
          <Button onClick={addUAV}>Add New UAV</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UAV;

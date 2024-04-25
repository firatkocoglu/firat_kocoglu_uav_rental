import { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { GlobalContext } from '../context/Context';

const RentalModal = ({ show, setShow, data, fetchRentals }) => {
  const [UAV, setUAV] = useState([
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

  const [rentalModalID, setRentalModalID] = useState('');

  const [selectedUAVID, setSelectedUAVID] = useState('');

  useEffect(() => {
    setRentalModalID(data);
  }, [data]);

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
        setUAV(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeUAVID = (e) => {
    setSelectedUAVID(e.target.value);
  };

  useEffect(() => {
    fetchUAV();
  }, []);

  const updateRental = async (id) => {
    const update_rental_url = `http://127.0.0.1:8000/api/rentals/${id}/`;
    await axios
      .put(
        update_rental_url,
        {
          uav_id: selectedUAVID,
        },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': session,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        setShow(false);
        fetchRentals();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop='static'
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Rental</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>UAV</Form.Label>
          <Form.Select onChange={handleChangeUAVID}>
            <option>See UAV List</option>
            {UAV.map((uav_data) => {
              return (
                <option value={uav_data.id} key={uav_data.id}>
                  {uav_data.brand} - {uav_data.model}
                </option>
              );
            })}
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            updateRental(rentalModalID);
          }}
        >
          Update Rental
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RentalModal;

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { GlobalContext } from '../context/Context';

const UAVModal = ({ show, setShow, data, fetchUAV, operation }) => {
  //DEFINE COMPONENT STATE AS OBJECT
  const [modalData, setModalData] = useState({});

  //SET MODAL DATA WHEN DATA CHANGES
  useEffect(() => {
    setModalData({ ...data });
  }, [data]);

  //DESTRUCT MODAL DATA OBJECT
  const {
    id,
    category,
    brand,
    model,
    weight,
    altitude,
    height,
    length,
    payload_capacity,
  } = modalData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  //CONSUME GLOBAL CONTEXT TO ACCESS CSRFTOKEN IN ORDER TO AUTHENTICATE HTTP REQUESTS
  const { session } = useContext(GlobalContext);

  //UPDATE UAV REQUEST
  const updateUAV = async (id) => {
    const update_uav_url = `http://127.0.0.1:8000/api/uav/${id}/`;

    await axios
      .patch(
        update_uav_url,
        { ...modalData },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': session,
          },
        }
      )
      .then((response) => {
        fetchUAV();
        setShow(false);
      })
      .catch((error) => console.log(error));
  };

  //ADD NEW UAV REQUEST
  const addUAV = async () => {
    const add_uav_url = 'http://127.0.0.1:8000/api/uav/';

    await axios
      .post(
        add_uav_url,
        {
          category_id: category,
          brand: brand,
          model: model,
          weight: weight,
          altitude: altitude,
          height: height,
          length: length,
          payload_capacity: payload_capacity,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': session,
          },
        }
      )
      .then((response) => {
        fetchUAV();
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <Modal.Title>{operation}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {operation === 'Add UAV' && (
            <Form.Group className='mb-3'>
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type='text'
                name='category'
                value={category}
                onChange={handleChange}
              />
            </Form.Group>
          )}
          <Form.Group className='mb-3'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              name='brand'
              value={brand}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Model</Form.Label>
            <Form.Control
              type='text'
              name='model'
              value={model}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type='text'
              name='weight'
              value={weight}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Altitude</Form.Label>
            <Form.Control
              type='text'
              name='altitude'
              value={altitude}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Height</Form.Label>
            <Form.Control
              type='text'
              name='height'
              value={height}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Length</Form.Label>
            <Form.Control
              type='text'
              name='length'
              value={length}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Payload Capacity</Form.Label>
            <Form.Control
              type='text'
              name='payload_capacity'
              value={payload_capacity}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            operation === 'Update UAV' ? updateUAV(id) : addUAV();
          }}
        >
          {operation}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UAVModal;

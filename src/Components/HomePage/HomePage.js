import React, { useState, useEffect } from 'react';
import { ButtonGroup, DropdownButton, Dropdown, Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const HomePage = ({ onAddProduct, products, onSort }) => {

  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/drakulovski/dbplaceholder/states')
      .then(response => {
        setStates(response.data);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });

      axios.get('https://my-json-server.typicode.com/drakulovski/dbplaceholder/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);
  const [sortDirections, setSortDirections] = useState({
    name: 'asc',
    price: 'asc' 
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      picture: '',
      price: '',
      state: '',
      category: '',
      description:'',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required').min(4, 'Title must be at least 4 characters'),
      picture: Yup.string().required('Picture URL is required').url('Must be a valid URL'),
      price: Yup.number().required('Price is required').min(4, 'Price must be at least 4'),
      state: Yup.string().required('State is required'),
      category: Yup.string().required('Category is required'),
      description: Yup.string().required('Description is required')
    }),
    onSubmit: values => {
      const selectedState = states.find(state => state.name === values.state);
      const minimumPrice = selectedState && selectedState.tax > 0.25 ? 7 : 4;

      if (values.price < minimumPrice) {
        formik.setFieldError('price', `Price must be at least ${minimumPrice}`);
      } else {
        onAddProduct(values);
        handleClose();
      }
    }
  });

  const handleSort = (sortBy, direction) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortBy === 'name') {
        return direction === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (sortBy === 'price') {
        return direction === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
  
    onSort(sortedProducts);
  };
  

  return (
    <div className="home-page">
      <ButtonGroup>
        <DropdownButton title="Sort by Name" variant="primary">
          <Dropdown.Item onClick={() => handleSort('name' , 'asc')}>Sort A-Z</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('name', 'desc')}>Sort Z-A</Dropdown.Item>
        </DropdownButton>
        <DropdownButton title="Sort by Price" variant="primary">
          <Dropdown.Item onClick={() => handleSort('price', 'asc')}>Sort Low-High</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('price', 'desc')}>Sort High-Low</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
      <div>
        <button className="btn btn-primary add-product-button" onClick={handleShow}>Add Product</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.touched.title && formik.errors.title && <div className="text-danger">{formik.errors.title}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="picture" className="form-label">Picture URL</label>
              <input
                type="text"
                className="form-control"
                id="picture"
                name="picture"
                value={formik.values.picture}
                onChange={formik.handleChange}
              />
              {formik.touched.picture && formik.errors.picture && <div className="text-danger">{formik.errors.picture}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.touched.price && formik.errors.price && <div className="text-danger">{formik.errors.price}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <select
                className="form-select"
                id="state"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
              >
                <option value="">Select a state</option>
                {states.map(state => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              {formik.touched.state && formik.errors.state && <div className="text-danger">{formik.errors.state}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && <div className="text-danger">{formik.errors.category}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description && <div className="text-danger">{formik.errors.description}</div>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Product
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default HomePage;
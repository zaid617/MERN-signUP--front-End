import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Notfound1 from '../alertfornoresult/Notfound';
import { GlobalContext } from '../../../context/Context';
import Nav from 'react-bootstrap/Nav';


export default function NavigationBar(props) {


    let [Id , setId] = useState("");
    const [isAdd, setIsAdd] = useState(false);
    let [data, setData] = useState([]);

    const [show, setShow] = useState(false);
    
  let { state, dispatch } = useContext(GlobalContext);

    const logOut = async ()=>{

      try {
        let response = await axios.post(`${props.baseUrl}/logout`,
        {},
        {
          withCredentials: true
        })
        console.log("logout successful");
        dispatch({
          type: 'USER_LOGOUT'
        })

    }      catch (e) {
        console.log("error");
    }
 
    }
    



    const handleClose = () => {
      setShow(false) 
      setData([]);
    };
    const handleShow = () => setShow(true);


    

    const findItem = (e) =>{
      e.preventDefault();

    axios.get(`${props.baseUrl}/product/${Id}`)
    .then(function (response) {
      setData(response.data.data);
      console.log(data)
      setId("")
      handleShow();
    })
    .catch(err => {
      setIsAdd(true)
  })
  setTimeout( () =>{
    setIsAdd(false)
    },1500)
}

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 ">
          <Container fluid>
            <Navbar.Brand>E-Commerce App</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  E-Commerce App
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='justify-content-end'>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link >Home</Nav.Link>
                  <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                </Nav>
                <Form className="d-flex" onSubmit={findItem}>
                  <Form.Control
                    type="search"
                    placeholder="Search By Product Id"
                    className="me-2"
                    aria-label="Search"
                    value={Id}
                    onChange={(w)=>{setId(w.target.value)}}
                  />
                  <Button type='submit' variant="outline-primary">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Result :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* data start */}
          <FloatingLabel
              controlId="floatingInput"
              label="Product Name"
              className="mb-3"


            ><Form.Control type="text" readOnly placeholder="Product Name" value={data.name}
               />

            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              className="mb-3"
              label="Price"

            >

              <Form.Control type="number" readOnly placeholder="Price" value={data.price}
                />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingdes"
              label="Product Description"
            >
              <Form.Control type="text" readOnly className="mb-3" placeholder="Product Description" value={data.description}
                 />
            </FloatingLabel>
          {/* data end */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ position:"fixed", top:"60px" ,zIndex:"10000",width:"100%"}}>
        {(isAdd)?
      <Notfound1/>:
        null
        } 
      </div>

    </>
  )
}

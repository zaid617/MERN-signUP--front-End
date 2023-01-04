import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import 'animate.css';
import axios from 'axios';
import "./box.css"

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

export default function MainBox(props) {

  let [editId, setEditId] = useState("");
  let [delId, setDelId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false) };

  const handleShow = (id) => {

    setShow(true);
    setDelId(id);

  };
  

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => { setShow1(false); setEditId("") };
  const handleShow1 = () => setShow1(true);
  const [isLoading, setLoading] = useState(false);
  let [name1, setName] = useState("");
  let [price1, setPrice] = useState("");
  let [description1, setDescription] = useState("");

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`${props.baseUrl}/product/${delId}`)
      console.log("response: ", response.data);
      props.setGetAllData(!props.getAllData);
      props.setIsDel(true)

    } catch (error) {
      console.log("error in getting all products", error);
    }

    handleClose();

    setTimeout(()=>{
      props.setIsDel(false)
    },1500)
    
  }

  const editProduct = (e) => {
    e.preventDefault();
    axios.put(`${props.baseUrl}/product/${editId}`,

      {
        name: name1,
        price: price1,
        description: description1,
      }
      
      )
      .catch(err => {
        console.log("err", err);
      })
    props.setGetAllData(!props.getAllData)
    setDescription('');
    setName("");
    setPrice("");
    handleClose1();
  }


  return (

    <div className='container'>

      <hr className='mb-3' style={{ color: "#ffff" }} />

      <h1 className='mb-3' style={{ color: "#ffff" }}><u>All Products :</u></h1>

      <Row xs={1} md={2} className="g-4 mb-2">

        {
          props.products.map((eachproduct, i) => (
            <Col className='mb-2 animate__animated animate__pulse' key={i}>
              <Card style={{
                background: "rgba(225, 225, 225, 0.55)",
                boxShadow: "0 2px 8px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 14px )",
                borderRadius: "6px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )"
              }}>
                <Card.Img style={{height: "270px", objectFit:"cover"}} variant="top" src={eachproduct.url} />
                <Card.Body >
                  <Card.Title style={{ fontSize: "30px",color:"black",fontWeight:"700", textShadow: "0 0 3px white"}}>{i + 1}.  {eachproduct.name}</Card.Title>
                    <hr />
                  <h4 style={{color:"#050572"}}><u>Description </u></h4>
                  <Card.Text style={{ fontSize: "14px", color:"black"}}>
                    {
                        eachproduct.description
                    }
                    <br />
                  <span style={{fontWeight:"600",color:"black"}}> PKR.  : <span style={{ fontSize: "14px",fontWeight:"400", color:"white",textShadow: "0 0 2px black"}}>{eachproduct.price}</span></span><br />
                  </Card.Text>
                  {/* <span style={{fontWeight:"600",color:"black"}}> Product ID  : <span style={{ fontSize: "14px",fontWeight:"400", color:"white",textShadow: "0 0 2px black"}}>{eachproduct._id}</span></span> */}
                </Card.Body>
                <Card.Footer style={{backgroundColor:"#ffffffed"}}>
                  <span><Button variant="outline-success" onClick={() => { handleShow1(); setEditId(eachproduct._id); setName(eachproduct.name); setPrice(eachproduct.price); setDescription(eachproduct.description) }}>Edit Info</Button></span>
                  <span> <Button onClick={() => { handleShow(eachproduct._id) }} variant="outline-danger" >Delete</Button></span>
                </Card.Footer>
              </Card>
            </Col>
          ))
        }

      </Row>





      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-danger" onClick={deleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={show1} onHide={handleClose1} style={{ backgroundColor: "#dfd4d433" }}>
        <Modal.Header closeButton >
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body >

          <form onSubmit={!isLoading ? editProduct : null}>
            <FloatingLabel
              controlId="floatingInput"
              label="Product Name"
              className="mb-3"


            ><Form.Control type="text" required placeholder="Product Name" value={name1}
              onChange={(e) => setName(e.target.value)} />

            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              className="mb-3"
              label="Price"

            >

              <Form.Control type="number" required placeholder="Price" value={price1}
                onChange={(e) => setPrice(e.target.value)} />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingdes"
              label="Product Description"
            >
              <Form.Control type="text" required className="mb-3" placeholder="Product Description" value={description1}
                onChange={(e) => setDescription(e.target.value)} />
            </FloatingLabel>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
              <Button
                variant="outline-success"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? 'Loading…' : 'Click to Edit'}
              </Button>
            </Modal.Footer>

          </form>

        </Modal.Body>

      </Modal>


    </div>


  )
}

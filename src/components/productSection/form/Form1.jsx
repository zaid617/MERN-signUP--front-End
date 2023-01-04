import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1500));
}



export default function Form1(props) {

    const [isLoading, setLoading] = useState(false);
    let [name , setName] = useState("");
    let [price , setPrice] = useState("");
    let [description , setDescription] = useState("");
    let [file , setFile] = useState("");

    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);

  
    const handleClick = (e) => {
      e.preventDefault();

/////////////////////////////////////////////
const cloudinaryData = new FormData();
cloudinaryData.append("file", file);
cloudinaryData.append("upload_preset", "eCOMMERCE");
cloudinaryData.append("cloud_name", "dahfjrq6m");
console.log(cloudinaryData);
axios.post(`https://api.cloudinary.com/v1_1/dahfjrq6m/image/upload`, cloudinaryData,
  {
    headers: { "Content-Type": "multipart/form-data" }
  })

  .then(async res => {
    console.log("from then", res.data);
    setLoading(true);

    axios.post(`${props.baseUrl}/product`, {
      name: name,
      price: price,
      description: description,
      url : res?.data?.url
    })
      .then(response => {
        console.log("upload successfully");
        props.setIsAdd(true)
        props.setGetAllData(!props.getAllData)
      })
      .catch(err => {
        console.log("err", err);
      })
      setTimeout(()=>{
        props.setIsAdd(false)
      },1500)
    setDescription('');
    setName("");
    setPrice("");



  })
  .catch(async err => {
    console.log("from catch", err);
  })
/////////////////////////////////////////////
        
}

  return (
    <div className='container mb-3 mt-4 glass' style={{padding:"20px"}} >
        <form className="width" onSubmit={!isLoading ? handleClick : null}>
            <h3 style={{textShadow: "0 0 2px white", fontWeight:"700"}}>Add Product</h3>
            <hr />
      <FloatingLabel
        controlId="floatingInput"
        label="Product Name"
        className="mb-3"
        
        
      ><Form.Control type="text" required placeholder="Product Name" value={name}
      onChange={(e)=>setName(e.target.value)}/>

      </FloatingLabel>
      <FloatingLabel 
      controlId="floatingPassword"
      className="mb-3"
      label="Price"
      
      >
         
        <Form.Control type="number" required placeholder="Price" value={price}
      onChange={(e)=>setPrice(e.target.value)}/>
      </FloatingLabel> 
      
      <FloatingLabel 
      controlId="floatingdes" 
      label="Product Description"
      >
        <Form.Control type="text" required className="mb-3" placeholder="Product Description"  value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
      </FloatingLabel>

        <Form.Control type="file" required className="mb-3" placeholder="Product Picture"
        onChange={(e)=>setFile(e.currentTarget.files[0])}/>

      

      <Button
      style={{border:"1px solid white"}}
      variant="primary"
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? 'Loading…' : 'Click to Add'}
    </Button>
    </form>
    </div>
  )

}

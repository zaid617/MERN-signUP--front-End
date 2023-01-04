import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MainBox from '../mainBox/mainBox.jsx';
import AlertForAdd from '../alertforAdd/AlertForAdd.jsx';
import AlertForDelete from '../alertfordelete/AlertForDelete.jsx';
import Form1 from '../form/Form1.jsx';
import NavigationBar from '../navbar/NavigationBar.jsx';


export default function Dashboard(props) {

  let [products, setProducts] = useState([]);
  let [getAllData, setGetAllData] = useState(false);
  let [isAdd, setIsAdd] = useState(false);
  let [isDel, setIsDel] = useState(false);


  useEffect(() => {


    const getData = async () => {

      try {
        const response = await axios.get(`${props.baseUrl}/products`)
        console.log("response: ", response.data);
        setProducts(response.data.data)
  
      } catch (error) {
        console.log("error in getting all products", error);
      }

    }

    getData()

  }, [props.baseUrl , getAllData])


    





  return (
    <div>
    <NavigationBar baseUrl={props.baseUrl} products={props.products}/>

    <div style={{ height:"50px",position:"sticky", top:"7px" ,zIndex:"100" }}>

      {(isAdd)?
    <AlertForAdd/>:
      null
      }

      {(isDel)?
    <AlertForDelete />:
      null
      }

    </div>

    <Form1 setGetAllData={setGetAllData} setIsAdd={setIsAdd} getAllData={getAllData} baseUrl={props.baseUrl}/>

    <MainBox products={products} getAllData={getAllData} setIsDel={setIsDel} setGetAllData={setGetAllData} baseUrl={props.baseUrl}/>

  </div>
  )
}

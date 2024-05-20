import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from "react";
import './App.css'
// import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { BsFillTrash3Fill , BsFillPencilFill } from "react-icons/bs";
import {  } from "react-icons/bs";
import FormTable from './components/FormTable';


axios.defaults.baseURL = "http://localhost:8080/"


function App() {
  const [addSection, setAddsection] = useState(false)

  const [editSection, setEditsection] = useState(false)

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
  })

  const [formdataEdit, setFormdataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
  })

  const [datalist, setdatalist] = useState([])

  const hadleOnchange = (e) => {
    const { value, name } = e.target
    setFormdata((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }



  const getdata = async () => {
    const data = await axios.get("/")
    // console.log(data)
    if (data.data.success) {
      setdatalist(data.data.data)
      // alert(data.data.message)

    }
  }

  useEffect(() => {
    getdata()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("/create", formdata)
    console.log(data)
    if (data.data.success) {
      setAddsection(false)
      getdata()
      alert(data.data.message)
    }
    // console.log(formdata)
  }


  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)

    if (data.data.success) {
      getdata()
      alert(data.data.message)
    }
  }


  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/update",formdataEdit)
    if (data.data.success) {
      getdata()
      alert(data.data.message)
      setEditsection(false)
    }
    console.log(data)
  }

  const hadleEditOnchange = async (e) => {
    const { value, name } = e.target
    setFormdataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  const handleEdit = (el) =>{
    setFormdataEdit(el)
    setEditsection(true)  
 }


  return (

    <>
      <div className='container'>
        <button className='btn btn-add' onClick={() => setAddsection(true)}>Add</button>
        <h2 className='header'>Employee data</h2>
        {
          addSection && (
            <FormTable
              handleSubmit={handleSubmit}
              hadleOnchange={hadleOnchange}
              handleClose={() => setAddsection(false)}
              rest={formdata}
            ></FormTable>
          )
        }
        {
          editSection && (
            <FormTable
              handleSubmit={handleUpdate}
              hadleOnchange={hadleEditOnchange}
              handleClose={() => setEditsection(false)}
              rest={formdataEdit}
            ></FormTable>
          )
        }
        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                datalist[0] ? (
                  datalist.map((el) => {
                    return (
                      <tr key={el._id}>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.mobile}</td>
                        <td>
                          <BsFillPencilFill title='edit' className='btn-edit' onClick={()=>handleEdit(el)}></BsFillPencilFill>|
                          <BsFillTrash3Fill className='btn-delete' onClick={() => handleDelete(el._id)} />
                        </td>
                      </tr>
                    );
                  }))
                  : (
                    <p>No data available</p>
                  )
              }
            </tbody>

          </table>
        </div>
      </div>

    </>
  )
}

export default App

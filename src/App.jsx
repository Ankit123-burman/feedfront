import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [name ,setName] = useState("")
  const [feedback, setFeedback] = useState("")

  useEffect(()=>{
    axios.get('https://feedbackend-five.vercel.app')
    .then((res)=>{
      setData(res.data)
      }).catch(() => {
        console.log("Error")
        })
  })
 
  const AddData = () => {
   axios.post('https://feedbackend-five.vercel.app',{name,feedback})
      .then(() => {
        setData([...data, {name,feedback}])
        setName("")
        setFeedback("")
      }).catch(() => {
        console.log("Error")
      })
  }

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

 
  return (
    <>
      <div className="mainbox">
        <div className="container">
          <input value={name}  onChange={(e)=>setName(e.target.value)}   type="text" placeholder="Name" required />
          <input value={feedback}  onChange={(e)=>setFeedback(e.target.value)}   type="text" placeholder="Feedback" required />
          <button onClick={AddData} >Submit</button>
         
          {data.map((item, index) => (
            <div key={index}>
              <p>id:{index}</p>
              <p>Your name: {item.name}</p>
              <p>Your Feedback: {item.feedback}</p>
              <button onClick={() => handleDelete(index)} >Delete</button>
            </div>
          ))}

        </div>
      </div>

    </>
  )
}

export default App

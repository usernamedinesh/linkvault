import { useState } from 'react'
import beaver from './assets/beaver.svg'
// import { hcWithType } from 'server/dist/client'
import { hcWithType } from "../../server/dist/client";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

type ResponseType = Awaited<ReturnType<typeof client.hello.$get>>;

const client = hcWithType(SERVER_URL);

function App() {
  const [data, setData] = useState<Awaited<ReturnType<ResponseType["json"]>> | undefined>()

  async function sendRequest() {
    try {
      const res = await client.health.$get()
      console.log("res", res);
      if (!res.ok) {
        console.log("Error fetching data")
        return
      }
      const data = await res.json()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div>
        </div>
  )
}

export default App

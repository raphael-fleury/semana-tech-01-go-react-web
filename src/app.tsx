import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateRoom } from "./pages/create-room"
import { Room } from "./pages/room"

const router = createBrowserRouter([
  { path: '/', element: <CreateRoom/> },
  { path: '/room/:id', element: <Room/> }
])

export function App() {
  return <RouterProvider router={router}/>
}

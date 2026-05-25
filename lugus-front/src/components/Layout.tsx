import Header from "./Header"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="bg-lugus-bg text-lugus-text min-h-screen flex flex-col">

      <Header />

      <div className="w-full h-[2px] bg-[#2e303a]"></div>

      <div className="flex flex-1">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

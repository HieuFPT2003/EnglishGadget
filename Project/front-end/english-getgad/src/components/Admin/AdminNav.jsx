import React from 'react'
import { Link } from 'react-router-dom'

function AdminNav() {
  return (
    <div className="col-span-2 h-screen p-5">
      <ul className="mt-16 flex flex-col gap-4">
        <li>
          <Link
            className="block bg-amber-600 text-white py-5 px-8 rounded-lg hover:bg-orange-900 transition duration-300"
            to="/admin"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className="block bg-amber-600 text-white py-5 px-8 rounded-lg hover:bg-orange-900 transition duration-300"
            to="users"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            className="block bg-amber-600 text-white py-5 px-8 rounded-lg hover:bg-orange-900 transition duration-300"
            to="posts"
          >
            Posts
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminNav
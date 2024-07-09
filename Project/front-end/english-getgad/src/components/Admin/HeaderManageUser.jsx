import { useState ,useContext} from "react";
import { Link } from "react-router-dom";
import AdminContext from "../../store/AdminContext";
function HeaderManageUser() {
  const AdminCtx = useContext(AdminContext)
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
    AdminCtx.handleSearch(e.target.value);
  };
  return (
    <div className="flex flex-row justify-between my-6">
      <div>
        <form>
          <span className="text-xl">Name:</span>
          <input className="text-slate-950 min-w-96 p-1 ml-3" type="text" value={text} id="name" onChange={handleChange} />
        </form>
      </div>

      <div className="mr-44">
        <Link to='create' className="text-amber-400 text-xl">Create User</Link>
      </div>
    </div>
  );
}

export default HeaderManageUser;

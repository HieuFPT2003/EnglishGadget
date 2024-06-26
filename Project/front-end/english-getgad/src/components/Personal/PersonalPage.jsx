import { useState ,useEffect} from "react";
import { tokenLoader } from "../../util/auth";

function PersonalPage() {
  const token = tokenLoader();
  const [user, setUser] = useState();

  useEffect(()=>{
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:9999/Users?token=${token}`);
      const users = await response.json();
      console.log(users);
      setUser(users[0]);
    };
    fetchUser();
  },[token]) 


  return <div>
    {/* <form>
        <label>
            Name:
            <input type="text" value={1} />
        </label>
        <label>
            Email:
            <input type="text" value={user.email} />
        </label>
        <label>
            Premium:
            <input type="text" value={user.premium} />
        </label>
    </form> */}
  </div>;
}

export default PersonalPage;

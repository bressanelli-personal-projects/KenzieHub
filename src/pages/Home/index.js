import { Link } from "react-router-dom";

const Home = () => {

    return(

        <div>
            <Link to='login'>
                LOGIN
            </Link>

            <Link to='signup'>
                SIGNUP
            </Link>
        </div>

    )
}

export default Home;
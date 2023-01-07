import { useEffect, useState } from "react";
import axios from 'axios'
import Apod from "../component/Apod";
import Mars from "../component/marsrover";
import "./dashboard.css";
import Searchdata from "../component/NasalibSearch";
import { useNavigate } from "react-router";
import AuthContext from "../context/context-api";
import React, { useContext } from "react";


function Dashboard() {

    const [Apodd, setApodd] = useState([])
    const [Marsdata, setMars] = useState([])
    const [search, setsearch] = useState("")
    const [searchdata, setsearchdata] = useState([])
    var { loggedin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(loggedin, "lcoockuie")

        if (loggedin === undefined || !loggedin) {
            navigate("/")
        }
        axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then(res => {
            console.log(res, "data")
            setApodd(res)
        })
        axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY').then(res => {
            console.log(res, "datamars")
            setMars(res)
        })



    }, [])
    function change(e) {
        e.preventDefault();
        console.log(search, "kk")

        setsearch(e.target.value)
    }
    function logout() {
        axios.get('/api/user/logout').then(res => {
            console.log(res, "logout")
            navigate("/")
        }

        )
    }
    function Searchlib() {
        axios.get(`https://images-api.nasa.gov/search?q=${search}`).then(res => {
            console.log(res, "search")
            setsearchdata(res)
        })
    }
    return (
        <div>
            <div className="dashboard"  >
                <button className="right btn" onClick={logout}>logout</button>
                <h1 className="center" style={{ width: "70vw" }}>Nasa news</h1>
                <input className="white-text" placeholder="search from Nasa Library" onChange={change} style={{ width: "40vw" }} /><button className="btn" onClick={Searchlib}>search</button>
                {(searchdata.data) && <Searchdata Data={searchdata} />}
                {(Apodd.data) && <Apod Apoddata={Apodd} />}
                {(Marsdata.data) && <Mars marspic={Marsdata} />}
            </div>
        </div>
    );
}
export function DashboardLog(props) {
    return <Dashboard />
}

export default Dashboard;

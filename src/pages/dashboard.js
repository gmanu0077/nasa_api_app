import { useEffect, useState } from "react";
import axios from 'axios'
import Apod from "../component/Apod";
import Mars from "../component/marsrover";
import "./dashboard.css";
import Searchdata from "../component/NasalibSearch";

function Dashboard() {

    const [Apodd, setApodd] = useState([])
    const [Marsdata, setMars] = useState([])
    const [search, setsearch] = useState("")
    const [searchdata, setsearchdata] = useState([])

    useEffect(() => {
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
    function Searchlib() {
        axios.get(`https://images-api.nasa.gov/search?q=${search}`).then(res => {
            console.log(res, "search")
            setsearchdata(res)
        })
    }
    return (
        <div>
            <div className="dashboard"  >
                <h1 className="center" style={{ width: "70vw" }}>Nasa news</h1>
                <input className="white-text" placeholder="search from Nasa Library" onChange={change} style={{ width: "40vw" }} /><button className="btn" onClick={Searchlib}>search</button>
                {(searchdata.data) && <Searchdata Data={searchdata} />}
                {(Apodd.data) && <Apod Apoddata={Apodd} />}
                {(Marsdata.data) && <Mars marspic={Marsdata} />}
            </div>
        </div>
    );
}

export default Dashboard;

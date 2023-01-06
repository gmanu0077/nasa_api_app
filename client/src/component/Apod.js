import { useEffect, useState } from "react";
import axios from 'axios'


const Apod = ({ Apoddata }) => {
    console.log(Apoddata.data.copyright, "ad")


    return (
        <div>

            <div className="Apod" style={{ width: "70vw" }}>
                <h1 className="center">{Apoddata.data.copyright}</h1>
                <img src={Apoddata.data.hdurl} height="200vw" width="200vw" />
                <p className="center" style={{ width: "70vw" }}>{Apoddata.data.explanation}</p>
            </div>
        </div>
    );
}

export default Apod;

import { useEffect, useState } from "react";
import axios from 'axios'


const Mars = ({ marspic }) => {
    console.log(marspic.data.photos, "admar")


    return (
        <div style={{ width: "70vw" }}>
            <h2>Mars Rover Pictures of Earth</h2>
            <ul className="collection " style={{ width: "70vw" }}>

                {marspic.data.photos.map(pics => {
                    return (
                        <>
                            <li className="collection-item avatar ">
                                <img src={pics.img_src} alt="" class="circle" />
                                <span class="title">{pics.camera.full_name}</span>
                                <p>{pics.camera.name} </p>
                                <br></br>
                                <p>{pics.rover.name}
                                </p>
                            </li>


                        </>
                    )
                })}
            </ul>
        </div>
    );
}

export default Mars;

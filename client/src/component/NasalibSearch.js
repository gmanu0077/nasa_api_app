import { useEffect, useState } from "react";
import axios from 'axios'


const Searchdata = ({ Data }) => {
    console.log(Data.data.collection.items, "addda")


    return (
        <div>
            <div class="row">
                <div class="col s12 m12 l12">
                    {Data.data.collection.items.map(pics => {
                        if (pics.links) {
                            console.log((pics.links[0]), "kjk")
                        }
                        return (
                            <div className="card" style={{ width: "70vw" }}>
                                <div className="card-image" style={{ width: "70vw" }}>
                                    {(pics.links) && <img src={pics.links[0].href} />}
                                    <span className="card-title">{pics.data[0].location}</span>
                                </div>
                                <div class="card-content">
                                    <p style={{ width: "60vw" }}>{pics.data[0].description}</p>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
}

export default Searchdata;

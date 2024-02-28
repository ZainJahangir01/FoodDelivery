import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Card from '../../components/Card'

const Home = () => {
    useEffect(() => {
        loadData();
    }, []);
    const [foodCategory, setFoodCategory] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [search, setSearch] = useState('')

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/foodData', { method: "POST", headers: { 'Content-Type': 'application/json' } });
        response = await response.json();
        setFoodCategory(response[0]);
        setFoodItems(response[1]);

    }
    return (
        <div>
            <div><Navbar /></div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: '10' }} >
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ objectFit: 'contain', height: '100%' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ objectFit: 'contain', height: '100%' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?cake" className="d-block w-100" style={{ objectFit: 'contain', height: '100%' }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className='container'>
                {foodCategory && foodCategory.map((data) => {
                    return (<div className='row mb-4'>
                        <div key={data._id} className='fs-3 m-3'>
                            {data.CategoryName}</div>
                        <hr />
                        {foodItems && foodItems
                            .filter((foodItem) => (foodItem.CategoryName === data.CategoryName) && (foodItem.name.toLowerCase().includes(search.toLocaleLowerCase())))
                            .map(fileteredData => {
                                return (
                                    <div key={fileteredData._id} className='col-12 col-md-6 col-lg-3'>
                                        <Card data={fileteredData} /></div>
                                )
                            })}
                    </div>
                    )
                })}
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Home

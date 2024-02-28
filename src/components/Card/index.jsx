import React, { useRef, useState, useEffect } from 'react'
import { useDispatchCart, useCart } from '../ContextReducer';

const Card = (props) => {
    const dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let option = props.data.options;
    let priceOption;
    if (option && typeof option === 'object') {
        priceOption = Object.keys(option[0]);
    } else {
        console.log('option is not an object:', option);
    }
    const handleAddToCart = async () => {
        await dispatch({ type: "ADD", id: props.data._id, name: props.data.name, price: totalPrice, qty: qty, size: size, img: props.data.img })
        console.log(data);
    }
    let totalPrice = qty * parseInt(option[size]);

    useEffect(() => {
        setSize(priceRef.current.value);

    }, []);
    return (
        <div>
            <div className="card mt-3 " style={{ "width": '18rem', "maxHeight": '360px' }}>
                <img src={props.data.img} className="card-img-top" alt="..." style={{ height: '200px', objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.data.name}</h5>
                    <div className='container w-100 display'>
                        <select className='m-2  h-100 bg-success rounded' onClick={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (<option className='' key={i + 1} value={i + 1}>{i + 1}</option>)
                            })}
                        </select>

                        <select className='m-2  h-100 bg-success rounded' ref={priceRef} onClick={(e) => setSize(e.target.value)}>
                            {priceOption?.map((data) => {
                                return (<option className='' key={data} value={data}>{data}</option>)
                            })}
                        </select>
                        <div className='d-inline w-100 fs-5'>{totalPrice}/-</div>
                    </div>
                    <hr />
                    <button className='btn btn-success jusitfy-center ms-2' onClick={handleAddToCart}>Add to Cart</button>

                </div>
            </div>
        </div>
    )
}

export default Card

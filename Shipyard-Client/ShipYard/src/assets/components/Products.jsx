import "../styling/Products.scss";
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { fetchItem , addToCart } from "../store/action/actionCreator.js";

export default function Products() {
    const data = useSelector((state)=>{
        return state.itemReducer.items
    })

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const dispatch = useDispatch()
        
    useEffect(()=>{
        dispatch(fetchItem())
    },[dispatch])

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="products-component-container">
            <div className="products-component-filter-container">
                <div className="products-component-filter-wrapper">
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="products-component-listing-container">
                    {filteredData.map((el) => (
                        <div key={el.id} className="product-component-listing--card"
                            onClick={() => {
                                setSelectedProduct(el);
                                setShowModal(true);
                            }}
                        >
                        <div className="product-card-component-listing--image">
                            <img src={el.thumbnail} alt={el.name} />
                        </div>

                        <div className="product-card-component-listing--body">
                            <h3>{el.name}</h3>
                            <p className="product-card-component-listing-price">Rp. {el.price.toLocaleString("id-ID")}</p>
                            <p className="product-card-component-listing-desc">{el.description}</p>
                        </div>
                        </div>
                    ))}
            </div>
            {showModal && selectedProduct && (
            <div
                className="products-component-modal-overlay"
                onClick={() => setShowModal(false)}
            >
                <div
                className="products-component-modal"
                onClick={(e) => e.stopPropagation()}
                >
                <button
                    className="products-component-modal-close"
                    onClick={() => setShowModal(false)}
                >
                    &times;
                </button>

                <div className="products-component-modal-image">
                    <img
                    src={selectedProduct.thumbnail}
                    alt={selectedProduct.name}
                    />
                </div>

                <div className="products-component-modal-content">
                    <h2>{selectedProduct.name}</h2>
                    <p className="products-componen-modalt-price">
                    Rp. {selectedProduct.price.toLocaleString("id-ID")}
                    </p>
                    <p className="products-component-modal-description">
                    {selectedProduct.description}
                    </p>

                    <div className="products-component-modal-actions">
                    <button
                        className="products-component-modal-add-cart"
                        onClick={() => {
                            dispatch(addToCart(selectedProduct));
                            setShowModal(false);
                        }}
                        >
                        Add to Cart
                    </button>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
    )
}

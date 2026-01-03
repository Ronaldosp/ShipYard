import "../styling/Products.scss";
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const navigate = useNavigate()
    return (
        <div className="products-component-container">
            <div className="products-component-filter-container">
                <div className="products-component-filter-wrapper">
                    <input
                        type="text"
                        placeholder="Search"
                        value=""
                    />
                </div>
            </div>
            <div className="products-component-listing-container">
                <div className="products-component-listing-wrapper">
                    <div className="products-component-listing-thumbnail">
                        <img/>
                    </div>
                    <div className="products-component-listing-name">

                    </div>
                    <div className="products-component-listing-price">

                    </div>
                    <div className="products-component-listing-description">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

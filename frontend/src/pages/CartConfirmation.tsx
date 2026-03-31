import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import type { CartItem } from "../types/CartItem";

function CartConfirmation() {
    const navigate = useNavigate();
    const {title, bookId, price} = useParams();
    const {addToCart} = useCart();

    const [quantity, setQuantity] = useState<number>(0);

    const handleAddToCart = () => {

        const newItem: CartItem = {
            bookId: Number(bookId),
            title: title || "No Book Found",
            quantity,
            price: Number(price)
        };
            addToCart(newItem);
            navigate('/cart')
        };
    


    return (
        <>
        <WelcomeBand />
        <h2>Add {title} to Cart?</h2>
        <p>Price: ${Number(price).toFixed(2)}</p>

        <div>
            <input type="number" 
            placeholder="Quantity" 
            value={quantity} 
            onChange={(x) => setQuantity(Number(x.target.value))}/> 
            <button onClick={handleAddToCart} disabled={quantity <= 0}>Add to Cart</button>
        </div>

        <button onClick={()=> navigate('/books')}>Go Back</button>
        </>
    );
}
export default CartConfirmation
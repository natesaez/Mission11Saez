import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import WelcomeBand from "../components/WelcomeBand";


function CartPage () {
    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
return (
    <div>
        <WelcomeBand />
        <h2>Your Cart</h2>
        <div>{cart.length === 0 ?
        (<p>Your cart is empty.</p>) :

            <table>
            <thead>
                <tr>
                    <th>Book</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>
            
            <tbody>
                {cart.map((item) => (
                    <tr key={item.bookId}>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                            <button onClick={() => removeFromCart(item.bookId)}>
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        

        }
        <h2>Total: ${total.toFixed(2)}</h2>
        </div>
        <button>Checkout</button>
        <button onClick={() => navigate('/books')}>Continue Browsing </button>
    </div>
);
}

export default CartPage;
import {action, Action, State, thunk, Thunk} from "easy-peasy";
import {generateUUID} from "../../utils/Helper";


export type CartType = {
    Cart: typeof CartModel
}

export type ProductPayload = {
    productId: number;
    productName: string,
    productModel: string,
    thumbnailUrl: string,
    price: number,
    quantity: number;
}

type CartAction<T> = Action<Cart, T>
type CartThunk<T> = Thunk<Cart, T>
type CartState = State<Cart>;

interface Cart {
    CartId: string;
    CartItems: Array<ProductPayload>;
    AddProduct: CartAction<ProductPayload>;
    RemoveProduct: CartAction<ProductPayload>;
    AddProductThunk: CartThunk<ProductPayload>;
    RemoveProductThunk: CartThunk<ProductPayload>;
    incrementProductQuantity: CartAction<ProductPayload>;
    decrementProductQuantity: CartAction<ProductPayload>;
    ProductQuantityThunk: CartThunk<ProductPayload>;
    SetDataBaseCart: CartAction<ProductPayload>;
    ClearCart: CartAction<ProductPayload>;
    DeleteCartThunk: CartThunk<ProductPayload>;


}

// To find the index of the product in the cart
const IsInCart = (cartItems: Cart["CartItems"], payload: ProductPayload) => {
    return cartItems.findIndex((v) => v.productId === payload.productId)
}


const CartModel: Cart = {
    CartId: " ",
    CartItems: [],

    AddProduct: action((state: CartState, payload) => {

        const index = IsInCart(state.CartItems, payload)

        if (index === -1) {
            payload.quantity = 1
            state.CartItems.push(payload);
        } else {
            state.CartItems[index].quantity = state.CartItems[index].quantity + 1
            state.CartItems = [...state.CartItems]
        }

        if (state.CartId === " ") {
            state.CartId = generateUUID();
        }
    }),

    RemoveProduct: action((state: CartState, payload) => {
        state.CartItems = state.CartItems.filter(item => item.productId != payload.productId)
    }),


    AddProductThunk: thunk(async (actions, payload) => {
    }),
    RemoveProductThunk: thunk(async (actions, payload) => {
    }),
    incrementProductQuantity: action((state: CartState, payload) => {
    }),

    decrementProductQuantity: action((state: CartState, payload) => {

        const index = IsInCart(state.CartItems, payload)

        if (state.CartItems[index].quantity > 1) {
            state.CartItems[index].quantity = state.CartItems[index].quantity - 1
            state.CartItems = [...state.CartItems]
        } else {
            state.CartItems = state.CartItems.filter(item => item.productId != payload.productId)
        }


    }),
    ProductQuantityThunk: thunk(async (actions, payload) => {
    }),
    SetDataBaseCart: action((state: CartState, payload) => {
    }),
    ClearCart: action((state: CartState, payload) => {
        state.CartItems = []
    }),
    DeleteCartThunk: thunk(async (actions, payload) => {
    }),

}


export default CartModel;
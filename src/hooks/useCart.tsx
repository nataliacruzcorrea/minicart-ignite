import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { Product, Stock } from "../types";
import { stringify } from "querystring";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("http://localhost:3333/products", {});
        const allProducts = response.data;
        localStorage.setItem("@RocketShoes:cart", JSON.stringify(allProducts));
        setCart(allProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchStock() {
      try {
        const response = await api.get("http://localhost:3333/stock", {});
        const allStock = response.data;
        localStorage.setItem("@RocketShoes:stock", JSON.stringify(allStock));
        setCart(allStock);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStock();
  }, []);

  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");
    const storagedStock = localStorage.getItem("@RocketShoes:stock");

    if (storagedCart && storagedStock) {
      try {
        JSON.parse(storagedCart);
        JSON.parse(storagedStock);
      } catch (error) {
        console.log(error);
      }
    }
    return [];
  });

  // useEffect(() => {
  //   api.get('http://localhost:3333/stock', {
  //   })
  //   .then(function (response) {
  //     const allStock = response.data;
  //     localStorage.setItem('@RocketShoes:stock', JSON.stringify(allStock))
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // })

  const addProduct = async (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}

import { Badge, Drawer, Grid, LinearProgress } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import React, { useState } from "react";
// import TextField from "./TextField";
import { useQuery } from "react-query";
import { StyledButton, Wrapper } from "./App.styles";
import Item from "./Item/Item";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  const result = await (
    await fetch("https://fakestoreapi.com/products")
  ).json();

  return result;
};

const App = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]): number => {
    console.log(items);

    return items.reduce(
      (total: number, item: CartItemType) => total + item.amount,
      0
    );
  };

  const handleAddToCart = (clickedItem: CartItemType) => {};
  const handleRemoveFromCart = () => {};

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <h3>Something went wrong!</h3>;
  }

  console.log(data);

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;

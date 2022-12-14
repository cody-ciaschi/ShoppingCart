const {Container, Row, Col} = ReactBootstrap;

const ShoppingCart = () => {
    const products = [
        {name: "Apples_:", country: "Italy", cost: 3, instock: 10},
        {name: "Oranges:", country: "Spain", cost: 4, instock: 3},
        {name: "Beans__:", country: "USA", cost: 2, instock: 5},
        {name: "Cabbage:", country: "USA", cost: 1, instock: 8},
    ];

    const [items, setItems] = React.useState(products);
    const [cart, setCart] = React.useState([]);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Products</h1>
                    <Products items={items} setItems={setItems} cart={cart} setCart={setCart} />
                </Col>
                <Col>
                    <h1>Cart</h1>
                    <Cart cartItems={cart} setItems={setItems} setCart={setCart} items={items} />
                </Col>
                <Col>
                    <h1>Checkout</h1>
                    <Checkout cartItems={cart} setCart={setCart} />
                </Col>
            </Row>
        </Container>
    );
};

ReactDOM.render(<ShoppingCart />, document.getElementById("root"));

const {Card, Accordion, Button} = ReactBootstrap;

function Cart(props) {
    const deleteCartItem = (delIndex) => {
        // this is the index in the cart not in the Product List

        let newCart = props.cartItems.filter((item, i) => delIndex != i);
        let target = props.cartItems.filter((item, index) => delIndex == index);
        let newItems = props.items.map((item, index) => {
            if (item.name == target[0].name) item.instock = item.instock + 1;
            return item;
        });
        props.setCart(newCart);
        props.setItems(newItems);
    };

    let data = props.cartItems;
    let cartList = data.map((item, index) => {
        return (
            <Card key={index}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={1 + index}>
                        {item.name}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse
                    onClick={() => deleteCartItem(index)}
                    eventKey={1 + index}
                >
                    <Card.Body>
                        $ {item.cost} from {item.country}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    });

    return (
        <Accordion defaultActiveKey="0">{cartList}</Accordion>
    );
}

const {Container, Button} = ReactBootstrap;

function Checkout(props) {

    function getTotal() {
        let total = props.cartItems.reduce((accum, current) => accum + current.cost, 0);
        return total;
    }

    let itemList = props.cartItems.map((item, index) => {
        return (
            <div key={index} index={index}>
                {item.name}
            </div>
        );
    });

    return (
        <>
            {itemList}
            <h2>Total: {getTotal()}</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.setCart([]);
            }}>
                <Button type="submit" variant="primary" size="large">Checkout</Button>
            </form>
        </>
    );
}

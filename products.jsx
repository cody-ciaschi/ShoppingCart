const {Container, Col, Row, Image, Button} = ReactBootstrap;

function Products(props) {
    let [query, setQuery] = React.useState("http://localhost:1337/api/products");

    const dataFetchReducer = (state, action) => {
        switch (action.type) {
            case "FETCH_INIT":
                return {
                    ...state,
                    isLoading: true,
                    isError: false,
                };
            case "FETCH_SUCCESS":
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    data: action.payload,
                };
            case "FETCH_FAILURE":
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                };
            default:
                throw new Error();
        }
    };

    const useDataApi = (initialUrl, initialData) => {
        const {useState, useEffect, useReducer} = React;
        const [url, setUrl] = useState(initialUrl);

        const [state, dispatch] = useReducer(dataFetchReducer, {
            isLoading: false,
            isError: false,
            data: initialData,
        });
        console.log(`useDataApi called`);
        useEffect(() => {
            console.log("useEffect Called");
            let didCancel = false;
            const fetchData = async () => {
                dispatch({type: "FETCH_INIT"});
                try {
                    const result = await axios(url);
                    console.log("FETCH FROM URl");
                    if (!didCancel) {
                        dispatch({type: "FETCH_SUCCESS", payload: result.data});
                    }
                } catch (error) {
                    if (!didCancel) {
                        dispatch({type: "FETCH_FAILURE"});
                    }
                }
            };
            fetchData();
            return () => {
                didCancel = true;
            };
        }, [url]);
        return [state, setUrl];
    };

    const [{data, isLoading, isError}, doFetch] = useDataApi(
        "http://localhost:1337/api/products",
        {
            data: [],
        }
    );

    const restockProducts = (url) => {
        doFetch(url);
        let newItems = data.data.map((item) => {
            let {name, country, cost, instock} = item.attributes;
            return {name, country, cost, instock};
        });

        for (let item of newItems) {
            for (let oldItem of props.items) {
                if (item.name === oldItem.name) {
                    item.instock += oldItem.instock;
                }
            }
        }
        props.setItems([...newItems]);
    };

    const addToCart = (e) => {
        let name = e.target.name;
        let item = props.items.filter((item) => item.name == name);
        if (item[0].instock == 0) return;
        item[0].instock = item[0].instock - 1;
        props.setCart([...props.cart, ...item]);
    };

    let list = props.items.map((item, index) => {
        let n = index + 1049;
        // let uhit = "http://picsum.photos/" + n;
        // note, source.unsplash is used here because it loads images faster than picsum.photos
        // it should functionally be the same as picsum.photos which is shown in the videos
        let uhit = "https://source.unsplash.com/random/800x800/?img=" + n;

        return (
            <>
                <Row>
                    <li key={index}>
                        <Image src={uhit} width={70} roundedCircle alt={`img-${n}`}></Image>
                        <Button name={item.name} variant="primary" size="large" onClick={addToCart}>
                            {item.name}:${item.cost}-Stock={item.instock}
                        </Button>
                    </li>
                </Row>
            </>
        );
    });

    return (
        <Container>
            <Col>
                <ul style={{listStyleType: "none"}}>{list}</ul>
                <br />
                <br />
                <Row>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        restockProducts(query);
                        console.log(`Restock called on ${query}`);
                    }}
                    >
                        <input
                            type="text"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />

                        <Button type="submit">Restock Products</Button>
                    </form>
                </Row>
            </Col>
        </Container>
    );
};

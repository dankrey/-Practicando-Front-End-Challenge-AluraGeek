const productList = () => {
    return fetch("http://localhost:3000/products")
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .catch((err) => {
            console.error('Error fetching products:', err);
            throw err;
        });
}

//Funcion de id secuancial
const getSequentialId = () => {
    return fetch("http://localhost:3000/products")
        .then((res) => {
            if (!res.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return res.json();
        })
        .then((productList) => {
            const maxId = productList.reduce((max, product) => Math.max(max, parseInt(product.id)), 0);
            return maxId + 1;
        })
        .catch((err) => {
            console.error('Error al obtener ID secuencial:', err);
            throw err;
        });
}





const sendProduct = (name, price, image) => {
    return getSequentialId()
        .then((id) => {
            return fetch("http://localhost:3000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id.toString(),
                    name,
                    price,
                    image,
                })
            });
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .catch((err) => {
            console.error('Error sending product:', err);
            throw err;
        });
}

const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));{
    };
}

export const servicesProducts = {
    productList, 
    sendProduct,
    deleteProduct
};
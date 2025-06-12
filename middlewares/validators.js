export function validateAuthBody(req, res, next) {
    const { username, password } = req.body;
    if(username && password) {
        next();
    } else {
        next({
            status : 400,
            message : 'BOTH username AND password are required'
        });
    }
}

export function validateCartBody(req, res, next) {
    const { prodId, qty } = req.body;
    if(prodId && qty) {
        next();
    } else {
        next({
            status : 400,
            message : 'BOTH prodId AND qty are required'
        });
    }
}

export function validateOrderBody(req, res, next) {
    const { cartId } = req.body;
    if(cartId) {
        next();
    } else {
        next({
            status : 400,
            message : 'cartId is required'
        });
    }
}

export function validateProductBody(req, res, next) {
    const { title, desc, price } = req.body;
    if(title && desc && price) {
        next();
    } else {
        next({
            status : 400,
            message : 'Title, desc and price is required'
        });
    }
}

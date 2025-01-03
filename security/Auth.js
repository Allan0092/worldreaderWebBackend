const jwt = require("jsonwebtoken")

const SECRET_KEY = "634268b2b7358e3511abb6d9c64f4c1d8379d92e2e490d3a3d3e67dbc0927b80";

function authenticateToken(req, res, next){
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token){
        return res.status(401).send("Access denied: No token provided");
    }
    try{
        const verified = jwt.verify(token, SECRET_KEY)
        req.user=verified;
        next()
    } catch (e){
        return res.status(400).send("Invalid token");
    }
}

function authorizeRole(role){
    return (req, res, next) => {
        if (req.user.role!==role){
            return res.status(403).send("Access Denied: Insufficient Permissions");
        }
        next();
    }
}

module.exports = {authenticateToken, authorizeRole, SECRET_KEY}
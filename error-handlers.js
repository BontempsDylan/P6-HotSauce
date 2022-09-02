
const sendServerErrorResponse = (res) => {
    res.status(500).json({message: "erreur serveur, veuillez réessayer"});
};
const sendUnauthorizedResponse = (res) => {
    res.status(403).json({message: "403: unauthorized request"});
};

module.exports = {
    sendServerErrorResponse,
    sendUnauthorizedResponse
};
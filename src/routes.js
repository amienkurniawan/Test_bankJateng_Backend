const {
  deleteCardsByIdHandler,
  addCardHandler,
  getAllCardsHandler,
  getCardsByIdHandler,
  // editCardByIdHandler,
  editPinByIdHandler,
  getTransactionListCardsHandler,
  getTransactionDetail,
} = require("./handler");

GET / login
GET / logout
// POST /addCard
// GET /getCardList
// GET /getCardDetail/:id
// POST /setPIN/:id
// POST / deleteCard
// GET / getTransactionList
// GET / getTransactionDetail /: id
POST / inquiryTransaction
POST / postingTransaction


const routes = [
  {
    method: 'POST',
    path: '/addCard',
    handler: addCardHandler
  },
  {
    method: 'GET',
    path: '/getCardList',
    handler: getAllCardsHandler,
  },
  {
    method: 'GET',
    path: '/getCardDetail/{id}',
    handler: getCardsByIdHandler,
  },
  {
    method: 'POST',
    path: '/setPIN/{id}',
    handler: editPinByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/deleteCard/{id}',
    handler: deleteCardsByIdHandler,
  },
  {
    method: 'GET',
    path: '/getTransactionList',
    handler: getTransactionListCardsHandler,
  },
  {
    method: 'GET',
    path: '/getTransactionDetail/{id}',
    handler: getTransactionDetail,
  },
];

module.exports = routes;
const { nanoid } = require("nanoid");
const cards = require("./cards");
const transactions = require("./transactions");

const addCardHandler = (request, h) => {
  const { nama, nomerkartu } = request.payload;
  const id = nanoid(16);
  const pin = '123456'; // default pin
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;


  if (!nomerkartu) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan card. Mohon isi nomor card',
    });
    response.code(400);
    return response;
  }

  if (!nama) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan card. Mohon isi nama pengguna',
    });
    response.code(400);
    return response;
  }


  const newCard = {
    id, nama, nomerkartu, pin, insertedAt, updatedAt
  };

  cards.push(newCard);

  const isSuccess = cards.filter((card) => card.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'kartu berhasil ditambahkan',
      data: {
        cardId: id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'Failed',
    message: 'kartu gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllCardsHandler = () => {

  const dataCards = cards.map(item => {
    return { id: item.id, nama: item.nama, nomerkartu: item.nomerkartu }
  });

  return {
    status: 'success',
    data: {
      cards: dataCards,
    },
  };


};

const getCardsByIdHandler = (request, h) => {
  const { id } = request.params;

  const card = cards.filter((n) => n.id === id)[0];

  if (card !== undefined) {
    return {
      status: 'success',
      data: {
        card
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'card tidak ditemukan',
  });
  response.code(404);
  return response;

};

const editCardByIdHandler = (request, h) => {
  const { id } = request.params;

  const { nama, nomerkartu } = request.payload;

  const updatedAt = new Date().toISOString();


  if (!nama) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama pengguna',
    });
    response.code(400);
    return response;
  }


  const index = cards.findIndex((card) => card.id === id);

  if (index !== -1) {
    cards[index] = {
      ...cards[index],
      nama, nomerkartu, updatedAt
    };

    const response = h.response({
      status: 'success',
      message: 'kartu berhasil diperbarui',
    });

    response.code(200)
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui kartu. Id tidak ditemukan',
  });
  response.code(404);
  return response;

};

const editPinByIdHandler = (request, h) => {
  const { id } = request.params;

  const { pin } = request.payload;

  const updatedAt = new Date().toISOString();


  if (!pin) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui pin kartu. Mohon isi nama pengguna',
    });
    response.code(400);
    return response;
  }


  const index = cards.findIndex((card) => card.id === id);

  if (index !== -1) {
    cards[index] = {
      ...cards[index],
      pin, updatedAt
    };

    const response = h.response({
      status: 'success',
      message: 'pin kartu berhasil diperbarui',
    });

    response.code(200)
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui kartu. Id tidak ditemukan',
  });
  response.code(404);
  return response;

};

const deleteCardsByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = cards.findIndex((card) => card.id === id);

  if (index !== -1) {
    cards.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'kartu berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Card gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const getTransactionListCardsHandler = () => {

  const dataTransactions = transactions.map(item => {
    return { id: item.id, idkartu: item.idKartu, jumlahTransaksi: item.jumlahTransaksi }
  });

  return {
    status: 'success',
    data: {
      dataTransactions
    },
  };


};

const getTransactionDetail = (request, h) => {
  const { id } = request.params;

  const transaction = transactions.filter((n) => n.id === id)[0];

  if (transaction !== undefined) {
    return {
      status: 'success',
      data: {
        transaction
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'transaksi tidak ditemukan',
  });
  response.code(404);
  return response;

};


module.exports = {
  addCardHandler,
  getAllCardsHandler,
  getCardsByIdHandler,
  deleteCardsByIdHandler,
  editCardByIdHandler,
  editPinByIdHandler,
  getTransactionListCardsHandler,
  getTransactionDetail
}
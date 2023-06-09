const { nanoid } = require("nanoid");
const cards = require("./cards");
const transactions = require("./transactions");
const inquery = require("./inquery");


const addCardHandler = (request, h) => {
  const { nama, nomerkartu, expiredDate } = request.payload;
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

  if (!expiredDate) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan card. Mohon isi expired Date',
    });
    response.code(400);
    return response;
  }


  const newCard = {
    id, nama, nomerkartu, pin, expiredDate, insertedAt, updatedAt
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
// getCardList
const getAllCardsHandler = () => {

  const dataCards = cards.map(item => {
    return { id: item.id, nama: item.nama, nomerkartu: item.nomerkartu, expiredDate: item.expiredDate }
  });

  return {
    status: 'success',
    data: {
      cards: dataCards,
    },
  };


};
// getCardDetail/{id}
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
    message: 'kartu tidak ditemukan',
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
// /setPIN/{id}
const editPinByIdHandler = (request, h) => {
  const { id } = request.params;

  const { pin } = request.payload;

  const updatedAt = new Date().toISOString();

  if (!pin) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui pin kartu. Mohon pin pengguna tidak boleh kosong',
    });
    response.code(400);
    return response;
  }

  if (pin.length !== 6) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui pin kartu. Mohon pin kartu harus 6 digit',
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

const postingTransaction = (request, h) => {
  const { idkartu, jumlahtransaksi } = request.payload;
  const id = nanoid(16);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const tanggalTransaction = insertedAt;

  const card = cards.filter((n) => n.id === idkartu)[0];

  if (card === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'card tidak ditemukan',
    });
    response.code(404);
    return response;
  }


  if (!jumlahtransaksi) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan transaksi. Mohon isi jumlah transaksi',
    });
    response.code(400);
    return response;
  }

  let idCard = idkartu

  const newTransaction = {
    id, idCard, jumlahtransaksi, tanggalTransaction, insertedAt, updatedAt
  };

  inquery.push(newCard);

  const isSuccess = inquery.filter((transaction) => transaction.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'transaction berhasil ditambahkan',
      data: {
        cardId: id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'Failed',
    message: 'transaction gagal ditambahkan',
  });
  response.code(500);
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
  getTransactionDetail,
  // inquiryTransaction,
  postingTransaction
}

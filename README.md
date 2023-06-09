# TEST BANK JATENG AMIEN KURNIAWAN
## untuk menjalankan nya ketikan perintah 
### npm install untuk menginstall node modules 

## ketikan perintah 
### npm start-dev untuk tahap development
### server node berjalan di port:9000

## API :
## POST /addCard
### body data:  { nama, nomerkartu, expiredDate }

### response : 400
### status : fail
### message : Gagal menambahkan card. Mohon isi nomor card
### jika nomor kartu tidak di masukkan

### response : 400
### status : fail
### message : Gagal menambahkan card. Mohon isi nama pengguna
### jika nama pengguna kartu tidak di masukkan

### response : 400
### status : fail
### message : Gagal menambahkan card. Mohon isi expired Date
### jika expired date kartu tidak di masukkan

### response : 201
### status : success
### message : kartu berhasil ditambahkan
### jika kartu berhasil dibuat 


## API :
##  GET /getCardLists
### response { id, nama, nomerkartu }
 
  GET /getCardDetail/:id
  POST /setPIN/:id
  POST / deleteCard
  GET / getTransactionList
  GET / getTransactionDetail /: id
  POST /inquiryTransaction
  POST /postingTransaction
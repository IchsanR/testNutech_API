CREATE DATABASE tugasnutech;

CREATE TABLE users(
  id_user UUID PRIMARY KEY NOT NULL,
  name VARCHAR(100),
  username VARCHAR(100),
  password TEXT
);

CREATE TABLE barang(
  id_barang UUID PRIMARY KEY NOT NULL,
  iduser UUID REFERENCES users(id_user) ON DELETE CASCADE,
  nama_barang TEXT UNIQUE,
  foto_barang TEXT,
  harga_barang INTEGER,
  harga_jual INTEGER,
  stok INTEGER
);

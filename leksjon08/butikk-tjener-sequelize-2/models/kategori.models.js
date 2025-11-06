function lagKategoriModell(sequelize, Sequelize) {
    const Kategori = sequelize.define("Kategori", {
      katNr: {
        type: Sequelize.SMALLINT,
        primaryKey: true
      },
      navn: {
        type: Sequelize.STRING(50)
      }    
    });
  
    return Kategori;
  };

export { lagKategoriModell };

/*
CREATE TABLE Kategori
(
  KatNr      SMALLINT,
  Navn       VARCHAR(50),
  CONSTRAINT KategoriPN PRIMARY KEY (KatNr)
);
*/
function lagVareModell(sequelize, Sequelize) {
    const Vare = sequelize.define("Vare", {
      vNr: {
        type: Sequelize.STRING(5),
        primaryKey: true
      },
      betegnelse: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      pris: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
      },
      katNr: {
        type: Sequelize.SMALLINT
      },
      antall: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hylle: {
        type: Sequelize.STRING(3)
      },
      slettet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bildefil: {
        type: Sequelize.STRING(100),
        allowNull: false
      },      
    });
  
    return Vare;
  };

export { lagVareModell };

/*
CREATE TABLE Vare
(
  VNr        CHAR(5),
  Betegnelse VARCHAR(100) NOT NULL,
  Pris       DECIMAL(8,2) NOT NULL,
  KatNr      SMALLINT,
  Antall     INTEGER NOT NULL,
  Hylle      CHAR(3),
  Slettet    BOOLEAN DEFAULT FALSE, 
  Bildefil   VARCHAR(100) NOT NULL,
  CONSTRAINT VarePN PRIMARY KEY (VNr),
  CONSTRAINT VareKategoriFN FOREIGN KEY (KatNr) REFERENCES Kategori (KatNr)
)
*/
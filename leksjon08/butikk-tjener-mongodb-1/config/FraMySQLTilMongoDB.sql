-- Tilpassing av Hobbyhuset til MongoDB

-- Hjelpeskript for å tilpasse standarddatabasen for Hobbyhuset til bruk i nettbutikken.
-- Standardskriptet ligger her: https://dbsys.info/Databasesystemer/1_Datasett/sqlskript.html

-- Deretter: Fra MySQL til MongoDB
-- Etter at dette skriptet er kjørt, så kan man eksportere hver tabell til JSON-format og
-- importere til en "collection" i MongoDB (hver rad blir da til et "document"). Det er ikke
-- alltid man vil representere en relasjonsdatabase på denne enkle måten, f.eks. kan det
-- være aktuelt å samle flere tabeller i samme collection (Ordre og Ordelinje?).

-- NB! Det er strengt tatt kun nødvendig å importere Vare-tabellen, og en kopi av denne ligger
-- allerede på fil config/varer.json.


-- Legger til to nye kolonner i Kunde:
ALTER TABLE Kunde 
  ADD EPost   VARCHAR(100) NOT NULL AFTER Etternavn, 
  ADD Passord VARCHAR(100) NOT NULL AFTER EPost;
  

-- Generer "tilfeldige" verdier i de to nye kolonnene.
-- EPost settes lik de to første bokstavene i fornavn og etternavn
-- før en av tre domener skjøtes på (tilfeldig). Passord brukes først
-- til å lage e-post, men blir deretter bare satt til fornavnet skrevet
-- baklengs (et meget dårlig passord, altså, men behagelig for testing).

UPDATE Kunde SET 
  EPost = LOWER(CONCAT(LEFT(Fornavn, 2), LEFT(Etternavn, 2))),
  Passord = RAND();
  
UPDATE Kunde SET
  EPost = CONCAT(EPost, IF(Passord<'0.3','@abc.no',IF(Passord<'0.7','@xyz.com','@hh.no')));
  
UPDATE Kunde SET
  Passord = LOWER(REVERSE(Fornavn));
  

-- Legger til en kolonne i Vare som sier om en vare er slettet eller ikke.
-- TODO Alle spørringer mot Vare-tabellen, der meningen er å se på nåværende varelager,
-- må filtrere bort varer som er merket som slettet.
ALTER TABLE Vare 
  ADD Slettet BOOLEAN DEFAULT FALSE; 
  
  
-- Legger til bildekolonne i Vare.
ALTER TABLE Vare 
  ADD Bildefil VARCHAR(100) NOT NULL AFTER Slettet; 
  
-- Lar bare alle varene få samme dummy-bilde i første omgang.
UPDATE Vare
  SET Bildefil = 'steve-johnson-B2_zWEdpLlo-unsplash.jpg';
  

-- Gjør Ordre.OrdreNr autonummerert.
ALTER TABLE Ordrelinje DROP FOREIGN KEY OrdrelinjeOrdreFN;
ALTER TABLE Ordre CHANGE OrdreNr OrdreNr INT(11) NOT NULL AUTO_INCREMENT; 
ALTER TABLE Ordrelinje ADD CONSTRAINT OrdrelinjeOrdreFN 
  FOREIGN KEY (OrdreNr) REFERENCES Ordre(OrdreNr) ON DELETE RESTRICT ON UPDATE RESTRICT; 
  
-- Hjelpeskript for å tilpasse standarddatabasen for Hobbyhuset til bruk i nettbutikken.
-- Standardskriptet ligger her: https://dbsys.info/Databasesystemer/1_Datasett

-- NB! Denne filen er ikke en del av selve webapplikasjonen og bør flyttes ut av "webtreet".


-- Legger til to nye kolonner i Kunde:
ALTER TABLE Kunde 
  ADD EPost   VARCHAR(100) NOT NULL AFTER Etternavn, 
  ADD Passord VARCHAR(100) NOT NULL AFTER EPost;
  

-- Generer "tilfeldige" verdier i de to nye kolonnene. EPost settes lik de to første bokstavene
-- i fornavn og etternavn før en av tre domener skjøtes på (tilfeldig). Passord brukes først
-- til å lage e-post, men blir deretter bare satt til fornavnet skrevet baklengs
-- (et meget dårlig passord, altså, men behagelig for ad hoc testing).

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
ALTER TABLE Ordre CHANGE OrdreNr OrdreNr INTEGER NOT NULL AUTO_INCREMENT; 
ALTER TABLE Ordrelinje ADD CONSTRAINT OrdrelinjeOrdreFN 
  FOREIGN KEY (OrdreNr) REFERENCES Ordre(OrdreNr) ON DELETE RESTRICT ON UPDATE RESTRICT; 
  
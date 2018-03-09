import {Game} from './model/game.model';
import {Equipment} from './model/equipment.model';

export const FFBE_ENGLISH_TABLE_INDEX = 0;
export const FFBE_FRENCH_TABLE_INDEX = 3;
export const FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX = 1;
export const FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX = 2;
export const FFBE_CHARACTER_MAX_LEVEL = [0, 15, 30, 40, 60, 80, 100];
export const FFBE_GAMES = [
  new Game(10001, 1, 'Final Fantasy I'),
  new Game(10002, 2, 'Final Fantasy II'),
  new Game(10003, 3, 'Final Fantasy III'),
  new Game(10004, 4, 'Final Fantasy IV'),
  new Game(10005, 5, 'Final Fantasy V'),
  new Game(10006, 6, 'Final Fantasy VI'),
  new Game(10007, 7, 'Final Fantasy VII'),
  new Game(10008, 8, 'Final Fantasy VIII'),
  new Game(10009, 9, 'Final Fantasy IX'),
  new Game(10010, 10, 'Final Fantasy X'),
  new Game(10011, 12, 'Final Fantasy XI'),
  new Game(10012, 13, 'Final Fantasy XII'),
  new Game(10013, 14, 'Final Fantasy XIII'),
  new Game(10014, 17, 'Final Fantasy XIV'),
  new Game(10015, 18, 'Final Fantasy XV'),
  new Game(11003, 20, 'Final Fantasy Type-0'),
  new Game(20004, 21, 'Crystal Defenders'),
  new Game(11002, 23, 'Final Fantasy Tactics'),
  new Game(20003, 24, 'Brave Frontier'),
  new Game(20005, 25, 'Secret of Mana'),
  new Game(20010, 26, 'NieR:Automata'),
  new Game(90002, 27, 'King\'s Knight'),
  new Game(90001, 29, 'Collaborations spéciales'), // Ariana Grande
  new Game(90003, 29, 'Collaborations spéciales'), // TOMB RAIDER
  new Game(11001, 30, 'Final Fantasy Brave Exvius'),
];
export const FFBE_EQUIPMENTS = [
  new Equipment(1, 16, 'Dagues', 'dagues.png'),
  new Equipment(2, 1, 'Épées courtes', 'epees-courtes.png'),
  new Equipment(3, 27, 'Épées longues', 'epees-longues.png'),
  new Equipment(4, 28, 'Katanas', 'katanas.png'),
  new Equipment(5, 17, 'Bâtons', 'batons.png'),
  new Equipment(6, 2, 'Sceptres', 'sceptres.png'),
  new Equipment(7, 6, 'Arcs', 'arcs.png'),
  new Equipment(8, 29, 'Haches', 'haches.png'),
  new Equipment(9, 13, 'Marteaux', 'marteaux.png'),
  new Equipment(10, 32, 'Lances', 'lances.png'),
  new Equipment(11, 33, 'Harpes', 'harpes.png'),
  new Equipment(12, 34, 'Fouets', 'fouets.png'),
  new Equipment(13, 24, 'Armes de jet', 'armes-de-jet.png'),
  new Equipment(14, 15, 'Pistolets', 'pistolets.png'),
  new Equipment(15, 26, 'Masses', 'masses.png'),
  new Equipment(16, 18, 'Griffes', 'griffes.png'),
  new Equipment(30, 9, 'Boucliers légers', 'boucliers-legers.png'),
  new Equipment(31, 10, 'Boucliers lourds', 'boucliers-lourds.png'),
  new Equipment(40, 12, 'Chapeaux', 'chapeaux.png'),
  new Equipment(41, 11, 'Casques', 'casques.png'),
  new Equipment(50, 35, 'Vêtements', 'vetements.png'),
  new Equipment(51, 8, 'Armures légères', 'armures-legeres.png'),
  new Equipment(52, 7, 'Armures lourdes', 'armures-lourdes.png'),
  new Equipment(53, 14, 'Robes', 'robes.png'),
  new Equipment(60, 25, 'Accessoires', 'accessoires.png'),
];

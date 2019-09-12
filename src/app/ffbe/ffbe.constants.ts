import {Game} from './model/game.model';
import {CategorieObjet} from './model/objet/categorie-objet.model';
import {MonsterType} from './model/monster-type.model';

export const FFBE_ENGLISH_TABLE_INDEX = 0;
export const FFBE_FRENCH_TABLE_INDEX = 3;
export const FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX = 1;
export const FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX = 2;
export const FFBE_CHARACTER_MAX_LEVEL = [0, 15, 30, 40, 60, 80, 100, 120];
export const FFBE_CHARACTER_GUMI_ID_LENGTH = 9;
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
  new Game(20006, 28, 'Dragon Quest'),
  new Game(90004, 29, 'Just Cause'),
  new Game(20017, 30, 'Star Océan'),
  new Game(90005, 31, 'Deus Ex'),
  new Game(20022, 32, 'Valkyrie Profile'),
  new Game(20028, 33, 'Kingdom Hearts'),
  new Game(20024, 34, 'Xenogears'),
  new Game(20025, 35, 'Octopath Traveler'),
  new Game(90001, 99, 'Collaborations spéciales'), // Ariana Grande
  new Game(90003, 99, 'Collaborations spéciales'), // TOMB RAIDER
  new Game(11001, 100, 'Final Fantasy Brave Exvius'),
];
export const FFBE_CATEGORIES_OBJETS = [
  new CategorieObjet(1, 16, 'Dagues', 'dague', 'dagues.png'),
  new CategorieObjet(2, 1, 'Épées courtes', 'épée courte', 'epees-courtes.png'),
  new CategorieObjet(3, 27, 'Épées longues', 'épée longue', 'epees-longues.png'),
  new CategorieObjet(4, 28, 'Katanas', 'katana', 'katanas.png'),
  new CategorieObjet(5, 17, 'Bâtons', 'bâton', 'batons.png'),
  new CategorieObjet(6, 2, 'Sceptres', 'sceptre', 'sceptres.png'),
  new CategorieObjet(7, 6, 'Arcs', 'arc', 'arcs.png'),
  new CategorieObjet(8, 29, 'Haches', 'hache', 'haches.png'),
  new CategorieObjet(9, 13, 'Marteaux', 'marteau', 'marteaux.png'),
  new CategorieObjet(10, 32, 'Lances', 'lance', 'lances.png'),
  new CategorieObjet(11, 33, 'Harpes', 'harpe', 'harpes.png'),
  new CategorieObjet(12, 34, 'Fouets', 'fouet', 'fouets.png'),
  new CategorieObjet(13, 24, 'Armes de jet', 'arme de jet', 'armes-de-jet.png'),
  new CategorieObjet(14, 15, 'Pistolets', 'pistolet', 'pistolets.png'),
  new CategorieObjet(15, 26, 'Masses', 'masse', 'masses.png'),
  new CategorieObjet(16, 18, 'Griffes', 'griffe', 'griffes.png'),
  new CategorieObjet(30, 9, 'Boucliers légers', 'bouclier léger', 'boucliers-legers.png'),
  new CategorieObjet(31, 10, 'Boucliers lourds', 'bouclier lourd', 'boucliers-lourds.png'),
  new CategorieObjet(40, 12, 'Chapeaux', 'chapeau', 'chapeaux.png'),
  new CategorieObjet(41, 11, 'Casques', 'casque', 'casques.png'),
  new CategorieObjet(50, 35, 'Vêtements', 'vêtement', 'vetements.png'),
  new CategorieObjet(51, 8, 'Armures légères', 'armure légère', 'armures-legeres.png'),
  new CategorieObjet(52, 7, 'Armures lourdes', 'armure lourde', 'armures-lourdes.png'),
  new CategorieObjet(53, 14, 'Robes', 'robe', 'robes.png'),
  new CategorieObjet(60, 25, 'Accessoires', 'accessoire', 'accessoires.png'),
  new CategorieObjet(null, 57, 'Aptitudes', 'aptitude', null),

  new CategorieObjet(null, 5, 'Outils', 'outil', null),
  new CategorieObjet(null, 61, 'Outils d\'événements', 'outil d\'événement', null),
  new CategorieObjet(null, 60, 'Clés', 'clé', null),
  new CategorieObjet(null, 4, 'Matériaux', 'matériau', null),
  new CategorieObjet(null, 79, 'Prismes d\'éveil', 'prisme d\'éveil', null),
  new CategorieObjet(null, 59, 'Matériaux d\'événements', 'matériaux d\'événement', null),
  new CategorieObjet(null, 36, 'Cristaux', 'cristal', null),
  new CategorieObjet(null, 58, 'Divers', 'divers', null)
];
export const FFBE_MONSTER_TYPES = [
  new MonsterType(1, 'bête', 'bêtes'),
  new MonsterType(2, 'oiseau', 'oiseaux'),
  new MonsterType(3, 'aquatique', 'aquatiques'),
  new MonsterType(4, 'démon', 'démons'),
  new MonsterType(5, 'humain', 'humains'),
  new MonsterType(6, 'machine', 'machines'),
  new MonsterType(7, 'dragon', 'dragons'),
  new MonsterType(8, 'esprit', 'esprits'),
  new MonsterType(9, 'insecte', 'insectes'),
  new MonsterType(10, 'pierre', 'pierres'),
  new MonsterType(11, 'plante', 'plantes'),
  new MonsterType(12, 'mort-vivant', 'morts-vivants'),
];

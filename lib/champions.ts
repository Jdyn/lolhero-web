export interface Champion {
  img: string;
  name: string;
  title: string;
  position?: string;
}

const champions: Champion[] = [
  {
    title: 'the Darkin Blade',
    name: 'Aatrox',
    img: '/static/images/champions/Aatrox.png'
  },
  {
    title: 'the Nine-Tailed Fox',
    name: 'Ahri',
    img: '/static/images/champions/Ahri.png'
  },
  {
    title: 'the Rogue Assassin',
    name: 'Akali',
    img: '/static/images/champions/Akali.png'
  },
  {
    title: 'the Minotaur',
    name: 'Alistar',
    img: '/static/images/champions/Alistar.png'
  },
  {
    title: 'the Sad Mummy',
    name: 'Amumu',
    img: '/static/images/champions/Amumu.png'
  },
  {
    title: 'the Cryophoenix',
    name: 'Anivia',
    img: '/static/images/champions/Anivia.png'
  },
  {
    title: 'the Dark Child',
    name: 'Annie',
    img: '/static/images/champions/Annie.png'
  },
  {
    title: 'the Weapon of the Faithful',
    name: 'Aphelios',
    img: '/static/images/champions/Aphelios.png'
  },
  {
    title: 'the Frost Archer',
    name: 'Ashe',
    img: '/static/images/champions/Ashe.png'
  },
  {
    title: 'The Star Forger',
    name: 'Aurelion Sol',
    img: '/static/images/champions/AurelionSol.png'
  },
  {
    title: 'the Emperor of the Sands',
    name: 'Azir',
    img: '/static/images/champions/Azir.png'
  },
  {
    title: 'the Wandering Caretaker',
    name: 'Bard',
    img: '/static/images/champions/Bard.png'
  },
  {
    title: 'the Great Steam Golem',
    name: 'Blitzcrank',
    img: '/static/images/champions/Blitzcrank.png'
  },
  {
    title: 'the Burning Vengeance',
    name: 'Brand',
    img: '/static/images/champions/Brand.png'
  },
  {
    title: 'the Heart of the Freljord',
    name: 'Braum',
    img: '/static/images/champions/Braum.png'
  },
  {
    title: 'the Sheriff of Piltover',
    name: 'Caitlyn',
    img: '/static/images/champions/Caitlyn.png'
  },
  {
    title: 'the Steel Shadow',
    name: 'Camille',
    img: '/static/images/champions/Camille.png'
  },
  {
    title: "the Serpent's Embrace",
    name: 'Cassiopeia',
    img: '/static/images/champions/Cassiopeia.png'
  },
  {
    title: 'the Terror of the Void',
    name: "Cho'Gath",
    img: '/static/images/champions/Chogath.png'
  },
  {
    title: 'the Daring Bombardier',
    name: 'Corki',
    img: '/static/images/champions/Corki.png'
  },
  {
    title: 'the Hand of Noxus',
    name: 'Darius',
    img: '/static/images/champions/Darius.png'
  },
  {
    title: 'Scorn of the Moon',
    name: 'Diana',
    img: '/static/images/champions/Diana.png'
  },
  {
    title: 'the Glorious Executioner',
    name: 'Draven',
    img: '/static/images/champions/Draven.png'
  },
  {
    title: 'the Madman of Zaun',
    name: 'Dr. Mundo',
    img: '/static/images/champions/DrMundo.png'
  },
  {
    title: 'the Boy Who Shattered Time',
    name: 'Ekko',
    img: '/static/images/champions/Ekko.png'
  },
  {
    title: 'the Spider Queen',
    name: 'Elise',
    img: '/static/images/champions/Elise.png'
  },
  {
    title: "Agony's Embrace",
    name: 'Evelynn',
    img: '/static/images/champions/Evelynn.png'
  },
  {
    title: 'the Prodigal Explorer',
    name: 'Ezreal',
    img: '/static/images/champions/Ezreal.png'
  },
  {
    title: 'the Harbinger of Doom',
    name: 'Fiddlesticks',
    img: '/static/images/champions/Fiddlesticks.png'
  },
  {
    title: 'the Grand Duelist',
    name: 'Fiora',
    img: '/static/images/champions/Fiora.png'
  },
  {
    title: 'the Tidal Trickster',
    name: 'Fizz',
    img: '/static/images/champions/Fizz.png'
  },
  {
    title: 'the Colossus',
    name: 'Galio',
    img: '/static/images/champions/Galio.png'
  },
  {
    title: 'the Saltwater Scourge',
    name: 'Gangplank',
    img: '/static/images/champions/Gangplank.png'
  },
  {
    title: 'The Might of Demacia',
    name: 'Garen',
    img: '/static/images/champions/Garen.png'
  },
  {
    title: 'the Missing Link',
    name: 'Gnar',
    img: '/static/images/champions/Gnar.png'
  },
  {
    title: 'the Rabble Rouser',
    name: 'Gragas',
    img: '/static/images/champions/Gragas.png'
  },
  {
    title: 'the Outlaw',
    name: 'Graves',
    img: '/static/images/champions/Graves.png'
  },
  {
    title: 'the Shadow of War',
    name: 'Hecarim',
    img: '/static/images/champions/Hecarim.png'
  },
  {
    title: 'the Revered Inventor',
    name: 'Heimerdinger',
    img: '/static/images/champions/Heimerdinger.png'
  },
  {
    title: 'the Kraken Priestess',
    name: 'Illaoi',
    img: '/static/images/champions/Illaoi.png'
  },
  {
    title: 'the Blade Dancer',
    name: 'Irelia',
    img: '/static/images/champions/Irelia.png'
  },
  {
    title: 'the Green Father',
    name: 'Ivern',
    img: '/static/images/champions/Ivern.png'
  },
  {
    title: "the Storm's Fury",
    name: 'Janna',
    img: '/static/images/champions/Janna.png'
  },
  {
    title: 'the Exemplar of Demacia',
    name: 'Jarvan IV',
    img: '/static/images/champions/JarvanIV.png'
  },
  {
    title: 'Grandmaster at Arms',
    name: 'Jax',
    img: '/static/images/champions/Jax.png'
  },
  {
    title: 'the Defender of Tomorrow',
    name: 'Jayce',
    img: '/static/images/champions/Jayce.png'
  },
  {
    title: 'the Virtuoso',
    name: 'Jhin',
    img: '/static/images/champions/Jhin.png'
  },
  {
    title: 'the Loose Cannon',
    name: 'Jinx',
    img: '/static/images/champions/Jinx.png'
  },
  {
    title: 'Daughter of the Void',
    name: "Kai'Sa",
    img: '/static/images/champions/Kaisa.png'
  },
  {
    title: 'the Spear of Vengeance',
    name: 'Kalista',
    img: '/static/images/champions/Kalista.png'
  },
  {
    title: 'the Enlightened One',
    name: 'Karma',
    img: '/static/images/champions/Karma.png'
  },
  {
    title: 'the Deathsinger',
    name: 'Karthus',
    img: '/static/images/champions/Karthus.png'
  },
  {
    title: 'the Void Walker',
    name: 'Kassadin',
    img: '/static/images/champions/Kassadin.png'
  },
  {
    title: 'the Sinister Blade',
    name: 'Katarina',
    img: '/static/images/champions/Katarina.png'
  },
  {
    title: 'the Righteous',
    name: 'Kayle',
    img: '/static/images/champions/Kayle.png'
  },
  {
    title: 'the Shadow Reaper',
    name: 'Kayn',
    img: '/static/images/champions/Kayn.png'
  },
  {
    title: 'the Heart of the Tempest',
    name: 'Kennen',
    img: '/static/images/champions/Kennen.png'
  },
  {
    title: 'the Voidreaver',
    name: "Kha'Zix",
    img: '/static/images/champions/Khazix.png'
  },
  {
    title: 'The Eternal Hunters',
    name: 'Kindred',
    img: '/static/images/champions/Kindred.png'
  },
  {
    title: 'the Cantankerous Cavalier',
    name: 'Kled',
    img: '/static/images/champions/Kled.png'
  },
  {
    title: 'the Mouth of the Abyss',
    name: "Kog'Maw",
    img: '/static/images/champions/KogMaw.png'
  },
  {
    title: 'the Deceiver',
    name: 'LeBlanc',
    img: '/static/images/champions/Leblanc.png'
  },
  {
    title: 'the Blind Monk',
    name: 'Lee Sin',
    img: '/static/images/champions/LeeSin.png'
  },
  {
    title: 'the Radiant Dawn',
    name: 'Leona',
    img: '/static/images/champions/Leona.png'
  },
  {
    title: 'the Ice Witch',
    name: 'Lissandra',
    img: '/static/images/champions/Lissandra.png'
  },
  {
    title: 'the Purifier',
    name: 'Lucian',
    img: '/static/images/champions/Lucian.png'
  },
  {
    title: 'the Fae Sorceress',
    name: 'Lulu',
    img: '/static/images/champions/Lulu.png'
  },
  {
    title: 'the Lady of Luminosity',
    name: 'Lux',
    img: '/static/images/champions/Lux.png'
  },
  {
    title: 'Shard of the Monolith',
    name: 'Malphite',
    img: '/static/images/champions/Malphite.png'
  },
  {
    title: 'the Prophet of the Void',
    name: 'Malzahar',
    img: '/static/images/champions/Malzahar.png'
  },
  {
    title: 'the Twisted Treant',
    name: 'Maokai',
    img: '/static/images/champions/Maokai.png'
  },
  {
    title: 'the Wuju Bladesman',
    name: 'Master Yi',
    img: '/static/images/champions/MasterYi.png'
  },
  {
    title: 'the Bounty Hunter',
    name: 'Miss Fortune',
    img: '/static/images/champions/MissFortune.png'
  },
  {
    title: 'the Monkey King',
    name: 'Wukong',
    img: '/static/images/champions/MonkeyKing.png'
  },
  {
    title: 'the Iron Revenant',
    name: 'Mordekaiser',
    img: '/static/images/champions/Mordekaiser.png'
  },
  {
    title: 'the Fallen',
    name: 'Morgana',
    img: '/static/images/champions/Morgana.png'
  },
  {
    title: 'the Tidecaller',
    name: 'Nami',
    img: '/static/images/champions/Nami.png'
  },
  {
    title: 'the Curator of the Sands',
    name: 'Nasus',
    img: '/static/images/champions/Nasus.png'
  },
  {
    title: 'the Titan of the Depths',
    name: 'Nautilus',
    img: '/static/images/champions/Nautilus.png'
  },
  {
    title: 'the Curious Chameleon',
    name: 'Neeko',
    img: '/static/images/champions/Neeko.png'
  },
  {
    title: 'the Bestial Huntress',
    name: 'Nidalee',
    img: '/static/images/champions/Nidalee.png'
  },
  {
    title: 'the Eternal Nightmare',
    name: 'Nocturne',
    img: '/static/images/champions/Nocturne.png'
  },
  {
    title: 'the Boy and His Yeti',
    name: 'Nunu & Willump',
    img: '/static/images/champions/Nunu.png'
  },
  {
    title: 'the Berserker',
    name: 'Olaf',
    img: '/static/images/champions/Olaf.png'
  },
  {
    title: 'the Lady of Clockwork',
    name: 'Orianna',
    img: '/static/images/champions/Orianna.png'
  },
  {
    title: 'The Fire below the Mountain',
    name: 'Ornn',
    img: '/static/images/champions/Ornn.png'
  },
  {
    title: 'the Unbreakable Spear',
    name: 'Pantheon',
    img: '/static/images/champions/Pantheon.png'
  },
  {
    title: 'Keeper of the Hammer',
    name: 'Poppy',
    img: '/static/images/champions/Poppy.png'
  },
  {
    title: 'the Bloodharbor Ripper',
    name: 'Pyke',
    img: '/static/images/champions/Pyke.png'
  },
  {
    title: 'Empress of the Elements',
    name: 'Qiyana',
    img: '/static/images/champions/Qiyana.png'
  },
  {
    title: "Demacia's Wings",
    name: 'Quinn',
    img: '/static/images/champions/Quinn.png'
  },
  {
    title: 'The Charmer',
    name: 'Rakan',
    img: '/static/images/champions/Rakan.png'
  },
  {
    title: 'the Armordillo',
    name: 'Rammus',
    img: '/static/images/champions/Rammus.png'
  },
  {
    title: 'the Void Burrower',
    name: "Rek'Sai",
    img: '/static/images/champions/RekSai.png'
  },
  {
    title: 'the Butcher of the Sands',
    name: 'Renekton',
    img: '/static/images/champions/Renekton.png'
  },
  {
    title: 'the Pridestalker',
    name: 'Rengar',
    img: '/static/images/champions/Rengar.png'
  },
  {
    title: 'the Exile',
    name: 'Riven',
    img: '/static/images/champions/Riven.png'
  },
  {
    title: 'the Mechanized Menace',
    name: 'Rumble',
    img: '/static/images/champions/Rumble.png'
  },
  {
    title: 'the Rune Mage',
    name: 'Ryze',
    img: '/static/images/champions/Ryze.png'
  },
  {
    title: 'Fury of the North',
    name: 'Sejuani',
    img: '/static/images/champions/Sejuani.png'
  },
  {
    title: 'the Redeemer',
    name: 'Senna',
    img: '/static/images/champions/Senna.png'
  },
  {
    title: 'the Demon Jester',
    name: 'Shaco',
    img: '/static/images/champions/Shaco.png'
  },
  {
    title: 'the Eye of Twilight',
    name: 'Shen',
    img: '/static/images/champions/Shen.png'
  },
  {
    title: 'the Half-Dragon',
    name: 'Shyvana',
    img: '/static/images/champions/Shyvana.png'
  },
  {
    title: 'the Mad Chemist',
    name: 'Singed',
    img: '/static/images/champions/Singed.png'
  },
  {
    title: 'The Undead Juggernaut',
    name: 'Sion',
    img: '/static/images/champions/Sion.png'
  },
  {
    title: 'the Battle Mistress',
    name: 'Sivir',
    img: '/static/images/champions/Sivir.png'
  },
  {
    title: 'the Crystal Vanguard',
    name: 'Skarner',
    img: '/static/images/champions/Skarner.png'
  },
  {
    title: 'Maven of the Strings',
    name: 'Sona',
    img: '/static/images/champions/Sona.png'
  },
  {
    title: 'the Starchild',
    name: 'Soraka',
    img: '/static/images/champions/Soraka.png'
  },
  {
    title: 'the Noxian Grand General',
    name: 'Swain',
    img: '/static/images/champions/Swain.png'
  },
  {
    title: 'the Unshackled',
    name: 'Sylas',
    img: '/static/images/champions/Sylas.png'
  },
  {
    title: 'the Dark Sovereign',
    name: 'Syndra',
    img: '/static/images/champions/Syndra.png'
  },
  {
    title: 'the River King',
    name: 'Tahm Kench',
    img: '/static/images/champions/TahmKench.png'
  },
  {
    title: 'the Stoneweaver',
    name: 'Taliyah',
    img: '/static/images/champions/Taliyah.png'
  },
  {
    title: "the Blade's Shadow",
    name: 'Talon',
    img: '/static/images/champions/Talon.png'
  },
  {
    title: 'the Shield of Valoran',
    name: 'Taric',
    img: '/static/images/champions/Taric.png'
  },
  {
    title: 'the Swift Scout',
    name: 'Teemo',
    img: '/static/images/champions/Teemo.png'
  },
  {
    title: 'the Chain Warden',
    name: 'Thresh',
    img: '/static/images/champions/Thresh.png'
  },
  {
    title: 'the Yordle Gunner',
    name: 'Tristana',
    img: '/static/images/champions/Tristana.png'
  },
  {
    title: 'the Troll King',
    name: 'Trundle',
    img: '/static/images/champions/Trundle.png'
  },
  {
    title: 'the Barbarian King',
    name: 'Tryndamere',
    img: '/static/images/champions/Tryndamere.png'
  },
  {
    title: 'the Card Master',
    name: 'Twisted Fate',
    img: '/static/images/champions/TwistedFate.png'
  },
  {
    title: 'the Plague Rat',
    name: 'Twitch',
    img: '/static/images/champions/Twitch.png'
  },
  {
    title: 'the Spirit Walker',
    name: 'Udyr',
    img: '/static/images/champions/Udyr.png'
  },
  {
    title: 'the Dreadnought',
    name: 'Urgot',
    img: '/static/images/champions/Urgot.png'
  },
  {
    title: 'the Arrow of Retribution',
    name: 'Varus',
    img: '/static/images/champions/Varus.png'
  },
  {
    title: 'the Night Hunter',
    name: 'Vayne',
    img: '/static/images/champions/Vayne.png'
  },
  {
    title: 'the Tiny Master of Evil',
    name: 'Veigar',
    img: '/static/images/champions/Veigar.png'
  },
  {
    title: 'the Eye of the Void',
    name: "Vel'Koz",
    img: '/static/images/champions/Velkoz.png'
  },
  {
    title: 'the Piltover Enforcer',
    name: 'Vi',
    img: '/static/images/champions/Vi.png'
  },
  {
    title: 'the Machine Herald',
    name: 'Viktor',
    img: '/static/images/champions/Viktor.png'
  },
  {
    title: 'the Crimson Reaper',
    name: 'Vladimir',
    img: '/static/images/champions/Vladimir.png'
  },
  {
    title: "the Thunder's Roar",
    name: 'Volibear',
    img: '/static/images/champions/Volibear.png'
  },
  {
    title: 'the Uncaged Wrath of Zaun',
    name: 'Warwick',
    img: '/static/images/champions/Warwick.png'
  },
  {
    title: 'the Rebel',
    name: 'Xayah',
    img: '/static/images/champions/Xayah.png'
  },
  {
    title: 'the Magus Ascendant',
    name: 'Xerath',
    img: '/static/images/champions/Xerath.png'
  },
  {
    title: 'the Seneschal of Demacia',
    name: 'Xin Zhao',
    img: '/static/images/champions/XinZhao.png'
  },
  {
    title: 'the Unforgiven',
    name: 'Yasuo',
    img: '/static/images/champions/Yasuo.png'
  },
  {
    title: 'Shepherd of Souls',
    name: 'Yorick',
    img: '/static/images/champions/Yorick.png'
  },
  {
    title: 'the Magical Cat',
    name: 'Yuumi',
    img: '/static/images/champions/Yuumi.png'
  },
  {
    title: 'the Secret Weapon',
    name: 'Zac',
    img: '/static/images/champions/Zac.png'
  },
  {
    title: 'the Master of Shadows',
    name: 'Zed',
    img: '/static/images/champions/Zed.png'
  },
  {
    title: 'the Hexplosives Expert',
    name: 'Ziggs',
    img: '/static/images/champions/Ziggs.png'
  },
  {
    title: 'the Chronokeeper',
    name: 'Zilean',
    img: '/static/images/champions/Zilean.png'
  },
  {
    title: 'the Aspect of Twilight',
    name: 'Zoe',
    img: '/static/images/champions/Zoe.png'
  },
  {
    title: 'Rise of the Thorns',
    name: 'Zyra',
    img: '/static/images/champions/Zyra.png'
  }
];

// const data = Object.keys(json.data).map(key => {
//   const item = json.data[key];
//   return {
//     title: item.title,
//     name: item.name,
//     img: `/static/images/champions/${item.name}.png`
//   };
// });

export default champions;

const Categories = [
  {
    label: "Trump",
    keywords: [
      "Trump",
      "Pence",
      "Kellyanne",
      "Kushner",
      "Ivanka",
      "Melania",
      "Breitbart",
      "Bannon",
      "Jeff Sessions"
    ]
  },
  {
    label: "Obama",
    keywords: ["Obama", "Biden"]
  },
  {
    label: "Clinton",
    keywords: [
      "Hillary",
      "Clinton",
      "Podesta",
      "Huma Abedin",
      "Tim Kaine"
    ]
  },
  {
    label: "Russia",
    keywords: [
      "Putin",
      "Russia",
      "Snowden",
      "hacking",
      "cyberwar",
      "kremlin"
    ]
  },
  {
    label: "Mideast",
    keywords: [
      "Israel",
      "Iraq",
      "ISIS",
      "ISIL",
      "West Bank",
      "Syria",
      "Aleppo",
      "Afghanistan"
    ]
  },
  {
    label: "Democrats",
    keywords: ["Democrat", "Democrats", "DNC", "Elizabeth Warren", "Bernie Sanders"]
  },
  {
    label: "Republicans",
    keywords: ["Republican", "GOP", "Mitch McConnell", "Paul Ryan", "McCain"]
  },
  {
    label: "Culture War",
    keywords: [
      'Planned Parenthood',
      'abortion',
      'gay marriage',
      'LGBT',
      'transgender',
      'bathroom',
      'NRA',
      'gun control',
      'gun rights',
      'pot',
      'marijuana',
      'gay']
  },
  {
    label: "Immigration",
    keywords: ["immigration", "illegals", "illegal immigrants", "wall", "border patrol"]
  },
  {
    label: "Terrorism",
    keywords: [
      'terror',
      'shooting',
      'shooter',
      'shot',
      'murder',
      'opened fire',
      'attack',
      'truck attack',
      'hijack',
      'bomb',
      'blast'
    ]
  }
];

let InitialConfiguration = {};
Categories.forEach(function(category, index) {
  InitialConfiguration[category.label] = category;
  InitialConfiguration[category.label].enabled = true;
  InitialConfiguration[category.label].position = index;
});

module.exports = InitialConfiguration;
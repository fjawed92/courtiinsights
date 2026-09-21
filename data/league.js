/* =====================================================================
   COURT INSIGHTS — LEAGUE DATA
   ---------------------------------------------------------------------
   This is the only file you need to edit week to week.
   Change a score, add a sponsor, update the standings — all right here.
   Keep the quotes and the commas exactly where they are, then save.
   ===================================================================== */

window.LEAGUE = {

  /* ---- Your league's name and season ---- */
  league: {
    nameTop: "Riverside Metro",          // big first line
    nameBottom: "Basketball League",     // second line
    season: "2025–26 Season · Division I",
    weekKicker: "Regular season",
    weekLabel: "Week 9 / 14",
    liveCount: 2,                        // games happening right now (0 hides the chip)
    teamCount: 12,
    gamesPlayed: 84,
    playoffsStart: "Mar 14"
  },

  /* ---- Sponsors. These show directly under the league name. ---- */
  sponsors: {
    presenting: {
      initials: "99",
      name: "99¢ Plus Store",
      kind: "Presenting Sponsor · Season & Playoffs",
      blurb: "Every jersey, scoreboard and game ball this season is backed by 99¢ Plus Store on Main Street — stop in and thank them.",
      url: "#sponsors"
    },
    list: [
      { initials: "NA", name: "Northgate Auto",  kind: "Gold · Scorer's table",      url: "#sponsors" },
      { initials: "RD", name: "Rivera Dental",   kind: "Gold · Free-throw of the game", url: "#sponsors" },
      { initials: "HP", name: "Halal Pizza Co.", kind: "Gold · Halftime",            url: "#sponsors" },
      { initials: "CB", name: "Cedar Barbers",   kind: "Community",                  url: "#sponsors" },
      { initials: "LM", name: "Lakeview Market", kind: "Community",                  url: "#sponsors" },
      { initials: "SP", name: "Summit Physio",   kind: "Community · Trainer",        url: "#sponsors" }
    ]
  },

  /* ---- Today's games. Set live:true for a game in progress. ---- */
  scoresDate: "Saturday, February 14",
  games: [
    {
      status: "Q3 · 4:12", live: true,
      teams: [
        { code: "FAL", name: "Falcons", score: "61", leading: true },
        { code: "RAP", name: "Rapids",  score: "57" }
      ],
      note: "Franklin HS Main Gym", sponsor: "99¢ Plus"
    },
    {
      status: "Q2 · 0:48", live: true,
      teams: [
        { code: "IRO", name: "Ironworks", score: "38" },
        { code: "HAR", name: "Harbor",    score: "45", leading: true }
      ],
      note: "Eastside Rec Center", sponsor: "Northgate Auto"
    },
    {
      status: "Final",
      teams: [
        { code: "STO", name: "Stone Owls", record: "(11-3)", score: "88", leading: true },
        { code: "COM", name: "Comets",     record: "(6-8)",  score: "74" }
      ],
      note: "A. Duran 27 PTS · 9 REB"
    },
    {
      status: "Final / OT",
      teams: [
        { code: "BRI", name: "Brickmen", record: "(8-6)",  score: "91" },
        { code: "VOL", name: "Voltage",  record: "(10-4)", score: "94", leading: true }
      ],
      note: "M. Okafor game-winner at 0:02"
    },
    {
      status: "Tonight · 7:30 PM",
      teams: [
        { code: "CAR", name: "Cardinals", record: "(9-5)", score: "—" },
        { code: "TID", name: "Tide",      record: "(5-9)", score: "—" }
      ],
      note: "Riverside Armory", sponsor: "Rivera Dental"
    },
    {
      status: "Tomorrow · 2:00 PM",
      teams: [
        { code: "GRA", name: "Granite", record: "(7-7)",  score: "—" },
        { code: "FAL", name: "Falcons", record: "(12-2)", score: "—" }
      ],
      note: "Franklin HS Main Gym"
    }
  ],

  /* ---- Standings. last5 reads left to right: W = win, L = loss.
         playoffCut: true draws the red line under that team.   ---- */
  standingsNote: "Through Week 9",
  standings: [
    {
      division: "North",
      rows: [
        { code:"FAL", name:"Falcons",    w:12, l:2, pct:".857", gb:"—",   streak:"W6", last5:"WWWWW", clinched:true },
        { code:"STO", name:"Stone Owls", w:11, l:3, pct:".786", gb:"1.0", streak:"W2", last5:"WLWWW" },
        { code:"CAR", name:"Cardinals",  w:9,  l:5, pct:".643", gb:"3.0", streak:"L1", last5:"LWWLW" },
        { code:"BRI", name:"Brickmen",   w:8,  l:6, pct:".571", gb:"4.0", streak:"L2", last5:"LLWWL" },
        { code:"GRA", name:"Granite",    w:7,  l:7, pct:".500", gb:"5.0", streak:"W1", last5:"WLLWL", playoffCut:true },
        { code:"COM", name:"Comets",     w:6,  l:8, pct:".429", gb:"6.0", streak:"L3", last5:"LLLWL" }
      ]
    },
    {
      division: "South",
      rows: [
        { code:"VOL", name:"Voltage",    w:10, l:4,  pct:".714", gb:"—",   streak:"W3", last5:"WWWLW", clinched:true },
        { code:"HAR", name:"Harbor",     w:9,  l:4,  pct:".692", gb:"0.5", streak:"W1", last5:"WLWLW" },
        { code:"RAP", name:"Rapids",     w:8,  l:5,  pct:".615", gb:"1.5", streak:"L1", last5:"LWWWL" },
        { code:"IRO", name:"Ironworks",  w:7,  l:7,  pct:".500", gb:"3.0", streak:"W2", last5:"WWLLW" },
        { code:"TID", name:"Tide",       w:5,  l:9,  pct:".357", gb:"5.0", streak:"L2", last5:"LLWLL", playoffCut:true },
        { code:"MES", name:"Mesa Kings", w:4,  l:10, pct:".286", gb:"6.0", streak:"L4", last5:"LLLLL" }
      ]
    }
  ],

  /* ---- The matchup you want to promote this week ---- */
  gameOfWeek: {
    date: "Sat · Feb 21",
    away: { code:"FAL", name:"Falcons",    form:"12-2 · W6" },
    home: { code:"STO", name:"Stone Owls", form:"11-3 · W2" },
    details: [
      { label:"Tip-off", value:"7:00 PM" },
      { label:"Venue",   value:"Franklin HS Main Gym" },
      { label:"Stakes",  value:"North No. 1 seed and home court through the semifinals" },
      { label:"Tickets", value:"$5 at the door · under 12 free" }
    ],
    sponsor: { initials:"99", name:"99¢ Plus Store", kind:"Presented by" }
  },

  /* ---- Stat leaders. The bar length is worked out automatically. ---- */
  leadersNote: "Minimum 8 games played",
  leaders: [
    {
      title: "Points per game",
      rows: [
        { name:"A. Duran",     team:"Stone Owls", pos:"G", value:24.6 },
        { name:"M. Okafor",    team:"Voltage",    pos:"F", value:22.1 },
        { name:"J. Whitfield", team:"Falcons",    pos:"G", value:19.8 }
      ]
    },
    {
      title: "Rebounds per game",
      rows: [
        { name:"T. Alvarado", team:"Ironworks", pos:"C", value:12.4 },
        { name:"D. Rahman",   team:"Harbor",    pos:"F", value:10.9 },
        { name:"C. Boateng",  team:"Brickmen",  pos:"C", value:9.7 }
      ]
    },
    {
      title: "Assists per game",
      rows: [
        { name:"S. Petrov",    team:"Cardinals", pos:"PG", value:8.2 },
        { name:"R. Nakamura",  team:"Rapids",    pos:"PG", value:7.5 },
        { name:"K. Ellison",   team:"Falcons",   pos:"PG", value:6.9 }
      ]
    }
  ],

  /* ---- Every club in the league ---- */
  teams: [
    { code:"FAL", name:"Falcons",    record:"12-2" },
    { code:"STO", name:"Stone Owls", record:"11-3" },
    { code:"VOL", name:"Voltage",    record:"10-4" },
    { code:"CAR", name:"Cardinals",  record:"9-5"  },
    { code:"HAR", name:"Harbor",     record:"9-4"  },
    { code:"BRI", name:"Brickmen",   record:"8-6"  },
    { code:"RAP", name:"Rapids",     record:"8-5"  },
    { code:"GRA", name:"Granite",    record:"7-7"  },
    { code:"IRO", name:"Ironworks",  record:"7-7"  },
    { code:"COM", name:"Comets",     record:"6-8"  },
    { code:"TID", name:"Tide",       record:"5-9"  },
    { code:"MES", name:"Mesa Kings", record:"4-10" }
  ],

  /* ---- Footer ---- */
  footer: {
    about: "Scores, standings and stats for the Riverside Metro Basketball League, updated within minutes of the final buzzer.",
    columns: [
      {
        heading: "League",
        links: [
          { label:"Schedule & scores", href:"#scores" },
          { label:"Standings",         href:"#standings" },
          { label:"Stat leaders",      href:"#leaders" },
          { label:"Teams & rosters",   href:"#teams" }
        ]
      },
      {
        heading: "Get involved",
        links: [
          { label:"Become a sponsor", href:"#sponsors" },
          { label:"Register a team",  href:"#top" },
          { label:"Officiate a game", href:"#top" },
          { label:"Gym directions",   href:"#top" }
        ]
      }
    ],
    colophon: "© 2026 Court Insights · Riverside Metro Basketball League"
  }
};

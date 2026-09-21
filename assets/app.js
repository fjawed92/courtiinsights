/* =====================================================================
   COURT INSIGHTS — page builder
   ---------------------------------------------------------------------
   Reads everything from data/league.js and draws the page.
   You should not need to edit this file to update the league.
   ===================================================================== */
(function () {
  'use strict';

  var data = window.LEAGUE;
  if (!data) {
    console.error('League data not found. Check that data/league.js loads before assets/app.js.');
    return;
  }

  /* Keep any stray < > & in the data from breaking the page. */
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function slot(name) {
    return document.querySelector('[data-render="' + name + '"]');
  }

  function paint(name, html) {
    var el = slot(name);
    if (el) { el.innerHTML = html; }
  }

  function logo(sponsor, extraClass) {
    return '<span class="logo ' + (extraClass || '') + '">' +
             '<span class="glyph" aria-hidden="true">' + esc(sponsor.initials) + '</span>' +
             '<span class="lockup">' +
               '<span class="name">' + esc(sponsor.name) + '</span>' +
               '<span class="kind">' + esc(sponsor.kind) + '</span>' +
             '</span>' +
           '</span>';
  }

  /* ---------------- league name ---------------- */
  function renderLeague() {
    var l = data.league;
    var chips = '';
    if (l.liveCount > 0) {
      chips += '<span class="chip"><span class="live-dot" aria-hidden="true"></span>' +
               '<strong>' + esc(l.liveCount) + (l.liveCount === 1 ? ' game live' : ' games live') +
               '</strong> right now</span>';
    }
    chips += '<span class="chip"><strong>' + esc(l.teamCount) + '</strong> teams</span>' +
             '<span class="chip"><strong>' + esc(l.gamesPlayed) + '</strong> games played</span>' +
             '<span class="chip">Playoffs begin <strong>' + esc(l.playoffsStart) + '</strong></span>';

    paint('league',
      '<div class="wrap">' +
        '<div class="league-id">' +
          '<span class="eyebrow">' + esc(l.season) + '</span>' +
          '<h1>' + esc(l.nameTop) + '<span>' + esc(l.nameBottom) + '</span></h1>' +
          '<div class="league-meta">' + chips + '</div>' +
        '</div>' +
        '<div class="week-box">' +
          '<div class="k">' + esc(l.weekKicker) + '</div>' +
          '<div class="v num">' + esc(l.weekLabel) + '</div>' +
        '</div>' +
      '</div>');
  }

  /* ---------------- sponsors (directly under the league name) ---------------- */
  function renderSponsors() {
    var s = data.sponsors;
    var tiles = s.list.map(function (sp) {
      return '<a class="sponsor-card" href="' + esc(sp.url || '#sponsors') + '">' +
               '<span class="glyph" aria-hidden="true">' + esc(sp.initials) + '</span>' +
               '<span class="lockup">' +
                 '<span class="name">' + esc(sp.name) + '</span>' +
                 '<span class="kind">' + esc(sp.kind) + '</span>' +
               '</span>' +
             '</a>';
    }).join('');

    paint('sponsors',
      '<div class="wrap">' +
        '<div class="sponsor-head">' +
          '<span class="eyebrow">Our Sponsors</span>' +
          '<span class="rule" aria-hidden="true"></span>' +
          '<a href="#sponsors">Sponsor the league</a>' +
        '</div>' +
        '<div class="presenting">' +
          '<a class="logo big" href="' + esc(s.presenting.url || '#sponsors') + '">' +
            '<span class="glyph" aria-hidden="true">' + esc(s.presenting.initials) + '</span>' +
            '<span class="lockup">' +
              '<span class="name">' + esc(s.presenting.name) + '</span>' +
              '<span class="kind">' + esc(s.presenting.kind) + '</span>' +
            '</span>' +
          '</a>' +
          '<p class="blurb">' + esc(s.presenting.blurb) + '</p>' +
        '</div>' +
        '<div class="sponsor-grid">' + tiles + '</div>' +
      '</div>');
  }

  /* ---------------- today's games ---------------- */
  function renderScores() {
    var cards = data.games.map(function (g) {
      var rows = g.teams.map(function (t) {
        var cls = t.leading ? 'row lead' : (hasLeader(g) ? 'row trail' : 'row');
        return '<div class="' + cls + '">' +
                 '<span class="tag">' + esc(t.code) + '</span>' +
                 '<span class="team">' + esc(t.name) + '</span>' +
                 (t.record ? '<span class="rec">' + esc(t.record) + '</span>' : '') +
                 '<span class="pts">' + esc(t.score) + '</span>' +
               '</div>';
      }).join('');

      var foot = esc(g.note || '');
      if (g.sponsor) { foot += (foot ? ' · ' : '') + '<span class="by">' + esc(g.sponsor) + '</span>'; }

      return '<article class="game">' +
               '<div class="status' + (g.live ? ' is-live' : '') + '">' +
                 (g.live ? '<span class="live-dot" aria-hidden="true"></span>' : '') + esc(g.status) +
               '</div>' + rows +
               (foot ? '<div class="foot">' + foot + '</div>' : '') +
             '</article>';
    }).join('');

    paint('scores',
      '<div class="wrap">' +
        '<div class="strip-head">' +
          '<span class="eyebrow">' + esc(data.scoresDate) + '</span>' +
          '<a href="#scores">Full schedule &rarr;</a>' +
        '</div>' +
        '<div class="rail">' + cards + '</div>' +
      '</div>');
  }

  function hasLeader(game) {
    return game.teams.some(function (t) { return t.leading; });
  }

  /* ---------------- standings ---------------- */
  function renderStandings() {
    var tabs = data.standings.map(function (d, i) {
      var id = 'div-' + i;
      return '<button class="tab" role="tab" id="tab-' + id + '" type="button" ' +
             'aria-controls="p-' + id + '" aria-selected="' + (i === 0) + '">' +
             esc(d.division) + '</button>';
    }).join('');

    var panels = data.standings.map(function (d, i) {
      var id = 'div-' + i;
      var rows = d.rows.map(function (r, index) {
        return '<tr' + (r.playoffCut ? ' class="playoff-line"' : '') + '>' +
                 '<td><div class="team-cell">' +
                   '<span class="seed num">' + (index + 1) + '</span>' +
                   '<span class="tag">' + esc(r.code) + '</span>' +
                   '<b>' + esc(r.name) + '</b>' +
                   (r.clinched ? '<span class="clinch">x</span>' : '') +
                 '</div></td>' +
                 '<td class="num">' + esc(r.w) + '</td>' +
                 '<td class="num">' + esc(r.l) + '</td>' +
                 '<td class="num">' + esc(r.pct) + '</td>' +
                 '<td class="num">' + esc(r.gb) + '</td>' +
                 '<td><span class="streak ' + (String(r.streak).charAt(0).toUpperCase() === 'W' ? 'w' : 'l') + '">' +
                   esc(r.streak) + '</span></td>' +
                 '<td>' + lastFive(r.last5) + '</td>' +
               '</tr>';
      }).join('');

      return '<div id="p-' + id + '" role="tabpanel" aria-labelledby="tab-' + id + '"' + (i === 0 ? '' : ' hidden') + '>' +
               '<div class="table-scroll"><table>' +
                 '<thead><tr><th>Team</th><th>W</th><th>L</th><th>PCT</th><th>GB</th><th>STRK</th><th>Last 5</th></tr></thead>' +
                 '<tbody>' + rows + '</tbody>' +
               '</table></div>' +
               '<div class="legend">' +
                 '<span><span class="bar" aria-hidden="true"></span>Playoff cut line (top four host)</span>' +
                 '<span><span class="clinch">x</span> Clinched playoff berth</span>' +
               '</div>' +
             '</div>';
    }).join('');

    paint('standings',
      '<div class="panel-head"><h2>Standings</h2>' +
        '<span class="sub">' + esc(data.standingsNote) + '</span></div>' +
      '<div class="tabs" role="tablist" aria-label="Division">' + tabs + '</div>' + panels);

    wireTabs();
  }

  function lastFive(results) {
    var marks = String(results || '').toUpperCase().split('');
    var wins = marks.filter(function (m) { return m === 'W'; }).length;
    var label = 'Last five: ' + wins + ' won, ' + (marks.length - wins) + ' lost';
    return '<span class="l5" aria-label="' + label + '">' +
             marks.map(function (m) { return '<i class="' + (m === 'W' ? 'w' : '') + '"></i>'; }).join('') +
           '</span>';
  }

  function wireTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          if (panel) { panel.hidden = !on; }
        });
      });
    });
  }

  /* ---------------- game of the week ---------------- */
  function renderSpotlight() {
    var g = data.gameOfWeek;
    if (!g) { return; }
    var details = g.details.map(function (d) {
      return '<div><dt>' + esc(d.label) + '</dt><dd>' + esc(d.value) + '</dd></div>';
    }).join('');

    paint('spotlight',
      '<div class="panel-head"><h2>Game of the Week</h2>' +
        '<span class="sub">' + esc(g.date) + '</span></div>' +
      '<div class="matchup">' +
        side(g.away) + '<div class="vs">VS</div>' + side(g.home) +
      '</div>' +
      '<dl class="tipoff">' + details + '</dl>' +
      (g.sponsor ? '<div class="logo spot-sponsor">' +
          '<span class="glyph" aria-hidden="true">' + esc(g.sponsor.initials) + '</span>' +
          '<span class="lockup"><span class="name">' + esc(g.sponsor.name) + '</span>' +
          '<span class="kind">' + esc(g.sponsor.kind) + '</span></span>' +
        '</div>' : ''));
  }

  function side(team) {
    return '<div class="side"><span class="tag">' + esc(team.code) + '</span>' +
           '<b>' + esc(team.name) + '</b><small>' + esc(team.form) + '</small></div>';
  }

  /* ---------------- stat leaders ---------------- */
  function renderLeaders() {
    var cols = data.leaders.map(function (group) {
      var top = Math.max.apply(null, group.rows.map(function (r) { return r.value; })) || 1;
      var rows = group.rows.map(function (r, i) {
        var width = Math.round((r.value / top) * 100);
        return '<div class="leader">' +
                 '<span class="rk">' + (i + 1) + '</span>' +
                 '<span class="who"><b>' + esc(r.name) + '</b>' +
                   '<small>' + esc(r.team) + ' · ' + esc(r.pos) + '</small></span>' +
                 '<span class="val">' + esc(r.value.toFixed ? r.value.toFixed(1) : r.value) + '</span>' +
                 '<span class="meter"><i style="width:' + width + '%"></i></span>' +
               '</div>';
      }).join('');
      return '<div class="leader-col"><h3>' + esc(group.title) + '</h3>' + rows + '</div>';
    }).join('');

    paint('leaders',
      '<div class="panel-head"><h2>League Leaders</h2>' +
        '<span class="sub">' + esc(data.leadersNote) + '</span></div>' +
      '<div class="leader-grid">' + cols + '</div>');
  }

  /* ---------------- teams ---------------- */
  function renderTeams() {
    var tiles = data.teams.map(function (t) {
      return '<a class="team-tile" href="#teams">' +
               '<span class="tag">' + esc(t.code) + '</span>' +
               '<span><b>' + esc(t.name) + '</b><small>' + esc(t.record) + '</small></span>' +
             '</a>';
    }).join('');

    paint('teams',
      '<div class="panel-head"><h2>Teams</h2>' +
        '<span class="sub">' + data.teams.length + ' clubs</span></div>' +
      '<div class="team-grid">' + tiles + '</div>');
  }

  /* ---------------- footer ---------------- */
  function renderFooter() {
    var f = data.footer;
    var columns = f.columns.map(function (c) {
      return '<div><h4>' + esc(c.heading) + '</h4>' +
             c.links.map(function (link) {
               return '<a href="' + esc(link.href) + '">' + esc(link.label) + '</a>';
             }).join('') + '</div>';
    }).join('');

    var thanks = '<b>' + esc(data.sponsors.presenting.name) + '</b>' +
      data.sponsors.list.map(function (sp) { return ' · ' + esc(sp.name); }).join('');

    paint('footer',
      '<div class="wrap">' +
        '<div><h4>Court Insights</h4><p class="thanks">' + esc(f.about) + '</p></div>' +
        columns +
        '<div><h4>Season sponsors</h4><p class="thanks">' + thanks + '</p></div>' +
        '<div class="colophon" style="grid-column:1/-1;">' + esc(f.colophon) + '</div>' +
      '</div>');
  }

  renderLeague();
  renderSponsors();
  renderScores();
  renderStandings();
  renderSpotlight();
  renderLeaders();
  renderTeams();
  renderFooter();
})();

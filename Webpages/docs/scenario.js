(function () {
  'use strict';

  var KEY = 'vr-audit-scenario-draft-v1';
  var SEV = ['Critical', 'Major', 'Minor'];

  var EXAMPLE = {
    title: 'Pest ingress and maintenance failings',
    author: 'Example only (add your name and module)',
    premises: 'Spice blend and dry powder mix factory',
    focus: 'Pest control, building maintenance, stock rotation (annual premises / structural audit)',
    outcomes: [
      'Inspect above and below eye level: ceilings, pipes, door seals and corners.',
      'Recognise a "temporary fix" and challenge it using the maintenance records.',
      'Link physical evidence to the pest control plan and records, and decide whether each finding is critical, major or minor.'
    ],
    areas: 'Loading bay (inside and outside), raw ingredient warehouse, debagging room',
    realplace: 'Not sure yet: a typical factory, or a real MMU space',
    conditions: 'Daytime. The warehouse corner is dim.',
    start: 'At the site entrance, then free to choose a route.',
    faults: [
      { where: 'Loading bay', sev: 'Major', see: 'Rubber seal at the bottom of the door is torn, leaving about a 1 inch gap to the outside.', why: 'Small gaps are an easy entry route for pests.', hint: 'Where could something small get in?', record: 'Building inspection record, Pest control plan', clause: '' },
      { where: 'Outside the loading bay', sev: 'Minor', see: 'Heavy weed growth against the building.', why: 'Plants give pests cover and a way in.', hint: 'Look outside the door.', record: 'Building inspection record', clause: '' },
      { where: 'Warehouse', sev: 'Major', see: 'Mouse droppings in a dark corner behind a pallet of salt.', why: 'Evidence of pests in the ingredient store. Stock that never moves hides activity. Consider critical if on or near product.', hint: 'Check behind long-standing stock.', record: 'Pest control visit report', clause: '' },
      { where: 'Warehouse', sev: 'Major', see: 'Dusty bait station with an out-of-date inspection sticker.', why: 'The pest monitoring is not being done as planned.', hint: 'Is the pest monitoring up to date?', record: 'Pest control visit report, Bait station map', clause: '' },
      { where: 'Warehouse', sev: 'Minor', see: 'Pallet of salt not moved for about six months and out of date.', why: 'Old stock is not being rotated and gives pests somewhere to hide.', hint: 'When did this last move?', record: 'Stock rotation record', clause: '' },
      { where: 'Debagging room', sev: 'Major', see: 'Leaking overhead pipe "repaired" with duct tape, a bucket catching drips, and drips reaching a surface that touches product.', why: 'A temporary fix is being used instead of a proper repair, with a risk of contamination.', hint: 'Look up.', record: 'Maintenance request log', clause: '' }
    ],
    records: [
      { name: 'Pest control visit report', where: 'Site office', shows: 'Last visit date and list of bait stations', related: '3, 4' },
      { name: 'Bait station map', where: 'Warehouse wall', shows: 'Where stations are and when each was last checked', related: '4' },
      { name: 'Maintenance request log', where: 'Maintenance office', shows: 'Pipe leak reported, no proper repair scheduled', related: '6' },
      { name: 'Building inspection record', where: 'Site office', shows: 'Door seal and weeds were never logged', related: '1, 2' },
      { name: 'Stock rotation record', where: 'Warehouse', shows: 'When the salt pallet arrived', related: '5' },
      { name: 'Pest control plan', where: 'Site office', shows: 'What should be checked and how often', related: '1, 4' }
    ],
    assets: [
      { name: 'Loading bay with roller door', type: 'Room or building', where: 'Loading bay', fault: '1', ref: 'Need help finding', note: '' },
      { name: 'Torn rubber door seal with 1 inch gap', type: 'Damage or marking', where: 'Loading bay', fault: '1', ref: 'Have photo', note: '' },
      { name: 'Weeds growing against the outside wall', type: 'Damage or marking', where: 'Outside the loading bay', fault: '2', ref: 'Have photo', note: '' },
      { name: 'Warehouse with racking, pallets and salt sacks', type: 'Room or building', where: 'Warehouse', fault: '3, 5', ref: 'Need help finding', note: 'Dim corner behind one pallet' },
      { name: 'Mouse droppings', type: 'Damage or marking', where: 'Warehouse', fault: '3', ref: 'Need help finding', note: '' },
      { name: 'Bait station (one in date, one out of date)', type: 'Object', where: 'Warehouse', fault: '4', ref: 'Have photo', note: 'Dusty, old inspection sticker' },
      { name: 'Old salt pallet with date label', type: 'Object', where: 'Warehouse', fault: '5', ref: 'Not needed', note: '' },
      { name: 'Debagging room with overhead pipe', type: 'Room or building', where: 'Debagging room', fault: '6', ref: 'Need help finding', note: '' },
      { name: 'Duct tape pipe repair and bucket', type: 'Object', where: 'Debagging room', fault: '6', ref: 'Have photo', note: '' },
      { name: 'Six paper records (see section 5)', type: 'Document or record', where: 'Site office, warehouse, maintenance office', fault: '1 to 6', ref: 'Have sample', note: 'Anonymise any real records' }
    ],
    redherrings: 'A correctly dated bait station elsewhere in the warehouse, so students can compare a good one with a bad one.',
    t_walk: true, t_mark: true, t_class: true, t_records: true, t_cause: false, t_other: '',
    success: 'To be decided, for example: found at least 5 of 6, classified most correctly.',
    timelimit: 'No, for the pilot.',
    endnotes: 'A summary of what they found and missed, grouped by seriousness, with the "why it matters" text for each. Also a short note on BRCGS reporting: non-conformities are issued within 24 hours, and the site has 28 days to close them out with a root cause analysis.',
    unsure: 'Typical factory, or a real MMU space?\nShould droppings near product be rated critical?\nHow many students and headsets in a class session?'
  };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  var exampleMode = /[?&]example=1/.test(location.search);
  var status = $('#status');

  function say(msg) { status.textContent = msg; }
  function store(v) { try { if (v === null) localStorage.removeItem(KEY); else localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage unavailable: page still works */ } }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }

  /* ---------- repeating rows ---------- */
  function sevOptions() {
    return '<option value="">Choose...</option>' + SEV.map(function (s) { return '<option>' + s + '</option>'; }).join('');
  }

  function addFault(d) {
    d = d || {};
    var c = document.createElement('div');
    c.className = 'fault card';
    c.innerHTML =
      '<div class="fault-head"><strong class="fnum"></strong><button type="button" class="link remove">Remove</button></div>' +
      '<div class="grid2"><label><span>Where is it?</span><input type="text" data-f="where"></label>' +
      '<label><span>How serious?</span><select data-f="sev">' + sevOptions() + '</select></label></div>' +
      '<label><span>What does the student see?</span><textarea data-f="see" rows="2"></textarea></label>' +
      '<label><span>Why does it matter? (one or two sentences)</span><textarea data-f="why" rows="2"></textarea></label>' +
      '<div class="grid2"><label><span>Hint if they are stuck</span><input type="text" data-f="hint"></label>' +
      '<label><span>Which record would confirm it?</span><input type="text" data-f="record"></label></div>' +
      '<label><span>BRCGS clause number (optional)</span><input type="text" data-f="clause"></label>';
    $$('[data-f]', c).forEach(function (el) { el.value = d[el.dataset.f] || ''; });
    $('.remove', c).addEventListener('click', function () { c.remove(); renumber(); changed(); });
    $('#faults').appendChild(c);
    renumber();
  }

  function renumber() {
    $$('#faults .fault').forEach(function (c, i) { $('.fnum', c).textContent = 'Fault ' + (i + 1); });
  }

  function addOutcome(text) {
    var c = document.createElement('div');
    c.className = 'outcome card';
    c.innerHTML = '<label><span class="onum"></span><input type="text" data-o></label><button type="button" class="link remove">Remove</button>';
    $('[data-o]', c).value = text || '';
    $('.remove', c).addEventListener('click', function () { c.remove(); renumberOutcomes(); changed(); });
    $('#outcomes').appendChild(c);
    renumberOutcomes();
  }

  function renumberOutcomes() {
    $$('#outcomes .outcome').forEach(function (c, i) { $('.onum', c).textContent = 'Learning objective ' + (i + 1); });
  }

  var ASSET_TYPES = ['Room or building', 'Object', 'Damage or marking', 'Document or record', 'Person', 'Sound', 'Other'];
  var ASSET_REFS = ['Have photo', 'Have sample', 'Need help finding', 'Not needed'];
  function opts(list) { return '<option value="">Choose...</option>' + list.map(function (x) { return '<option>' + x + '</option>'; }).join(''); }

  function addAsset(d) {
    d = d || {};
    var c = document.createElement('div');
    c.className = 'asset card';
    c.innerHTML =
      '<label><span>Asset description</span><textarea data-a="name" rows="2"></textarea></label>' +
      '<div class="grid4"><label><span>Type</span><select data-a="type">' + opts(ASSET_TYPES) + '</select></label>' +
      '<label><span>Where it appears</span><input type="text" data-a="where"></label>' +
      '<label><span>Fault number(s)</span><input type="text" data-a="fault"></label>' +
      '<label><span>Reference material</span><select data-a="ref">' + opts(ASSET_REFS) + '</select></label></div>' +
      '<label><span>Notes</span><input type="text" data-a="note"></label>' +
      '<button type="button" class="link remove">Remove</button>';
    $$('[data-a]', c).forEach(function (el) { el.value = d[el.dataset.a] || ''; });
    $('.remove', c).addEventListener('click', function () { c.remove(); changed(); });
    $('#assets').appendChild(c);
  }

  function suggestAssets() {
    var s = collect(), have = {}, n = 0;
    s.assets.forEach(function (a) { have[(a.name || '').trim().toLowerCase()] = true; });
    usedFaults(s).forEach(function (f, i) {
      var name = (f.see || f.where || '').trim();
      if (name && !have[name.toLowerCase()]) { addAsset({ name: name, type: 'Object', where: f.where, fault: String(i + 1) }); have[name.toLowerCase()] = true; n++; }
    });
    s.records.forEach(function (r) {
      var name = (r.name || '').trim();
      if (name && !have[name.toLowerCase()]) { addAsset({ name: name, type: 'Document or record', where: r.where, fault: r.related }); have[name.toLowerCase()] = true; n++; }
    });
    say(n ? n + ' suggested assets added. Check the type of each and remove any you do not need.' : 'No new suggestions. Add faults and records first.');
    if (n) changed();
  }

  function addRecord(d) {
    d = d || {};
    var c = document.createElement('div');
    c.className = 'rec card';
    c.innerHTML =
      '<div class="grid4"><label><span>Record</span><input type="text" data-r="name"></label>' +
      '<label><span>Where is it kept?</span><input type="text" data-r="where"></label>' +
      '<label><span>What does it show?</span><input type="text" data-r="shows"></label>' +
      '<label><span>Related fault number(s)</span><input type="text" data-r="related"></label></div>' +
      '<button type="button" class="link remove">Remove</button>';
    $$('[data-r]', c).forEach(function (el) { el.value = d[el.dataset.r] || ''; });
    $('.remove', c).addEventListener('click', function () { c.remove(); changed(); });
    $('#records').appendChild(c);
  }

  /* ---------- read / write the form ---------- */
  function collect() {
    var s = { outcomes: [], faults: [], records: [], assets: [] };
    $$('[data-k]').forEach(function (el) { s[el.dataset.k] = el.type === 'checkbox' ? el.checked : el.value; });
    $$('#outcomes [data-o]').forEach(function (el) { s.outcomes.push(el.value); });
    $$('#faults .fault').forEach(function (c) {
      var f = {}; $$('[data-f]', c).forEach(function (el) { f[el.dataset.f] = el.value; }); s.faults.push(f);
    });
    $$('#records .rec').forEach(function (c) {
      var r = {}; $$('[data-r]', c).forEach(function (el) { r[el.dataset.r] = el.value; }); s.records.push(r);
    });
    $$('#assets .asset').forEach(function (c) {
      var a = {}; $$('[data-a]', c).forEach(function (el) { a[el.dataset.a] = el.value; }); s.assets.push(a);
    });
    return s;
  }

  function fill(s) {
    s = s || {};
    $$('[data-k]').forEach(function (el) {
      var v = s[el.dataset.k];
      if (el.type === 'checkbox') el.checked = !!v; else el.value = v || '';
    });
    $('#faults').innerHTML = ''; $('#records').innerHTML = ''; $('#outcomes').innerHTML = ''; $('#assets').innerHTML = '';
    (s.assets && s.assets.length ? s.assets : [{}, {}]).forEach(addAsset);
    // drafts saved before objectives became a list used outcome1..3
    var os = (s.outcomes && s.outcomes.length) ? s.outcomes : [s.outcome1, s.outcome2, s.outcome3].filter(Boolean);
    (os.length ? os : ['', '', '']).forEach(addOutcome);
    var fs = (s.faults && s.faults.length) ? s.faults : [{}, {}, {}];
    var rs = (s.records && s.records.length) ? s.records : [{}, {}];
    fs.forEach(addFault); rs.forEach(addRecord);
    updateProgress();
  }

  var timer;
  function updateProgress() {
    var panels = $$('.panel'), done = 0;
    panels.forEach(function (p) {
      var any = $$('input[type=text], textarea, select', p).some(function (el) { return el.value.trim() !== ''; }) ||
        $$('input[type=checkbox]', p).some(function (el) { return el.checked; });
      if (any) done++;
    });
    $('#progress-bar').style.width = Math.round(100 * done / panels.length) + '%';
    $('.progress').setAttribute('aria-valuenow', done);
  }

  function watchSections() {
    var links = $$('#section-nav a'), panels = $$('.panel'), busy = false;
    function mark() {
      busy = false;
      var cur = panels[0];
      panels.forEach(function (p) { if (p.getBoundingClientRect().top <= innerHeight * 0.3) cur = p; });
      links.forEach(function (a) { a.removeAttribute('aria-current'); });
      var a = $('#section-nav a[href="#' + cur.id + '"]');
      if (a) a.setAttribute('aria-current', 'true');
    }
    addEventListener('scroll', function () { if (!busy) { busy = true; requestAnimationFrame(mark); } }, { passive: true });
    mark();
  }

  function changed() {
    updateProgress();
    if (exampleMode) return;
    clearTimeout(timer);
    timer = setTimeout(function () { store(collect()); say('Draft saved in this browser.'); }, 400);
  }

  /* ---------- helpers ---------- */
  function slug(t) { return String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60); }
  function download(blob, name) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function usedFaults(s) { return s.faults.filter(function (f) { return (f.where || f.see || f.why || '').trim(); }); }
  function filename(s, ext) { return (slug(s.title) || 'scenario-plan') + ext; }

  /* ---------- data file for the development team ---------- */
  function dataFile() {
    var s = collect();
    var recs = s.records.filter(function (r) { return (r.name || '').trim(); });
    return {
      scenario: slug(s.title), title: s.title,
      faults: usedFaults(s).map(function (f, i) {
        return {
          id: 'F-' + String(i + 1).padStart(2, '0'),
          area: f.where, description: f.see, hint: f.hint,
          correctClassification: (f.sev || '').toLowerCase(),
          clauseRef: (f.clause || '').trim() || 'TBC',
          linkedRecords: (f.record || '').split(',').map(function (x) { return slug(x); }).filter(Boolean),
          learningNote: f.why
        };
      }),
      records: recs.map(function (r) { return { id: slug(r.name), title: r.name, location: r.where, shows: r.shows }; }),
      assets: s.assets.filter(function (a) { return (a.name || '').trim(); }).map(function (a) {
        return { name: a.name, type: a.type, where: a.where, faults: a.fault, reference: a.ref, notes: a.note };
      })
    };
  }

  /* ---------- Word document ---------- */
  function buildDoc(s) {
    var D = window.docx;
    var W = 9638, ACC = '00AFFF', INK = '101010', GREY = 'F4F4F2', LINE = 'BFBFBF';
    var SEVFILL = { Critical: 'F4B6B6', Major: 'FBD9A6', Minor: 'FFF2B3' };
    var edge = { style: D.BorderStyle.SINGLE, size: 4, color: LINE };
    var borders = { top: edge, bottom: edge, left: edge, right: edge };
    var noEdge = { style: D.BorderStyle.NONE, size: 0, color: 'FFFFFF' };

    function blank(t) { return !String(t || '').trim(); }
    function paras(t, o) {
      o = o || {};
      if (blank(t)) return [new D.Paragraph({ spacing: { after: 60 }, children: [new D.TextRun({ text: 'Not completed', italics: true, color: '777777' })] })];
      return String(t).split(/\r?\n/).map(function (l) {
        return new D.Paragraph({ spacing: { after: 60 }, children: [new D.TextRun({ text: l, bold: o.bold })] });
      });
    }
    function cell(content, w, o) {
      o = o || {};
      return new D.TableCell({
        width: { size: w, type: D.WidthType.DXA }, borders: borders, columnSpan: o.span,
        shading: o.fill ? { type: D.ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: Array.isArray(content) ? content : paras(content, { bold: o.bold })
      });
    }
    function table(cols, rows) {
      return new D.Table({ width: { size: W, type: D.WidthType.DXA }, columnWidths: cols, rows: rows });
    }
    function h1(t) { return new D.Paragraph({ heading: D.HeadingLevel.HEADING_1, children: [new D.TextRun(t)] }); }
    function gap() { return new D.Paragraph({ spacing: { after: 80 }, children: [] }); }

    var kids = [];

    // title band
    kids.push(new D.Table({
      width: { size: W, type: D.WidthType.DXA }, columnWidths: [W],
      rows: [new D.TableRow({ children: [new D.TableCell({
        width: { size: W, type: D.WidthType.DXA },
        borders: { top: noEdge, bottom: noEdge, left: noEdge, right: noEdge },
        shading: { type: D.ShadingType.CLEAR, fill: ACC, color: 'auto' },
        margins: { top: 240, bottom: 240, left: 280, right: 280 },
        children: [
          new D.Paragraph({ children: [new D.TextRun({ text: 'FOOD PREMISES AUDIT SIM  |  SCENARIO PLAN', bold: true, size: 20, color: INK })] }),
          new D.Paragraph({ spacing: { before: 80 }, children: [new D.TextRun({ text: s.title || 'Untitled scenario', bold: true, size: 44, color: INK })] })
        ]
      })] })]
    }));
    kids.push(gap());

    // 1
    kids.push(h1('1. About your scenario'));
    kids.push(table([2800, 6838], [
      ['Scenario title', s.title], ['Author and module / course', s.author],
      ['Type of food premises', s.premises], ['Audit focus', s.focus],
      ['Date', new Date().toLocaleDateString('en-GB')]
    ].map(function (r) { return new D.TableRow({ children: [cell(r[0], 2800, { fill: GREY, bold: true }), cell(r[1], 6838)] }); })));

    // 2
    kids.push(h1('2. Learning objectives: what should students learn?'));
    kids.push(new D.Paragraph({ spacing: { after: 80 }, children: [new D.TextRun({ text: 'After this scenario, students will be able to:', italics: true })] }));
    var outs = s.outcomes.filter(function (x) { return !blank(x); });
    if (outs.length) outs.forEach(function (o, i) { kids.push(new D.Paragraph({ spacing: { after: 60 }, indent: { left: 360, hanging: 360 }, children: [new D.TextRun({ text: (i + 1) + '.  ' + o })] })); });
    else kids.push.apply(kids, paras(''));

    // 3
    kids.push(h1('3. The setting'));
    kids.push(table([2800, 6838], [
      ['Areas the student can visit', s.areas], ['Based on a real place?', s.realplace],
      ['Time of day and conditions', s.conditions], ['Where the student starts', s.start]
    ].map(function (r) { return new D.TableRow({ children: [cell(r[0], 2800, { fill: GREY, bold: true }), cell(r[1], 6838)] }); })));

    // 4
    kids.push(h1('4. What is wrong? (the faults to find)'));
    var faults = usedFaults(s);
    if (!faults.length) kids.push.apply(kids, paras(''));
    else {
      var count = { Critical: 0, Major: 0, Minor: 0 };
      faults.forEach(function (f) { if (count[f.sev] !== undefined) count[f.sev]++; });
      kids.push(new D.Paragraph({ spacing: { after: 120 }, children: [new D.TextRun({ text: faults.length + ' faults: ' + count.Critical + ' critical, ' + count.Major + ' major, ' + count.Minor + ' minor.', bold: true })] }));
      faults.forEach(function (f, i) {
        var rows = [new D.TableRow({ cantSplit: true, children: [cell([new D.Paragraph({ children: [new D.TextRun({ text: 'Fault ' + (i + 1) + (f.where ? ':  ' + f.where : ''), bold: true })] })], W, { fill: ACC, span: 2 })] })];
        [['How serious?', f.sev, SEVFILL[f.sev]], ['What the student sees', f.see], ['Why it matters', f.why], ['Hint if stuck', f.hint], ['Record that confirms it', f.record]]
          .concat(blank(f.clause) ? [] : [['BRCGS clause', f.clause]])
          .forEach(function (r) {
            rows.push(new D.TableRow({ cantSplit: true, children: [cell(r[0], 2400, { fill: GREY, bold: true }), cell(r[1], 7238, { fill: r[2], bold: r[0] === 'How serious?' })] }));
          });
        kids.push(table([2400, 7238], rows)); kids.push(gap());
      });
    }

    // 5
    kids.push(h1('5. Records students can look at'));
    var recs = s.records.filter(function (r) { return !blank(r.name); });
    if (!recs.length) kids.push.apply(kids, paras(''));
    else {
      var cols = [2300, 2000, 3538, 1800];
      var head = ['Record', 'Where kept', 'What it shows', 'Related fault'];
      var rrows = [new D.TableRow({ tableHeader: true, children: head.map(function (t, i) { return cell(t, cols[i], { fill: ACC, bold: true }); }) })];
      recs.forEach(function (r) { rrows.push(new D.TableRow({ cantSplit: true, children: [cell(r.name, cols[0]), cell(r.where, cols[1]), cell(r.shows, cols[2]), cell(r.related, cols[3])] })); });
      kids.push(table(cols, rrows));
    }

    // 6
    kids.push(h1('6. Assets to build'));
    var assets = s.assets.filter(function (a) { return !blank(a.name); });
    if (!assets.length) kids.push.apply(kids, paras(''));
    else {
      var acols = [2700, 1700, 1700, 1000, 1300, 1238];
      var ahead = ['Asset', 'Type', 'Where it appears', 'Fault', 'Reference', 'Notes'];
      var arows = [new D.TableRow({ tableHeader: true, children: ahead.map(function (t, i) { return cell(t, acols[i], { fill: ACC, bold: true }); }) })];
      assets.forEach(function (a) { arows.push(new D.TableRow({ cantSplit: true, children: [cell(a.name, acols[0]), cell(a.type, acols[1]), cell(a.where, acols[2]), cell(a.fault, acols[3]), cell(a.ref, acols[4]), cell(a.note, acols[5])] })); });
      kids.push(table(acols, arows));
    }

    // 7
    kids.push(h1('7. Things that look wrong but are fine'));
    kids.push.apply(kids, paras(s.redherrings));

    // 7
    kids.push(h1('8. What students do, and how it is marked'));
    [['t_walk', 'Walk around and spot faults'], ['t_mark', 'Mark each fault they find'], ['t_class', 'Choose how serious it is (critical / major / minor)'], ['t_records', 'Open records to back up their finding'], ['t_cause', 'Write or choose a short explanation of the cause']]
      .forEach(function (t) {
        kids.push(new D.Paragraph({ spacing: { after: 40 }, children: [new D.TextRun({ text: s[t[0]] ? '☒  ' : '☐  ', font: 'Segoe UI Symbol' }), new D.TextRun(t[1])] }));
      });
    if (!blank(s.t_other)) kids.push(new D.Paragraph({ spacing: { after: 40 }, children: [new D.TextRun({ text: '☒  ', font: 'Segoe UI Symbol' }), new D.TextRun(s.t_other)] }));
    kids.push(gap());
    kids.push(table([2800, 6838], [['What counts as doing well?', s.success], ['Time limit?', s.timelimit]]
      .map(function (r) { return new D.TableRow({ children: [cell(r[0], 2800, { fill: GREY, bold: true }), cell(r[1], 6838)] }); })));

    // 9-11
    kids.push(h1('9. What students see at the end'));
    kids.push.apply(kids, paras(s.endnotes));
    kids.push(h1('10. Things still to decide or check'));
    kids.push.apply(kids, paras(s.unsure));
    kids.push(h1('11. After trying it with students'));
    kids.push(table([3200, 6438], [['Hardest faults to find', s.after_hard], ['Faults found easily', s.after_easy], ['What students said', s.after_said], ['What to change', s.after_change]]
      .map(function (r) { return new D.TableRow({ children: [cell(r[0], 3200, { fill: GREY, bold: true }), cell(r[1], 6438)] }); })));

    return new D.Document({
      creator: s.author || 'Scenario planner', title: s.title || 'Audit simulation scenario plan',
      styles: {
        default: { document: { run: { font: 'Arial', size: 22 } } },
        paragraphStyles: [{ id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 30, bold: true, color: INK, font: 'Arial' },
          paragraph: { spacing: { before: 360, after: 140 }, outlineLevel: 0, keepNext: true,
            border: { bottom: { style: D.BorderStyle.SINGLE, size: 18, color: ACC, space: 2 } } } }]
      },
      sections: [{
        properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
        footers: { default: new D.Footer({ children: [new D.Paragraph({ alignment: D.AlignmentType.CENTER, children: [new D.TextRun({ children: ['Page ', D.PageNumber.CURRENT, ' of ', D.PageNumber.TOTAL_PAGES], size: 18, color: '666666' })] })] }) },
        children: kids
      }]
    });
  }

  /* ---------- wire up ---------- */
  function init() {
    if (exampleMode) {
      $('#banner').hidden = false;
      $('#nav-example').setAttribute('aria-current', 'page');
      fill(EXAMPLE);
    } else {
      $('#nav-plan').setAttribute('aria-current', 'page');
      fill(load());
    }

    watchSections();
    $('#form').addEventListener('input', changed);
    $('#form').addEventListener('change', changed);
    $('#add-outcome').addEventListener('click', function () { addOutcome(); });
    $('#add-fault').addEventListener('click', function () { addFault(); });
    $('#add-record').addEventListener('click', function () { addRecord(); });
    $('#add-asset').addEventListener('click', function () { addAsset(); });
    $('#suggest-assets').addEventListener('click', suggestAssets);

    $('#dl-word').addEventListener('click', function () {
      if (!window.docx) { say('The Word export library did not load. Check your internet connection and reload.'); return; }
      var s = collect();
      window.docx.Packer.toBlob(buildDoc(s)).then(function (b) { download(b, filename(s, '.docx')); say('Word document downloaded.'); })
        .catch(function (e) { say('Could not create the Word document: ' + e.message); });
    });
    $('#dl-draft').addEventListener('click', function () {
      var s = collect(); download(new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' }), filename(s, '.draft.json')); say('Draft file downloaded.');
    });
    $('#dl-data').addEventListener('click', function () {
      var d = dataFile(); download(new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' }), (d.scenario || 'scenario') + '.faults.json'); say('Data file downloaded.');
    });
    $('#open-draft').addEventListener('change', function (e) {
      var f = e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () { try { fill(JSON.parse(r.result)); changed(); say('Draft opened.'); } catch (x) { say('That file is not a valid draft.'); } };
      r.readAsText(f); e.target.value = '';
    });
    $('#load-example').addEventListener('click', function () {
      if (exampleMode || confirm('Replace what is in the form with the pilot scenario?')) { fill(EXAMPLE); changed(); say('Pilot scenario loaded.'); }
    });
    $('#clear').addEventListener('click', function () {
      if (confirm('Clear the whole form? This cannot be undone.')) { fill(null); store(null); say('Form cleared.'); }
    });
  }
  init();
})();

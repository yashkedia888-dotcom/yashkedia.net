// Every piece in the gallery. Order here is hanging order.
// type is inferred from the file; ch is the chapter id below.
// Add a piece by adding a line; the wall resizes itself.

export const CHAPTERS = [
  {
    id: 'liftoff', room: 'observatory', numeral: 'I', title: 'Project Liftoff', style: 'Spring recruitment campaign',
    note: 'One campaign, one season. Recruitment told as a space race: Saturn V on black, orange and cream, type set like a mission patch. Joining a student club was made to feel like signing up for a launch.',
    effect: ['60+ recruits', '500+ at LaunchPoint', '50+ clubs on one lawn'],
  },
  {
    id: 'masters', room: 'salon', numeral: 'II', title: 'Winter Season', style: 'Renaissance collage posters',
    note: 'The winter before it. Borrowed marble used with a straight face for small campus rituals: David holding a matcha, the Colosseum for a general meeting, the Creation of Adam for a partnership.',
    effect: [],
  },
  {
    id: 'interfaces', room: 'terminal', numeral: 'III', title: 'Hackathons', style: 'c0mpiled-16, c0mpiled-5 and Bow Capital',
    note: 'Three hackathons and the films that filled them. Wireframe hands, a television left on in a green room, dollar bills with QR codes thrown off a ledge. Shot and cut by hand.',
    effect: ['3,000+ signups across four hackathons', '1,200+ builders in the room', '99 projects shipped in a day'],
  },
  {
    id: 'magazine', room: 'living', numeral: 'IV', title: 'Fall Season', style: 'Networking Night and editorial posters',
    note: 'The fall season, treated as issues of a magazine: one photograph, one serif headline, a founder on the cover. The same rule runs outdoors, on billboards and a thrift rack on Library Walk.',
    effect: ['199 RSVPs for Networking Night', '146 applications for 66 seats at the potluck'],
  },
  {
    id: 'houses', room: 'billiards', numeral: 'V', title: 'Clients', style: 'Hotels, jewellery and Air India',
    note: 'Work made for other people\'s names. Hotels at Christmas, weddings from the air, sarees and gold shot close in Dehradun; then packaging and storyboards for a national airline at McCann.',
    effect: ['100+ ads, reels and films', '30% lift in client engagement'],
  },
  {
    id: 'dor', room: 'courtyard', numeral: 'VI', title: 'Dor Foundation', style: 'Non-profit brand and films',
    note: 'The nonprofit I co-founded in 2020 to get high-potential students from low-income families into university, and the identity and films that carry it.',
    effect: ['750+ scholarships awarded', '35 partner colleges', '95% placement for graduating scholars'],
  },
  {
    id: 'eye', room: 'darkroom', numeral: 'VII', title: 'Photographs', style: '',
    note: 'What I point a camera at when nobody has asked me to.',
    effect: [],
  },
  {
    id: 'play', room: 'pool', numeral: '', title: 'Elsewhere', style: '3D and experiments',
    note: 'Buildings that do not exist yet.',
    effect: [],
  },
];

// The house: only these hang on the walls, in this order. Seven rooms, each one campaign or one
// kind of work, a handful of pieces each. Films on the walls are the ones shot and cut by hand.
// Keys are paths under assets/ without the extension.
export const SELECTION = {
  liftoff: ['work/project-liftoff', 'work/recruitment-calendar', 'canva/liftoff-networking-night-delorean', 'canva/liftoff-pitch-night-orbit', 'work/launchpoint-redbull', 'deep/liftoff-week-3-teaser'],
  masters: ['work/general-body-meeting', 'work/matcha-social', 'work/partnership', 'work/mini-hackathon', 'work/pitch-night', 'more/sic-speed-networking'],
  interfaces: ['work/compiled-16', 'work/compiled-5', 'work/bow-capital', 'more/c16-crt-teaser', 'deep/money-and-posters', 'deep/compiled16-three-yc-companies'],
  magazine: ['work/networking-night', 'work/salesathon', 'canva/billboard-times-square', 'reels2/pickleball-social'],
  houses: ['deep/mussoorie-winter-line-carnival', 'work/air-india-box', 'more/ai-lid-taste-has-no-class', 'reels/jw-christmas', 'reels2/fairfield-wedding', 'reels/dira-red-saree', 'deep/eera-bracelets', 'reels/kapoor'],
  dor: ['canva/dor-report-cover', 'work/dor-orientation', 'more/dor-documentary', 'reels2/dor-jingle'],
  eye: ['photos5/p5-01', 'london/ldn-02', 'photos5/p5-02', 'photos/photo-09', 'photos5/p5-03', 'london/ldn-04', 'photos5/p5-04', 'photos/photo-16', 'photos4/p4-02', 'photos5/p5-06'],
};

// The Index also lists these: good work that did not need wall space, the other finished reels,
// and the films that were assembled with Claude rather than cut by hand.
export const ALSO = {
  liftoff: ['work/info-night', 'more/liftoff-card-yash', 'deep/save-the-makerspace-reel', 'deep/launch-point-teaser', 'deep/launchpoint-recap', 'deep/info-night-t-minus-5'],
  masters: ['work/mafia-social', 'more/sic-matcha-reel', 'deep/mafia-social-reel'],
  interfaces: ['work/datahacks', 'deep/this-could-be-your-mom', 'deep/compiled5-voices', 'deep/bow-capital-ive-been-all-over', 'deep/bow-capital-uncle-sam', 'deep/datahacks-teaser', 'deep/compiled16-two-days-left', 'more/c16-keyart-animated', 'more/c16-judges-title', 'more/c16-prizes', 'reels/c16-mosaic', 'more/c16-eight-hours', 'reels/c16-four-hours', 'reels/c16-invisible', 'more/c16-ringdown', 'more/c16-behind-the-scenes'],
  magazine: ['canva/billboard-how-0', 'more/yc-summer-cover', 'work/voiceos-fireside', 'canva/hiring-marketing', 'canva/curated-clothes-banner', 'ig/DfdSXubuvvR', 'ig/DfisVKzOe-t', 'ig/Dfkgqw0uX_9', 'ig/Df0t-Xmutpt', 'ig/DfS82-ZOSwF', 'ig/Df1Be20zqyD', 'ig/DfoJh1mThUO', 'deep/demo-day-spring-2026', 'deep/join-startup-incubator', 'deep/umms-into-ideas', 'deep/linkup-recap', 'more/sic-tabling-interviews', 'more/sic-marketing-hiring', 'reels/voiceos', 'reels/nn-recap', 'reels/potluck-invite', 'reels/potluck-recap', 'ig/Df1Kucru9QB', 'reels/podcast-arjun', 'more/podcast-regular-people'],
  houses: ['work/air-india-mockup', 'more/ai-storyboard-pride', 'deep/floron-the-way-out', 'deep/floron-cooling-gas', 'deep/air-india-tastes-like-home', 'reels/eera', 'more/dira-three-drapes', 'deep/dira-purple-saree', 'more/kapoor-necklace', 'reels/bni-lohri', 'reels/solar-subsidy', 'work/bni-new-year', 'deep/maple-bear-new-year', 'deep/itm-lohri', 'deep/ventota-retail-logo'],
  dor: ['canva/dor-report-numbers', 'deep/dor-priyanka', 'deep/dor-weaving-dreams-invite', 'deep/dor-standee-sky', 'reels/dor-fifth-year'],
  eye: ['photos4/p4-03', 'photos4/p4-12', 'photos5/p5-05', 'photos4/p4-09', 'london/ldn-01', 'london/ldn-06', 'photos/photo-21', 'london/ldn-09', 'london/ldn-07', 'photos5/p5-07', 'photos5/p5-08', 'photos5/p5-09', 'photos5/p5-10', 'photos5/p5-11', 'photos5/p5-12', 'photos5/p5-13', 'photos5/p5-14', 'photos5/p5-15', 'photos5/p5-16', 'photos5/p5-17', 'photos5/p5-18', 'photos5/p5-19', 'photos5/p5-20', 'photos5/p5-21', 'photos5/p5-22', 'photos5/p5-23', 'photos5/p5-24', 'photos5/p5-25', 'photos5/p5-26', 'photos5/p5-27', 'photos5/p5-28', 'photos5/p5-29', 'photos5/p5-30', 'photos5/p5-31', 'photos5/p5-32', 'photos5/p5-33', 'photos5/p5-34', 'photos5/p5-35', 'photos5/p5-36', 'photos5/p5-37', 'photos5/p5-38', 'photos5/p5-39', 'photos5/p5-40', 'photos4/p4-01', 'photos4/p4-07', 'photos4/p4-08', 'photos4/p4-10', 'photos4/p4-13', 'photos4/p4-15', 'photos4/p4-16', 'photos4/p4-18', 'photos4/p4-19', 'photos4/p4-20', 'photos4/p4-21', 'photos4/p4-24', 'photos4/p4-25', 'photos/photo-27', 'photos/photo-02', 'photos2/lib-03', 'photos2/lib-04', 'photos2/lib-06', 'work/photo-ridge'],
  play: ['work/circulate-street-night', 'work/circulate-aerial', 'work/circulate-facade-night', 'deep/ssam-jagae-app-icon'],
};

export const INFLUENCES = [
  'A$AP Rocky', 'Virgil Abloh', 'Vivienne Westwood', 'Kanye West', 'Tyler, the Creator', 'Playboi Carti',
  'Tame Impala', 'Mac DeMarco', 'Pink Floyd', 'Nirvana', 'Kendrick Lamar', 'Drake', 'Banksy',
  'Stanley Kubrick', 'Andrei Tarkovsky', 'Christopher Nolan', 'Quentin Tarantino', 'Dexter Navy', 'Cole Sprouse',
  'Shai Gilgeous-Alexander',
];

const W = (file) => `assets/work/${file}`;

export const WORKS = [
  // ── liftoff ──
  { ch: 'liftoff', src: W('project-liftoff.jpg'), w: 1280, h: 1600, title: 'Project: Liftoff', client: 'Startup Incubator', year: '2026', medium: 'Recruitment campaign poster' },
  { ch: 'liftoff', src: W('liftoff-week.jpg'), w: 1280, h: 1600, title: 'Liftoff Recruitment Week', client: 'Startup Incubator', year: '2026', medium: 'Schedule poster' },
  { ch: 'liftoff', src: W('recruitment-calendar.jpg'), w: 1400, h: 1750, title: 'Recruitment Calendar', client: 'Startup Incubator', year: '2026', medium: 'Schedule poster' },
  { ch: 'liftoff', src: W('info-night.jpg'), w: 1080, h: 1350, title: 'Info Night', client: 'Startup Incubator', year: '2026', medium: 'Event poster' },
  { ch: 'liftoff', src: W('launchpoint-redbull.jpg'), w: 1080, h: 1350, title: 'LaunchPoint — Free Red Bull', client: 'Startup Incubator', year: '2026', medium: 'Event poster' },
  { ch: 'liftoff', src: W('launchpoint-wide.jpg'), w: 1400, h: 1120, title: 'LaunchPoint — #SaveTheMakerspace', client: 'Startup Incubator', year: '2026', medium: 'Campaign key visual' },

  // ── masters ──
  { ch: 'masters', src: W('general-body-meeting.jpg'), w: 1279, h: 1600, title: 'General Body Meeting', client: 'Startup Incubator', year: '2026', medium: 'Event poster' },
  { ch: 'masters', src: W('matcha-social.jpg'), w: 1400, h: 1400, title: 'Matcha Social', client: 'Startup Incubator', year: '2026', medium: 'Event poster' },
  { ch: 'masters', src: W('partnership.jpg'), w: 1279, h: 1600, title: 'Announcing Our New Partnership', client: 'Startup Incubator × Transpose Platform', year: '2026', medium: 'Announcement' },
  { ch: 'masters', src: W('mini-hackathon.jpg'), w: 1279, h: 1600, title: 'Mini Hackathon', client: 'Startup Incubator', year: '2026', medium: 'Event poster' },
  { ch: 'masters', src: W('pitch-night.jpg'), w: 1279, h: 1600, title: 'Pitch Night', client: 'Startup Incubator', year: '2026', medium: 'Event poster' },
  { ch: 'masters', src: W('architecture-of-innovation.jpg'), w: 1279, h: 1600, title: 'The Architecture of Innovation', client: 'Startup Incubator', year: '2026', medium: 'Winter recruitment schedule' },
  { ch: 'masters', src: W('meet-the-board.jpg'), w: 1194, h: 1600, title: 'Meet the Board', client: 'Startup Incubator', year: '2026', medium: 'Social cover' },
  { ch: 'masters', src: W('mafia-social.jpg'), w: 1279, h: 1600, title: 'Mafia Social', client: 'Startup Incubator', year: '2026', medium: 'Event poster' },
  { ch: 'masters', src: W('congratulations.jpg'), w: 1200, h: 1500, title: 'Congratulations', client: 'Startup Incubator', year: '2026', medium: 'Member spotlight' },

  // ── interfaces ──
  { ch: 'interfaces', src: W('compiled-16.jpg'), w: 1400, h: 1818, title: 'c0mpiled-16 — Invisible Interfaces', client: 'Startup Incubator × Transpose Platform', year: '2026', medium: 'Hackathon poster' },
  { ch: 'interfaces', src: W('compiled-5.jpg'), w: 1279, h: 1600, title: 'c0mpiled-5 / UCSD Hackathon', client: 'Startup Incubator × Transpose Platform', year: '2026', medium: 'Event poster' },
  { ch: 'interfaces', src: W('bow-capital.jpg'), w: 1400, h: 1556, title: 'Bow Capital Hackathon — Defense', client: 'Startup Incubator × DS3 × Bow Capital', year: '2026', medium: 'Event poster' },
  { ch: 'interfaces', src: W('datahacks.jpg'), w: 1080, h: 1350, title: 'DataHacks 2026 — Entrepreneurship Track', client: 'Startup Incubator × DS3', year: '2026', medium: 'Event poster' },
  { ch: 'interfaces', src: 'assets/reels/c16-invisible.mp4', poster: 'assets/reels/c16-invisible.jpg', w: 720, h: 1280, title: 'Invisible Interfaces', client: 'Startup Incubator × Transpose Platform', year: '2026', medium: 'Hackathon reel' },
  { ch: 'interfaces', src: 'assets/reels/c16-mosaic.mp4', poster: 'assets/reels/c16-mosaic.jpg', w: 720, h: 1280, title: 'All the People', client: 'Startup Incubator × Transpose Platform', year: '2026', medium: 'Hackathon reel' },
  { ch: 'interfaces', src: 'assets/reels/c16-four-hours.mp4', poster: 'assets/reels/c16-four-hours.jpg', w: 1280, h: 720, title: 'Four Hours Before', client: 'Startup Incubator × Transpose Platform', year: '2026', medium: 'Hackathon reel' },

  // ── magazine ──
  { ch: 'magazine', src: W('salesathon.jpg'), w: 1400, h: 1750, title: 'Sales-a-thon', client: 'Startup Incubator', year: '2026', medium: 'Event poster' },
  { ch: 'magazine', src: W('networking-night.jpg'), w: 1400, h: 1750, title: 'Networking Night', client: 'Startup Incubator × Red Bull', year: '2026', medium: 'Event poster' },
  { ch: 'magazine', src: W('nn-panel-1.jpg'), w: 1400, h: 1750, title: 'Networking Night Panel, No. 1', client: 'Startup Incubator', year: '2026', medium: 'Speaker series' },
  { ch: 'magazine', src: W('nn-panel-2.jpg'), w: 1400, h: 1750, title: 'Networking Night Panel, No. 2', client: 'Startup Incubator', year: '2026', medium: 'Speaker series' },
  { ch: 'magazine', src: W('voiceos-fireside.jpg'), w: 1400, h: 1750, title: 'VoiceOS Fireside Chat', client: 'Startup Incubator × VoiceOS', year: '2026', medium: 'Event poster' },
  { ch: 'magazine', src: W('gliderport-panel.jpg'), w: 1400, h: 1750, title: 'Gliderport Potluck — Get Hired', client: 'Startup Incubator', year: '2026', medium: 'Speaker series' },
  { ch: 'magazine', src: W('pickleball.jpg'), w: 1400, h: 1750, title: 'Pickleball', client: 'Startup Incubator', year: '2026', medium: 'Event poster' },
  { ch: 'magazine', src: W('hiring.jpg'), w: 1080, h: 1350, title: 'We Are Hiring — Content Producers', client: 'Startup Incubator', year: '2026', medium: 'Recruitment post' },
  { ch: 'magazine', src: 'assets/reels/nn-recap.mp4', poster: 'assets/reels/nn-recap.jpg', w: 1280, h: 720, title: 'Networking Night', client: 'Startup Incubator', year: '2026', medium: 'Event film' },
  { ch: 'magazine', src: 'assets/reels/potluck-invite.mp4', poster: 'assets/reels/potluck-invite.jpg', w: 1280, h: 720, title: 'An Invitation', client: 'Startup Incubator', year: '2026', medium: 'Invite film' },
  { ch: 'magazine', src: 'assets/reels/potluck-recap.mp4', poster: 'assets/reels/potluck-recap.jpg', w: 720, h: 1280, title: 'Potluck Social', client: 'Startup Incubator', year: '2026', medium: 'Event reel' },
  { ch: 'magazine', src: 'assets/reels/podcast-arjun.mp4', poster: 'assets/reels/podcast-arjun.jpg', w: 720, h: 1280, title: 'The Guy Next to Me', client: 'Startup Incubator Podcast', year: '2026', medium: 'Podcast reel' },
  { ch: 'magazine', src: 'assets/reels/voiceos.mp4', poster: 'assets/reels/voiceos.jpg', w: 720, h: 1280, title: 'VoiceOS', client: 'VoiceOS', year: '2026', medium: 'Promo animation' },

  // ── houses ──
  { ch: 'houses', src: 'assets/reels/jw-christmas.mp4', poster: 'assets/reels/jw-christmas.jpg', w: 1280, h: 720, title: 'Christmas at JW', client: 'JW Marriott', year: '2024', medium: 'Brand film' },
  { ch: 'houses', src: 'assets/reels/fairfield-wedding.mp4', poster: 'assets/reels/fairfield-wedding.jpg', w: 1280, h: 720, title: 'A Wedding at Fairfield', client: 'Fairfield by Marriott, Dehradun', year: '2024', medium: 'Venue film' },
  { ch: 'houses', src: 'assets/reels/dira-red-saree.mp4', poster: 'assets/reels/dira-red-saree.jpg', w: 720, h: 1280, title: 'Red Saree', client: 'Dira by Dimple', year: '2024', medium: 'Fashion reel' },
  { ch: 'houses', src: 'assets/reels/eera.mp4', poster: 'assets/reels/eera.jpg', w: 720, h: 1280, title: 'Eera', client: 'Eera Jewellery', year: '2024', medium: 'Jewellery reel' },
  { ch: 'houses', src: 'assets/reels/kapoor.mp4', poster: 'assets/reels/kapoor.jpg', w: 720, h: 1280, title: 'Kapoor Jewellers', client: 'Kapoor Jewellers', year: '2024', medium: 'Jewellery reel' },
  { ch: 'houses', src: 'assets/reels/solar-subsidy.mp4', poster: 'assets/reels/solar-subsidy.jpg', w: 1280, h: 720, title: 'Solar Subsidy Explainer', client: 'Government campaign', year: '2024', medium: 'Animated explainer' },
  { ch: 'houses', src: 'assets/reels/bni-lohri.mp4', poster: 'assets/reels/bni-lohri.jpg', w: 720, h: 720, title: 'Lohri', client: 'BNI Dehradun', year: '2024', medium: 'Motion graphic' },
  { ch: 'houses', src: W('bni-new-year.jpg'), w: 800, h: 800, title: 'Win Big This Year', client: 'BNI Dehradun', year: '2024', medium: 'Social post' },
  { ch: 'houses', src: W('itm-youth-day.jpg'), w: 800, h: 800, title: 'National Youth Day', client: 'ITM Dehradun', year: '2024', medium: 'Social post' },
  { ch: 'houses', src: W('maplebear.jpg'), w: 800, h: 800, title: 'Happy New Year', client: 'Maple Bear', year: '2024', medium: 'Social post' },

  // ── agency ──
  { ch: 'agency', src: W('air-india-box.jpg'), w: 1400, h: 608, title: 'Meal Fit for a Maharaja', client: 'Air India (concept)', year: '2026', medium: 'Refreshment box artwork' },
  { ch: 'agency', src: W('air-india-mockup.jpg'), w: 1400, h: 788, title: 'Meal Fit for a Maharaja — Box', client: 'Air India (concept)', year: '2026', medium: 'Packaging mockup' },

  // ── dor ──
  { ch: 'dor', src: W('dor-orientation.jpg'), w: 1143, h: 1600, title: 'Freshman Orientation Day', client: 'Dor Foundation', year: '2024', medium: 'Invitation' },
  { ch: 'dor', src: 'assets/reels/dor-fifth-year.mp4', poster: 'assets/reels/dor-fifth-year.jpg', w: 720, h: 1280, title: 'Five Years of Dor', client: 'Dor Foundation', year: '2025', medium: 'Anniversary reel' },

  // ── eye ──
  { ch: 'eye', src: W('photo-ridge.jpg'), w: 1200, h: 1600, title: 'Ridge', client: '', year: '', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-01.jpg', w: 1800, h: 1200, title: "Gallery visitor", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-02.jpg', w: 1200, h: 1800, title: "Red car window", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-03.jpg', w: 1800, h: 1200, title: "City at night", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-04.jpg', w: 1800, h: 1200, title: "Lamp shade", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-05.jpg', w: 1200, h: 1800, title: "Wet columns", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-06.jpg', w: 1800, h: 1200, title: "Horse through trees", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-07.jpg', w: 1800, h: 1200, title: "Wing mirror", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-08.jpg', w: 1200, h: 1800, title: "Framed drawing", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-09.jpg', w: 1800, h: 1200, title: "Gallery dome", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-10.jpg', w: 1800, h: 1200, title: "Badge and shadow", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-11.jpg', w: 1200, h: 1800, title: "Manor terrace", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-12.jpg', w: 1800, h: 1200, title: "Clouds from cab", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-13.jpg', w: 1800, h: 1200, title: "Pub from cab", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-14.jpg', w: 1200, h: 1800, title: "Floor lamp", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-15.jpg', w: 1800, h: 1200, title: "Pavement shadows", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-16.jpg', w: 1800, h: 1200, title: "Wheel over river", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-17.jpg', w: 1800, h: 1200, title: "Chair and shadow", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-18.jpg', w: 1800, h: 1200, title: "Weathered facade", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-19.jpg', w: 1800, h: 1200, title: "Tying a thread", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-20.jpg', w: 1800, h: 1200, title: "Raised glasses", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-21.jpg', w: 1800, h: 1200, title: "Hall doorway", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-22.jpg', w: 1800, h: 1200, title: "Cab passenger", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-23.jpg', w: 1800, h: 1200, title: "Car and glasshouse", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-24.jpg', w: 1800, h: 1200, title: "Corduroy", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-25.jpg', w: 1800, h: 1200, title: "Hotel sign", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-26.jpg', w: 1800, h: 1200, title: "Mirror self-portrait", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos/photo-27.jpg', w: 1800, h: 1200, title: "Walk to the manor", client: '', year: '2026', medium: 'Photograph' },

  // ── play ──
  { ch: 'play', src: W('circulate-street-night.jpg'), w: 1400, h: 876, title: 'Circulate — Street, Night', client: 'Personal', year: '2026', medium: '3D render, Blender' },
  { ch: 'play', src: W('circulate-aerial.jpg'), w: 1400, h: 876, title: 'Circulate — Aerial', client: 'Personal', year: '2026', medium: '3D render, Blender' },
  { ch: 'play', src: W('circulate-facade-night.jpg'), w: 1400, h: 876, title: 'Circulate — Facade, Open', client: 'Personal', year: '2026', medium: '3D render, Blender' },
  { ch: 'play', src: W('pool-party.jpg'), w: 1142, h: 1600, title: 'Pool Party', client: 'Personal', year: '2025', medium: 'Invitation' },
  { ch: 'play', src: W('anniversary-invite.jpg'), w: 1143, h: 1600, title: 'Twenty-Five Years', client: 'Personal', year: '2025', medium: 'Anniversary invitation' },

  // ── from the photo library ──
  { ch: 'eye', src: 'assets/photos2/lib-01.jpg', w: 1350, h: 1800, title: "Plane window", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-02.jpg', w: 1343, h: 1800, title: "Light trails", client: '', year: '2022', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-03.jpg', w: 1350, h: 1800, title: "Cistern columns", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-04.jpg', w: 1298, h: 1800, title: "Glass and fire", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-05.jpg', w: 1350, h: 1800, title: "Trees at dusk", client: '', year: '2022', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-06.jpg', w: 1800, h: 1350, title: "Red lasers", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-07.jpg', w: 1350, h: 1800, title: "Wet asphalt", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-08.jpg', w: 1338, h: 1800, title: "Blurred crosswalk", client: '', year: '2022', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-09.jpg', w: 1350, h: 1800, title: "Rose window", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-10.jpg', w: 1350, h: 1800, title: "Traffic light", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-11.jpg', w: 1350, h: 1800, title: "Pool water", client: '', year: '2025', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-12.jpg', w: 1350, h: 1800, title: "Glass bowl", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-13.jpg', w: 1350, h: 1800, title: "Jet engine", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-14.jpg', w: 1540, h: 1800, title: "Roadside motorbike", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-15.jpg', w: 1350, h: 1800, title: "City window", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-16.jpg', w: 1350, h: 1800, title: "Wing", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-17.jpg', w: 1350, h: 1800, title: "Pink sky", client: '', year: '2022', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos2/lib-18.jpg', w: 1350, h: 1800, title: "Light spectrum", client: '', year: '2023', medium: 'Photograph' },

  // ── from the second SD card ──
  { ch: 'eye', src: 'assets/photos3/sd2-01.jpg', w: 1800, h: 1200, title: "Dusk horizon", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos3/sd2-03.jpg', w: 1800, h: 1200, title: "Parking garage", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos3/sd2-04.jpg', w: 1800, h: 1200, title: "Teal haze", client: '', year: '2026', medium: 'Photograph' },

  // ── from the deep pass over the photo library ──
  { ch: 'eye', src: 'assets/photos4/p4-01.jpg', w: 1350, h: 1800, title: "Dashboard at dusk", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-02.jpg', w: 1350, h: 1800, title: "Lightwell", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-03.jpg', w: 1800, h: 1350, title: "Bending figure", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-04.jpg', w: 1350, h: 1800, title: "Purple blur", client: '', year: '2022', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-05.jpg', w: 1350, h: 1800, title: "Red mirror", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-06.jpg', w: 1350, h: 1800, title: "Moon and wires", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-07.jpg', w: 1800, h: 1350, title: "Orange smoke", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-08.jpg', w: 1350, h: 1800, title: "Rock spire", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-09.jpg', w: 1350, h: 1800, title: "Blue television", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-10.jpg', w: 1350, h: 1800, title: "Blue mirror", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-11.jpg', w: 1350, h: 1800, title: "Red beacons", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-12.jpg', w: 1350, h: 1800, title: "Pink wall, window", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-13.jpg', w: 1350, h: 1800, title: "Rear-view, rain", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-14.jpg', w: 1350, h: 1800, title: "Wet reflections", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-15.jpg', w: 1350, h: 1800, title: "Purple sky", client: '', year: '2022', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-16.jpg', w: 1350, h: 1800, title: "Amber chamber", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-17.jpg', w: 1350, h: 1800, title: "Red car, reflection", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-18.jpg', w: 1350, h: 1800, title: "Car stereo", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-19.jpg', w: 1350, h: 1800, title: "Window, black and white", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-20.jpg', w: 1350, h: 1800, title: "Stairwell", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-21.jpg', w: 1800, h: 1350, title: "City lights", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-22.jpg', w: 1350, h: 1800, title: "Lens, tunnel", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-23.jpg', w: 1350, h: 1800, title: "Red signal", client: '', year: '2022', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-24.jpg', w: 1350, h: 1800, title: "Cable car", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-25.jpg', w: 1350, h: 1800, title: "Two at sunset", client: '', year: '2025', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-26.jpg', w: 1349, h: 1800, title: "Red doorway", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-27.jpg', w: 1350, h: 1800, title: "Contrail", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-28.jpg', w: 1350, h: 1800, title: "Passing building", client: '', year: '2022', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-29.jpg', w: 1350, h: 1800, title: "Light streaks", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-30.jpg', w: 1350, h: 1800, title: "Tilted dune", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-31.jpg', w: 1350, h: 1800, title: "Escalator", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-32.jpg', w: 1350, h: 1800, title: "Pink stairwell", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-33.jpg', w: 1350, h: 1800, title: "Column through columns", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-34.jpg', w: 1350, h: 1800, title: "Mirror, black and white", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-35.jpg', w: 1350, h: 1800, title: "Sea wall", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-36.jpg', w: 1350, h: 1800, title: "Rain glass", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-37.jpg', w: 1350, h: 1800, title: "Gilded arch", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-38.jpg', w: 1350, h: 1800, title: "Skylight", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-39.jpg', w: 1350, h: 1800, title: "Lens, walkway", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-40.jpg', w: 1350, h: 1800, title: "Backlit bars", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-41.jpg', w: 1350, h: 1800, title: "Cave opening", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-42.jpg', w: 1350, h: 1800, title: "Empty theatre", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-43.jpg', w: 1350, h: 1800, title: "Glass towers", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-44.jpg', w: 1350, h: 1800, title: "Atrium", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos4/p4-45.jpg', w: 1800, h: 1350, title: "Derelict windows", client: '', year: '2024', medium: 'Photograph' },

  // ── second library pass: dogs, snow, landscapes, portraits, people ──
  { ch: 'eye', src: 'assets/photos5/p5-01.jpg', w: 1350, h: 1800, title: "Husky, snow road", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-02.jpg', w: 1800, h: 1350, title: "Red reader", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-03.jpg', w: 1800, h: 1350, title: "Red car, forest road", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-04.jpg', w: 1800, h: 1350, title: "Neon stage", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-05.jpg', w: 1800, h: 1350, title: "Driver, top down", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-06.jpg', w: 1800, h: 1350, title: "Golf cart, sunset", client: '', year: '2025', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-07.jpg', w: 1800, h: 1350, title: "Classic convertibles", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-08.jpg', w: 1350, h: 1800, title: "Three from above", client: '', year: '2025', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-09.jpg', w: 1800, h: 1350, title: "Ridges at sunrise", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-10.jpg', w: 1800, h: 1350, title: "Gilded dome", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-11.jpg', w: 1350, h: 1800, title: "Husky, snowfall", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-12.jpg', w: 1800, h: 1350, title: "Ski slope", client: '', year: '2025', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-13.jpg', w: 1800, h: 1350, title: "Bluff", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-14.jpg', w: 1350, h: 1800, title: "Suit and eucalyptus", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-15.jpg', w: 1800, h: 1350, title: "Yellow convertible, night", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-16.jpg', w: 1350, h: 1800, title: "Reading the menu", client: '', year: '2025', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-17.jpg', w: 1800, h: 1350, title: "Sunset, hand in hair", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-18.jpg', w: 1800, h: 1350, title: "Husky, courtyard", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-19.jpg', w: 1350, h: 1800, title: "Red jeep", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-20.jpg', w: 1350, h: 1800, title: "Quad bike", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-21.jpg', w: 1350, h: 1800, title: "Looking down", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-22.jpg', w: 1800, h: 1350, title: "Banded valley", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-23.jpg', w: 1800, h: 1350, title: "Bonfire", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-24.jpg', w: 1350, h: 1800, title: "Cones in a flood", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-25.jpg', w: 1800, h: 1350, title: "Tree and lagoon", client: '', year: '2025', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-26.jpg', w: 1350, h: 1800, title: "Banknotes", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-27.jpg', w: 1800, h: 1350, title: "Orange cliffs", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-28.jpg', w: 1350, h: 1800, title: "Round mirror", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-29.jpg', w: 1350, h: 1800, title: "Great dome", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-30.jpg', w: 1350, h: 1800, title: "Gondola", client: '', year: '2025', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-31.jpg', w: 1800, h: 1350, title: "Memorial in the rain", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-32.jpg', w: 1350, h: 1800, title: "Spreading tree", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-33.jpg', w: 1350, h: 1800, title: "Chrome nails", client: '', year: '2025', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-34.jpg', w: 1800, h: 1350, title: "Moon and lamps", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-35.jpg', w: 1350, h: 1800, title: "Cow at the gate", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-36.jpg', w: 1350, h: 1800, title: "Roadside stop", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-37.jpg', w: 1350, h: 1800, title: "Rickshaw", client: '', year: '2023', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-38.jpg', w: 1800, h: 1350, title: "Lagoon", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-39.jpg', w: 1800, h: 1350, title: "Sea floor", client: '', year: '2024', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/photos5/p5-40.jpg', w: 1800, h: 1350, title: "Figure in a field", client: '', year: '2026', medium: 'Photograph' },

  // ── London, September 2026 ──
  { ch: 'eye', src: 'assets/london/ldn-02.jpg', w: 1800, h: 1200, title: "Gallery visitor", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/london/ldn-04.jpg', w: 1800, h: 1200, title: "Painting through glass", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/london/ldn-01.jpg', w: 1800, h: 1200, title: "Cab window", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/london/ldn-06.jpg', w: 1800, h: 1200, title: "Gallery corner", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/london/ldn-09.jpg', w: 1800, h: 1200, title: "Bronze relief", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/london/ldn-07.jpg', w: 1800, h: 1200, title: "Arched panel", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/london/ldn-10.jpg', w: 1800, h: 1200, title: "Painted diptych", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/london/ldn-11.jpg', w: 1800, h: 1200, title: "Plinth relief", client: '', year: '2026', medium: 'Photograph' },
  { ch: 'eye', src: 'assets/london/ldn-12.jpg', w: 1800, h: 1200, title: "Statue with banner", client: '', year: '2026', medium: 'Photograph' },
];

// What plays in the house. Spotify's own player is embedded, so the music is licensed
// and nothing is hosted here. Swap these for any album or playlist link.
// A YouTube playlist plays full tracks without a login: { label: 'Clams Casino × Rocky', kind: 'youtube', id: '<the list= part of the playlist link>' }
export const SOUND = [
  { label: 'Portfolio Bangers', kind: 'youtube', id: 'PLGzVYwFq4Wwc' },
  { label: 'LONG.LIVE.A$AP', kind: 'album', id: '5WHY4T7LcWAJPb1ddChotC' },
  { label: 'LIVE.LOVE.A$AP', kind: 'album', id: '4l6EPpP9hjQrLb8qNB9eC5' },
];

export const PROFILE = {
  name: 'Yash Kedia',
  line: 'Creative marketing, branded content and media production',
  place: 'San Diego, California',
  email: 'yashkedia888@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yash-kedia-599312223',
  about: [
    'I make things people stop scrolling for: posters, reels, films and the identity systems that hold them together.',
    'At UC San Diego I run both marketing and events for Startup Incubator: sixteen people, twelve in marketing and four in events, across strategy, design, photography, film, motion, 3D, logistics and planning. I started as VP of Marketing and now hold Events as well, so I make the campaign and then fill the room it promises. The account went from zero to 2,000+ followers and close to two million views; four hackathons drew 3,000+ signups and more than 1,200 builders; Networking Night took 199 RSVPs; the Gliderport Potluck had 146 applications for 66 seats. Over the summer I was a creative intern at McCann in Gurugram, mostly on Air India: strategy, scripts, storyboards and edits for its films, and a refreshment box that reads like a comic. Around that, pieces for Dettol, Lizol, Maruti Suzuki, McDonald\'s, KFC, Mastercard and Google Gemini. Before that I produced ads and short films for hospitality, government and fashion clients at Zebrians, and cut 30+ short films for NazarBattu Productions.',
  ],
  cv: [
    { when: '2026', role: 'Creative Intern', where: 'McCann', place: 'Gurugram' },
    { when: '2026 —', role: 'Vice President, Marketing & Events', where: 'Startup Incubator', place: 'San Diego' },
    { when: '2024 — 25', role: 'Editor', where: 'NazarBattu Productions', place: 'Dehradun' },
    { when: '2024', role: 'Marketing & Supply Forecasting Intern', where: 'Ventota Retail', place: 'Kolkata' },
    { when: '2023 — 24', role: 'Content Producer', where: 'Zebrians Marketing Agency', place: 'Dehradun' },
    { when: '2020 —', role: 'Co-Founder & CMO', where: 'Dor Foundation', place: 'Dehradun' },
  ],
  numbers: [
    { n: '2,056', l: 'followers, built from zero' },
    { n: '~2M', l: 'views on the account' },
    { n: '3,000+', l: 'signups across four hackathons' },
    { n: '1,200+', l: 'builders who showed up' },
    { n: '199', l: 'RSVPs for Networking Night' },
    { n: '146', l: 'applications for 66 potluck seats' },
    { n: '7M+', l: 'views on films I edited' },
    { n: '750+', l: 'scholarships through Dor' },
  ],

};

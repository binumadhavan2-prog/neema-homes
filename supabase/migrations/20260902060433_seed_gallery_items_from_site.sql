-- Seeds the exact copy and photographs already shipping in the React
-- components, so switching the pages over to the database is a no-op
-- visually. Idempotent on (collection, slug).

insert into public.gallery_items
  (collection, slug, name, description, alt, href, span, image_path, sort_order)
values
  -- #/gallery tiles
  ('gallery','l-shaped-kitchen','L-Shaped Kitchen',null,'L-shaped kitchen in graphite and white handleless cabinetry with lit wall units','#/kitchen',12,'/images/kitchen-l-shaped.jpg',10),
  ('gallery','u-shaped-kitchen','U-Shaped Kitchen',null,'U-shaped kitchen in cream cabinetry with dark stone counters and a raised breakfast bar','#/kitchen',12,'/images/kitchen-u-shaped.jpg',20),
  ('gallery','crockery-shelf','Crockery Shelf',null,'Crockery unit in dark timber with lit open shelves, a stone back panel and closed storage beneath','#/dining',12,'/images/dining-crockery.jpg',30),
  ('gallery','bar-counter','Bar Counter',null,'Bar counter with stools, a stone top and lit bottle shelving behind','#/dining',12,'/images/dining-bar-counter.jpg',40),
  ('gallery','wash-counter','Wash Counter',null,'Wash counter with a stone top, vessel basin, brass wall tap and a lit mirror above floating storage','#/dining',12,'/images/dining-wash-counter.jpg',50),
  ('gallery','dressing-unit','Dressing Unit',null,'Dressing table with a mirror and drawers','#/bedroom',12,'/images/bedroom-dressing.avif',60),

  -- #/kitchen
  ('kitchen','island','Island Kitchen','A large central island for prep and gathering, wrapped in premium cabinetry and stone, in an open contemporary plan.','Kitchen with a central stone-topped island and dark shaker cabinetry',null,7,'/images/project-kitchen.jpg',10),
  ('kitchen','l-shaped','L-Shaped Kitchen','Cabinetry along two adjoining walls, turning an awkward corner into working storage. Suits apartments and villas alike.','L-shaped kitchen in graphite and white handleless cabinetry with lit wall units',null,5,'/images/kitchen-l-shaped.jpg',20),
  ('kitchen','parallel','Parallel Kitchen','Two facing runs of counter, keeping the cook between them. A clean, organised layout for a galley footprint.','Parallel kitchen with facing timber counter runs, marble splashback and pendant lighting',null,5,'/images/kitchen-parallel.jpg',30),
  ('kitchen','straight','Straight Kitchen','A single wall of modular cabinetry, minimal and unobtrusive. The efficient answer for a compact home.','Single-wall kitchen in taupe cabinetry with a wood-panelled backdrop and open shelving',null,7,'/images/kitchen-straight.jpg',40),
  ('kitchen','u-shaped','U-Shaped Kitchen','Counters and storage on three sides, giving the most capacity of any layout and a work triangle within easy reach.','U-shaped kitchen in cream cabinetry with dark stone counters and a raised breakfast bar',null,12,'/images/kitchen-u-shaped.jpg',50),

  -- #/bedroom
  ('bedroom','bed','Bed','Built to the room rather than to a standard size — headboard, storage base and side tables drawn as one piece, in a finish chosen with the rest of the room.','Bedroom with a slatted oak headboard wall, linen bedding and a brass wall light',null,7,'/images/project-bedroom.jpg',10),
  ('bedroom','wardrobe','Wardrobe','Floor-to-ceiling storage planned around what you own: hanging, shelving and drawers laid out to suit, with lit rails and soft-close throughout.','Walk-in wardrobe in dark oak with lit shelving and a stone-topped island',null,5,'/images/project-wardrobe.jpg',20),
  ('bedroom','dressing','Dressing Unit','Freestanding or run into the wardrobe, sized to the wall it sits on, with a lit mirror and drawers where you reach for them.','Dressing table with a mirror and drawers',null,12,'/images/bedroom-dressing.avif',30),

  -- #/dining
  ('dining','dining-table','Dining Table','The piece the room is planned around. Tops in solid timber, stone or glass, sized to the number of chairs you actually seat rather than to a standard length.','Dining room with a solid teak table, cane-back chairs and a tiered brass pendant',null,7,'/images/project-dining.jpg',10),
  ('dining','crockery-shelf','Crockery Shelf','Display and storage in one run — lit shelving above for the pieces you want seen, closed below for the ones you do not.','Crockery unit in dark timber with lit open shelves, a stone back panel and closed storage beneath',null,5,'/images/dining-crockery.jpg',20),
  ('dining','bar-counter','Bar Counter','Worked into the dining room rather than added to it, with bottle storage, glass racks and a top carrying the same stone as the kitchen.','Bar counter with stools, a stone top and lit bottle shelving behind',null,5,'/images/dining-bar-counter.jpg',30),
  ('dining','dining-chair','Dining Chair','Made to the table rather than bought to it, so height, reach and finish match the room instead of approximating it.','Upholstered dining chairs on slim black legs around a round dark timber table',null,7,'/images/dining-chair.webp',40),
  ('dining','wash-counter','Wash Counter','The wash point treated as part of the room: a counter, storage beneath and a mirror, finished to match rather than left as an afterthought.','Wash counter with a stone top, vessel basin, brass wall tap and a lit mirror above floating storage',null,12,'/images/dining-wash-counter.jpg',50),

  -- #/living
  ('living','sofas','Sofas','Made or specified as part of the room rather than bought separately, in leather or fabric chosen against the floor and the walls it sits between.','Living room with a long linen sofa, cane chairs and a marble coffee table',null,7,'/images/hero-living.jpg',10),
  ('living','display-unit','Display Unit','The wall the room faces. Screen, storage and lit shelving detailed as a single run, with equipment and cabling concealed.','Built-in media unit in oak and grey with lit display shelving',null,5,'/images/service-furniture-design.jpg',20),
  ('living','centre-table','Centre Table','Sized to the sofa and to the walkway around it, in timber, stone or both, so it suits the room rather than the showroom floor.',null,null,5,null,30),
  ('living','bookshelves','Bookshelves','Built floor to ceiling for books, objects and frames, with closed storage below for what should not be on show.','Black built-in bookshelves with closed storage beneath and a solid walnut desk',null,7,'/images/project-study.jpg',40),
  ('living','partition','Living–Dining Partition','A screen that keeps the dining table out of direct view while staying open to the light, often doubling as display.',null,null,12,null,50),
  ('living','prayer-unit','Prayer Unit','A shrine planned into the living room where a separate room is not possible, in carved timber and brass, detailed to the room''s palette.','Carved teak mandir on a raised stone plinth flanked by standing brass lamps',null,6,'/images/project-pooja.jpg',60),
  ('living','chairs','Chairs','Occasional chairs made or chosen to work with the sofa without matching it, so the seating reads as a group rather than a set.',null,null,6,null,70),
  ('living','shoe-rack','Shoe Rack','Storage at the entrance sized to the wall beside the door, closed and vented, so the foyer stays clear.',null,null,12,null,80),

  -- #/decor
  ('decor','display-units','Display Units','A lit wall for the pieces worth showing — glass, ceramics, books — with a stone or timber back panel and closed storage carrying the rest.','Display unit in dark timber with lit open shelves and a stone back panel',null,7,'/images/dining-crockery.jpg',10),
  ('decor','open-shelves','Open Shelves','Set into a niche or run along a wall, in solid timber or slim steel, spaced for what you actually put on them rather than to a standard pitch.',null,null,5,null,20),
  ('decor','cabinets','Cabinets','Closed storage detailed to disappear: handleless fronts, grain matched across the run, and a top that continues the line of the room.',null,null,12,null,30),

  -- #/kids
  ('kids','bed','Bed','Single, bunk or storage beds built to the room, with drawers underneath and rails detailed into the frame rather than added on.',null,null,7,null,10),
  ('kids','study-unit','Study Unit','Desk, shelving and task light planned as one piece, at a height that suits the child now and can be raised as they grow.',null,null,5,null,20),
  ('kids','wardrobe-study','Wardrobe Cum Study Table','Wardrobe and desk in a single run, which frees the floor for everything else the room has to do.',null,null,12,null,30)
on conflict (collection, slug) do nothing;

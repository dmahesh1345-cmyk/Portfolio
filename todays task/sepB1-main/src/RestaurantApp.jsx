import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { Link, NavLink, Outlet, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReservation, addToCart, changeCartQuantity, deleteReservation, removeFromCart, updateReservation } from "./redux/userSlice";
import "./RestaurantApp.css";

const menuSections = [
  { id: "small-plates", name: "Small plates", note: "A little something to start", image: "photo-1547592180-85f173990554", dishes: [
    { id: "heirloom-tomatoes", name: "Heirloom tomatoes", description: "Whipped ricotta, basil oil, grilled sourdough", price: 320, tags: ["Vegetarian", "Gluten-free option"], image: "photo-1547592180-85f173990554" },
    { id: "crispy-artichokes", name: "Crispy artichokes", description: "Preserved lemon, green olive, herbs", price: 280, tags: ["Vegan", "Gluten-free"], image: "photo-1512621776951-a57141f2eefd" },
  ] },
  { id: "from-the-hearth", name: "From the hearth", note: "The long lunch, the last bite", image: "photo-1414235077428-338989a2e8c0", dishes: [
    { id: "roast-chicken", name: "Sunday roast chicken", description: "Half bird, sourdough jus, market greens", price: 560, tags: ["Gluten-free"], image: "photo-1532550907401-a500c9a57435" },
    { id: "mushroom-risotto", name: "Wild mushroom risotto", description: "Carnaroli rice, parmesan, thyme", price: 480, tags: ["Vegetarian", "Gluten-free"], image: "photo-1476124369491-e7addf5db371" },
    { id: "braised-short-rib", name: "Slow-braised short rib", description: "Celery root, red wine, crispy shallots", price: 680, tags: ["Gluten-free"], image: "photo-1544025162-d76694265947" },
  ] },
  { id: "telangana-table", name: "Telangana table", note: "Regional favorites, served with warmth", image: "photo-1547592180-85f173990554", dishes: [
    { id: "sarva-pindi", name: "Sarva Pindi", description: "Crisp rice-flour skillet bread with chana dal, peanuts, sesame, and curry leaves", price: 180, tags: ["Vegetarian", "Vegan", "Gluten-free"], image: "photo-1528207776546-365bb710ee93" },
    { id: "sakinalu", name: "Sakinalu", description: "Delicate rice-and-sesame spirals, fried crisp; a festive Telangana snack", price: 140, tags: ["Vegetarian", "Vegan", "Gluten-free"], image: "photo-1576618148400-f54bed99fcfd" },
    { id: "hyderabadi-biryani", name: "Chicken biryani, Hyderabadi dum style", description: "Fragrant basmati, slow-cooked chicken, saffron, mint, and warm whole spices", price: 420, tags: ["Contains chicken"], image: "photo-1589302168068-964664d93dc0" },
    { id: "mutton-dum-biryani", name: "Mutton dum biryani", description: "Tender mutton, basmati rice, fried onions, mint, and saffron", price: 520, tags: ["Contains mutton", "Spicy"], image: "photo-1633945274405-b6c8069047b0" },
    { id: "vegetable-dum-biryani", name: "Vegetable dum biryani", description: "Basmati rice, seasonal vegetables, saffron, mint, and whole spices", price: 340, tags: ["Vegetarian", "Vegan"], image: "photo-1599043513900-ed6fe01d3833" },
    { id: "egg-biryani", name: "Egg biryani", description: "Masala eggs layered with fragrant basmati and fried onions", price: 320, tags: ["Contains egg"], image: "photo-1596797038530-2c107229654b" },
    { id: "telangana-kodi-kura", name: "Telangana kodi kura", description: "Country-style chicken curry with roasted spices, tomato, and curry leaves", price: 390, tags: ["Contains chicken", "Spicy"], image: "photo-1603894584373-5ac82b2ae398" },
    { id: "hyderabadi-haleem", name: "Hyderabadi haleem", description: "Slow-cooked mutton, wheat, lentils, and warming spices", price: 360, tags: ["Contains mutton", "Contains wheat"], image: "photo-1574484284002-952d92456975" },
    { id: "chicken-65-pizza", name: "Chicken 65 pizza", description: "Hyderabadi-style chicken 65, mozzarella, onion, and curry-leaf chili oil", price: 480, tags: ["Contains chicken", "Spicy"], image: "photo-1513104890138-7c749659a591" },
    { id: "paneer-tikka-pizza", name: "Paneer tikka pizza", description: "Tandoor-spiced paneer, peppers, red onion, and mint chutney", price: 420, tags: ["Vegetarian"], image: "photo-1571407970349-bc81e7e96d47" },
    { id: "margherita-pizza", name: "Margherita pizza", description: "Tomato, mozzarella, basil, and a crisp hand-stretched base", price: 350, tags: ["Vegetarian"], image: "photo-1579751626657-72bc17010498" },
    { id: "hyderabadi-chicken-burger", name: "Hyderabadi chicken burger", description: "Grilled chicken, green-chili mayo, lettuce, and onion", price: 390, tags: ["Contains chicken", "Spicy"], image: "photo-1550547660-d9450f859349" },
    { id: "paneer-tikka-burger", name: "Paneer tikka burger", description: "Spiced paneer, mint yogurt, crunchy slaw, and soft bun", price: 320, tags: ["Vegetarian"], image: "photo-1568901346375-23c9450c58cd" },
    { id: "shami-kebab-burger", name: "Shami kebab burger", description: "Lamb and lentil kebab, pickled onion, and coriander chutney", price: 420, tags: ["Contains lamb"], image: "photo-1553979459-d2229ba7433a" },
    { id: "bagara-baingan", name: "Bagara baingan", description: "Baby eggplant in a rich peanut, sesame, and tamarind gravy", price: 290, tags: ["Vegetarian", "Vegan", "Gluten-free"], image: "photo-1585937421612-70a008356fbe" },
    { id: "mirchi-ka-salan", name: "Mirchi ka salan", description: "Green chilies in a tangy peanut and sesame sauce", price: 180, tags: ["Vegetarian", "Vegan", "Gluten-free", "Spicy"], image: "photo-1565557623262-b51c2513a641" },
    { id: "jonna-rotte", name: "Jonna rotte & pachi pulusu", description: "Sorghum flatbread with a bright, uncooked tamarind and herb broth", price: 220, tags: ["Vegetarian", "Vegan", "Gluten-free"], image: "photo-1509440159596-0249088772ff" },
    { id: "qubani-ka-meetha", name: "Qubani ka meetha", description: "Slow-stewed apricots, toasted almonds, and a spoon of cream", price: 240, tags: ["Vegetarian", "Gluten-free"], image: "photo-1488477181946-6428a0291777" },
    { id: "double-ka-meetha", name: "Double ka meetha", description: "Saffron-scented fried bread pudding with toasted cashews", price: 220, tags: ["Vegetarian", "Contains wheat"], image: "photo-1511381939415-e44015466834" },
    { id: "irani-chai", name: "Irani chai & Osmania biscuits", description: "Slow-brewed milky tea with buttery, lightly salty biscuits", price: 150, tags: ["Vegetarian", "Contains dairy", "Contains wheat"], image: "photo-1544787219-7f47ccb76574" },
  ] },
  { id: "something-sweet", name: "Something sweet", note: "A soft landing", image: "photo-1551024506-0bccd828d307", dishes: [
    { id: "olive-oil-cake", name: "Olive oil cake", description: "Citrus cream, roasted stone fruit", price: 290, tags: ["Vegetarian"], image: "photo-1519869325930-281384150729" },
    { id: "dark-chocolate", name: "Dark chocolate pot", description: "Sea salt, hazelnut praline, cream", price: 320, tags: ["Vegetarian", "Gluten-free"], image: "photo-1511381939415-e44015466834" },
    { id: "peach-sorbet", name: "Peach & basil sorbet", description: "Three scoops, made here every morning", price: 220, tags: ["Vegan", "Gluten-free"], image: "photo-1497034825429-c343d7c6a68f" },
  ] },
  { id: "at-the-bar", name: "At the bar", note: "A good pour, with or without", image: "photo-1514362545857-3bc16c4c7d1b", dishes: [
    { id: "garden-spritz", name: "Garden spritz", description: "Bitter orange, garden herbs, bubbles", price: 360, tags: ["Vegan", "Zero-proof available"], image: "photo-1514362545857-3bc16c4c7d1b" },
    { id: "house-lemonade", name: "House lemonade", description: "Meyer lemon, thyme, a little fizz", price: 140, tags: ["Vegan", "Zero-proof"], image: "photo-1513558161293-cdaf765edfd7" },
    { id: "by-the-glass", name: "Something by the glass", description: "A rotating pour from a small grower", price: 480, tags: ["Ask your server"], image: "photo-1510812431401-41d2bd2722f3" },
  ] },
];

const foodCategories = ["All", "Biryani", "Pizza", "Burgers", "Telangana", "Desserts", "Drinks"];
const foodCategoryDishIds = {
  Biryani: ["hyderabadi-biryani", "mutton-dum-biryani", "vegetable-dum-biryani", "egg-biryani"],
  Pizza: ["chicken-65-pizza", "paneer-tikka-pizza", "margherita-pizza"],
  Burgers: ["hyderabadi-chicken-burger", "paneer-tikka-burger", "shami-kebab-burger"],
  Telangana: ["sarva-pindi", "sakinalu", "hyderabadi-biryani", "mutton-dum-biryani", "vegetable-dum-biryani", "egg-biryani", "telangana-kodi-kura", "hyderabadi-haleem", "bagara-baingan", "mirchi-ka-salan", "jonna-rotte", "qubani-ka-meetha", "double-ka-meetha", "irani-chai"],
  Desserts: ["olive-oil-cake", "dark-chocolate", "peach-sorbet", "qubani-ka-meetha", "double-ka-meetha"],
  Drinks: ["garden-spritz", "house-lemonade", "by-the-glass", "irani-chai"],
};

const ThemeContext = createContext(null);
const fallbackRecipes = [
  { idMeal: "house-1", strMeal: "Garden pea & mint pasta", strArea: "Smart kitchen", strCategory: "Spring table", strMealThumb: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=240&q=80" },
  { idMeal: "house-2", strMeal: "Slow Sunday tomato sauce", strArea: "Smart kitchen", strCategory: "From the pantry", strMealThumb: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=240&q=80" },
  { idMeal: "house-3", strMeal: "Brown butter & sage gnocchi", strArea: "Smart kitchen", strCategory: "Cool evenings", strMealThumb: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=240&q=80" },
];
const today = new Date();
const todayLabel = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(today).toUpperCase();
const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const inrFormatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function filterReducer(state, action) {
  if (action.type === "query") return { ...state, query: action.value };
  if (action.type === "category") return { ...state, category: action.value };
  return state;
}

function useKitchenRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    const timeout = setTimeout(() => {
      controller.abort();
      if (!cancelled) { setRecipes(fallbackRecipes); setStatus("offline"); }
    }, 5000);
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=pasta", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Recipe book is unavailable");
        return response.json();
      })
      .then((data) => {
        clearTimeout(timeout);
        if (!cancelled) { setRecipes((data.meals ?? []).slice(0, 3)); setStatus("ready"); }
      })
      .catch(() => {
        clearTimeout(timeout);
        if (!cancelled) { setRecipes(fallbackRecipes); setStatus("offline"); }
      });
    return () => { cancelled = true; clearTimeout(timeout); controller.abort(); };
  }, []);
  return { recipes, status };
}

function FoodPhoto({ id, alt, className = "" }) {
  function useFallback(event) {
    const image = event.currentTarget;
    if (image.dataset.fallback) return;
    image.dataset.fallback = "true";
    image.src = "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85";
  }
  return <img className={className} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`} alt={alt} loading="lazy" onError={useFallback} />;
}

export default function RestaurantApp() {
  const [dark, setDark] = useState(false);
  return <ThemeContext.Provider value={{ dark, toggleTheme: () => setDark((value) => !value) }}><div className={`app ${dark ? "theme-night" : ""}`}>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />}><Route index element={<MenuOverview />} /><Route path=":dishId" element={<MenuDish />} /></Route>
        <Route path="cart" element={<Cart />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="journal" element={<Journal />} />
        <Route path="story" element={<OurStory />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </div></ThemeContext.Provider>;
}

function Layout() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const reservationCount = useSelector((state) => state.user.reservations.length);
  const cartCount = useSelector((state) => state.user.cart.reduce((total, item) => total + item.quantity, 0));
  const nav = [["/", "Today"], ["/menu", "Menu"], ["/cart", "Cart"], ["/reservations", "Reservations"], ["/journal", "Journal"], ["/story", "Our story"]];
  return <div className="layout">
    <aside className="sidebar">
      <Link className="brand" to="/"><span className="brand-mark">s</span><span>smart<span className="brand-period">.</span></span></Link>
      <span className="side-label">KITCHEN &amp; WINE</span>
      <nav className="main-nav" aria-label="Main navigation">{nav.map(([to, label], index) => <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}><span className="nav-index">0{index + 1}</span>{label}{label === "Reservations" && <span className="nav-count">{reservationCount}</span>}{label === "Cart" && <span className="nav-count">{cartCount}</span>}</NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="season-note"><span className="season-dot" /> IN THE KITCHEN <strong>AUTUMN MENU</strong></div><button className="theme-toggle" onClick={toggleTheme} type="button"><span>{dark ? "☼" : "◐"}</span>{dark ? "Daylight mode" : "Evening mode"}</button><div className="sidebar-user"><div className="mini-avatar">S</div><div><strong>Smart Kitchen</strong><span>Hyderabad, Telangana</span></div><span className="more-dots">···</span></div></div>
    </aside>
    <main className="main-content"><header className="mobile-header"><Link to="/" className="brand"><span className="brand-mark">s</span><span>smart<span className="brand-period">.</span></span></Link><button className="theme-toggle" onClick={toggleTheme} type="button" aria-label={dark ? "Switch to daylight theme" : "Switch to evening theme"}>{dark ? "☼" : "◐"}</button></header><Outlet /><footer className="page-footer"><span>Good food. No occasion needed.</span><span>Hyderabad, Telangana · Open daily</span></footer></main>
  </div>;
}

function PageHeading({ eyebrow, title, description, action }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="heading-description">{description}</p>}</div>{action}</div>;
}

function Home() {
  const reservations = useSelector((state) => state.user.reservations);
  const favorites = menuSections.flatMap((section) => section.dishes).filter((dish) => ["hyderabadi-biryani", "bagara-baingan", "qubani-ka-meetha"].includes(dish.id));
  return <div className="page page-home">
    <div className="welcome-line"><span>{todayLabel} &nbsp;·&nbsp; HYDERABAD, TELANGANA</span><span className="weather-note">✳ &nbsp; DINNER IS SERVED 5–10 PM</span></div>
    <section className="hero-banner"><FoodPhoto id="photo-1414235077428-338989a2e8c0" alt="A candlelit table set for dinner at Smart" className="hero-image" /><div className="hero-shade" /><div className="hero-copy"><span className="hero-kicker"><span /> GOOD THINGS TAKE A LITTLE TIME</span><h1>A table for<br />the <em>everyday.</em></h1><p>Seasonal cooking, a thoughtful glass, and room to stay awhile.</p><Link className="button button-light" to="/reservations">Come on in <span>↗</span></Link></div><div className="hero-caption"><span>HYDERABAD &nbsp;·&nbsp; TELANGANA</span><span>SEASONAL KITCHEN &nbsp; / &nbsp; EST. 2019</span></div></section>
    <section className="home-section"><div className="section-heading"><div><p className="eyebrow">A FEW HOUSE FAVORITES</p><h2>Made for passing around</h2></div><Link to="/menu" className="text-link">See the whole menu <span>↗</span></Link></div><div className="dish-list home-favorites">{favorites.map((dish) => <DishRow key={dish.id} dish={dish} />)}</div></section>
    <section className="trip-strip"><div><span className="eyebrow">PULL UP A CHAIR</span><h2>{reservations.length ? `${reservations.length} table${reservations.length === 1 ? "" : "s"} on your calendar` : "A good table is waiting."}</h2><p>Walk-ins welcome. Reservations make the evening easier.</p></div><Link to="/reservations" className="button button-dark">{reservations.length ? "Manage your table" : "Book a table"} <span>↗</span></Link></section>
  </div>;
}

function Menu() {
  return <div className="page"><PageHeading eyebrow="COOKED WITH THE SEASONS" title="Something for the table." description="A few things from nearby farms, cooked right here." /><Outlet /></div>;
}

function MenuOverview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, dispatch] = useReducer(filterReducer, { query: searchParams.get("q") ?? "", category: searchParams.get("category") ?? "All" });
  const searchRef = useRef(null);
  const dishes = menuSections.flatMap((section) => section.dishes);
  const categoryIds = foodCategoryDishIds[filters.category];
  const filtered = dishes.filter((dish) => `${dish.name} ${dish.description}`.toLowerCase().includes(filters.query.toLowerCase()) && (!categoryIds || categoryIds.includes(dish.id)));
  function updateQuery(value) {
    dispatch({ type: "query", value });
    setSearchParams((current) => { value ? current.set("q", value) : current.delete("q"); return current; }, { replace: true });
  }
  function updateCategory(value) {
    dispatch({ type: "category", value });
    setSearchParams((current) => { value === "All" ? current.delete("category") : current.set("category", value); return current; }, { replace: true });
  }
  return <>
    <div className="filter-row menu-filters"><label className="search-box"><span>⌕</span><input ref={searchRef} aria-label="Search dishes" placeholder="Find something good..." value={filters.query} onChange={(event) => updateQuery(event.target.value)} /><button type="button" className="search-shortcut" onClick={() => searchRef.current?.focus()}>/</button></label><div className="region-filters" aria-label="Filter menu by food type">{foodCategories.map((category) => <button type="button" key={category} className={`filter-chip ${filters.category === category ? "selected" : ""}`} onClick={() => updateCategory(category)}>{category}</button>)}</div></div>
    {filtered.length ? <div className="dish-list">{filtered.map((dish) => <DishRow key={dish.id} dish={dish} />)}</div> : <div className="empty-state"><span>⌕</span><h2>Nothing by that name.</h2><p>Try another search or food type.</p><button type="button" className="text-link" onClick={() => { dispatch({ type: "query", value: "" }); dispatch({ type: "category", value: "All" }); setSearchParams({}); }}>Clear filters ↗</button></div>}
  </>;
}

function DishRow({ dish }) {
  return <Link className="dish-row" to={`/menu/${dish.id}`}><FoodPhoto id={dish.image} alt={dish.name} className="dish-thumb" /><div className="dish-copy"><h3>{dish.name}</h3><p>{dish.description}</p><div className="dish-tags">{dish.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><strong>{inrFormatter.format(dish.price)}</strong></Link>;
}

function MenuDish() {
  const { dishId } = useParams();
  const dish = menuSections.flatMap((section) => section.dishes).find((item) => item.id === dishId);
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.user.cart.find((item) => item.id === dishId)?.quantity ?? 0);
  if (!dish) return <NotFound />;
  return <section className="category-detail"><Link to="/menu" className="back-link">← Full menu</Link><div className="dish-detail"><FoodPhoto id={dish.image} alt={dish.name} className="dish-detail-image" /><div className="dish-detail-copy"><p className="eyebrow">FROM THE SMART KITCHEN</p><h2>{dish.name}</h2><p>{dish.description}</p><div className="dish-tags">{dish.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><strong>{inrFormatter.format(dish.price)}</strong><button type="button" className="button button-dark" onClick={() => dispatch(addToCart(dish))}>Add to cart <span>＋</span></button>{cartQuantity > 0 && <p className="cart-feedback" role="status">{cartQuantity} in your cart.</p>}</div></div></section>;
}

function Cart() {
  const items = useSelector((state) => state.user.cart);
  const dispatch = useDispatch();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return <div className="page"><PageHeading eyebrow="YOUR ORDER" title="Your cart" description="A few good things for the table." />
    {items.length === 0 ? <div className="trip-empty"><span className="empty-sun">✳</span><p className="eyebrow">ROOM FOR SOMETHING GOOD</p><h2>Your cart is<br /><em>empty.</em></h2><p>Pick a favorite from the menu to get started.</p><Link className="button button-dark" to="/menu">Browse the menu <span>↗</span></Link></div> : <div className="cart-layout"><div className="cart-items">{items.map((item) => <article className="cart-item" key={item.id}><FoodPhoto id={item.image} alt={item.name} className="cart-item-image" /><div className="cart-item-info"><h2>{item.name}</h2><p>{item.description}</p><strong>{inrFormatter.format(item.price)}</strong><div className="cart-quantity"><button type="button" aria-label={`Remove one ${item.name}`} onClick={() => dispatch(changeCartQuantity({ id: item.id, change: -1 }))}>−</button><span>{item.quantity}</span><button type="button" aria-label={`Add one ${item.name}`} onClick={() => dispatch(changeCartQuantity({ id: item.id, change: 1 }))}>＋</button></div></div><button className="cart-remove" type="button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button></article>)}</div><aside className="cart-summary"><p className="eyebrow">ORDER SUMMARY</p><div><span>Items</span><span>{itemCount}</span></div><div className="cart-total"><strong>Subtotal</strong><strong>{inrFormatter.format(subtotal)}</strong></div><Link className="button button-dark" to="/menu">Continue browsing <span>↗</span></Link></aside></div>}
  </div>;
}

function Reservations() {
  const reservations = useSelector((state) => state.user.reservations);
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", date: todayDate, time: "19:00", partySize: "2", note: "" });
  const [errors, setErrors] = useState({});
  const nameInput = useRef(null);
  useEffect(() => { if (formOpen) nameInput.current?.focus(); }, [formOpen]);
  function openForm(reservation) {
    setForm(reservation ? { ...reservation, partySize: String(reservation.partySize) } : { name: "", email: "", date: todayDate, time: "19:00", partySize: "2", note: "" });
    setEditingId(reservation?.id ?? null);
    setErrors({});
    setFormOpen(true);
  }
  function submitReservation(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Add the name for your table.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.date || form.date < todayDate) nextErrors.date = "Choose today or a future date.";
    if (!form.time) nextErrors.time = "Choose a seating time.";
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    const reservation = { ...form, partySize: Number(form.partySize) };
    if (editingId) dispatch(updateReservation({ id: editingId, ...reservation }));
    else dispatch(addReservation({ id: `table-${Date.now()}`, ...reservation }));
    setFormOpen(false);
  }
  return <div className="page"><PageHeading eyebrow="WE SAVED YOU A CHAIR" title="Reservations" description="A table for two, or the whole lovely lot of you." action={<button className="button button-dark" onClick={() => openForm()} type="button">＋ Book a table</button>} />
    {formOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false); }}><form className="trip-form" onSubmit={submitReservation} noValidate><div className="form-heading"><div><p className="eyebrow">MAKE AN EVENING OF IT</p><h2>{editingId ? "Change your table" : "Come on in"}</h2></div><button className="close-button" type="button" aria-label="Close reservation form" onClick={() => setFormOpen(false)}>×</button></div><label>Your name<input ref={nameInput} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="The name on the table" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="field-error">{errors.name}</span>}</label><label>Email address<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />{errors.email && <span className="field-error">{errors.email}</span>}</label><div className="form-field-grid"><label>Date<input type="date" min={todayDate} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} aria-invalid={Boolean(errors.date)} />{errors.date && <span className="field-error">{errors.date}</span>}</label><label>Time<select value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })}><option>17:00</option><option>17:30</option><option>18:00</option><option>18:30</option><option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option><option>21:00</option></select>{errors.time && <span className="field-error">{errors.time}</span>}</label></div><label>Party size<select value={form.partySize} onChange={(event) => setForm({ ...form, partySize: event.target.value })}>{[1, 2, 3, 4, 5, 6, 7, 8].map((size) => <option key={size} value={size}>{size} {size === 1 ? "guest" : "guests"}</option>)}</select></label><label>A note for the kitchen <textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="A birthday, an allergy, a little surprise..." rows="2" /></label><button className="button button-dark form-submit" type="submit">{editingId ? "Save changes" : "Reserve this table"} <span>↗</span></button></form></div>}
    {reservations.length === 0 ? <div className="trip-empty"><span className="empty-sun">✳</span><p className="eyebrow">GOOD FOOD, GOOD COMPANY</p><h2>Nothing on the books.<br /><em>For now.</em></h2><p>Pick a night. We'll take care of the rest.</p><button className="button button-dark" type="button" onClick={() => openForm()}>Find your table <span>↗</span></button><p className="walk-in-note">Walk-ins are always welcome at the bar.</p></div> : <div className="trip-list">{reservations.map((reservation, index) => <article className="trip-row" key={reservation.id}><span className="trip-number">0{index + 1}</span><div className="trip-mark">{String(reservation.partySize).padStart(2, "0")}</div><div className="trip-details"><h2>{reservation.name}</h2><p>{reservation.date} · {reservation.time} · {reservation.partySize} guests{reservation.note && <span> · {reservation.note}</span>}</p></div><div className="trip-actions"><button type="button" onClick={() => openForm(reservation)}>Edit</button><button className="delete-action" type="button" onClick={() => dispatch(deleteReservation(reservation.id))}>Cancel</button></div></article>)}</div>}
  </div>;
}

function Journal() {
  const { recipes, status } = useKitchenRecipes();
  return <div className="page"><PageHeading eyebrow="NOTES FROM OUR KITCHEN" title="Journal" description="A little of what's growing, cooking, and coming up." /><section className="journal-feature"><FoodPhoto id="photo-1551183053-bf91a1d81141" alt="Fresh handmade pasta with herbs" className="journal-cover" /><div className="journal-feature-copy"><span className="eyebrow">THE SEASONAL TABLE &nbsp;·&nbsp; 4 MIN READ</span><h2>Let the market set the menu.</h2><p>We cook with what looks good right now. A little patience, a good pan, and ingredients that don't need much fuss.</p><span className="journal-byline">A NOTE FROM CHEF MARA &nbsp; / &nbsp; {todayLabel}</span></div></section><div className="section-heading journal-list-heading"><div><p className="eyebrow">A LITTLE INSPIRATION</p><h2>From the recipe book</h2></div><span className="live-label"><span /> LIVE RECIPES</span></div>{status === "loading" && <p className="feed-status">Turning a few pages...</p>}{status === "offline" && <p className="feed-status">Showing house notes while the recipe book reconnects.</p>}<div className="note-list">{recipes.map((recipe, index) => <article className="note-row recipe-row" key={recipe.idMeal}><span>0{index + 1}</span><img src={recipe.strMealThumb} alt={recipe.strMeal} /><div><p className="eyebrow">{recipe.strArea} &nbsp;·&nbsp; {recipe.strCategory}</p><h3>{recipe.strMeal}</h3><p>From the wider table: a recipe to inspire a slow afternoon in the kitchen.</p></div><span className="note-arrow">↗</span></article>)}</div></div>;
}

function OurStory() {
  const { dark } = useContext(ThemeContext);
  const reservations = useSelector((state) => state.user.reservations);
  return <div className="page"><PageHeading eyebrow="A NEIGHBORHOOD KIND OF PLACE" title="Our story" description="Good food, made with care. No special occasion required." /><section className="story-layout"><div className="story-image-wrap"><FoodPhoto id="photo-1559339352-11d035aa65de" alt="A welcoming neighborhood restaurant dining room" className="story-image" /><span>OUR DINING ROOM IN HYDERABAD</span></div><div className="story-copy"><p className="eyebrow">A TABLE FOR EVERYONE</p><h2>We think dinner should feel like coming home.</h2><p>Smart started with a simple idea: cook what's good, pour something lovely, and make a room where the evening can take its time.</p><p>Our menu follows the farms and seasons around Hyderabad. Our little team has been setting tables here since 2019, and we still get excited about what comes through the kitchen door.</p><Link to="/menu" className="text-link">Take a look at the menu ↗</Link><div className="story-facts"><div><strong>2019</strong><span>OUR FIRST SERVICE</span></div><div><strong>Local</strong><span>WHENEVER WE CAN</span></div><div><strong>{reservations.length}</strong><span>TABLES PLANNED BY YOU</span></div></div><div className="profile-tip"><span>✳</span><p>Come as you are. Leave a little happier than you came.</p></div><p className="theme-note">Viewing {dark ? "evening" : "daylight"} colors</p></div></section></div>;
}

function NotFound() {
  return <div className="not-found"><p className="eyebrow">A WRONG TURN</p><h1>This isn't quite<br /><em>our table.</em></h1><Link className="button button-dark" to="/">Back to Smart <span>↗</span></Link></div>;
}
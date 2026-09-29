import { useMemo, useState } from "react";
import { categories, products } from "./data/products.js";

const formatPrice = (amount) =>
  new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(amount);

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState({});
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("nb-NO");
    const matches = products.filter((product) => {
      const matchesQuery = product.name
        .toLocaleLowerCase("nb-NO")
        .includes(normalizedQuery);
      const matchesCategory =
        category === categories[0] || product.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sort === "price-asc")
      return [...matches].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      return [...matches].sort((a, b) => b.price - a.price);
    return matches;
  }, [category, query, sort]);

  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find((product) => product.id === id),
      quantity,
    }))
    .filter((item) => item.product);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  function addToCart(product) {
    if (product.stock < 1) return;
    setCart((current) => ({
      ...current,
      [product.id]: Math.min((current[product.id] || 0) + 1, product.stock),
    }));
    setConfirmation(`${product.name} lagt i kurven`);
    window.setTimeout(() => setConfirmation(""), 2400);
  }

  function updateQuantity(product, delta) {
    setCart((current) => {
      const nextQuantity = (current[product.id] || 0) + delta;
      if (nextQuantity < 1) return current;
      return {
        ...current,
        [product.id]: Math.min(nextQuantity, product.stock),
      };
    });
  }

  function removeFromCart(id) {
    setCart((current) => {
      const nextCart = { ...current };
      delete nextCart[id];
      return nextCart;
    });
  }

  function checkout() {
    if (cartCount === 0) return;
    const orderId = `DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
    setCart({});
    setCartOpen(false);
    setConfirmation(
      `Takk for at du prøvde! Demoordre ${orderId} er ikke sendt.`,
    );
    window.setTimeout(() => setConfirmation(""), 5000);
  }

  return (
    <div className="shop-shell">
      <div className="topline">
        <span>Små prosjekter. Store gleder.</span>
        <span>Inspirasjon til små og store prosjekter</span>
      </div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Hobbyhjørnet, hjem">
          <span className="wordmark-mark">
            h<span>·</span>
          </span>
          <span className="wordmark-name">
            Hobbyhjørnet<small>Ting å lage, ting å leke</small>
          </span>
        </a>
        <label className="search-box">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Hva har du lyst til å lage?"
            aria-label="Søk i produkter"
          />
        </label>
        <button
          className="cart-trigger"
          onClick={() => setCartOpen(true)}
          aria-label={`Åpne handlekurv, ${cartCount} varer`}>
          <span className="bag-icon" aria-hidden="true">
            ▱
          </span>
          <span>Kurv</span>
          <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <main id="top">
        <section className="intro-band" aria-labelledby="page-title">
          <div className="intro-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> En liten butikk for store ideer
            </span>
            <h1 id="page-title">
              Lag noe.
              <br />
              <em>Hva som helst.</em>
            </h1>
            <p>Fine ting til rolige kvelder, ville idéer og alt imellom.</p>
          </div>
          <div
            className="intro-art"
            role="img"
            aria-label="Fargerike kunstmaterialer klare til bruk">
            <div className="art-label">
              <span>
                Din neste
                <br />
                favorittidé
              </span>
              <span className="art-spark">✳</span>
            </div>
            <span className="art-index">01 / 06</span>
          </div>
          <div className="intro-note">
            <span className="note-star">✳</span>
            <span>
              Plukk opp en hobby.
              <br />
              Legg vekk mobilen.
            </span>
          </div>
        </section>

        <section className="catalog-section" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <span className="section-kicker">Butikken</span>
              <h2 id="catalog-title">
                Finn din greie<span>.</span>
              </h2>
            </div>
            <label className="sort-control">
              <span>Sorter</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sorter produkter">
                <option value="featured">Anbefalt</option>
                <option value="price-asc">Pris: lav til høy</option>
                <option value="price-desc">Pris: høy til lav</option>
              </select>
            </label>
          </div>

          <div className="catalog-layout">
            <aside className="filters" aria-label="Produktkategorier">
              <span className="filter-label">Utforsk</span>
              {categories.map((item, index) => (
                <button
                  key={item}
                  className={`filter-button ${category === item ? "is-active" : ""}`}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}>
                  <span className="filter-symbol" aria-hidden="true">
                    {["✳", "◒", "△", "▦"][index]}
                  </span>
                  {item}
                  {category === item && (
                    <span className="filter-arrow" aria-hidden="true">
                      ↗
                    </span>
                  )}
                </button>
              ))}
              <div className="filter-aside-note">
                <span>Hobbyfakta</span>
                <p>Det finnes ikke feil måter å begynne på.</p>
                <i aria-hidden="true">✳</i>
              </div>
            </aside>

            <div className="product-area">
              <div className="result-line">
                <span>{visibleProducts.length} fine funn</span>
                <span>
                  Håndplukket for deg <b>↗</b>
                </span>
              </div>
              {visibleProducts.length > 0 ? (
                <div className="product-grid">
                  {visibleProducts.map((product, index) => (
                    <article
                      className="product-card"
                      key={product.id}
                      style={{ "--card-index": index }}>
                      <button
                        className="product-image-button"
                        onClick={() => setActiveProduct(product)}
                        aria-label={`Se detaljer om ${product.name}`}>
                        <img
                          src={product.image}
                          alt={product.alt}
                          loading="lazy"
                        />
                        <span
                          className={`product-label ${product.stock === 0 ? "label-muted" : ""}`}>
                          {product.label}
                        </span>
                        <span className="image-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </button>
                      <div className="product-meta">
                        <span>{product.category}</span>
                        <span className="stock-line">
                          <i
                            className={
                              product.stock === 0
                                ? "stock-dot out"
                                : "stock-dot"
                            }
                          />
                          {product.stock === 0
                            ? "Utsolgt"
                            : `${product.stock} på lager`}
                        </span>
                      </div>
                      <button
                        className="product-name"
                        onClick={() => setActiveProduct(product)}>
                        {product.name}
                      </button>
                      <div className="product-buy-row">
                        <span className="product-price">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          className="add-button"
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          aria-label={
                            product.stock === 0
                              ? `${product.name} er utsolgt`
                              : `Legg ${product.name} i kurven`
                          }>
                          <span aria-hidden="true">＋</span>
                          <span>
                            {product.stock === 0 ? "Utsolgt" : "Legg i kurv"}
                          </span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-results">
                  <span aria-hidden="true">⌕</span>
                  <h3>Ingen treff denne gangen.</h3>
                  <p>Prøv et annet søk, eller se alt vi har.</p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setCategory(categories[0]);
                    }}>
                    Vis alle produkter <span aria-hidden="true">↗</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>
          Hobbyhjørnet <b>✳</b>
        </span>
        <span>Et undervisningsprosjekt · demo, ikke en ekte nettbutikk</span>
        <a href="#top">Til toppen ↑</a>
      </footer>

      {confirmation && (
        <div className="toast" role="status">
          <span aria-hidden="true">✓</span>
          {confirmation}
        </div>
      )}

      {activeProduct && (
        <div
          className="overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveProduct(null);
          }}>
          <section
            className="detail-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title">
            <button
              className="close-button"
              onClick={() => setActiveProduct(null)}
              aria-label="Lukk produktdetaljer">
              ×
            </button>
            <div className="detail-image">
              <img src={activeProduct.image} alt={activeProduct.alt} />
            </div>
            <div className="detail-copy">
              <span className="section-kicker">{activeProduct.category}</span>
              <h2 id="detail-title">{activeProduct.name}</h2>
              <p>{activeProduct.description}</p>
              <span className="detail-stock">
                <i
                  className={
                    activeProduct.stock === 0 ? "stock-dot out" : "stock-dot"
                  }
                />
                {activeProduct.stock === 0
                  ? "For øyeblikket utsolgt"
                  : `${activeProduct.stock} på lager`}
              </span>
              <div className="detail-buy">
                <strong>{formatPrice(activeProduct.price)}</strong>
                <button
                  className="primary-button"
                  onClick={() => addToCart(activeProduct)}
                  disabled={activeProduct.stock === 0}>
                  Legg i kurv <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {cartOpen && (
        <div
          className="overlay cart-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title">
            <div className="drawer-heading">
              <div>
                <span className="section-kicker">Handlekurven din</span>
                <h2 id="cart-title">
                  Kurv <span>({cartCount})</span>
                </h2>
              </div>
              <button
                className="close-button"
                onClick={() => setCartOpen(false)}
                aria-label="Lukk handlekurv">
                ×
              </button>
            </div>
            {cartItems.length ? (
              <>
                <div className="cart-lines">
                  {cartItems.map(({ product, quantity }) => (
                    <div className="cart-line" key={product.id}>
                      <img src={product.image} alt="" />
                      <div className="cart-line-info">
                        <span>{product.category}</span>
                        <strong>{product.name}</strong>
                        <b>{formatPrice(product.price * quantity)}</b>
                        <div className="quantity-control">
                          <button
                            onClick={() => updateQuantity(product, -1)}
                            aria-label={`Reduser ${product.name}`}>
                            −
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product, 1)}
                            disabled={quantity >= product.stock}
                            aria-label={`Øk ${product.name}`}>
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Fjern ${product.name}`}>
                        Fjern
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-bottom">
                  <div className="subtotal">
                    <span>Sum</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>
                  <p>Frakt beregnes ikke i denne demoen.</p>
                  <button
                    className="primary-button checkout-button"
                    onClick={checkout}>
                    Gå til demo-bekreftelse <span aria-hidden="true">↗</span>
                  </button>
                  <small>
                    Ingen betaling eller ekte bestilling blir gjennomført.
                  </small>
                </div>
              </>
            ) : (
              <div className="cart-empty">
                <span aria-hidden="true">↘</span>
                <h3>Her var det tomt.</h3>
                <p>Det er alltid plass til én god idé til.</p>
                <button
                  className="primary-button"
                  onClick={() => setCartOpen(false)}>
                  Se i butikken <span aria-hidden="true">↗</span>
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;

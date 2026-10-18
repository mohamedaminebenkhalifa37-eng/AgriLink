/* AgriPlace — interface (HTML/CSS/JS pur). L'API PHP est dans backend/api.php. */
(function () {
  "use strict";

  var API_URL = "backend/api.php";
  var ALL = "Toutes les catégories";
  var DEFAULT_IMAGE = "https://images.unsplash.com/photo-1614977645540-7abd88ba8e56?auto=format&fit=crop&w=900&q=85";

  /* Données de démonstration, utilisées si PHP/MySQL n'est pas démarré. */
  var fallbackProducts = [
    { id: 1, title: "Tracteur John Deere 5075E", price: 32500, category: "Matériel agricole", location: "Orléans, Loiret", details: "2019 · 1 250 h", image_url: "https://images.unsplash.com/photo-1614977645540-7abd88ba8e56?auto=format&fit=crop&w=900&q=85", seller: "Ferme des Vallons" },
    { id: 2, title: "Tracteur Massey Ferguson 5711", price: 44900, category: "Véhicules", location: "Auch, Gers", details: "2021 · 890 h", image_url: "https://images.unsplash.com/photo-1606739211185-2c846d734a6d?auto=format&fit=crop&w=900&q=85", seller: "EARL du Soleil" },
    { id: 3, title: "Pommes de terre — lot 2 tonnes", price: 680, category: "Récoltes & produits", location: "Arras, Pas-de-Calais", details: "Récolte 2025 · Bio", image_url: "https://images.unsplash.com/photo-1591586116988-62fe65164f8d?auto=format&fit=crop&w=900&q=85", seller: "Maraîchers du Nord" },
    { id: 4, title: "Semoir pneumatique 4 rangs", price: 8750, category: "Matériel agricole", location: "Poitiers, Vienne", details: "Très bon état", image_url: "https://images.unsplash.com/photo-1696441567908-6a04d49e1350?auto=format&fit=crop&w=900&q=85", seller: "Agri Services 86" },
    { id: 5, title: "Semences de blé tendre certifiées", price: 540, category: "Semences", location: "Chartres, Eure-et-Loir", details: "Lot 1 tonne · Certifié", image_url: "https://images.unsplash.com/photo-1591586116988-62fe65164f8d?auto=format&fit=crop&w=900&q=85", seller: "Coopérative de la Beauce" },
    { id: 6, title: "Engrais organique — palette 1 tonne", price: 320, category: "Intrants", location: "Rennes, Ille-et-Vilaine", details: "Conforme agriculture bio", image_url: "https://images.unsplash.com/photo-1591586116988-62fe65164f8d?auto=format&fit=crop&w=900&q=85", seller: "Bretagne Fertilisants" },
    { id: 7, title: "Lot de pièces pour tracteur Renault", price: 1250, category: "Pièces", location: "Dijon, Côte-d'Or", details: "Pièces d'origine · Neuf", image_url: "https://images.unsplash.com/photo-1696441567908-6a04d49e1350?auto=format&fit=crop&w=900&q=85", seller: "Atelier Mécagri" }
  ];

  var favorites = [];
  try { favorites = JSON.parse(localStorage.getItem("agriplace-favorites") || "[]"); } catch (e) { favorites = []; }

  var state = {
    products: fallbackProducts.slice(),
    favorites: new Set(Array.isArray(favorites) ? favorites.map(Number) : []),
    query: "",
    category: ALL
  };

  function $(selector) { return document.querySelector(selector); }

  var el = {
    grid: $("#product-grid"),
    empty: $("#empty-state"),
    count: $("#listing-count"),
    pill: $("#filter-pill"),
    input: $("#search-input"),
    select: $("#category-select"),
    modal: $("#sell-modal"),
    formView: $("#form-view"),
    successView: $("#success-view"),
    successText: $("#success-text"),
    form: $("#listing-form"),
    formMessage: $("#form-message"),
    toast: $("#toast"),
    menuButton: $("#menu-button"),
    mainNav: $("#main-nav")
  };

  /* ---------- Utilitaires ---------- */
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(price) || 0);
  }

  function icon(name) {
    return '<svg aria-hidden="true"><use href="#icon-' + name + '"></use></svg>';
  }

  var toastTimer;
  function showToast(message) {
    el.toast.textContent = message;
    el.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.toast.hidden = true; }, 3200);
  }

  /* ---------- Affichage des annonces ---------- */
  function filteredProducts() {
    var term = state.query.trim().toLocaleLowerCase("fr");
    return state.products.filter(function (product) {
      var content = (product.title + " " + product.location + " " + product.category + " " + (product.description || "")).toLocaleLowerCase("fr");
      var matchesText = !term || content.indexOf(term) !== -1;
      var matchesCategory = state.category === ALL || product.category === state.category;
      return matchesText && matchesCategory;
    });
  }

  function productCard(product) {
    var id = Number(product.id);
    var active = state.favorites.has(id);
    return '<article class="product-card">' +
      '<div class="product-image">' +
        '<img src="' + escapeHtml(product.image_url || DEFAULT_IMAGE) + '" alt="' + escapeHtml(product.title) + '" loading="lazy" />' +
        '<span class="product-type">' + escapeHtml(product.category) + '</span>' +
        '<button class="favorite' + (active ? " active" : "") + '" data-favorite="' + id + '" type="button" aria-pressed="' + active + '" aria-label="Ajouter aux favoris">' + icon("heart") + '</button>' +
      '</div>' +
      '<div class="product-body">' +
        '<span class="product-meta">' + escapeHtml(product.details || "Nouvelle annonce") + '</span>' +
        '<h3>' + escapeHtml(product.title) + '</h3>' +
        '<div class="location">' + icon("location") + " " + escapeHtml(product.location) + '</div>' +
        '<div class="product-footer">' +
          '<div><strong>' + formatPrice(product.price) + '</strong><small>Prix TTC</small></div>' +
          '<span class="seller-check" title="' + escapeHtml(product.seller || "Vendeur vérifié") + '">' + icon("check") + '</span>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderProducts() {
    var products = filteredProducts();
    el.grid.innerHTML = products.map(productCard).join("");
    el.empty.hidden = products.length !== 0;
    el.grid.hidden = products.length === 0;
    el.count.textContent = products.length + " annonce" + (products.length > 1 ? "s" : "");
    var label = state.query.trim() || (state.category !== ALL ? state.category : "");
    el.pill.hidden = !label;
    el.pill.innerHTML = label ? escapeHtml(label) + " " + icon("x") : "";
  }

  function scrollToListings() {
    $("#annonces").scrollIntoView({ behavior: "smooth" });
  }

  function resetSearch() {
    state.query = "";
    state.category = ALL;
    el.input.value = "";
    el.select.value = ALL;
    renderProducts();
  }

  /* ---------- Chargement depuis l'API PHP ---------- */
  function loadProducts() {
    return fetch(API_URL + "?action=listings", { headers: { Accept: "application/json" } })
      .then(function (response) {
        if (!response.ok) throw new Error("API indisponible");
        return response.json();
      })
      .then(function (payload) {
        if (payload && Array.isArray(payload.data) && payload.data.length) state.products = payload.data;
      })
      .catch(function () { /* Mode démo : le site reste utilisable sans PHP/MySQL. */ })
      .then(renderProducts);
  }

  /* ---------- Modale « Déposer une annonce » ---------- */
  function openModal() {
    el.form.reset();
    el.formMessage.textContent = "";
    el.formView.hidden = false;
    el.successView.hidden = true;
    el.modal.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(function () { el.form.elements.title.focus(); }, 0);
  }

  function closeModal() {
    el.modal.hidden = true;
    document.body.style.overflow = "";
  }

  function submitListing(event) {
    event.preventDefault();
    var submitButton = el.form.querySelector("[type='submit']");
    var data = new FormData(el.form);
    var listing = {
      title: String(data.get("title") || "").trim(),
      category: data.get("category"),
      price: Number(data.get("price")),
      location: String(data.get("location") || "").trim(),
      description: String(data.get("description") || "").trim()
    };

    submitButton.disabled = true;
    submitButton.textContent = "Publication...";
    el.formMessage.textContent = "";

    function restoreButton() {
      submitButton.disabled = false;
      submitButton.innerHTML = "Publier l’annonce " + icon("arrow");
    }

    function showSuccess(text) {
      el.successText.textContent = text;
      el.formView.hidden = true;
      el.successView.hidden = false;
      renderProducts();
    }

    fetch(API_URL + "?action=listings", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(listing)
    })
      .then(function (response) {
        return response.json().catch(function () { return null; }).then(function (payload) {
          return { status: response.status, ok: response.ok, payload: payload };
        });
      })
      .then(function (result) {
        if (result.ok && result.payload && result.payload.data) {
          state.products.unshift(result.payload.data);
          restoreButton();
          showSuccess("Votre annonce a bien été publiée. Vous pouvez la retrouver dans la liste.");
          return;
        }
        if (result.status === 400 || result.status === 422) {
          /* Refus de validation par le serveur : on affiche le message, on ne simule pas un succès. */
          restoreButton();
          el.formMessage.textContent = (result.payload && result.payload.message) || "Annonce invalide.";
          return;
        }
        throw new Error("Serveur indisponible");
      })
      .catch(function () {
        /* Mode démo (PHP/MySQL non démarré) : l'annonce est ajoutée localement, sans être enregistrée. */
        state.products.unshift({
          id: Date.now(),
          title: listing.title,
          category: listing.category,
          price: listing.price,
          location: listing.location,
          description: listing.description,
          details: "Nouvelle annonce",
          seller: "Votre exploitation",
          image_url: DEFAULT_IMAGE
        });
        restoreButton();
        showSuccess("Annonce ajoutée en mode démo : le serveur PHP/MySQL est indisponible, elle disparaîtra au rechargement.");
      });
  }

  /* ---------- Événements ---------- */
  $("#search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    state.query = el.input.value;
    state.category = el.select.value;
    renderProducts();
    scrollToListings();
  });

  document.querySelectorAll(".category-card").forEach(function (button) {
    button.addEventListener("click", function () {
      state.query = "";
      el.input.value = "";
      state.category = button.dataset.category || ALL;
      el.select.value = state.category;
      renderProducts();
      scrollToListings();
    });
  });

  el.grid.addEventListener("click", function (event) {
    var button = event.target.closest("[data-favorite]");
    if (!button) return;
    var id = Number(button.dataset.favorite);
    var nowActive = !state.favorites.has(id);
    if (nowActive) state.favorites.add(id); else state.favorites.delete(id);
    try { localStorage.setItem("agriplace-favorites", JSON.stringify(Array.from(state.favorites))); } catch (e) { /* stockage indisponible */ }
    button.classList.toggle("active", nowActive);
    button.setAttribute("aria-pressed", String(nowActive));
  });

  el.pill.addEventListener("click", resetSearch);
  $("#reset-search").addEventListener("click", resetSearch);
  $("#show-all").addEventListener("click", function () { resetSearch(); scrollToListings(); });
  $("#login-button").addEventListener("click", function () { showToast("La connexion arrive bientôt sur AgriPlace."); });

  document.querySelectorAll(".open-sell").forEach(function (button) { button.addEventListener("click", openModal); });
  $("#modal-close").addEventListener("click", closeModal);
  $("#finish-button").addEventListener("click", closeModal);
  el.modal.addEventListener("mousedown", function (event) { if (event.target === el.modal) closeModal(); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !el.modal.hidden) closeModal(); });
  el.form.addEventListener("submit", submitListing);

  function setMenu(open) {
    el.mainNav.classList.toggle("is-open", open);
    el.menuButton.setAttribute("aria-expanded", String(open));
    el.menuButton.innerHTML = icon(open ? "x" : "menu");
  }
  el.menuButton.addEventListener("click", function () { setMenu(!el.mainNav.classList.contains("is-open")); });
  el.mainNav.addEventListener("click", function () { setMenu(false); });

  /* ---------- Démarrage ---------- */
  renderProducts();
  loadProducts();
})();

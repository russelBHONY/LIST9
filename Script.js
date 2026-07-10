// ==========================================================
// script.js
// Ajuste dynamiquement la taille de la feuille A4 pour qu'elle
// reste proche des proportions réelles sur ordinateur, tout en
// s'adaptant automatiquement sur mobile.
// ==========================================================

(function () {
  const pageA4 = document.querySelector(".page-a4");

  // Ratio A4 réel (largeur / hauteur)
  const RATIO_A4 = 210 / 297;

  function ajusterTailleA4() {
    const largeurFenetre = window.innerWidth;
    const hauteurFenetre = window.innerHeight;

    // Sur mobile (largeur < 768px), on laisse le CSS gérer
    // la taille via width/aspect-ratio (voir media query CSS).
    if (largeurFenetre < 768) {
      pageA4.style.removeProperty("--a4-height");
      return;
    }

    // Sur ordinateur : on calcule la hauteur maximale possible
    // tout en gardant la feuille dans les limites de l'écran,
    // avec une petite marge pour l'esthétique.
    const margeVerticale = 0.9;   // 90% de la hauteur de la fenêtre
    const margeHorizontale = 0.9; // 90% de la largeur de la fenêtre

    let hauteurCible = hauteurFenetre * margeVerticale;
    let largeurCible = hauteurCible * RATIO_A4;

    // Si la largeur calculée dépasse l'espace horizontal disponible,
    // on recalcule à partir de la largeur pour rester dans l'écran.
    if (largeurCible > largeurFenetre * margeHorizontale) {
      largeurCible = largeurFenetre * margeHorizontale;
      hauteurCible = largeurCible / RATIO_A4;
    }

    pageA4.style.setProperty("--a4-height", `${hauteurCible}px`);
  }

  // Ajustement initial
  ajusterTailleA4();

  // Réajustement lors du redimensionnement de la fenêtre
  window.addEventListener("resize", ajusterTailleA4);

  // Réajustement lors du changement d'orientation (mobile/tablette)
  window.addEventListener("orientationchange", ajusterTailleA4);
})();
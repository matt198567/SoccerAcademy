import "./app.min.js";
function showMore() {
  const blocks = document.querySelectorAll("[data-fls-showmore='items']");
  if (!blocks.length) return;
  blocks.forEach(initBlock);
  function initBlock(block) {
    const content = block.querySelector("[data-fls-showmore-content]");
    const btn = block.querySelector("[data-fls-showmore-button]");
    if (!content || !btn) return;
    const items = Array.from(content.children);
    const batch = Number(content.dataset.flsShowmoreContent) || 2;
    let shownCount = batch;
    updateItems();
    toggleBtn();
    btn.addEventListener("click", () => {
      const prevHeight = content.offsetHeight;
      shownCount = Math.min(shownCount + batch, items.length);
      updateItems();
      toggleBtn();
      const newHeight = getAutoHeight(content);
      animateHeight(content, prevHeight, newHeight);
    });
    function updateItems() {
      items.forEach((item, i) => {
        item.style.display = i < shownCount ? "" : "none";
      });
    }
    function toggleBtn() {
      if (shownCount >= items.length) btn.style.display = "none";
      else btn.style.display = "";
    }
    function getAutoHeight(el) {
      const clone = el.cloneNode(true);
      clone.style.cssText = `
        position:absolute;
        visibility:hidden;
        height:auto;
        pointer-events:none;
      `;
      document.body.appendChild(clone);
      const h = clone.offsetHeight;
      clone.remove();
      return h;
    }
    function animateHeight(el, from, to) {
      el.style.height = from + "px";
      el.style.overflow = "hidden";
      el.style.transition = "height .35s ease";
      requestAnimationFrame(() => {
        el.style.height = to + "px";
      });
      el.addEventListener(
        "transitionend",
        () => {
          el.style.height = "";
          el.style.overflow = "";
          el.style.transition = "";
        },
        { once: true }
      );
    }
  }
}
window.addEventListener("load", showMore);

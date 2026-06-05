const photos = [
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Artocarpus%20Heterophyllus.jpg?width=1400",
    alt: "Jackfruits growing from a jackfruit tree trunk",
    caption: "Jackfruits growing on the planted tree"
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Leaves%20of%20a%20Jackfruit%20Tree.jpg?width=1400",
    alt: "Close view of healthy green jackfruit tree leaves",
    caption: "Healthy jackfruit leaves after planting care"
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Artocarpus%20heterophyllus%20Fruit%20%282%29.jpg?width=1400",
    alt: "Close view of a mature jackfruit",
    caption: "Mature jackfruit fruit for the exhibit"
  }

];

const galleryImage = document.querySelector("#galleryImage");
const galleryCaption = document.querySelector("#galleryCaption");
const photoCount = document.querySelector("#photoCount");
const photoFrame = document.querySelector(".photo-frame");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentPhoto = 0;

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const photo = photos[currentPhoto];

  photoFrame.classList.add("switching");
  window.setTimeout(() => {
    galleryImage.src = photo.src;
    galleryImage.alt = photo.alt;
    galleryCaption.textContent = photo.caption;
    photoCount.textContent = `${currentPhoto + 1} / ${photos.length}`;
    photoFrame.classList.remove("switching");
  }, 180);
}

prevButton.addEventListener("click", () => showPhoto(currentPhoto - 1));
nextButton.addEventListener("click", () => showPhoto(currentPhoto + 1));

showPhoto(0);

// Mobile swipe support for the Planting Day gallery
(function enableSwipe() {
  const frame = document.querySelector(".photo-frame");
  if (!frame) return;

  let startX = 0;
  let startY = 0;
  let active = false;
  let pointerId = null;

  const onPointerDown = (e) => {
    // Only left click / primary touch
    if (e.pointerType === "mouse" && e.button !== 0) return;

    active = true;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    frame.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = () => {
    // no-op; we decide on release based on delta
  };

  const onPointerUp = (e) => {
    if (!active) return;
    if (pointerId !== null && e.pointerId !== pointerId) return;

    active = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Horizontal swipe threshold
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // If user mostly swiped horizontally, change photo
    if (absX > 45 && absX > absY) {
      if (dx < 0) showPhoto(currentPhoto + 1); // swipe left -> next
      else showPhoto(currentPhoto - 1); // swipe right -> prev
    }
  };

  frame.addEventListener("pointerdown", onPointerDown);
  frame.addEventListener("pointermove", onPointerMove);
  frame.addEventListener("pointerup", onPointerUp);

  frame.addEventListener("pointercancel", () => {
    active = false;
    pointerId = null;
  });
})();


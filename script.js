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
const form = document.querySelector("#progressForm");
const timeline = document.querySelector("#timeline");
const fileInput = document.querySelector("#plantPhoto");
const dropZone = document.querySelector(".drop-zone");

let currentPhoto = 0;
let selectedImage = "";

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

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (!file) {
    selectedImage = "";
    return;
  }

  selectedImage = URL.createObjectURL(file);
  dropZone.querySelector("strong").textContent = file.name;
  dropZone.querySelector("small").textContent = "Ready to add to the growth timeline";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#progressTitle").value.trim();
  const note = document.querySelector("#progressNote").value.trim();

  if (!title || !note) return;

  const item = document.createElement("article");
  item.className = "timeline-item";
  item.innerHTML = `
    <img src="${selectedImage || photos[0].src}" alt="Uploaded jackfruit plant progress" />
    <div>
      <h4></h4>
      <p></p>
      <time></time>
    </div>
  `;

  item.querySelector("h4").textContent = title;
  item.querySelector("p").textContent = note;
  item.querySelector("time").textContent = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  timeline.prepend(item);
  form.reset();
  selectedImage = "";
  dropZone.querySelector("strong").textContent = "Choose plant photo";
  dropZone.querySelector("small").textContent = "PNG, JPG, or WEBP";
});

function addStarterTimeline() {
  const starterUpdates = [
    {
      title: "Planting completed",
      note: "The jackfruit sapling was planted in loose soil and watered deeply.",
      date: "Exhibition Day"
    },
    {
      title: "Care plan started",
      note: "Mulch was added around the base to protect roots and hold moisture.",
      date: "First Week"
    }
  ];

  starterUpdates.forEach((update, index) => {
    const item = document.createElement("article");
    item.className = "timeline-item";
    item.innerHTML = `
      <img src="${photos[index].src}" alt="Jackfruit progress sample" />
      <div>
        <h4>${update.title}</h4>
        <p>${update.note}</p>
        <time>${update.date}</time>
      </div>
    `;
    timeline.append(item);
  });
}

showPhoto(0);
addStarterTimeline();

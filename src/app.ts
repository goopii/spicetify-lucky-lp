import ShuffleIcon from "./shuffleIcon";
import "./styles.css";

const getRandomSavedAlbum = async (): Promise<void> => {
  const apiAlbums = await Spicetify.CosmosAsync.get(
    "https://api.spotify.com/v1/me/albums?limit=1"
  );
  const randomIndex = Math.floor(Math.random() * (apiAlbums.total + 1));

  const apiAlbumsOffset = await Spicetify.CosmosAsync.get(
    `https://api.spotify.com/v1/me/albums?limit=1&offset=${randomIndex - 1}`
  );
  const randomAlbum = apiAlbumsOffset.items[0].album;

  Spicetify.Platform.History.push(`/album/${randomAlbum.id}`);
};

async function main() {
  while (
    !Spicetify?.showNotification &&
    !Spicetify?.Platform?.History &&
    !Spicetify?.CosmosAsync
  ) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const newParentSelector = ".main-nowPlayingWidget-nowPlaying";
  let newParent = document.querySelector(newParentSelector);
  while (!newParent) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    newParent = document.querySelector(newParentSelector);
  }

  const btn = document.createElement("button");
  btn.id = "random-saved-album-btn";
  btn.className = "lucky-lp-button";
  btn.innerHTML = `<svg role="img">${ShuffleIcon}</svg> Random Album`;
  btn.addEventListener("click", getRandomSavedAlbum);

  newParent.appendChild(btn);
}

export default main;
// .Button-buttonTertiary-medium-iconOnly
// btn.className = "lucky-lp-button";

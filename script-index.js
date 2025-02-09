const list = document.querySelector(".list");

Object.entries(games).map(([key, value]) => {
  const linkElement = document.createElement("a");
  linkElement.innerText = value.name;
  linkElement.setAttribute("href", `./game.html?id=${key}`);

  const listElement = document.createElement("li");
  listElement.appendChild(linkElement);

  list.appendChild(listElement);
});

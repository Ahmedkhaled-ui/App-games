let test;
const load = document.querySelector(".load");
const details = document.querySelector("#details");
const show = document.querySelector("#show");
const exit = document.querySelector("#exit");
const nav = document.querySelector("#nav");

let dataDetails;

class Get {
  constructor(Category) {
    this.gameData = async (Category) => {
      load.classList.remove("d-none");
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "300e4073ddmsh6f784e55d29bf5ep1e12f7jsn2208d885af5c",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      const response = await fetch(
        ` https://free-to-play-games-database.p.rapidapi.com/api/games?category=${Category}`,
        options
      );
      if (response.ok) {
        test = await response.json();
        load.classList.add("d-none");
      }
    };
    load.classList.add("d-none");
  }
}

class Data {
  constructor() {
    let data = test;
    this.data = () => {
      let cartona = "";
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.title = element.title.split(" ").slice(0, 3).join(" ");
        this.thumbnail = element.thumbnail;
        this.short_description = element.short_description
          .split(" ")
          .slice(0, 10)
          .join(" ");
        this.platform = element.platform;
        this.genre = element.genre;
        this.id = element.id;

        cartona += `
                  

            <div    class="col-lg-4  ">
             <div class="bg-danger">
              <div   class="card     bg-card border-1 border-secondary p-2">
                 <img id=${this.id} src="${this.thumbnail}" class="card-img-top mb-2  " alt="${this.short_description}" />
                <div
                  id=${this.id}    class="card-body flex-grow-0 p-0 m-0 d-flex justify-content-between align-items-center">
          
                  <h5 id=${this.id} class="card-title  text-light p-0 my-2 ">${this.title}</h5>
                  <button id=${this.id}     class="btn btn-primary p-0  px-2 ">free</button>
                </div>
                <div id=${this.id} class="text-center  size text-secondary">
                ${this.short_description}
                </div>
  
  
                <div id="${this.id}" class="card-footer d-flex justify-content-between p-0 mt-3  ">
                  <p id=${this.id} class="p-1 bg-opacity-25 small fw-bold mt-2 bg-secondary rounded-2 text-light">
                    ${this.genre} 
                  </p>
                  <p id=${this.id} class="p-1 bg-opacity-25   small mt-2 fw-bold bg-secondary rounded-2 text-light">
                
                  ${this.platform}  
               </p>
                </div>
              </div>
              </div>
            </div>
          
        `;
      }

      document.getElementById("show").innerHTML = cartona;
    };
  }
}

class Getdetails {
  constructor(id) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "300e4073ddmsh6f784e55d29bf5ep1e12f7jsn2208d885af5c",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    this.getDetails = async () => {
      load.classList.remove("d-none");
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
        options
      );
      dataDetails = await response.json();
      load.classList.add("d-none");
    };
    load.classList.add("d-none");
  }
}

class Details {
  constructor() {
    let details = dataDetails;
    let cartona = "";
    this.details = () => {
      const element = details;
      this.title = element.title;
      this.platform = element.platform;
      this.thumbnail = element.thumbnail;
      this.game_url = element.game_url;
      this.genre = element.genre;
      this.description = element.description;
      this.status = element.status;

      cartona += ` <div class="row">
          <div class="col-md-4 d-flex flex-column gap-3 ">
            <div>
              <h1 class = "mb-3">Details Game</h1>
              <img class="w-100" src="${this.thumbnail}" alt="" />
            </div>
          </div>
          <div class="col-md-8">
            <div>
              <h1>Title: ${this.title}</h1>
              <h3 class="fs-4">Category: <span class="bg-span p-0  px-3 text-lowercase rounded-3 ">${this.genre}</span></h3>
              <h4 class="fs-4">Platform: <span class="bg-span p-0  px-3 text-lowercase rounded-3">${this.platform}</span></h4>
              <h4 class="fs-4">Status: <span class="bg-span p-0  px-3   text-lowercase rounded-3">${this.status}</span></h4>
              <p>${this.description}</p>
              <button class="btn btn-outline-warning mb-5 text-light">
                
                       <a class="text-decoration-none text-light " href="${this.game_url}"> show game </a>

              </button>
            </div>
          </div>
        </div>
      `;
      document.getElementById("details").innerHTML = cartona;
    };
  }
}

async function first() {
  let info = new Get("mmorpg");
  await info.gameData("mmorpg");
  let show = new Data();
  show.data();
}
first();
exit.addEventListener("click", () => {
  details.classList.add("d-none");
  show.classList.remove("d-none");
  nav.classList.remove("d-none");
  exit.classList.add("d-none");
});

show.addEventListener("click", (r) => {
  id = r.target.id;
  details.classList.remove("d-none");
  show.classList.add("d-none");
  nav.classList.add("d-none");
  exit.classList.remove("d-none");
  async function det() {
    let infoDetalis = new Getdetails(id);
    await infoDetalis.getDetails();
    let showDetails = new Details();
    showDetails.details();
  }
  det();
});
document.addEventListener("click", async function (r) {
  if (r.target.id == "mmorpg") {
    let info = new Get("mmorpg");
    await info.gameData("mmorpg");
    let show = new Data();
    show.data();
    mmorpg.classList.add("active");
    sailing.classList.remove("active");
    permadeath.classList.remove("active");
    superhero.classList.remove("active");
    pixel.classList.remove("active");
    shooter.classList.remove("active");
  }
  if (r.target.id == "shooter") {
    let info = new Get("shooter");

    await info.gameData("shooter");

    let show = new Data();
    show.data();
    mmorpg.classList.remove("active");
    sailing.classList.remove("active");
    permadeath.classList.remove("active");
    superhero.classList.remove("active");
    pixel.classList.remove("active");
    shooter.classList.add("active");
  }
  if (r.target.id == "sailing") {
    let info = new Get("sailing");
    await info.gameData("sailing");
    let show = new Data();
    show.data();
    mmorpg.classList.remove("active");
    sailing.classList.add("active");
    permadeath.classList.remove("active");
    superhero.classList.remove("active");
    pixel.classList.remove("active");
    shooter.classList.remove("active");
  }
  if (r.target.id == "permadeath") {
    let info = new Get("permadeath");
    await info.gameData("permadeath");
    let show = new Data();
    show.data();
    mmorpg.classList.remove("active");
    sailing.classList.remove("active");
    permadeath.classList.add("active");
    superhero.classList.remove("active");
    pixel.classList.remove("active");
    shooter.classList.remove("active");
  }
  if (r.target.id == "superhero") {
    let info = new Get("superhero");
    await info.gameData("superhero");
    let show = new Data();
    show.data();
    mmorpg.classList.remove("active");
    sailing.classList.remove("active");
    permadeath.classList.remove("active");
    superhero.classList.add("active");
    pixel.classList.remove("active");
    shooter.classList.remove("active");
  }
  if (r.target.id == "pixel") {
    let info = new Get("pixel");
    await info.gameData("pixel");
    let show = new Data();
    show.data();
    mmorpg.classList.remove("active");
    sailing.classList.remove("active");
    permadeath.classList.remove("active");
    superhero.classList.remove("active");
    pixel.classList.add("active");
    shooter.classList.remove("active");
  }
});

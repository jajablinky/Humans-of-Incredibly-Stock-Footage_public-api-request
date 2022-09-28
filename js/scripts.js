const searchContainer = document.getElementById("search-container");
const gallery = document.getElementById("gallery");

// ------------------------------------------
//  Search Bar
// ------------------------------------------

const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form> `;
searchContainer.insertAdjacentHTML("beforeend", searchHTML);

// ------------------------------------------
//  Load Profile
// ------------------------------------------

const loadProfiles = async () => {
  try {
    const url = "https://randomuser.me/api/?results=12";
    const res = await fetch(url);
    const data = await res.json();
    const originalProfiles = data.results;
    console.log(originalProfiles);
    let updatedProfiles = [];
    for (i = 0; i <= originalProfiles.length - 1; i++) {
      let object = {};
      object[
        "name"
      ] = `${originalProfiles[i].name.first}, ${originalProfiles[i].name.last}`;
      object["picture"] = originalProfiles[i].picture.large;
      object[
        "location"
      ] = `${originalProfiles[i].location.city}, ${originalProfiles[i].location.state}`;
      object["email"] = originalProfiles[i].email;
      object["cell"] = originalProfiles[i].cell;
      object["birthday"] = originalProfiles[i].dob.date;
      object[
        "detailedLocation"
      ] = `${originalProfiles[i].location.street.number} ${originalProfiles[i].location.street.name}, ${originalProfiles[i].location.city}, ${originalProfiles[i].location.state}, ${originalProfiles[i].location.postcode}`;
      updatedProfiles.push(object);
    }
    return updatedProfiles;
  } catch (err) {
    console.error(err);
  }
};

// ------------------------------------------
//  Show Initial Profiles
// ------------------------------------------

const showProfile = async () => {
  // get users from api
  const profiles = await loadProfiles();
  // display users
  for (i = 0; i <= profiles.length - 1; i++) {
    const galleryHTML = `<div class="card">
  <div class="card-img-container">
      <img class="card-img" src="${profiles[i].picture}" alt="profile picture">
  </div>
  <div class="card-info-container">
      <h3 id="name" class="card-name cap">${profiles[i].name}</h3>
      <p class="card-text">${profiles[i].email}</p>
      <p class="card-text cap">${profiles[i].location}</p>
  </div>
  </div>`;
    gallery.insertAdjacentHTML("beforeend", galleryHTML);
  }
};
showProfile();

// ------------------------------------------
//  Modal Window
// ------------------------------------------
const insertModalHTML =  (image, name, email, city, number, detailLocation, birthday) => document.body.insertAdjacentHTML("beforeend",
`<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${image}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${name}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${number}</p>
            <p class="modal-text">${detailLocation}</p>
            <p class="modal-text">${birthday}</p>
        </div>
    </div>

    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>`);


// ------------------------------------------
//  Helper Function
//  will need regex for the reformat
// ------------------------------------------

const reformatPhone = () => {};
const reformatBirthday = () => {};

// ------------------------------------------
//  Event Listeners
// ------------------------------------------

gallery.addEventListener('click', (e) => {
  // on empty space click doesnt register
  if(e.target.className !== 'gallery'){  
  console.log(e.target);
  insertModalHTML();
  }
});
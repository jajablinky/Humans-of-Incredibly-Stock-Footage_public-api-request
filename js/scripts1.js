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
    let updatedProfiles = [];
    for (i = 0; i <= 11; i++) {
      let object = {};
      object['name'] = `${originalProfiles[i].name.first}, ${originalProfiles[i].name.last}`;
      object['picture'] = originalProfiles[i].picture.large;
      object['location'] = `${originalProfiles[i].location.city}, ${originalProfiles[i].location.state}`
      object['email'] = originalProfiles[i].email;
      updatedProfiles.push(object);
    }
    return updatedProfiles;
  } catch (err) {
    console.error(err);
  }
};

// ------------------------------------------
//  Show Profile
// ------------------------------------------

const showProfile = async () => {
  // get users from api
  const profiles = await loadProfiles();
  // display users
  for (i = 0; i <= 11; i++){
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
};
}
showProfile()

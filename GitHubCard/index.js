/* Step 1: using axios, send a GET request to the following URL
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR
   github info! You will need to understand the structure of this
   data in order to use it to build your component function

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function,
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either
          follow this link in your browser https://api.github.com/users/<Your github name>/followers
          , manually find some other users' github handles, or use the list found
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.

          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const getGithub = axios.get('https://api.github.com/users/jchaing');

console.log(getGithub);

function makeCard(ghData) {
  // create elements
  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const url = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  // structure elements
  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  // add class to elements
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  // add attributes and contents
  img.src = ghData.avatar_url;
  name.textContent = ghData.name;
  userName.textContent = ghData.login;
  location.textContent = `Location: ${ghData.location}`;
  url.setAttribute('href', `${ghData.html_url}`);
  url.textContent = ghData.html_url;
  profile.textContent = `Profile: `;
  // appending anchor tag to p tag
  profile.appendChild(url);
  followers.textContent = `Followers: ${ghData.followers}`;
  following.textContent = `Following: ${ghData.following}`;
  bio.textContent = `Bio: ${ghData.bio}`;
  return card;
}

const cards = document.querySelector('.cards');

const makeGithubCard = async myData => {
  try {
    let res = await axios.get(myData);
    cards.appendChild(makeCard(res.data));
  } catch (err) {
    console.log(err);
  }
};

makeGithubCard('https://api.github.com/users/jchaing');

const followersGHCard = async followersData => {
  try {
    let res = await axios.get(followersData);
    res.data.forEach(data => {
      setTimeout(() => {
        cards.appendChild(makeCard(data));
      }, 1000);
    });
  } catch (err) {
    console.log(err);
  }
};

followersGHCard('https://api.github.com/users/jchaing/followers');

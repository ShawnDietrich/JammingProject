
let userToken = '';
let expiresIn = 0;
const clientID = "76f5cd4412374716bfb8bbc6101635e5";
const redirectURL = 'http://PlaylistCreate.surge.sh';

export const Spotify = {

  getAccessToken() {
    //condition if token already exists
    if (userToken) {
      return userToken;
    }
    let url = window.location.href;
    let accessTokenMatch = url.match(/access_token=([^&]*)/)
    let expiresInMatch = url.match(/expires_in=([^&]*)/)

    //condition if match token and expire exist in url
    if (accessTokenMatch && expiresInMatch) {
      userToken = accessTokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);
      //console.log('Expires in '+ expiresIn)
      //Clear values to prevent looping
      window.setTimeout(() => userToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
    }
  },

  search(userTerm) {
    const accessToken = Spotify.getAccessToken();
    const authHeader = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    //send search term to spotify
    const endPoint = `https://api.spotify.com/v1/search?type=track&q=${userTerm}`
    //send fetch to spotify api
    return fetch(endPoint, authHeader)
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.artists.album,
          uri: track.uri
        }));
      });
  },

  savePlaylist(playlistName, trackUris) {
    //return if either the name is empty or the uri is empty
    if (!playlistName || !trackUris.length) return

    //Get user ID
    const endPoint = "https://api.spotify.com/v1/me"
    const accessToken = this.getAccessToken();
    const authHeader = { Authorization: `Bearer ${accessToken}` }
    //Send user ID request
    let userId;
    return fetch(endPoint, { headers: authHeader })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        console.log("User ID " + userId);

        //set post request to create playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: authHeader,
          method: 'POST',
          body: JSON.stringify({ name: playlistName})
        }).then(response => response.json())
          .then(jsonResponse => {
            let playlistId = jsonResponse.id
            console.log('Playlist created! ' + playlistId)
            //Add Tracks to the playlist 
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: authHeader,
              method: "POST",
              body: JSON.stringify({ uris: trackUris })
            }).then(response => response.json())
              .then(jsonResponse => {
                console.log('Tracks Added To Playlist ' + jsonResponse.snapshot_id)
              })
          })
      })



  }
}





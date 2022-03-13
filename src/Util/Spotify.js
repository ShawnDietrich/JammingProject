
let userToken = '';
let expiresIn = 0;
const clientID = "76f5cd4412374716bfb8bbc6101635e5";
const redirectURL = //"http://localhost:3000/";
//'http://PlaylistCreate.surge.sh';
'https://playlistcreator.netlify.app'
const endPoint = "https://api.spotify.com/v1/me";
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
          body: JSON.stringify({ name: playlistName })
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
  },

  //Load playlist
  loadPlaylist(playlistName) {
    //check if playlist name is empty
    if (!playlistName) return null
    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` }
    let foundPlaylist = [];
    //Send user ID request
    let userId;
    return fetch(endPoint, { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        //console.log("User ID " + userId);
        
        //Capture an array of the users playlists
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
          let playlistArray = jsonResponse.items.map(playlist => {return playlistArray.push({
            name: playlist.name,
            id: playlist.id
          })});
          console.log('Captured playlist array')
          console.log(playlistArray)
          //Look in array for playlist and id
          foundPlaylist = playlistArray.find(item => (playlistName === item.name))
          console.log(foundPlaylist)
          //if (!foundPlaylist.length) return null;
          // request tracks using playlist id
          return fetch(`https://api.spotify.com/v1/playlists/${foundPlaylist.id}/tracks`, {headers: headers})
          .then(response => response.json())
          .then(jsonResponse => {
            console.log('captured track list')
            return jsonResponse.items.map(item => ({
              id: item.track.id,
              name: item.track.name,
              artist: item.track.artists[0].name,
              album: item.track.artists.album,
              uri: item.track.uri
            }));
          })
        })
      })
  }
}





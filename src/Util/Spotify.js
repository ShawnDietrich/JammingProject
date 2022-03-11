
let userToken = '';

export const Spotify = {


  getAccessToken() {
    if (userToken) {
      return userToken;
    }
    let url = window.location.href;
    let accessToken = url.match(/access_token=([^&]*)/)
    let expires = url.match(/expires_in=([^&]*)/)

  }

}





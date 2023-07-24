import JellyfinApi from "@/api";
import axios from "axios";

function login(username: string, password: string) {
    const query = "/Users/AuthenticateByName";
    const values = {
        Username: username,
        Pw: password
      };
    
      const headers = {
        'X-Emby-Authorization': `Emby UserId="${username}", Client="media_cleaner", Device="media_cleaner", DeviceId="media_cleaner", Version="0.2", Token=""`,
        'Content-Type': 'application/json'
      };

    return JellyfinApi.getInstance().api.post(query, values, { headers });
}

// async function login(username: string, password: string): Promise<string> {
//     // const passwordSha1 = crypto.createHash('sha1').update(password).digest('hex');
  
//     const values = {
//       Username: username,
//       Pw: password
//     };
  
//     const headers = {
//       'X-Emby-Authorization': `Emby UserId="${username}", Client="media_cleaner", Device="media_cleaner", DeviceId="media_cleaner", Version="0.2", Token=""`,
//       'Content-Type': 'application/json'
//     };
  
//     try {
//       const response: AxiosResponse<any> = await axios.post(`/jellyfin/Users/AuthenticateByName`, values, { headers });
  
//       if (response.status === 200) {
//         const data = response.data;
//         // DEBUG
//         // console.log(data);
//         return data.AccessToken;
//       } else {
//         throw new Error('An error occurred while attempting to retrieve data from the API.');
//       }
//     } catch (error) {
//       console.error('Error occurred while authenticating:', error);
//       throw error;
//     }
//   }

function logout() {
  const query = "/Sessions/Logout";
  return JellyfinApi.getInstance().api.post(query);
}

function getServerInfo() {
  const query = "/System/Info";
  return JellyfinApi.getInstance().api.get(query);
}

async function checkServerUrl(url: string) {
  const query = "/System/Info/Public";

  try {
    const res = await axios.get(url + query);
    if (res.data.StartupWizardCompleted) {
      return res;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export { login, logout, getServerInfo, checkServerUrl };

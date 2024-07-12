import { appInfo } from '@/constants/appInfos';
import axios from 'axios';

class handleUser {
  static handleApi = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => 
    {

        const urlAPI = appInfo.BASE_URL +'/auth' + url //"http://192.168.1.3:8090/v1/models/C_Bank"//appInfo.BASE_URL +'/auth' + url
         console.log(urlAPI)
        const res= await axios({
          url: urlAPI,
          method: method ?? "get",
          headers: {
            Authorization: `Bearer ${appInfo.accesstoken}`,
            "Content-Type": "application/json",
          },
          data
      });
      return res
      console.log(res.data);
  };
}

export default handleUser;

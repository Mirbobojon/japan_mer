import axios from 'axios'
import { ApiDir } from '../../common'


//各種設定情報更新
export const updateSetting = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateSetting.php',formData)
    .then(function(response){
      if(response)
      {
        alert('各種設定情報を変更しました。')
        console.log(response.data)
        window.location.reload()
      }
      else
      {
        alert('各種設定情報の変更に失敗しました。')
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
    .finally(function(){
      return
    })
  }
}


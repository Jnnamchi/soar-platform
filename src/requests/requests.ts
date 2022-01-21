import axios from 'axios'

export function getServerUrl () : string {
  return "http://localhost:5000/"
}

export async function AddModuleToCompany (companyUuid : string, moduleUuid : string) {
  const url = getServerUrl()
  const requestBody = {
    "companyUuid": companyUuid,
    "moduleUuid": moduleUuid,
  }
  try {
    const updatedCompany = await axios.post(url + "/addModuleToCompany", requestBody)
    return updatedCompany
  } catch (error) {
    if (error) {
      console.log("There was an error")
      console.log(error)
    }
    alert("Error fetching data")
  }
}
import axios from 'axios'

const URL = "http://localhost:3000/api/v1/clients";

class ClientService {

    // select Client
    // Read Client
    static getClients() {
        return new Promise((resolve, reject) => {

            axios.get("http://localhost:3000/api/v1/clients/show")
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }
    // create Client 
    static insertClient(text) {
        return axios.post(URL, {
            text
        });
    }
    // update Client
    // Delete Client
    static deleteClient(id) {
        return axios.delete(`${URL}${id}`)
    }

}

export default ClientService;
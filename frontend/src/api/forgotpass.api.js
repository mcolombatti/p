 
 export async function forgotPassword(email) {
    return fetch('http://localhost:9001/auth/guide/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(function (res) {
            if (res.status === 200) {
                return res.json()
            }
            else {
                throw new Error('Hubo un error al resetear el pass')
            }
        })
} 
 export default {
    forgotPassword 
}

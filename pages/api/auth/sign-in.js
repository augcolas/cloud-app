export default async function handler(req, res) {

    const { email, password } = req.body
    console.log(email, password);




    const data = {
        userData: {
            email: email,
            name: 'Test User',
        },
        token: ' '
    }

    res.status(200).json({
        success: true,
        userData: data.userData,
        token: data.token
    });
}
export async function signup(formData) {
    try {
        const data = {
            email: formData.get('Email'),
            password: formData.get('Password'),
            name: formData.get('Name'),
        };

        const response = await fetch('/api/createAcc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.error || 'Something went wrong'}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
}





export async function logIn(formData){

try{
   const  dataLog={
        email:formData.get('Email'),
        password:formData.get('Password'),
    }
const response=await fetch("/api/logApi",{
    method: 'POST',
headers:{
    'Content-Type': 'application/json',
   
},
body:JSON.stringify(dataLog)



})
if(!response.ok){
   const errorData = await response.json();
    throw new Error(`Error: ${errorData.error || 'Something went wrong'}`);
}

const result=await response.json()
return result;

}catch(error){
    console.error('Signup error:', error);
throw error;
}

}
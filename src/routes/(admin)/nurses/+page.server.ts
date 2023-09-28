//LETS CALL THE DAAAAAAAAAATABAAAAAAAAAAAAAAAAAAAAAAAASE


export const actions={
    addNurse: async ({request}) =>{
        const data = await request.formData();

        const name = data.get('name')
        
    }
}
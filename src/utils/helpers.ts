//id haru banaune kaam 
export const generateId =(length=9):string=>{

    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(b => b.toString(36))
    .join('');
};


//date exact dine function 
export const formatDate =(dateString:string):string=>{
    const date=new Date(dateString);
    return date.toLocaleDateString('en-US',{
        year:'numeric',
        month:'long',
        day:'numeric',
    });
}

//date input of today's date 
export const getTodayDate=():string=>{
return new Date().toISOString().split('T')[0];
};

//default due date  => 7 days
export const getDefaultDate=():string=>{
const date=new Date();
date.setDate(date.getDate()+7);
return date.toISOString().split('T')[0];

};







let details;
let room;
let socket;

export async function storeDetails(d){
    details = d;
    //console.log(details);
    return;
}

export async function getDetails(){
    return details;
}

export async function storeRoom(d){
    room = d;
    return;
}

export async function getRoom(){
    return room;
}


export async function storeSocket(d){
    socket = d;
    return;
}

export async function getSocket(){
    return socket;
}
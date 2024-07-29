import clientPromise from "./getClient";


export async function init() {
    try{
        let client = await clientPromise;
        let db = await client.db("chart");
        let users = await db.collection("users");
        return users;
    } catch (error) {
        throw new Error("Failed to establish connection to database");
    }

}




/*let client;
let db;
let movies;*/

/*export async function init() {
    console.log("run")
    try{
        let client = await clientPromise;
        console.log("dbbjbjbj")
        let db = await client.db("sample_mflix");
        let movies = await db.collection("movies");
        console.log("init working")
        return movies;
    } catch (error) {
        throw new Error("Failed to establish connection to database");
    }

}*/
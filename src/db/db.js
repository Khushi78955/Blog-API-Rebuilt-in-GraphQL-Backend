import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})

export async function connectDB() {
    try{
        const client = await pool.connect();
        console.log("Connected to PostgresSQL");
        client.release();
    } catch(err){
        console.err("Database connection failed");
        console.err(err);
        process.exit(1);
    }
    
}
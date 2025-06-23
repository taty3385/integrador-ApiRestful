import express from 'express';
import cors from 'cors';
import pedidosRoutes from './routes/pedidosRoutes';
import dotenv from 'dotenv';
dotenv.config();


const app= express()
const PORT=process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.use('/api', pedidosRoutes);



app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el http://localhost:${PORT}`);
    
})
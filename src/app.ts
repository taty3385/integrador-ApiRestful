import express from 'express';
import cors from 'cors';
import pedidosRoutes from './routes/pedidosRoutes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();


const app= express()
const PORT= 3000;

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.use('/api', pedidosRoutes);



app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el http://localhost:${PORT}`);
    
})
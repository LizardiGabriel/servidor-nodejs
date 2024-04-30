import  express  from 'express';
import adminRoutes from './routes/adminRoutes';
import anfitrionRoutes from './routes/anfitrionRoutes';
import inicioRoutes from './routes/inicioRoutes';
import catalogoRoutes from './routes/catalogoRoutes';
const path = require('path');

const app = express();
app.use(express.json());

app.use('/', express.static('./public'));


app.use('/admin', adminRoutes);
app.use('/anfitrion', anfitrionRoutes);
app.use('/catalogo', catalogoRoutes);
app.use('/home', inicioRoutes);

app.get('/', (req, res) => {
  res.send('Hello World 2');
});


// implementaciones 




app.listen(3000, () => {
    console.log('Server ready at localhost:3000');

});


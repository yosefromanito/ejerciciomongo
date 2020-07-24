const express =require('express');
const mongoose=require('mongoose')
const{config}=require('./config')
const app = express()
mongoose.connect(config.db.url,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('funciona')
})
.catch((error)=>{
    console.log('error',error)
})
const articulosSchema= new mongoose.Schema({
        nombre:String,
        precio:Number,
        existencia:Number
    })
    const ticketSchema= new mongoose.Schema({
        subtotal:Number,
        iva:Number,
        total:Number
        // productos: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //   }],
    })
const Articulos = mongoose.model('Articulos',articulosSchema)
const Ticket = mongoose.model('Ticket',ticketSchema)

app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}))

app.get('/',(request,response)=>{
    response.send('funciona')
})
app.get('/articulos',(request,response)=>{
    Articulos.find()
    .then((resDB)=> response.status(200).json(resDB))
    .catch((error)=> console.log(error))
})
app.get('/ticket',(request,response)=>{
    Ticket.find()
    .then((resDB)=> response.status(200).json(resDB))
    .catch((error)=> console.log(error))
})
app.get("/articulos/:id",(request,response)=>{
    Articulos.findById(request.params.id)
    .then((respDb)=>{
        response.status(201).json(respDb)
    })
    .catch((error)=>{
        response.status(400).json(error)
    })
})
app.get("/ticket/:id",(request,response)=>{
    Ticket.findById(request.params.id)
    .then((respDb)=>{
        response.status(201).json(respDb)
    })
    .catch((error)=>{
        response.status(400).json(error)
    })
})
app.post('/articulos', (request,response)=>{
    const  {body} = request;
    const newArticulos = new Articulos(body)
    newArticulos.save()
    .then((respDb)=>{
        response.status(201).json(respDb)
    })
    .catch((error)=>{
        response.status(400).json(error)
    })
})
app.post('/ticket', (request,response)=>{
    const  {body} = request;
    const newTicket = new Ticket(body)
    newTicket.save()
    .then((respDb)=>{
        response.status(201).json(respDb)
    })
    .catch((error)=>{
        response.status(400).json(error)
    })
})
app.delete("/articulos/:id",(request,response)=>{
    Articulos.findByIdAndDelete(request.params.id)
    .then((respDb)=>{
        response.status(201).json(respDb)
    })
    .catch((error)=>{
        response.status(400).json(error)
    })
})
app.delete("/ticket/:id",(request,response)=>{
    Ticket.findByIdAndDelete(request.params.id)
    .then((respDb)=>{
        response.status(201).json(respDb)
    })
    .catch((error)=>{
        response.status(400).json(error)
    })
})
app.patch("/articulos/:id",(request,response)=>{
    Articulos.findByIdAndUpdate(request.params.id, request.body)
    .then((respDb)=>{
        response.status(201).json(respDb)
    })
    .catch((error)=>{
        response.status(400).json(error)
    })
})
app.patch("/ticket/:id",(request,response)=>{
    Ticket.findByIdAndUpdate(request.params.id, request.body)
    .then((respDb)=>{
        response.status(201).json(respDb)
    })
    .catch((error)=>{
        response.status(400).json(error)
    })
})
app.listen(config.port, ()=>console.log(`api corrierndo en ${config.port}`))
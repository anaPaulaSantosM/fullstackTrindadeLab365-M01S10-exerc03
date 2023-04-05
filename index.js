const express = require('express')
const bcrypt = require('bcrypt');

const connection = require('./src/database')
const Place = require('./src/models/place')
const User = require('./src/models/user')


const app = express()

app.use(express.json()) //obrigatório

connection.authenticate()
connection.sync({alter: true})

app.post('/places', async (request, response) => {
    try {

       const data = {
        name: request.body.name,
        contact: request.body.contact,
        opening_hours: request.body.opening_hours,
        description: request.body.description,
        latitude: request.body.latitude,
        longitude: request.body.longitude
       } 

       const place = await Place.create(data)

       response.status(201).json(place)


    } catch (error) {
        console.log(error)
        response.status(500).json({message: 'Não possivel concluir a operação'})
    }
})

app.get('/places', async (request, response) => {
    try {
        const places = await Place.findAll()
        return response.json(places)
    } catch (error) {
        
    }
})

app.delete('/places/:id', async (request, response) => {
    
    try{
        await Place.destroy({
            where: {
                id: request.params.id
            }
        })
    responde.status(204);
    }catch(error){
        response.status(500);
    }
})
    
    app.update('/places/:id', async (request, response) => {
        const newInfos = req.body
        try {
            Place.update({
                name: newInfos.name,
                phone: newInfos.phone,
                opening_hours: newInfos.opening_hours,
                description: newInfos.description,
                latitude: newInfos.latitude,
                longitude: newInfos.longitude
            }, {
                where: {
                    id: req.params.id
                }
            }).then(async () => {
                console.info(`Place id ${req.params.id} updated`)
                const updatedPlace = await Place.findOne({where: {id: req.params.id}})
                res.status(200).json(updatedPlace)
            })

        } catch (error) {
            console.error('Place update error: ', error)
        }
    

        app.post('/users', async (request, response) => {
            try {

                const hash = await bcrypt.hash(request.body.password, 10)
                
                const newUser = {
                name: request.body.name,
                email: request.body.email,
                username: request.body.username,
                senha: hash
               } 
        
               const user = await User.create(newUser)
        
               response.status(201).json(user)
        
        
            } catch (error) {
                console.log(error)
                response.status(500).json({message: 'Não possivel processar a solicitação.'})
            }
        })

        app.post('/sessions', async (request, response) => {
            try {
    
               const session = {

                username: request.body.username,
                senha: request.body.senha
               } 
        
               const user = await User.create(session)
        
               response.status(201).json(session)
        
        
            } catch (error) {
                console.log(error)
                response.status(500).json({message: 'Não possivel concluir a operação'})
            }
        })

app.listen(3333, () => console.log("Servidor online"))
});

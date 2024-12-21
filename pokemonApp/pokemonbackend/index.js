
const express=require('express')
const app=express()
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config()
const connection=require("./db.js")
const PokemonRouter=require("./PokemonRouter.js")

const PORT = process.env.PORT || 5000;



app.use(cors({
    origin:'*'
}))

app.use(express.json())
app.use('/pokemon',PokemonRouter)





app.get("/",(req,res)=>{

    res.send('server is running fine for pokemon')
})


app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})
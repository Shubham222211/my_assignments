const mongoose=require('mongoose')

const PokemonSchema=mongoose.Schema({
    sprite:{type:String},
    name:{type:String,required:true},
    types: [{ type: String, required: true }]
    
    
},{
    versionKey:false,
    timestamps:true
})

const pokemonModel=mongoose.model('Pokemon',PokemonSchema)

module.exports=pokemonModel
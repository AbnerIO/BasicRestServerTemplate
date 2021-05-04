const mongoose = require("mongoose");

const dbConection = async()=> {

    try {
        
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify : false
        });
        console.log("Base de datos Conectada");

    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de leer la base de datos")
    }



}

module.exports = {
    dbConection
}
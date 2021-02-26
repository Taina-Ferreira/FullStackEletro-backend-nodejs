const mongoose = require('mongoose');

// Configutando Mongoose (Alterando a promise padrão)
mongoose.Promise = global.Promise;

// Conectando ao mongodb
mongoose.connect('mongodb://localhost/fullstackeletro', { UseMongoClient: true })
        .then(() => {
            console.log('Conectado ao mongodb!')
        })
        .catch((err) => {
            console.log('Erro ao conectar ao mongodb!',err)
        });


const MensagemSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mensagem: {
        type: String,
        require: true
    }
})

const Mensagem = mongoose.model('Mensagem', MensagemSchema);



module.exports = Mensagem;


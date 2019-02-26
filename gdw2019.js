const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// var myLogger = function(req, res, next){
//   console.log('LOGGED');
//   next();
// };
//
// app.use(myLogger);

const personen = [
    { id: 1, name: 'person1'},
    { id: 2, name: 'person2'},
    { id: 3, name: 'person3'},
];

const items = [
    { id: 1, name: 'Käse'},
    { id: 2, name: 'Brot'},
    { id: 3, name: 'Wasser'},
];

// Gibt die Liste aller Personen aus
 app.get('/person', function(req, res){
     res.send(personen);
 });

// Gibt die Informationen über eine bestimmte Person aus
app.get('/person/:id', function(req, res) {
    const person = personen.find(p => p.id === parseInt(req.params.id));
    if (!person) return res.status(404).send('Person mit der ID nicht gefunden.');
    res.send(person);
});

// Erstellt eine Person mit dem Namen und gibt die ID an
app.post('/person', function(req, res){
    const { error } = validateInput(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);


    const person = {
        id: personen.length + 1,
        name: req.body.name
    };
    personen.push(person);
    res.send(person);
});

// Aktuallisiert die Liste mit der Person ID
app.put('/person/:id', function(req, res){
    const person = personen.find(p => p.id === parseInt(req.params.id)
)
    if (!person) return res.status(404).send('Person mit der ID nicht gefunden.');

    //const result = validateInput(req.body);
    const { error } = validateInput(req.body); //result.error

    if(error) return res.status(400).send(result.error.details[0].message);


    person.name = req.body.name;
    res.send(person);

});

// Löscht eine Person aus der Liste
app.delete('/person/:id', function(req, res){
    const person = personen.find(p => p.id === parseInt(req.params.id)
)
    if (!person) return res.status(404).send('Person mit der ID nicht gefunden.');

    const index = personen.indexOf(person);
    personen.splice(index, 1);

    res.send(person);
});


//Gibt Einkaufsliste aus
app.get('/item', function(req,res){
    res.send(items);
});

//Erstellt ein Produkt mit dem Namen und gibt die ID an
app.post('/item', function(req, res){
    // const { error } = validateItem(req.body);
    // if(error) return res.status(400).send(result.error.details[0].message);
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if(!req.body.name || req.body.name.lenbits <3){
        res.status(400).send("test");
        return;
    }

    const items = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(items);
    res.send(items);
});

//Aktualisiert die Liste mit der Produkt ID
//app.put('/list/:id', function(req, res){
//  const list = einkaufsliste.find(l => l.id === parseInt(req.params.id));
//  if(!list) return res.status(404).send('Produkt mit der ID nicht gefunden.')
//}

//Löscht ein Produkt aus der Einkaufsliste
app.delete('/item/:id', function(req, res){
    const list = items.find(l.id === parseInt(req.params.id));
    if (!list) return res.status(404).send('Produkt mit der ID nicht gefunden.');

    const index = items.indexOf(list);
    items.splice(index,1);

    ressend(list);
});

//Überprüft die User-Eingaben
// function validateItem(list){
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//
//     const result = Joi.validate(list, schema);
//     console.log(result);
//     return result;
// }


//Kasse



const kasse = [
    { id: 1, name: 'kasse1'},
    { id: 2, name: 'kasse2'},
    { id: 3, name: 'kasse3'},
];

//Gibt Angaben Kasse aus
app.get('/cashregister', function(req,res){
    res.send(kasse);
});

//Erstellt eine Kasse  mit dem Namen und gibt die ID an
app.post('/cashregister', function(req, res){
    const { error } = validateItem(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);


    const cashregister = {
        id: kasse.length + 1,
        name: req.body.name
    };
    cashregister.push(kasse);
    res.send(cashregister);
});


//Löscht eine Kasse
app.delete('/chashregister/:id', function(req, res){
    const cashregister = kasse.find(l.id === parseInt(req.params.id));
    if (!cashregister) return res.status(404).send('Kasse mit der ID nicht gefunden.');

    const index = kasse.indexOf(cashregister);
    kasse.splice(index,1);

    ressend(cashregister);



});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Programm wird gestartet ${port}!`));
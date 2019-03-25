const Joi = require('joi');
const express = require('express');
const app = express();
const request = require('request');
const buildUrl = require('build-url');  //npm i build-url oder npm i -g build-url wenn global

app.use(express.json());


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
    const schema = {
        name: Joi.string().min(1).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if(!req.body.name || req.body.name.lenbits <1){
        res.status(400).send("Name muss mehr als einen Buchstaben enthalten.");
        return;
    }

    const pers = {
        id: person.length + 1,
        name: req.body.name
    };
    person.push(pers);
    res.send(person);
});


// Aktuallisiert die Liste mit der Person ID
app.put('/person/:id', function(req, res){
    const person = personen.find(p => p.id === parseInt(req.params.id)
)
    if (!person) return res.status(404).send('Person mit der ID nicht gefunden.');

    const { error } = validateItem(req.body); //result.error

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
    const { error } = validateItem(req.body);
    if(error) return res.status(400).send("Name is required or must be longar than 3 letters" + result.error.details[0].message);


const item = {
    id: items.length + 1,
    name: req.body.name
};
items.push(item);
res.send(items);
});

//Aktualisiert die Liste mit der Produkt ID
//app.put('/list/:id', function(req, res){
//  const list = einkaufsliste.find(l => l.id === parseInt(req.params.id));
//  if(!list) return res.status(404).send('Produkt mit der ID nicht gefunden.')
//}

//Löscht ein Produkt aus der Einkaufsliste
app.delete('/item/:id', function(req, res){

    //Finden des item mit id
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Produkt mit der ID nicht gefunden.');

    //Löschen des Items
    const index = items.indexOf(item);
    items.splice(index,1);

    res.send(items);
});

//Überprüft die User-Eingaben
function validateItem(list){
    const schema = {
        name: Joi.string().min(1).required()
    };

    return Joi.validate(list, schema);

}

//Kasse
//Kasse wurde mangels Zeit und wegen zu hoher Komplexität nicht weiter umgesetzt

/*const kasse = [
    { id: 1, name: 'kasse1'},
    { id: 2, name: 'kasse2'},
    { id: 3, name: 'kasse3'},
];
//Gibt Angaben Kasse aus
app.get('/kassen', function(req,res){
    res.send(kasse);
});
//Erstellt eine Kasse  mit dem Namen und gibt die ID an
app.post('/kassen', function(req, res){
    const { error } = validateItem(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);
    const cashregister = {
        id: kasse.length + 1,
        name: req.body.name
    };
    kasse.push(cashregister);
    res.send(kasse);
});
app.delete('/kassen/:id', function(req, res){
    //Finden des Items mit der ID
    const kassen = kasse.find(k => k.id === parseInt(req.params.id));
    if (!kassen) return res.status(404).send('Kasse mit der ID nicht gefunden!');
    //Loeschen des Items
    const index = kasse.indexOf(kassen);
    kasse.splice(index,1);
    //Senden des geloeschten Items
    res.send(kassen);
});
*/



app.get('/rezept', (req, res) => {
    //QuerryString in qString speichern
    const qString = req.query;
//Url von der ausgewaelten api builden
const url = buildUrl('http://www.recipepuppy.com/api/', {
    queryParams:  qString
})

//Mithilfe von request aufrufen der url mit jenen QuerryString
request({url: url,json: true},(error, response, body) =>{
    //error handling
    if (error || response.statusCode === 400) {
    res.send({'errorMessage': 'Bad Request'});
}
//Rueckgabe der gefundenen Rezepte
else if(response.statusCode === 200){
    res.send(body.results);
}
});
});




//Server erstellen
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Programm wird gestartet ${port}!`));

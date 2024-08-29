const express = require('express')
const fs = require('fs')

const app = express();

const port = 3000

app.use(express.json())

const dataArr = []
let nextId = 1

// Read file for getting the current id present in the data.json

fs.readFile('data.json', 'utf-8', (err, data) => {
    if (!err) {
        const items = JSON.parse(data);

        if (items.length > 0) {
            nextId = items[items.length - 1].id + 1;  // Set nextId to one more than the last item
        }
    }
});



// Adding a new item 

app.post('/items', (req, res) => {

    const newItem = {
        id: nextId++,
        name: req.body.name,
        description: req.body.description
    }

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err)
            return res.status(404).send("Error reading file")
        const items = JSON.parse(data)
        items.push(newItem)

        fs.writeFile('data.json', JSON.stringify(items), (err) => {

            if (err)
                res.status(404).send("Error in writing file")
            res.status(200).send(newItem)
        })
    })
})

// Get all items
 
app.get('/items', (req, res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err)
            return res.status(404).send("Error reading file")
        res.status(200).send(JSON.parse(data))
    })
})


// Get item with id

app.get('/files/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (!err) {
            const items = JSON.parse(data)
            const desireditem = items.find(i => i.id === id)

            if (!desireditem) {
                res.status(404).send("Item not found")
            }

            res.status(200).send(desireditem)
        }
    })
})

// update item with id

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile('data.json', (err, data) => {
        if (err) return res.status(500).send('Error reading file');

        const items = JSON.parse(data);
        const itemIndex = items.findIndex(i => i.id === id); // Find the index of the item to update

        if (itemIndex === -1) return res.status(404).send('Item not found');

        items[itemIndex].name = req.body.name; // Update the name
        items[itemIndex].description = req.body.description; // Update the description

        fs.writeFile('data.json', JSON.stringify(items, null, 2), err => {
            if (err) return res.status(500).send('Error writing file');
            res.send(items[itemIndex]); // Send the updated item back to the client
        })
    })
})

// Delete item using id

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile('data.json', (err, data) => {
        if (err)
            return res.status(404).send('Error reading file');

        let items = JSON.parse(data);
        items = items.filter(i => i.id !== id); // Remove the item with the specified ID

        fs.writeFile('data.json', JSON.stringify(items, null, 2), err => {
            if (err)
                return res.status(404).send('Error writing file');
            res.send({ message: 'Item deleted' });
        });
    });
});


// Listen

app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`)
})
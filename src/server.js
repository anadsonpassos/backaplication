const app = require('./app');

app.listen(process.env.PORT || 3333, () => {
    console.log(' Running Server ')
});

//app.listen(3333);
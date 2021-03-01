const http = require('http');
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const cors = require('@koa/cors');
const app = new Koa();

const Tickets = require('./Tickets');
const tickets = new Tickets();

// => Static file handling
const public = path.join(__dirname, '/public');
app.use(cors());
app.use(koaStatic(public));

// => Body Parsers
app.use(koaBody({
    urlencoded: true,
    multipart: true,
    text: true,
    json: true,
}));

app.use(async (ctx) => {
    const { method } = ctx.request;
    switch (method) {
        case 'allTickets': ctx.response.body = tickets;
            return;
        case 'ticketById': ;
            return;
        case 'createTicket': ;
            return

        default:
            ctx.response.status = 404;
            return;
    }
});


const port = process.env.PORT || 7070;
http.createServer(app.callback()).listen(port);
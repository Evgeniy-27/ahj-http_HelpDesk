const http = require("http");
const path = require("path");
const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const cors = require('koa-cors');

const ticket = require("./Ticket");

const public = path.join(__dirname, "/public");



app.use(cors({origin: 'Allow-all'}));

app.use(
    koaBody({
      text: true,
      urlencoded: true,
      multipart: true,
      json: true,
    })
  );

app.use(async ctx => {
    const { method } = ctx.request.query;
    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets.map(({description, ...ticket}) => (ticket));
            return;
        case 'ticketById':
            const {id: ticketId} = ctx.request.query;
            const ticketToShow = tickets.find(ticket => ticket.id === parseInt(ticketId));
            if (ticketToShow) {
                ctx.response.body = ticketToShow;
            } else {
                ctx.response.status = 404;
            }
            return;
        case 'createTicket':
            if (ctx.request.method !== 'POST') {
                ctx.response.status = 404;
                return;
            }
            const data = ctx.request.body;
            const ticket = {
                id: tickets.length + 1,
                name: data.name,
                description: data.description,
                status: false,
                created: new Date(),
            };
            tickets.push(ticket);
            ctx.response.status = 201;
            ctx.response.body = ticket;
            return;
        case 'deleteTicket':
            if (ctx.request.method !== 'DELETE') {
                ctx.response.status = 404;
                return;
            }
            const {id: ticketToDelete} = ctx.request.query;
            const index = tickets.findIndex(ticket => ticket.id === parseInt(ticketToDelete));
            if (index === -1) {
                ctx.response.status = 404;
                return;
            }
            tickets.splice(index, 1);
            ctx.response.status = 410;
            return;
            default:server.js
            ctx.response.status = 404;
            return;
    }
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port)

// app.listen(port);
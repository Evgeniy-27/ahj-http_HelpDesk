 const tickets = [
    {
        id: 1,
        name: 'Поменять краску в принтере',
        description: 'Нужно поменять краску в принтере в бухгалтерии. Принтер HP 124J823',
        status: false,
        created: new Date(),
    },
    {
        id: 2,
        name: 'Переустановить Windows',
        description: 'Переустановить ОС на ноутбуке офис менеджера',
        status: true,
        created: new Date(2021, 3, 3, 3, 3, 3),
    }
];
module.exports = tickets;
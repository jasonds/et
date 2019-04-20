module.exports = function (context, req) {  
    context.bindings.cosmosDBMessage = req.body;
    context.bindings.signalRMessages = [{
        "target": "newMessageRegister",
        "arguments": [req.body]
    },
    {
        "target": "newMessageKitchen",
        "arguments": [req.body]
    }];
    context.done();
};

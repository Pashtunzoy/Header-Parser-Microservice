const express = require("express");
const app = express();

const mainFunc = (user, lang, ip) => {
    lang = lang.split(',');
    const editAgent = (u) => {
      u = u.split('(');
      u = u.toString().split(')');
      u = u.toString().split(',');
      return u[1];
    }
    return {
            'IP Address': ip,
            'Language': lang[0],
            'Software': editAgent(user)
           };
};
app.get('/api/whoami', (req, res) => {
    const h = req.headers;
    const printFinal = mainFunc(h['user-agent'], h['accept-language'], h['x-forwarded-for']);
   res.send(printFinal);
});

app.get('/', (req, res) => {
    res.send({GoTo: '/api/whoami'});
});

app.get('*', (req, res) => {
    res.send({Error: '404 Page not found'});
});

const port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
import querystring from 'querystring';
async function TokenGenerator() {
    // const key = process.env.NEXT_PUBLIC_KEY;
    // const secret = process.env.NEXT_PUBLIC_SECRET;

    return await getToken()
  
    async function generateToken() {

        const url = 'https://gateway.apiFire.Fire.gov.br/token';
        const clientId = process.env.NEXT_PUBLIC_KEY; // Substitua 'xxxx' pelo seu ID de cliente
        const clientSecret = process.env.NEXT_PUBLIC_SECRET; // Substitua 'xxxx' pelo seu segredo de cliente

        const corpoRequisicao = querystring.stringify({
            grant_type: 'client_credentials'
          });

        if(validaToken()) return;

        const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: corpoRequisicao
          })

        const response = await res.json()
        const agora =   new Date();
        agora.getSeconds(agora.getSeconds + response.expires_in);
        const tokenExpiraEm = agora.toISOString();
        const tkn = JSON.stringify({
            token: response.access_token,
            expiracao: tokenExpiraEm
        })

        localStorage.setItem('tkn', tkn);
        return tkn;
        
    }
    
    async function getToken() {
        let tokenAtual = localStorage.getItem('tkn');

        if(!tokenAtual || !validaToken())
        {
            localStorage.removeItem('tkn');
            tokenAtual = await generateToken();
            // tokenAtual = localStorage.getItem('tkn');
        }

        return JSON.parse(tokenAtual).token;
    }

    function validaToken() {
        let token = localStorage.getItem('tkn')
        
        if(!token)
            return false;
    
        const tokenAtual = JSON.parse(token)

        const agora = new Date();
        const expiracao = new Date(tokenAtual.expiracao);
        return expiracao > agora;
    }
  }
  
  export default TokenGenerator;
  
export const environment = {
  production: false,
  useMock: false,
  api: {
   // baseUrlAuth: 'https://integrador.vps6439.panel.icontainer.run',
    //baseUrl: 'https://integrador.vps6439.panel.icontainer.run/api',
   baseUrlAuth: 'http://localhost:8098',
    baseUrl: 'http://localhost:8098/api',
    endpoints: {
     dashboardUrl: '/dashboard',
     taxdocsNfeUrl: "/integrations/taxdocs/v1/nfe",
     taxdocsNfseUrl: "/integrations/taxdocs/v1/nfse",
     taxdocsCteUrl: "/integrations/taxdocs/v1/cte",
     taxdocsBaseUrl: "/integrations/taxdocs",
     nfse: '/v1/nfse',
     nfe: '/v1/nfe',
     cte: '/v1/cte',
     confrontos: '/v1/documentos-confrontos',
     usuarios: '/v1/usuarios',
     errosprocessamento: '/v1/erros-processamento' 
      
    }
  }
};


export const environment = {
  production: false,
  useMock: false,
  api: {
    baseUrlAuth: 'http://192.168.0.106:8098',
    baseUrl: 'http://192.168.0.106:8098',
    endpoints: {
     dashboardUrl: '/api/dashboard',
     taxdocsNfeUrl: "/api/integrations/taxdocs/v1/nfe",
     nfse: '/api/v1/nfse',
     nfe: '/api/v1/nfe',
     cte: '/api/v1/cte'
      
    }
  }
};

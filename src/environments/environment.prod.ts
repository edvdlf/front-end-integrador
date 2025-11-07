export const environment = {
  production: true,
  useMock: false,
  api: {
    baseUrlAuth: 'http://localhost:8099',
    baseUrl: 'http://localhost:8099',
    endpoints: {
      dashboardUrl: '/api/dashboard',
      taxdocsNfeUrl: "/api/integrations/taxdocs/v1/nfe",
      nfse: '/api/v1/nfse',
      nfe: '/api/v1/nfe',
      cte: '/api/v1/cte'
    }
  }
};


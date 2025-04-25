export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'https://app-edspacesolutions-dev-001-dfd4b5dpfbg2f9aa.southafricanorth-01.azurewebsites.net/api',
    // apiPrefix: 'https://localhost:7231/api',
    authenticatedEntryPath: '/products/products-list',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig

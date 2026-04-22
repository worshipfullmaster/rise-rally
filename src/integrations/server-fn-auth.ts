let globalAuthToken: string | undefined = undefined
let fetchWrapped = false

/**
 * Configuration globale pour TanStack Start - stocke le Bearer token
 * qui sera utilisé pour tous les appe ls de fonction serveur
 */
export function setupServerFnAuth(token: string | undefined) {
  globalAuthToken = token
  
  // Ne configurer qu'une seule fois
  if (fetchWrapped || typeof globalThis.fetch !== 'function') {
    return
  }
  
  const origFetch = globalThis.fetch
  
  globalThis.fetch = ((url: RequestInfo | URL, options?: RequestInit) => {
    // Créer une copie des options
    const opts: RequestInit = { ...options }
    const urlStr = typeof url === 'string' ? url : url.toString()
    
    // Ajouter le Bearer token pour les appels aux fonctions serveur
    // Les fonctions serveur TanStack Start vont à /_serverFn
    if (urlStr.includes('/_serverFn')) {
      const headers = (opts.headers || {}) as Record<string, string>
      
      // Ajouter le token Bearer uniquement s'il n'est pas déjà présent
      if (!headers.authorization && !headers.Authorization && globalAuthToken) {
        opts.headers = { ...headers, Authorization: `Bearer ${globalAuthToken}` }
      }
    }
    
    return origFetch(url, opts)
  }) as typeof globalThis.fetch
  
  fetchWrapped = true
}



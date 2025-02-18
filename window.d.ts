interface Window {
  relay: {
    description: string
    tryRelay: () => Promise<string>
  }
  clientHub: {
    description: string
    connect: () => void
    send: (message: string) => void
    port?: chrome.runtime.Port
  }
}

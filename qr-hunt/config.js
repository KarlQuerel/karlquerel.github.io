const prodFallbackUrl = 'https://api-qr.karlquerel.com'
const localFallbackUrl = 'http://localhost:3000'
const runtimeUrl = window?.QR_HUNT_API_BASE_URL
const envUrl = import.meta?.env?.VITE_QR_HUNT_API_BASE_URL
const isLocalHost = ['localhost', '127.0.0.1'].includes(window?.location?.hostname)

const defaultUrl = isLocalHost ? localFallbackUrl : prodFallbackUrl

export const API_BASE_URL = (runtimeUrl || envUrl || defaultUrl).replace(/\/$/, '')

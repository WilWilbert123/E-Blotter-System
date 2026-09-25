export function logInfo(message: string, meta?: any) {
  console.log(JSON.stringify({ level: 'INFO', timestamp: new Date(), message, meta }));
}

export function logError(message: string, error?: any) {
  console.error(JSON.stringify({ level: 'ERROR', timestamp: new Date(), message, error }));
}

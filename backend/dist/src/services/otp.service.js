// In production, integrate Twilio or provider. Here we mock and log.
const otpStore = new Map();
function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
function maskIdentifier(identifier) {
    if (/^\+?\d{7,}$/.test(identifier)) {
        // phone
        return identifier.replace(/(\d{2})(\d+)(\d{2})/, (_, a, b, c) => `${a}${'*'.repeat(b.length)}${c}`);
    }
    const [name, domain] = identifier.split('@');
    if (!domain)
        return '***';
    const shown = name.slice(0, 2);
    return `${shown}${'*'.repeat(Math.max(1, name.length - 2))}@${domain}`;
}
export async function sendOtp(identifier) {
    const code = generateOtp();
    const ttlSeconds = 30;
    const expiresAt = Date.now() + ttlSeconds * 1000;
    otpStore.set(identifier, { code, expiresAt });
    // eslint-disable-next-line no-console
    console.log(`[OTP] ${identifier} -> ${code}`);
    return { masked: maskIdentifier(identifier), ttlSeconds, code };
}
export function getStoredOtp(identifier) {
    return otpStore.get(identifier);
}
//# sourceMappingURL=otp.service.js.map
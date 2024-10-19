import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto';
import * as pwdHash from 'password-hash';
import * as fs from 'fs';

export function passwordHash(password: string): string {
    return pwdHash.generate(password);
}

export function passwordVerify(password: string, hashedPassword: string): boolean {
    return pwdHash.verify(password, hashedPassword);
}

export function randomInt(min: number, max: number): number {
    return crypto.randomInt(min, max);
}

export function sha256(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
}

export function encryptData(data: string): { encrypted: string | null; error: string | undefined } {
    const publicKey = crypto.createPublicKey(fs.readFileSync(__dirname + '/../../private/public.pem', { encoding: 'utf-8' }));
    try {
        const encrypted = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        }, Buffer.from(data)).toString('base64');

        return { encrypted, error: undefined };
    } catch (error) {
        return { encrypted: null, error: 'error' };
    }
}

export function uuid(): string {
    return crypto.randomUUID();
}

export function decryptData(data: string): { decrypted: string | null; error: string | undefined } {
    const privateKey = crypto.createPrivateKey(fs.readFileSync(__dirname + '/../../private/private.pem', { encoding: 'utf-8' }));
    try {
        const decrypted = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, Buffer.from(data, "base64")).toString();

        return { decrypted, error: undefined };
    } catch (error) {
        return { decrypted: null, error: 'error' };
    }
}

export function createRsaKeys(): void {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    });

    fs.writeFile(__dirname + '/../../public/public.pem', publicKey, (err) => { });
    fs.writeFile(__dirname + '/../../private/private.pem', privateKey, (err) => { });
}

interface AccessTokenData {
    id: string;
    verify_code: string | null;
    validity_time: string | null;
}

export function createAccessToken(data: AccessTokenData): string {
    const now = Date.now();
    return CryptoJS.HmacSHA512(JSON.stringify({
        id: data.id,
        verify_code: data.verify_code,
        validity_time: data.validity_time,
        created_at: now,
    }), JSON.stringify({
        verify_code: data.verify_code,
        created_at: now,
    })).toString().toUpperCase();
}
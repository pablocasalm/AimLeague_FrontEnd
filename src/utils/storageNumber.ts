//src/utils/storageNumbers.ts

export function setNumber(key: string, value: number): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getNumber(key: string): number | null {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    try {
        return JSON.parse(item) as number;
    } catch {
        return null;
    }
}
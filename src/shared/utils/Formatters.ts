export const onlyNums = (n: string) => {
    if (n) return n.replace(/[^\d]/g, "");
};

export const toCompact = (n: number, compactAtDigits = 0, isCurrency = true) => {
    const numDigits = n.toString().length;
    const shouldIncludeFractionalDigits = compactAtDigits === 0;
    const shouldCompact = (compactAtDigits && numDigits > compactAtDigits) || shouldIncludeFractionalDigits;
    const fractionalDigits = Number.isInteger(n) && n < 1000 ? 0 : 2;
    return Intl.NumberFormat("en-US", {
        style: isCurrency ? "currency" : undefined,
        currency: isCurrency ? "USD" : undefined,
        notation: shouldCompact ? "compact" : undefined,
        maximumFractionDigits: shouldIncludeFractionalDigits ? fractionalDigits : 0,
    })
        .format(n)
        .replace(/\.?0*[K]/, "K") //remove trailing zeros, https://github.com/nodejs/node/issues/41568
        .replace(/\.?0*[M]/, "M");
};

export const toFixed = (n: number, fixed: number) => {
    return Intl.NumberFormat("en-IN", {maximumSignificantDigits: fixed}).format(n);
};

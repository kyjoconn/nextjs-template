
export const matches = (regex: RegExp, message: string) => (value: string) => {
    if (!regex.test(value ?? "")) {
        return message;
    }
};

export const required = (message: string) => (value: string) => {
    if (!value || value?.trim().length <= 0) {
        return message;
    }
    return;
};

export const greaterThan = (threshold: number, message: string) => (value?: string) => {
    if (value !== undefined && parseInt(value, 10) <= threshold) {
        return message;
    }
    return;
};

export const lessThan = (threshold: number, message: string) => (value?: string) => {
    if (value !== undefined && parseInt(value, 10) >= threshold) {
        return message;
    }
    return;
};

export const shorterThan = (threshold: number, message: string) => (value?: string) => {
    if (value !== undefined && value !== null && value.length >= threshold) {
        return message;
    }
    return;
};

export const isEmail = (message: string) => (value?: string) => {
    const EMAIL_REGEX =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (value !== undefined) {
        if (value.match(EMAIL_REGEX)) return;
        return message;
    }
};

export const isValidHttpUrl = (s: string): string | undefined => {
    if (s) {
        let result = s.split("\n");
        result = result.filter((e) => e);
        for (const url of result) {
            try {
                new URL(url);
            } catch (err) {
                return "Not a valid URL";
            }
        }
    }
    return;
};

export const isImageExtension = (s: string): string | undefined => {
    const IMG_EXTENSIONS = ["apng", "avif", "gif", "jpeg", "jpg", "png", "svg", "webp"];
    const ERROR_MSG = "Not a valid image extension";
    if (s) {
        const path = s.toLowerCase().split("/");
        const last = path[path.length - 1];
        if (!last) return ERROR_MSG;
        const ext = last.replace(/.*\./, "");
        if (!IMG_EXTENSIONS.includes(ext)) return ERROR_MSG;
    }
    return;
};


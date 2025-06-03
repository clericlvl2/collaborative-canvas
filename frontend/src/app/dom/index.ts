export const getRootElement = (): HTMLElement => {
    const el = document.getElementById('root');

    if (!el) {
        throw new Error('Unable to locate root element');
    }

    return el;
};

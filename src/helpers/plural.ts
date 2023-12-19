export function plural(forms: Array<string>, total: number): string {
    let idx;
    if (total % 10 === 1 && total % 100 !== 11) {
        idx = 0; // one
    } else if (total % 10 >= 2 && total % 10 <= 4 && (total % 100 < 10 || total % 100 >= 20)) {
        idx = 1;
    } else {
        idx = 2;
    }
    return total + " " + forms[idx] || "";
}

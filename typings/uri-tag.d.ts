
declare module 'uri-tag' {
    export const rawSymbol : symbol;
    
    export const raw : <T>(value : T) => { [key in typeof rawSymbol] : T };
    
    const uri : {
        (stringParts : TemplateStringsArray, ...substitutions : unknown[]) : string,
        raw : typeof raw,
    };
    
    export default uri;
}

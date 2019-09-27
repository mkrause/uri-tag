
declare module 'uri-tag' {
    export const rawSymbol : unique symbol;
    
    type RawComponent = { [rawSymbol] : unknown };
    type UriComponent = string | number | RawComponent;
    
    export const raw : <T>(value : T) => RawComponent;
    
    const uri : {
        (stringParts : TemplateStringsArray, ...substitutions : UriComponent[]) : string,
        raw : typeof raw,
    };
    
    export default uri;
}
